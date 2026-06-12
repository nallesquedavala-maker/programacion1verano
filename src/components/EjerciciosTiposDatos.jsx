import { useState } from "react"
import PythonConsole from "./PythonConsole"

const ejercicios = [
  {
    id: 1,
    titulo: "Ejercicio 1",
    descripcion:
      'Crea una variable llamada nombre con el valor "Nallely" e imprímela.',

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
`nombre = "Nallely"
print(nombre)` &&
        salida.trim() === "Nallely"
      )
    },
  },

  {
    id: 2,
    titulo: "Ejercicio 2",
    descripcion:
      "Crea una variable llamada edad con valor 25 e imprímela.",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      return (
        codigo.includes("edad = 25") &&
        salida.trim() === "25"
      )
    },
  },

  {
    id: 3,
    titulo: "Ejercicio 3",
    descripcion:
      'Crea las variables nombre="Ana", edad=20 y altura=1.65. Imprime únicamente el nombre.',

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      return (
        codigo.includes('nombre = "Ana"') &&
        codigo.includes("edad = 20") &&
        codigo.includes("altura = 1.65") &&
        salida.trim() === "Ana"
      )
    },
  },
]

function EjerciciosTiposDatos({ onFinish }) {
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

export default EjerciciosTiposDatos