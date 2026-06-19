import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  BrainCircuit,
  Workflow,
  FileCode2,
  Code2,
  Printer,
  Keyboard,
  Package,
  Binary,
  Calculator,
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
} from "lucide-react"
import Quiz from "../components/Quiz"
import EjerciciosClase from "../components/EjerciciosClase"
import EjerciciosDiagramas from "../components/EjerciciosDiagramas"
import EjerciciosPseudocodigo from "../components/EjerciciosPseudocodigo"
import EjerciciosPrint from "../components/EjerciciosPrint"
import EjerciciosInput from "../components/EjerciciosInput"
import EjerciciosVariables from "../components/EjerciciosVariables"
import EjerciciosTiposDatos from "../components/EjerciciosTiposDatos"
import EjerciciosOperadores from "../components/EjerciciosOperadores"
import MinijuegoAdivinaNumero from "../components/MinijuegoAdivinaNumero"
import ProyectoEntrega1 from "../components/proyecto/ProyectoEntrega1"
import ProgressBar from "../components/ProgressBar"
import ProgressRing from "../components/ProgressRing"
import TopBar from "../components/TopBar"
import { bloques } from "../data/bloques"
import { useProgresoSesion } from "../hooks/useProgresoSesion"
import { calificacionDeTemas } from "../utils/calificaciones"

const temasSesion1 = [
  {
    id: 1,
    titulo: "¿Qué es un algoritmo?",
    Icono: BrainCircuit,
    gamma:
      "https://gamma.app/docs/Que-es-un-algoritmo-wq1t6rv3dpkmxm3?mode=doc",
  },
  {
    id: 2,
    titulo: "Diagramas de flujo",
    Icono: Workflow,
    gamma: "https://gamma.app/docs/Untitled-sucfkmcbt5v0225?mode=doc",
  },
  {
    id: 3,
    titulo: "Pseudocódigo",
    Icono: FileCode2,
    gamma:
      "https://gamma.app/docs/Dominando-la-Logica-Introduccion-al-Pseudocodigo-dlgccbavklnpxvx?mode=doc",
  },
  {
    id: 4,
    titulo: "Introducción a Python",
    Icono: Code2,
    gamma: "https://gamma.app/docs/Untitled-1p7u9ignjn89qo1?mode=doc",
  },
  {
    id: 5,
    titulo: "print()",
    Icono: Printer,
    gamma: "https://gamma.app/docs/Untitled-8hqu4714879bomp?mode=doc",
  },
  {
    id: 6,
    titulo: "input()",
    Icono: Keyboard,
    gamma: "https://gamma.app/docs/Que-es-input--yacvo1mz26aphai?mode=doc",
  },
  {
    id: 7,
    titulo: "Variables",
    Icono: Package,
    gamma: "https://gamma.app/docs/Untitled-vy269kt5v9htvui?mode=doc",
  },
  {
    id: 8,
    titulo: "Tipos de datos",
    Icono: Binary,
    gamma: "https://gamma.app/docs/Untitled-y1ghy9r4ye3zy44?mode=doc",
  },
  {
    id: 9,
    titulo: "Operadores básicos",
    Icono: Calculator,
    gamma: "https://gamma.app/docs/Untitled-ct4r1cz3fanda4d?mode=doc",
  },
]

function SesionUno() {
  const [seccionActiva, setSeccionActiva] = useState(null)
  const [temaActivo, setTemaActivo] = useState(1)
  const { datos, actualizarDatos, cargando, estadoGuardado } =
    useProgresoSesion(1)

  const progresoTemas = datos.temas || {}
  const minijuegoSesion1 = datos.minijuego || null

  function obtenerProgresoTema(idTema) {
    return progresoTemas[idTema] || {}
  }

  function quizCompletado(idTema) {
    return Boolean(obtenerProgresoTema(idTema).quiz)
  }

  function ejerciciosCompletados(idTema) {
    return Boolean(obtenerProgresoTema(idTema).ejercicios)
  }

  function temaCompletado(idTema) {
    if (idTema === 4) {
      return quizCompletado(idTema)
    }

    return quizCompletado(idTema) && ejerciciosCompletados(idTema)
  }

  function temaBloqueado(idTema) {
    if (idTema === 1) {
      return false
    }

    return !temaCompletado(idTema - 1)
  }

  function minijuegoBloqueado() {
    return !temaCompletado(9)
  }

  function proyectoBloqueado() {
    return !minijuegoSesion1
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

  function calcularCalificacionGlobal() {
    return calificacionDeTemas(progresoTemas) ?? 0
  }

  function contarTemasCompletados() {
    return Object.keys(progresoTemas).filter((idTema) =>
      temaCompletado(Number(idTema))
    ).length
  }

  function cerrarPanel() {
    setSeccionActiva(null)
  }

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

  function obtenerPreguntasQuiz() {
    const bloqueEncontrado = bloques.find((bloque) => bloque.id === temaActivo)

    return bloqueEncontrado?.quiz || []
  }

  function obtenerEjerciciosTema() {
    if (temaActivo === 1) {
      return (
        <EjerciciosClase
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 2) {
      return (
        <EjerciciosDiagramas
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 3) {
      return (
        <EjerciciosPseudocodigo
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 5) {
      return (
        <EjerciciosPrint
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 6) {
      return (
        <EjerciciosInput
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 7) {
      return (
        <EjerciciosVariables
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 8) {
      return (
        <EjerciciosTiposDatos
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    if (temaActivo === 9) {
      return (
        <EjerciciosOperadores
          onFinish={(resultado) => guardarEjercicios(temaActivo, resultado)}
        />
      )
    }

    return <p>Ejercicios próximamente.</p>
  }

  const progresoTemaActivo = obtenerProgresoTema(temaActivo)
  const temasCompletados = contarTemasCompletados()
  const calificacionGlobal = calcularCalificacionGlobal()
  const temaActual = temasSesion1.find((tema) => tema.id === temaActivo)

  if (cargando) {
    return (
      <main className="page">
        <div className="container">
          <TopBar />
          <div className="loading-block">
            <span className="spinner spinner-dark" aria-hidden="true" />
            Cargando tu progreso...
          </div>
        </div>
      </main>
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
            Sesión 1 · Fundamentos
          </span>
          <h1>Programación I Verano 2026</h1>
          <p className="header-subtitle">
            Fundamentos + primeros programas en Python
          </p>
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
                    {temasCompletados} / {temasSesion1.length}
                  </div>
                  <div className="stat-chip-label">Temas completados</div>
                </div>
              </div>

              <div className="stat-chip">
                <Flame aria-hidden="true" />
                <div>
                  <div className="stat-chip-value">
                    {temasSesion1.length - temasCompletados}
                  </div>
                  <div className="stat-chip-label">Misiones restantes</div>
                </div>
              </div>
            </div>

            <ProgressBar value={temasCompletados} total={temasSesion1.length} />
          </div>

          <div className="ring-wrapper">
            <ProgressRing value={calificacionGlobal} />
            <span className="ring-label">Calificación global</span>
          </div>
        </section>

        {seccionActiva && (
          // No se cierra al hacer clic fuera, para no perder el avance del
          // quiz/ejercicios por un clic accidental. Se cierra solo con el ✕.
          <div className="modal-overlay">
            <section
              className="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${
                seccionActiva === "quiz" ? "Quiz" : "Ejercicios"
              } de ${temaActual?.titulo || "la misión"}`}
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
                      ? "Adivina el número"
                      : seccionActiva === "proyecto"
                      ? "Proyecto Final · Entregable 1"
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
                        preguntas={obtenerPreguntasQuiz()}
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
                      obtenerEjerciciosTema()
                    )}
                  </>
                )}

                {seccionActiva === "minijuego" && (
                  <>
                    {minijuegoSesion1 ? (
                      <div className="panel-result">
                        <div className="panel-result-icon pass">
                          <Trophy aria-hidden="true" />
                        </div>
                        <h2>Minijuego finalizado</h2>
                        <p>Ya completaste el Boss Level de la sesión.</p>
                        <div className="big-score">
                          {minijuegoSesion1.puntaje} pts
                        </div>
                        <p>Intentos: {minijuegoSesion1.intentos}</p>
                      </div>
                    ) : (
                      <MinijuegoAdivinaNumero
                        onFinish={(resultado) => guardarMinijuego(resultado)}
                      />
                    )}
                  </>
                )}

                {seccionActiva === "proyecto" && <ProyectoEntrega1 />}
              </div>
            </section>
          </div>
        )}

        <section className="mission-grid">
          {temasSesion1.map((tema, indice) => {
            const bloqueado = temaBloqueado(tema.id)
            const completado = temaCompletado(tema.id)
            const tieneEjercicios = tema.id !== 4
            const IconoTema = tema.Icono

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
                    disabled={bloqueado}
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
                          <Code2 aria-hidden="true" /> Ejercicios
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
          <article className="special-card boss">
            <div className="special-card-header">
              <div className="special-icon">
                <Gamepad2 aria-hidden="true" />
              </div>
              <h2>Adivina el número</h2>
            </div>

            <h3>Minijuego integrador de la sesión</h3>
            <p>Adivina el número secreto usando lógica e intentos.</p>

            <button
              className="btn btn-primary"
              disabled={minijuegoBloqueado()}
              onClick={() => {
                if (minijuegoBloqueado()) return
                setSeccionActiva("minijuego")
              }}
            >
              {minijuegoBloqueado() ? (
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

          <article className="special-card final">
            <div className="special-card-header">
              <div className="special-icon">
                <Puzzle aria-hidden="true" />
              </div>
              <h2>Proyecto Final · Entregable 1</h2>
            </div>

            <h3>Proyecto integrador de la sesión</h3>
            <p>Construcción guiada del videojuego final de la sesión.</p>

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
        </section>
      </div>
    </main>
  )
}

export default SesionUno
