import { Hand, Cake, BookOpen } from "lucide-react"
import OrdenarEjercicios from "./OrdenarEjercicios"

const ejercicios = [
  {
    id: 1,
    titulo: "Saludar usuario",
    Icono: Hand,
    escena: "NPC de bienvenida",
    descripcion:
      "Un NPC necesita preguntar el nombre del jugador y saludarlo.",
    tarjetas: ["FIN", "Mostrar nombre", "Leer nombre", "INICIO"],
    ordenCorrecto: ["INICIO", "Leer nombre", "Mostrar nombre", "FIN"],
  },
  {
    id: 2,
    titulo: "Mayor de edad",
    Icono: Cake,
    escena: "Guardia de la ciudad",
    descripcion:
      "El guardia necesita verificar si el jugador puede entrar.",
    tarjetas: [
      'Mostrar "Mayor de edad"',
      "Leer edad",
      "FIN",
      "INICIO",
      "Si edad >= 18",
    ],
    ordenCorrecto: [
      "INICIO",
      "Leer edad",
      "Si edad >= 18",
      'Mostrar "Mayor de edad"',
      "FIN",
    ],
  },
  {
    id: 3,
    titulo: "Promedio escolar",
    Icono: BookOpen,
    escena: "Academia",
    descripcion:
      "La academia necesita calcular el promedio de un estudiante.",
    tarjetas: [
      "Mostrar promedio",
      "Leer cal1",
      "FIN",
      "Calcular promedio",
      "INICIO",
      "Leer cal2",
    ],
    ordenCorrecto: [
      "INICIO",
      "Leer cal1",
      "Leer cal2",
      "Calcular promedio",
      "Mostrar promedio",
      "FIN",
    ],
  },
]

const etiquetas = {
  unidad: "Pseudocódigo",
  instruccion: "Selecciona las instrucciones en el orden correcto.",
  zonaDisponibles: "Instrucciones disponibles",
  zonaConstruccion: "Tu pseudocódigo",
  botonValidar: "Validar pseudocódigo",
  exitoTitulo: "¡Pseudocódigo correcto!",
  falloTitulo: "El pseudocódigo no es correcto",
  falloMensaje: "Revisa el orden lógico e inténtalo otra vez.",
  mensajeFinal: "Terminaste los ejercicios de pseudocódigo.",
}

function EjerciciosPseudocodigo({ onFinish }) {
  return (
    <OrdenarEjercicios
      ejercicios={ejercicios}
      etiquetas={etiquetas}
      onFinish={onFinish}
    />
  )
}

export default EjerciciosPseudocodigo
