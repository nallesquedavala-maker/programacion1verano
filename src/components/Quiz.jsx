import { useState } from "react"
import { CheckCircle2, XCircle, Trophy, Target } from "lucide-react"

const letras = ["A", "B", "C", "D"]

function Quiz({ preguntas, onFinish }) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)

  const quizTerminado = preguntaActual >= preguntas.length

  if (quizTerminado) {
    const aciertos = respuestas.filter((r) => r.esCorrecta).length
    const porcentaje = Math.round((aciertos / preguntas.length) * 100)
    const aprobado = porcentaje >= 70

    return (
      <section className="quiz-card panel-result">
        <div className={`panel-result-icon ${aprobado ? "pass" : "fail"}`}>
          {aprobado ? <Trophy aria-hidden="true" /> : <Target aria-hidden="true" />}
        </div>

        <h2>Resultado del quiz</h2>

        <p>
          Obtuviste <strong>{aciertos}</strong> de{" "}
          <strong>{preguntas.length}</strong> respuestas correctas.
        </p>

        <div className="big-score">{porcentaje}%</div>

        <p>{aprobado ? "¡Quiz aprobado!" : "Puedes mejorar, ¡sigue practicando!"}</p>

        <button
          className="btn btn-primary"
          style={{ marginTop: "18px" }}
          onClick={() =>
            onFinish({
              aciertos,
              total: preguntas.length,
              porcentaje,
              aprobado,
            })
          }
        >
          Guardar resultado
        </button>
      </section>
    )
  }

  const pregunta = preguntas[preguntaActual]
  const yaRespondio = respuestaSeleccionada !== null
  const esCorrecta = respuestaSeleccionada === pregunta.correcta

  function seleccionarRespuesta(indice) {
    if (yaRespondio) return

    setRespuestaSeleccionada(indice)

    const nuevaRespuesta = {
      preguntaId: pregunta.id,
      respuestaSeleccionada: indice,
      correcta: pregunta.correcta,
      esCorrecta: indice === pregunta.correcta,
    }

    setRespuestas([...respuestas, nuevaRespuesta])
  }

  function siguientePregunta() {
    setRespuestaSeleccionada(null)
    setPreguntaActual(preguntaActual + 1)
  }

  return (
    <section className="quiz-card">
      <div className="quiz-progress">
        <span className="quiz-progress-text">
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </span>
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${((preguntaActual + (yaRespondio ? 1 : 0)) / preguntas.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h2>{pregunta.pregunta}</h2>

      <div className="quiz-options">
        {pregunta.opciones.map((opcion, indice) => {
          const seleccionada = respuestaSeleccionada === indice
          const correcta = pregunta.correcta === indice

          let estadoClase = ""
          if (yaRespondio && correcta) estadoClase = " correct"
          if (yaRespondio && seleccionada && !correcta) estadoClase = " incorrect"

          return (
            <button
              key={indice}
              onClick={() => seleccionarRespuesta(indice)}
              disabled={yaRespondio}
              className={`quiz-option${estadoClase}`}
            >
              <span className="option-letter">{letras[indice] || indice + 1}</span>
              {opcion}
            </button>
          )
        })}
      </div>

      {yaRespondio && (
        <div className={`quiz-feedback ${esCorrecta ? "correct" : "incorrect"}`}>
          <h3>
            {esCorrecta ? (
              <>
                <CheckCircle2 aria-hidden="true" /> ¡Correcto!
              </>
            ) : (
              <>
                <XCircle aria-hidden="true" /> Incorrecto
              </>
            )}
          </h3>

          <p>{pregunta.explicacion}</p>

          <button className="btn btn-primary" onClick={siguientePregunta}>
            {preguntaActual === preguntas.length - 1
              ? "Ver resultado"
              : "Siguiente pregunta"}
          </button>
        </div>
      )}
    </section>
  )
}

export default Quiz
