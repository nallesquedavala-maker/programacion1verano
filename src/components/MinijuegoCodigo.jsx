import PythonConsole from "./PythonConsole"
import { salidaCoincide } from "../utils/validarSalida"

// Boss Level basado en código: el alumno escribe Python, lo ejecuta en la
// plataforma y se califica comparando su salida con la salida esperada que
// definió la profesora en el editor. Menos intentos = mayor puntaje.
function puntajePorIntentos(intentos) {
  if (intentos <= 1) return 100
  if (intentos <= 3) return 90
  if (intentos <= 5) return 80
  return 70
}

function MinijuegoCodigo({ config, onFinish }) {
  const ejercicio = {
    id: "minijuego",
    titulo: config.titulo || "Boss Level",
    descripcion: config.descripcion || "",
    codigoInicial: config.codigoInicial || "",
    entrada: config.entrada || "",
    salidaEsperada: config.salidaEsperada || "",
    validar: ({ salida }) => salidaCoincide(salida, config.salidaEsperada),
  }

  return (
    <PythonConsole
      ejercicio={ejercicio}
      onFinish={({ intentos } = {}) => {
        const totalIntentos = intentos || 1
        onFinish?.({
          completado: true,
          intentos: totalIntentos,
          puntaje: puntajePorIntentos(totalIntentos),
        })
      }}
    />
  )
}

export default MinijuegoCodigo
