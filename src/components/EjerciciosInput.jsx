import { useState } from "react"
import PythonConsole from "./PythonConsole"

const ejercicios = [
  {
    id: 1,
    titulo: "Ejercicio 1",
    descripcion:
      'Pregunta al usuario: ¿Qué estás estudiando? e imprime la respuesta.',

    entrada: "Programación I",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `print(input("¿Qué estás estudiando?"))` &&
        salida.includes("Programación I")
      )
    },
  },
  {
    id: 2,
    titulo: "Ejercicio 2",
    descripcion:
      'Pregunta al usuario: ¿En qué país vives? e imprime la respuesta.',

    entrada: "México",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `print(input("¿En qué país vives?"))` &&
        salida.includes("México")
      )
    },
  },
  {
    id: 3,
    titulo: "Ejercicio 3",
    descripcion:
      "Pregunta al usuario cuantos años tiene e imprime la respuesta.",

    entrada: "20",

    codigoInicial: "",

    validar: ({ codigo, salida }) => {
      const codigoNormalizado = codigo.trim().replaceAll("'", '"')

      return (
        codigoNormalizado ===
          `print(input("¿Cuántos años tienes?"))` &&
        salida.includes("20")
      )
    },
  },
]

function EjerciciosInput({ onFinish }) {
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

export default EjerciciosInput