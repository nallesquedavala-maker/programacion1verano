import { GraduationCap, Gamepad2, CreditCard } from "lucide-react"
import OrdenarEjercicios from "./OrdenarEjercicios"

const ejercicios = [
  {
    id: 1,
    titulo: "Aprobado o reprobado",
    Icono: GraduationCap,
    escena: "Escuela",
    descripcion:
      "Construye el flujo para decidir si un estudiante aprueba o reprueba.",
    tarjetas: [
      "Mostrar reprobado",
      "Inicio",
      "Pedir calificación",
      "Fin",
      "¿calificación >= 60?",
      "Mostrar aprobado",
    ],
    ordenCorrecto: [
      "Inicio",
      "Pedir calificación",
      "¿calificación >= 60?",
      "Mostrar aprobado",
      "Mostrar reprobado",
      "Fin",
    ],
  },
  {
    id: 2,
    titulo: "Login gamer",
    Icono: Gamepad2,
    escena: "Acceso al juego",
    descripcion:
      "Ordena el flujo para validar si un jugador puede entrar al sistema.",
    tarjetas: [
      "Entrar al juego",
      "Ingresar contraseña",
      "Fin",
      "Inicio",
      "Mostrar error",
      "Ingresar usuario",
      "¿datos correctos?",
    ],
    ordenCorrecto: [
      "Inicio",
      "Ingresar usuario",
      "Ingresar contraseña",
      "¿datos correctos?",
      "Entrar al juego",
      "Mostrar error",
      "Fin",
    ],
  },
  {
    id: 3,
    titulo: "Cajero automático",
    Icono: CreditCard,
    escena: "Banco",
    descripcion:
      "Ordena el flujo para validar el PIN de una tarjeta en un cajero.",
    tarjetas: [
      "Mostrar saldo",
      "Ingresar PIN",
      "Fin",
      "¿PIN correcto?",
      "Inicio",
      "Mostrar error",
      "Insertar tarjeta",
    ],
    ordenCorrecto: [
      "Inicio",
      "Insertar tarjeta",
      "Ingresar PIN",
      "¿PIN correcto?",
      "Mostrar saldo",
      "Mostrar error",
      "Fin",
    ],
  },
]

const etiquetas = {
  unidad: "Diagrama",
  instruccion:
    "Selecciona las tarjetas en el orden correcto del diagrama de flujo.",
  zonaDisponibles: "Elementos disponibles",
  zonaConstruccion: "Tu flujo armado",
  botonValidar: "Validar flujo",
  exitoTitulo: "¡Flujo correcto!",
  falloTitulo: "El flujo no es correcto",
  falloMensaje: "Revisa el orden lógico del diagrama e inténtalo otra vez.",
  mensajeFinal: "Terminaste los ejercicios de diagramas de flujo.",
}

function EjerciciosDiagramas({ onFinish }) {
  return (
    <OrdenarEjercicios
      ejercicios={ejercicios}
      etiquetas={etiquetas}
      onFinish={onFinish}
    />
  )
}

export default EjerciciosDiagramas
