import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Gamepad2,
  Puzzle,
  Lock,
  CheckCircle2,
  Clock,
  BookOpen,
  Brain,
  PencilLine,
  X,
  Trophy,
  Target,
  PartyPopper,
  Flame,
  ArrowLeft,
  Inbox,
} from "lucide-react"
import Quiz from "../components/Quiz"
import MinijuegoCodigo from "../components/MinijuegoCodigo"
import EjerciciosOrdenarGenerico from "../components/generico/EjerciciosOrdenarGenerico"
import EjerciciosPythonGenerico from "../components/generico/EjerciciosPythonGenerico"
import ProgressBar from "../components/ProgressBar"
import ProgressRing from "../components/ProgressRing"
import TopBar from "../components/TopBar"
import { supabase } from "../lib/supabase"
import { useProgresoSesion } from "../hooks/useProgresoSesion"
import { calificacionDeTemas } from "../utils/calificaciones"
import { obtenerIcono } from "../data/iconos"

function SesionGenerica() {
  const { id } = useParams()
  const sesionId = Number(id)

  const [sesion, setSesion] = useState(null)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [seccionActiva, setSeccionActiva] = useState(null)
  const [temaActivo, setTemaActivo] = useState(1)

  const { datos, actualizarDatos, cargando, estadoGuardado } =
    useProgresoSesion(sesionId)

  useEffect(() => {
    let activo = true

    async function cargarSesion() {
      const { data } = await supabase
        .from("sesiones")
        .select("*")
        .eq("id", sesionId)
        .single()

      if (activo) {
        setSesion(data || null)
        setCargandoSesion(false)
      }
    }

    cargarSesion()

    return () => {
      activo = false
    }
  }, [sesionId])

  useEffect(() => {
    if (!seccionActiva) return

    document.body.style.overflow = "hidden"

    function manejarTecla(evento) {
      if (evento.key === "Escape") setSeccionActiva(null)
    }

    window.addEventListener("keydown", manejarTecla)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", manejarTecla)
    }
  }, [seccionActiva])

  const temas = sesion?.contenido?.temas || []
  const proyecto = sesion?.contenido?.proyecto || null
  const minijuegoConfig = sesion?.contenido?.minijuego || null
  const progresoTemas = datos.temas || {}
  const minijuego = datos.minijuego || null

  function obtenerProgresoTema(idTema) {
    return progresoTemas[idTema] || {}
  }

  function quizCompletado(idTema) {
    return Boolean(obtenerProgresoTema(idTema).quiz)
  }

  function ejerciciosCompletados(idTema) {
    return Boolean(obtenerProgresoTema(idTema).ejercicios)
  }

  function temaTieneEjercicios(tema) {
    return (
      tema.ejercicios &&
      tema.ejercicios.tipo !== "ninguno" &&
      (tema.ejercicios.items || []).length > 0
    )
  }

  function temaCompletado(idTema) {
    const tema = temas.find((t) => t.id === idTema)
    if (!tema) return false

    if (!quizCompletado(idTema)) return false
    if (!temaTieneEjercicios(tema)) return true

    return ejerciciosCompletados(idTema)
  }

  function temaBloqueado(idTema) {
    const indice = temas.findIndex((t) => t.id === idTema)
    if (indice <= 0) return false

    return !temaCompletado(temas[indice - 1].id)
  }

  function temasCompletosTodos() {
    return temas.length > 0 && temas.every((tema) => temaCompletado(tema.id))
  }

  function minijuegoBloqueado() {
    return !temasCompletosTodos()
  }

  function proyectoBloqueado() {
    // El proyecto necesita todos los temas terminados; y si la sesión tiene
    // minijuego configurado, también haber terminado el minijuego.
    if (!temasCompletosTodos()) return true
    if (minijuegoConfig && !minijuego) return true
    return false
  }

  function guardarQuiz(idTema, resultado) {
    actualizarDatos((datosPrevios) => ({
      ...datosPrevios,
      temas: {
        ...datosPrevios.temas,
        [idTema]: {
          ...(datosPrevios.temas?.[idTema] || {}),
          quiz: resultado,
        },
      },
    }))
  }

  function guardarEjercicios(idTema, resultado) {
    actualizarDatos((datosPrevios) => ({
      ...datosPrevios,
      temas: {
        ...datosPrevios.temas,
        [idTema]: {
          ...(datosPrevios.temas?.[idTema] || {}),
          ejercicios: resultado,
        },
      },
    }))
  }

  function guardarMinijuego(resultado) {
    actualizarDatos((datosPrevios) => ({
      ...datosPrevios,
      minijuego: resultado,
    }))
  }

  function contarTemasCompletados() {
    return temas.filter((tema) => temaCompletado(tema.id)).length
  }

  function cerrarPanel() {
    setSeccionActiva(null)
  }

  const temaActual = temas.find((tema) => tema.id === temaActivo)
  const progresoTemaActivo = obtenerProgresoTema(temaActivo)
  const temasCompletados = contarTemasCompletados()
  const calificacionGlobal = calificacionDeTemas(progresoTemas) ?? 0

  if (cargandoSesion || cargando) {
    return (
      <main className="page">
        <div className="container">
          <TopBar />
          <div className="loading-block">
            <span className="spinner spinner-dark" aria-hidden="true" />
            Cargando sesión...
          </div>
        </div>
      </main>
    )
  }

  if (!sesion || (!sesion.publicada && temas.length === 0)) {
    return (
      <main className="page">
        <div className="container">
          <TopBar />
          <div className="panel-result" style={{ marginTop: "60px" }}>
            <div className="panel-result-icon fail">
              <Inbox aria-hidden="true" />
            </div>
            <h2>Sesión no disponible</h2>
            <p>Tu profesora aún no publica el contenido de esta sesión.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: "18px" }}>
              <ArrowLeft aria-hidden="true" />
              Volver a las sesiones
            </Link>
          </div>
        </div>
      </main>
    )
  }

  function renderEjerciciosTema() {
    if (!temaActual || !temaTieneEjercicios(temaActual)) {
      return <p>Este tema no tiene ejercicios.</p>
    }

    if (temaActual.ejercicios.tipo === "python") {
      return (
        <EjerciciosPythonGenerico
          items={temaActual.ejercicios.items}
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    return (
      <EjerciciosOrdenarGenerico
        items={temaActual.ejercicios.items}
        onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
      />
    )
  }

  return (
    <main className="page">
      <div className="container">
        <TopBar estadoGuardado={estadoGuardado} />

        <Link to="/" className="back-link">
          <ArrowLeft aria-hidden="true" />
          Todas las sesiones
        </Link>

        <header className="header">
          <span className="header-badge">
            <Gamepad2 aria-hidden="true" />
            {sesion.titulo}
          </span>
          <h1>Programación I Verano 2026</h1>
          <p className="header-subtitle">{sesion.subtitulo}</p>
        </header>

        <section className="progress-card" aria-label="Progreso de la sesión">
          <div className="progress-info">
            <h2>Progreso de la sesión</h2>
            <p>Completa los quizzes y ejercicios de cada misión para avanzar.</p>

            <div className="progress-stats">
              <div className="stat-chip">
                <Target aria-hidden="true" />
                <div>
                  <div className="stat-chip-value">
                    {temasCompletados} / {temas.length}
                  </div>
                  <div className="stat-chip-label">Temas completados</div>
                </div>
              </div>

              <div className="stat-chip">
                <Flame aria-hidden="true" />
                <div>
                  <div className="stat-chip-value">
                    {temas.length - temasCompletados}
                  </div>
                  <div className="stat-chip-label">Misiones restantes</div>
                </div>
              </div>
            </div>

            <ProgressBar value={temasCompletados} total={temas.length || 1} />
          </div>

          <div className="ring-wrapper">
            <ProgressRing value={calificacionGlobal} />
            <span className="ring-label">Calificación global</span>
          </div>
        </section>

        {seccionActiva && (
          <div
            className="modal-overlay"
            onClick={(evento) => {
              if (evento.target === evento.currentTarget) cerrarPanel()
            }}
          >
            <section
              className="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label={temaActual?.titulo || sesion.titulo}
            >
              <button
                onClick={cerrarPanel}
                className="panel-close"
                aria-label="Cerrar panel"
              >
                <X aria-hidden="true" />
              </button>

              <header className="modal-header">
                <div className="modal-header-icon">
                  {seccionActiva === "quiz" ? (
                    <Brain aria-hidden="true" />
                  ) : seccionActiva === "ejercicios" ? (
                    <PencilLine aria-hidden="true" />
                  ) : seccionActiva === "proyecto" ? (
                    <Puzzle aria-hidden="true" />
                  ) : (
                    <Gamepad2 aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p className="modal-header-eyebrow">
                    {seccionActiva === "quiz"
                      ? `Misión ${temaActivo} · Quiz`
                      : seccionActiva === "ejercicios"
                      ? `Misión ${temaActivo} · Ejercicios`
                      : seccionActiva === "minijuego"
                      ? "Boss Level"
                      : "Proyecto"}
                  </p>
                  <h2>
                    {seccionActiva === "minijuego"
                      ? minijuegoConfig?.titulo || "Boss Level"
                      : seccionActiva === "proyecto"
                      ? proyecto?.titulo || "Proyecto de la sesión"
                      : temaActual?.titulo}
                  </h2>
                </div>
              </header>

              <div className="modal-body">
                {seccionActiva === "quiz" && (
                  <>
                    {progresoTemaActivo.quiz ? (
                      <div className="panel-result">
                        <div
                          className={`panel-result-icon ${
                            progresoTemaActivo.quiz.aprobado ? "pass" : "fail"
                          }`}
                        >
                          {progresoTemaActivo.quiz.aprobado ? (
                            <Trophy aria-hidden="true" />
                          ) : (
                            <Target aria-hidden="true" />
                          )}
                        </div>
                        <h2>Quiz finalizado</h2>
                        <p>Ya contestaste este quiz.</p>
                        <div className="big-score">
                          {progresoTemaActivo.quiz.porcentaje}%
                        </div>
                        <p>
                          Aciertos: {progresoTemaActivo.quiz.aciertos} de{" "}
                          {progresoTemaActivo.quiz.total} ·{" "}
                          {progresoTemaActivo.quiz.aprobado
                            ? "¡Aprobado!"
                            : "No aprobado"}
                        </p>
                      </div>
                    ) : (
                      <Quiz
                        preguntas={temaActual?.quiz || []}
                        onFinish={(resultado) =>
                          guardarQuiz(temaActivo, resultado)
                        }
                      />
                    )}
                  </>
                )}

                {seccionActiva === "ejercicios" && (
                  <>
                    {progresoTemaActivo.ejercicios ? (
                      <div className="panel-result">
                        <div className="panel-result-icon pass">
                          <PartyPopper aria-hidden="true" />
                        </div>
                        <h2>Ejercicios finalizados</h2>
                        <p>Ya completaste los ejercicios de este tema.</p>
                        <div className="big-score">
                          {progresoTemaActivo.ejercicios.total} / 60 pts
                        </div>
                      </div>
                    ) : (
                      renderEjerciciosTema()
                    )}
                  </>
                )}

                {seccionActiva === "minijuego" && (
                  <>
                    {minijuego ? (
                      <div className="panel-result">
                        <div className="panel-result-icon pass">
                          <Trophy aria-hidden="true" />
                        </div>
                        <h2>Minijuego finalizado</h2>
                        <p>Ya completaste el Boss Level de la sesión.</p>
                        <div className="big-score">{minijuego.puntaje} pts</div>
                        <p>Intentos: {minijuego.intentos}</p>
                      </div>
                    ) : (
                      <MinijuegoCodigo
                        config={minijuegoConfig}
                        onFinish={(resultado) => guardarMinijuego(resultado)}
                      />
                    )}
                  </>
                )}

                {seccionActiva === "proyecto" && (
                  <div className="project-brief">
                    <h2>{proyecto?.titulo || "Proyecto de la sesión"}</h2>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {proyecto?.descripcion}
                    </p>
                    {(proyecto?.requisitos || []).length > 0 && (
                      <>
                        <h3>Requisitos</h3>
                        <ul>
                          {proyecto.requisitos.map((requisito, indice) => (
                            <li key={indice}>{requisito}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        <section className="mission-grid">
          {temas.map((tema, indice) => {
            const bloqueado = temaBloqueado(tema.id)
            const completado = temaCompletado(tema.id)
            const tieneEjercicios = temaTieneEjercicios(tema)
            const IconoTema = obtenerIcono(tema.icono)

            return (
              <article
                key={tema.id}
                className={`mission-card${completado ? " completed" : ""}`}
                style={{ "--i": indice, opacity: bloqueado ? 0.55 : 1 }}
              >
                <div className="mission-top">
                  <div className="mission-icon">
                    <IconoTema aria-hidden="true" />
                  </div>

                  {bloqueado ? (
                    <span className="status-badge locked">
                      <Lock aria-hidden="true" /> Bloqueado
                    </span>
                  ) : completado ? (
                    <span className="status-badge done">
                      <CheckCircle2 aria-hidden="true" /> Completado
                    </span>
                  ) : (
                    <span className="status-badge progress">
                      <Clock aria-hidden="true" /> En progreso
                    </span>
                  )}
                </div>

                <div>
                  <p className="mission-number">Misión {tema.id}</p>
                  <h2>{tema.titulo}</h2>
                </div>

                <div className="mission-checklist">
                  <span
                    className={`check-item${
                      quizCompletado(tema.id) ? " done" : ""
                    }`}
                  >
                    {quizCompletado(tema.id) ? (
                      <CheckCircle2 aria-hidden="true" />
                    ) : (
                      <Brain aria-hidden="true" />
                    )}
                    Quiz
                  </span>

                  {tieneEjercicios && (
                    <span
                      className={`check-item${
                        ejerciciosCompletados(tema.id) ? " done" : ""
                      }`}
                    >
                      {ejerciciosCompletados(tema.id) ? (
                        <CheckCircle2 aria-hidden="true" />
                      ) : (
                        <PencilLine aria-hidden="true" />
                      )}
                      Ejercicios
                    </span>
                  )}
                </div>

                <div className="mission-actions">
                  <button
                    className="btn btn-outline"
                    disabled={bloqueado || !tema.gamma}
                    onClick={() => window.open(tema.gamma, "_blank")}
                  >
                    <BookOpen aria-hidden="true" />
                    Microclase
                  </button>

                  <button
                    className={`btn ${
                      quizCompletado(tema.id) ? "btn-success" : "btn-primary"
                    }`}
                    disabled={bloqueado || (tema.quiz || []).length === 0}
                    onClick={() => {
                      setTemaActivo(tema.id)
                      setSeccionActiva("quiz")
                    }}
                  >
                    {quizCompletado(tema.id) ? (
                      <>
                        <CheckCircle2 aria-hidden="true" /> Quiz completado
                      </>
                    ) : (
                      <>
                        <Brain aria-hidden="true" /> Quiz
                      </>
                    )}
                  </button>

                  {tieneEjercicios && (
                    <button
                      className={`btn ${
                        ejerciciosCompletados(tema.id)
                          ? "btn-success"
                          : "btn-outline"
                      }`}
                      disabled={bloqueado}
                      onClick={() => {
                        setTemaActivo(tema.id)
                        setSeccionActiva("ejercicios")
                      }}
                    >
                      {ejerciciosCompletados(tema.id) ? (
                        <>
                          <CheckCircle2 aria-hidden="true" /> Ejercicios
                          completados
                        </>
                      ) : (
                        <>
                          <PencilLine aria-hidden="true" /> Ejercicios
                        </>
                      )}
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        <section className="special-grid">
          {minijuegoConfig && (
            <article className="special-card boss">
              <div className="special-card-header">
                <div className="special-icon">
                  <Gamepad2 aria-hidden="true" />
                </div>
                <h2>{minijuegoConfig.titulo || "Boss Level"}</h2>
              </div>

              <h3>Minijuego integrador de la sesión</h3>
              <p>
                {minijuego
                  ? `Completado · ${minijuego.puntaje} pts`
                  : "Reto de código. Se desbloquea cuando completes todos los temas de la sesión."}
              </p>

              <button
                className={`btn ${minijuego ? "btn-success" : "btn-primary"}`}
                disabled={minijuegoBloqueado()}
                onClick={() => {
                  if (minijuegoBloqueado()) return
                  setSeccionActiva("minijuego")
                }}
              >
                {minijuego ? (
                  <>
                    <CheckCircle2 aria-hidden="true" />
                    Minijuego completado
                  </>
                ) : minijuegoBloqueado() ? (
                  <>
                    <Lock aria-hidden="true" />
                    Bloqueado
                  </>
                ) : (
                  <>
                    <Gamepad2 aria-hidden="true" />
                    Iniciar minijuego
                  </>
                )}
              </button>
            </article>
          )}

          {proyecto && (
            <article className="special-card final">
              <div className="special-card-header">
                <div className="special-icon">
                  <Puzzle aria-hidden="true" />
                </div>
                <h2>{proyecto.titulo || "Proyecto de la sesión"}</h2>
              </div>

              <h3>Proyecto integrador de la sesión</h3>
              <p>
                {minijuegoConfig
                  ? "Se desbloquea al terminar el minijuego."
                  : "Se desbloquea al completar todos los temas de la sesión."}
              </p>

              <button
                className="btn btn-primary"
                disabled={proyectoBloqueado()}
                onClick={() => {
                  if (proyectoBloqueado()) return
                  setSeccionActiva("proyecto")
                }}
              >
                {proyectoBloqueado() ? (
                  <>
                    <Lock aria-hidden="true" />
                    Bloqueado
                  </>
                ) : (
                  <>
                    <Puzzle aria-hidden="true" />
                    Ver proyecto
                  </>
                )}
              </button>
            </article>
          )}
        </section>
      </div>
    </main>
  )
}

export default SesionGenerica
