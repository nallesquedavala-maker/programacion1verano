import { useState } from "react"
import PythonConsole from "../PythonConsole"
import { salidaCoincide } from "../../utils/validarSalida"

// Ejercicios de consola definidos por la profesora en el editor de contenido.
// Cada item: { titulo, descripcion, codigoInicial, entrada, salidaEsperada }
function EjerciciosPythonGenerico({ items, onFinish }) {
  const [actual, setActual] = useState(0)

  const ejercicios = items.map((item, indice) => ({
    id: indice + 1,
    titulo: item.titulo || `Ejercicio ${indice + 1}`,
    descripcion: item.descripcion || "",
    codigoInicial: item.codigoInicial || "",
    entrada: item.entrada || "",
    salidaEsperada: item.salidaEsperada || "",
    validar: ({ salida }) => salidaCoincide(salida, item.salidaEsperada),
  }))

  const ejercicio = ejercicios[actual]

  if (!ejercicio) {
    return <p>Este tema aún no tiene ejercicios cargados.</p>
  }

  return (
    <div>
      <div className="exercise-steps-nav" aria-label="Progreso de ejercicios">
        {ejercicios.map((item, indice) => (
          <span
            key={item.id}
            className={`exercise-step-pill${
              indice === actual ? " active" : indice < actual ? " done" : ""
            }`}
          >
            {indice < actual ? "✓" : indice + 1}
          </span>
        ))}
        <span className="exercise-steps-label">
          Ejercicio {actual + 1} de {ejercicios.length}
        </span>
      </div>

      <PythonConsole
        ejercicio={ejercicio}
        onFinish={() => {
          if (actual < ejercicios.length - 1) {
            setActual(actual + 1)
          } else {
            onFinish?.({ total: 60 })
          }
        }}
      />
    </div>
  )
}

export default EjerciciosPythonGenerico
