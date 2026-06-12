import { useState } from "react"
import PythonConsole from "./PythonConsole"

const ejercicios = [
  {
    id: 1,
    titulo: "Ejercicio 1",
    descripcion:
      "Crea las variables puntos=10 y bonus=5. Imprime la suma de ambas variables.",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      return (
        codigo.includes("puntos = 10") &&
        codigo.includes("bonus = 5") &&
        codigo.includes("+") &&
        salida.trim() === "15"
      )
    },
  },

  {
    id: 2,
    titulo: "Ejercicio 2",
    descripcion:
      "Crea las variables vida=100 y danio=25. Imprime la vida restante después del daño.",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      return (
        codigo.includes("vida = 100") &&
        codigo.includes("danio = 25") &&
        codigo.includes("-") &&
        salida.trim() === "75"
      )
    },
  },

  {
    id: 3,
    titulo: "Ejercicio 3",
    descripcion:
      "Crea las variables oro=120 y jugadores=4. Imprime cuánto oro recibe cada jugador.",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      return (
        codigo.includes("oro = 120") &&
        codigo.includes("jugadores = 4") &&
        codigo.includes("/") &&
        (salida.trim() === "30" ||
          salida.trim() === "30.0")
      )
    },
  },
]

function EjerciciosOperadores({ onFinish }) {
  const [actual, setActual] = useState(0)
  const ejercicio = ejercicios[actual]

  return (
    <div>
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

export default EjerciciosOperadores