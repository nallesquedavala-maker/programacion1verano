import { useState } from "react"
import PythonConsole from "./PythonConsole"

const ejercicios = [
  {
    id: 1,
    titulo: "Ejercicio 1",
    descripcion:
      'Crea una variable llamada nombre con el valor "Ana" e imprime su contenido.',

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `nombre = "Ana"
print(nombre)` &&
        salida.trim() === "Ana"
      )
    },
  },
  {
    id: 2,
    titulo: "Ejercicio 2",
    descripcion:
      'Crea una variable llamada ciudad con el valor "Zapopan" e imprime: Vivo en Zapopan',

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `ciudad = "Zapopan"
print("Vivo en", ciudad)` &&
        salida.trim() === "Vivo en Zapopan"
      )
    },
  },
  {
    id: 3,
    titulo: "Ejercicio 3",
    descripcion:
      "Pide el nombre del usuario (Escribe tu nombre:), guárdalo en una variable llamada nombre e imprime: Hola Nallely",

    entrada: "Nallely",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `nombre = input("Escribe tu nombre:")
print("Hola", nombre)` &&
        salida.includes("Hola Nallely")
      )
    },
  },
]

function EjerciciosVariables({ onFinish }) {
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

export default EjerciciosVariables