import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Users,
  FilePenLine,
  Download,
  FileSpreadsheet,
  X,
  ShieldCheck,
  Search,
} from "lucide-react"
import TopBar from "../components/TopBar"
import EditorSesion from "../components/profesor/EditorSesion"
import { supabase } from "../lib/supabase"
import {
  calificacionSesion,
  promedioAlumno,
} from "../utils/calificaciones"
import {
  exportarExcelGeneral,
  exportarExcelAlumno,
} from "../utils/exportarExcel"

const IDS_SESIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function PanelProfesor() {
  const [pestana, setPestana] = useState("alumnos")
  const [alumnos, setAlumnos] = useState([])
  const [progresoPorAlumno, setProgresoPorAlumno] = useState({})
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState("")
  const [alumnoDetalle, setAlumnoDetalle] = useState(null)

  useEffect(() => {
    let activo = true

    async function cargar() {
      const [respuestaPerfiles, respuestaProgreso] = await Promise.all([
        supabase
          .from("perfiles")
          .select("*")
          .eq("rol", "alumno")
          .order("nombre"),
        supabase.from("progreso").select("user_id, sesion_id, datos"),
      ])

      if (!activo) return

      setAlumnos(respuestaPerfiles.data || [])

      const progreso = {}
      ;(respuestaProgreso.data || []).forEach((fila) => {
        if (!progreso[fila.user_id]) progreso[fila.user_id] = {}
        progreso[fila.user_id][fila.sesion_id] = fila.datos
      })
      setProgresoPorAlumno(progreso)
      setCargando(false)
    }

    cargar()

    return () => {
      activo = false
    }
  }, [])

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return true
    return (
      alumno.nombre.toLowerCase().includes(texto) ||
      alumno.correo.toLowerCase().includes(texto)
    )
  })

  return (
    <main className="page">
      <div className="container container-wide">
        <TopBar />

        <Link to="/" className="back-link">
          <ArrowLeft aria-hidden="true" />
          Volver a las sesiones
        </Link>

        <header className="header">
          <span className="header-badge">
            <ShieldCheck aria-hidden="true" />
            Panel de profesor
          </span>
          <h1>Administración del curso</h1>
          <p className="header-subtitle">
            Revisa el avance de tus alumnos y carga el contenido de cada sesión
          </p>
        </header>

        <div className="panel-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={pestana === "alumnos"}
            className={`panel-tab${pestana === "alumnos" ? " active" : ""}`}
            onClick={() => setPestana("alumnos")}
          >
            <Users aria-hidden="true" />
            Alumnos y calificaciones
          </button>
          <button
            role="tab"
            aria-selected={pestana === "contenido"}
            className={`panel-tab${pestana === "contenido" ? " active" : ""}`}
            onClick={() => setPestana("contenido")}
          >
            <FilePenLine aria-hidden="true" />
            Contenido de sesiones
          </button>
        </div>

        {pestana === "contenido" && <EditorSesion />}

        {pestana === "alumnos" && (
          <section className="panel-section">
            <div className="panel-toolbar">
              <div className="field-input panel-search">
                <Search aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Buscar alumno por nombre o correo..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                disabled={alumnos.length === 0}
                onClick={() => exportarExcelGeneral(alumnos, progresoPorAlumno)}
              >
                <FileSpreadsheet aria-hidden="true" />
                Descargar Excel general
              </button>
            </div>

            {cargando ? (
              <div className="loading-block">
                <span className="spinner spinner-dark" aria-hidden="true" />
                Cargando alumnos...
              </div>
            ) : alumnosFiltrados.length === 0 ? (
              <div className="exercise-empty" style={{ padding: "48px" }}>
                <Users aria-hidden="true" />
                {alumnos.length === 0
                  ? "Aún no hay alumnos registrados."
                  : "Ningún alumno coincide con la búsqueda."}
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Alumno</th>
                      {IDS_SESIONES.map((id) => (
                        <th key={id} className="th-num">
                          S{id}
                        </th>
                      ))}
                      <th className="th-num">Prom.</th>
                      <th className="th-num">Excel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnosFiltrados.map((alumno) => {
                      const progreso = progresoPorAlumno[alumno.id] || {}
                      const promedio = promedioAlumno(progreso)

                      return (
                        <tr key={alumno.id}>
                          <td>
                            <button
                              className="student-name"
                              onClick={() => setAlumnoDetalle(alumno)}
                              title="Ver detalle"
                            >
                              {alumno.nombre}
                              <span className="student-email">
                                {alumno.correo}
                              </span>
                            </button>
                          </td>

                          {IDS_SESIONES.map((sesionId) => {
                            const calificacion = calificacionSesion(
                              progreso[sesionId]
                            )
                            return (
                              <td key={sesionId} className="td-num">
                                {calificacion === null ? (
                                  <span className="grade-empty">—</span>
                                ) : (
                                  <span
                                    className={`grade ${
                                      calificacion >= 70 ? "pass" : "fail"
                                    }`}
                                  >
                                    {calificacion}
                                  </span>
                                )}
                              </td>
                            )
                          })}

                          <td className="td-num">
                            {promedio === null ? (
                              <span className="grade-empty">—</span>
                            ) : (
                              <strong
                                className={`grade ${
                                  promedio >= 70 ? "pass" : "fail"
                                }`}
                              >
                                {promedio}
                              </strong>
                            )}
                          </td>

                          <td className="td-num">
                            <button
                              className="icon-button"
                              onClick={() =>
                                exportarExcelAlumno(alumno, progreso)
                              }
                              aria-label={`Descargar Excel de ${alumno.nombre}`}
                              title="Descargar Excel individual"
                            >
                              <Download aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {alumnoDetalle && (
          <div
            className="modal-overlay"
            onClick={(evento) => {
              if (evento.target === evento.currentTarget) setAlumnoDetalle(null)
            }}
          >
            <section className="modal-panel" role="dialog" aria-modal="true">
              <button
                className="panel-close"
                onClick={() => setAlumnoDetalle(null)}
                aria-label="Cerrar detalle"
              >
                <X aria-hidden="true" />
              </button>

              <header className="modal-header">
                <div className="modal-header-icon">
                  <Users aria-hidden="true" />
                </div>
                <div>
                  <p className="modal-header-eyebrow">Detalle del alumno</p>
                  <h2>{alumnoDetalle.nombre}</h2>
                </div>
              </header>

              <div className="modal-body">
                <DetalleAlumno
                  alumno={alumnoDetalle}
                  progreso={progresoPorAlumno[alumnoDetalle.id] || {}}
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}

function DetalleAlumno({ alumno, progreso }) {
  const sesionesConAvance = IDS_SESIONES.filter(
    (sesionId) => calificacionSesion(progreso[sesionId]) !== null
  )

  return (
    <div>
      <div className="panel-toolbar" style={{ marginBottom: "18px" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          {alumno.correo}
        </p>
        <button
          className="btn btn-outline"
          onClick={() => exportarExcelAlumno(alumno, progreso)}
        >
          <Download aria-hidden="true" />
          Excel individual
        </button>
      </div>

      {sesionesConAvance.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>
          Este alumno aún no registra avance.
        </p>
      ) : (
        sesionesConAvance.map((sesionId) => {
          const datos = progreso[sesionId]
          const temas = datos?.temas || {}
          const calificacion = calificacionSesion(datos)

          return (
            <div key={sesionId} className="detail-session">
              <h3 className="detail-session-title">
                Sesión {sesionId}
                <span
                  className={`grade ${calificacion >= 70 ? "pass" : "fail"}`}
                >
                  {calificacion}%
                </span>
              </h3>

              <div className="score-breakdown">
                {Object.keys(temas)
                  .sort((a, b) => Number(a) - Number(b))
                  .map((idTema) => {
                    const tema = temas[idTema]
                    return (
                      <div key={idTema} className="score-row">
                        <span>Tema {idTema}</span>
                        <span className="score-row-points">
                          {tema.quiz
                            ? `Quiz ${tema.quiz.porcentaje}%`
                            : "Quiz —"}
                          {" · "}
                          {tema.ejercicios
                            ? `Ejercicios ${tema.ejercicios.total}/60`
                            : "Ejercicios —"}
                        </span>
                      </div>
                    )
                  })}

                {datos?.minijuego && (
                  <div className="score-row">
                    <span>Minijuego (Boss)</span>
                    <span className="score-row-points">
                      {datos.minijuego.puntaje} pts ·{" "}
                      {datos.minijuego.intentos} intentos
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default PanelProfesor
