import { useState } from "react"
import {
  Plus,
  X,
  Layers,
  ListOrdered,
  Trophy,
  CheckCircle2,
  XCircle,
  Save,
  RotateCcw,
  ArrowRight,
  Inbox,
} from "lucide-react"

function OrdenarEjercicios({ ejercicios, etiquetas, onFinish }) {
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [seleccionadas, setSeleccionadas] = useState([])
  const [resultado, setResultado] = useState(null)
  const [intentos, setIntentos] = useState(0)
  const [puntajes, setPuntajes] = useState([])

  const ejerciciosTerminados = ejercicioActual >= ejercicios.length

  if (ejerciciosTerminados) {
    const total = puntajes.reduce((suma, item) => suma + item.puntos, 0)

    return (
      <section className="panel-result">
        <div className="panel-result-icon pass">
          <Trophy aria-hidden="true" />
        </div>

        <h2>Ejercicios completados</h2>
        <p>{etiquetas.mensajeFinal}</p>

        <div className="score-breakdown">
          {puntajes.map((item, index) => (
            <div className="score-row" key={index}>
              <CheckCircle2 aria-hidden="true" />
              <span>
                {item.ejercicio} · {item.intentos} intento(s)
              </span>
              <span className="score-row-points">{item.puntos} pts</span>
            </div>
          ))}
        </div>

        <div className="big-score">{total} / 60 pts</div>

        <button
          className="btn btn-primary"
          style={{ marginTop: "12px" }}
          onClick={() => onFinish({ total, puntajes })}
        >
          <Save aria-hidden="true" />
          Guardar resultado
        </button>
      </section>
    )
  }

  const ejercicio = ejercicios[ejercicioActual]
  const IconoEscena = ejercicio.Icono

  function seleccionarTarjeta(tarjeta) {
    if (seleccionadas.includes(tarjeta) || resultado) return
    setSeleccionadas([...seleccionadas, tarjeta])
  }

  function quitarTarjeta(tarjeta) {
    if (resultado) return
    setSeleccionadas(seleccionadas.filter((t) => t !== tarjeta))
  }

  function validarOrden() {
    const nuevosIntentos = intentos + 1
    setIntentos(nuevosIntentos)

    const correcto =
      JSON.stringify(seleccionadas) === JSON.stringify(ejercicio.ordenCorrecto)

    if (correcto) {
      let puntos = 5

      if (nuevosIntentos === 1) puntos = 20
      else if (nuevosIntentos === 2) puntos = 15
      else if (nuevosIntentos === 3) puntos = 10

      setPuntajes([
        ...puntajes,
        {
          ejercicio: ejercicio.titulo,
          intentos: nuevosIntentos,
          puntos,
        },
      ])

      setResultado("correcto")
    } else {
      setResultado("incorrecto")
    }
  }

  function siguienteEjercicio() {
    setSeleccionadas([])
    setResultado(null)
    setIntentos(0)
    setEjercicioActual(ejercicioActual + 1)
  }

  const tarjetasDisponibles = ejercicio.tarjetas.filter(
    (tarjeta) => !seleccionadas.includes(tarjeta)
  )

  return (
    <section>
      <div className="exercise-steps-nav" aria-label="Progreso de ejercicios">
        {ejercicios.map((item, indice) => (
          <span
            key={item.id}
            className={`exercise-step-pill${
              indice === ejercicioActual
                ? " active"
                : indice < ejercicioActual
                ? " done"
                : ""
            }`}
          >
            {indice < ejercicioActual ? "✓" : indice + 1}
          </span>
        ))}
        <span className="exercise-steps-label">
          {etiquetas.unidad} {ejercicioActual + 1} de {ejercicios.length}
        </span>
      </div>

      <div className="exercise-scene">
        <div className="exercise-scene-icon">
          <IconoEscena aria-hidden="true" />
        </div>

        <div>
          <p className="exercise-scene-eyebrow">{ejercicio.escena}</p>
          <h2>{ejercicio.titulo}</h2>
          <p>{ejercicio.descripcion}</p>
        </div>
      </div>

      <p className="exercise-instruction">{etiquetas.instruccion}</p>

      <div className="exercise-zones">
        <div className="exercise-zone">
          <h4 className="exercise-zone-title">
            <Layers aria-hidden="true" />
            {etiquetas.zonaDisponibles}
            <span className="exercise-zone-count">
              {tarjetasDisponibles.length}
            </span>
          </h4>

          <div className="card-chips">
            {tarjetasDisponibles.map((tarjeta) => (
              <button
                key={tarjeta}
                onClick={() => seleccionarTarjeta(tarjeta)}
                disabled={Boolean(resultado)}
                className="card-chip"
              >
                <Plus aria-hidden="true" />
                {tarjeta}
              </button>
            ))}

            {tarjetasDisponibles.length === 0 && (
              <div className="exercise-empty">
                <CheckCircle2 aria-hidden="true" />
                Usaste todas las tarjetas
              </div>
            )}
          </div>
        </div>

        <div className="exercise-zone target">
          <h4 className="exercise-zone-title">
            <ListOrdered aria-hidden="true" />
            {etiquetas.zonaConstruccion}
            <span className="exercise-zone-count">
              {seleccionadas.length} / {ejercicio.ordenCorrecto.length}
            </span>
          </h4>

          {seleccionadas.length === 0 ? (
            <div className="exercise-empty">
              <Inbox aria-hidden="true" />
              Toca las tarjetas de la izquierda para armar tu secuencia.
            </div>
          ) : (
            <div className="built-steps">
              {seleccionadas.map((tarjeta, indice) => (
                <div key={tarjeta} className="built-step">
                  <span className="built-step-number">{indice + 1}</span>
                  <span className="built-step-text">{tarjeta}</span>
                  {!resultado && (
                    <button
                      onClick={() => quitarTarjeta(tarjeta)}
                      className="built-step-remove"
                      aria-label={`Quitar paso: ${tarjeta}`}
                    >
                      <X aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {resultado && (
        <div
          className={`quiz-feedback ${
            resultado === "correcto" ? "correct" : "incorrect"
          }`}
        >
          <h3>
            {resultado === "correcto" ? (
              <>
                <CheckCircle2 aria-hidden="true" /> {etiquetas.exitoTitulo}
              </>
            ) : (
              <>
                <XCircle aria-hidden="true" /> {etiquetas.falloTitulo}
              </>
            )}
          </h3>

          {resultado === "correcto" && (
            <p>
              Intentos: <strong>{intentos}</strong> · Puntos ganados:{" "}
              <strong>
                {intentos === 1 ? 20 : intentos === 2 ? 15 : intentos === 3 ? 10 : 5}
              </strong>
            </p>
          )}

          {resultado === "incorrecto" && <p>{etiquetas.falloMensaje}</p>}
        </div>
      )}

      <div className="exercise-actions">
        {!resultado && (
          <button
            className="btn btn-primary"
            onClick={validarOrden}
            disabled={seleccionadas.length !== ejercicio.ordenCorrecto.length}
          >
            <CheckCircle2 aria-hidden="true" />
            {etiquetas.botonValidar}
          </button>
        )}

        {resultado === "incorrecto" && (
          <button
            className="btn btn-outline"
            onClick={() => {
              setSeleccionadas([])
              setResultado(null)
            }}
          >
            <RotateCcw aria-hidden="true" />
            Intentar de nuevo
          </button>
        )}

        {resultado === "correcto" && (
          <button className="btn btn-primary" onClick={siguienteEjercicio}>
            {ejercicioActual === ejercicios.length - 1
              ? "Finalizar ejercicios"
              : "Siguiente ejercicio"}
            <ArrowRight aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}

export default OrdenarEjercicios
