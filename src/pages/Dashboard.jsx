import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Gamepad2,
  Lock,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import TopBar from "../components/TopBar"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import { calificacionSesion, promedioAlumno } from "../utils/calificaciones"

function Dashboard() {
  const { usuario } = useAuth()
  const [sesiones, setSesiones] = useState([])
  const [progreso, setProgreso] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!usuario) return

    let activo = true

    async function cargar() {
      const [respuestaSesiones, respuestaProgreso] = await Promise.all([
        supabase.from("sesiones").select("*").order("id"),
        supabase
          .from("progreso")
          .select("sesion_id, datos")
          .eq("user_id", usuario.id),
      ])

      if (!activo) return

      setSesiones(respuestaSesiones.data || [])

      const progresoPorSesion = {}
      ;(respuestaProgreso.data || []).forEach((fila) => {
        progresoPorSesion[fila.sesion_id] = fila.datos
      })
      setProgreso(progresoPorSesion)
      setCargando(false)
    }

    cargar()

    return () => {
      activo = false
    }
  }, [usuario])

  const promedio = promedioAlumno(progreso)

  return (
    <main className="page">
      <div className="container">
        <TopBar />

        <header className="header">
          <span className="header-badge">
            <Gamepad2 aria-hidden="true" />
            Programación I · Verano 2026
          </span>
          <h1>Tu aventura</h1>
          <p className="header-subtitle">
            Elige una sesión para continuar
            {promedio !== null && (
              <>
                {" "}
                · Promedio actual: <strong>{promedio}%</strong>
              </>
            )}
          </p>
        </header>

        {cargando ? (
          <div className="loading-block">
            <span className="spinner spinner-dark" aria-hidden="true" />
            Cargando sesiones...
          </div>
        ) : (
          <section className="mission-grid">
            {sesiones.map((sesion, indice) => {
              const datos = progreso[sesion.id]
              const calificacion = calificacionSesion(datos)
              const disponible = sesion.publicada
              const tieneAvance = calificacion !== null

              const tarjeta = (
                <article
                  key={sesion.id}
                  className={`mission-card session-card${
                    !disponible ? " locked" : ""
                  }`}
                  style={{ "--i": indice }}
                >
                  <div className="mission-top">
                    <div className="mission-icon session-number-icon">
                      {sesion.id}
                    </div>

                    {!disponible ? (
                      <span className="status-badge locked">
                        <Lock aria-hidden="true" /> Próximamente
                      </span>
                    ) : tieneAvance ? (
                      <span className="status-badge progress">
                        <Clock aria-hidden="true" /> En progreso
                      </span>
                    ) : (
                      <span className="status-badge done">
                        <Sparkles aria-hidden="true" /> Disponible
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="mission-number">{sesion.titulo}</p>
                    <h2>{sesion.subtitulo || "Contenido por anunciar"}</h2>
                  </div>

                  {tieneAvance && (
                    <div className="mission-checklist">
                      <span className="check-item done">
                        <CheckCircle2 aria-hidden="true" />
                        Calificación: {calificacion}%
                      </span>
                    </div>
                  )}

                  {disponible && (
                    <div className="mission-actions">
                      <span className="btn btn-primary">
                        Entrar
                        <ArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </article>
              )

              return disponible ? (
                <Link
                  key={sesion.id}
                  to={`/sesion/${sesion.id}`}
                  className="session-link"
                >
                  {tarjeta}
                </Link>
              ) : (
                tarjeta
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}

export default Dashboard
