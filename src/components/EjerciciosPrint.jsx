import { useState } from "react"
import PythonConsole from "./PythonConsole"

const ejercicios = [
  {
    id: 1,
    titulo: "Ejercicio 1",
    descripcion: 'Muestra exactamente: Hola Aventurero',

    codigoInicial: "",

    codigoEsperado: `print("Hola Aventurero")`,

    validar: ({ codigo, salida }) => {
  const codigoNormalizado = codigo.trim().replaceAll("'", '"')

  return (
    codigoNormalizado === `print("Hola Aventurero")` &&
    salida.trim() === "Hola Aventurero"
  )
},
  },

  {
    id: 2,
    titulo: "Ejercicio 2",
    descripcion: 'Muestra exactamente: Bienvenido a Programación I',

    codigoInicial: "",

    codigoEsperado: `print("Bienvenido a Programación I")`,

    validar: ({ codigo, salida }) => {
  const codigoNormalizado = codigo
    .trim()
    .replaceAll("'", '"')

  return (
    codigoNormalizado ===
      `print("Bienvenido a Programación I")` &&
    salida.trim() ===
      "Bienvenido a Programación I"
      )
    },
  },

  {
    id: 3,
    titulo: "Ejercicio 3",
    descripcion:
      "Muestra exactamente dos líneas:\nNivel 1\nMisión completada",

    codigoInicial: "",

    codigoEsperado: `print("Nivel 1")
print("Misión completada")`,
    validar: ({ codigo, salida }) => {
      return (
        codigo.trim() ===
          `print("Nivel 1")
print("Misión completada")` &&
        salida.trim() ===
          `Nivel 1
Misión completada`
      )
    },
  },
  ]

function EjerciciosPrint({ onFinish }) {
  const [actual, setActual] = useState(0)

  const ejercicio = ejercicios[actual]

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
            onFinish?.({
              total: 60,
            })
          }
        }}
      />
    </div>
  )
}

export default EjerciciosPrint