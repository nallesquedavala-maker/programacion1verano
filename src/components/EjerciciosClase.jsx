import { Coins, Thermometer, Gamepad2 } from "lucide-react"
import OrdenarEjercicios from "./OrdenarEjercicios"

const ejercicios = [
  {
    id: 1,
    titulo: "Calculadora de descuento",
    Icono: Coins,
    escena: "Tienda",
    descripcion:
      "Una tienda necesita calcular cuánto pagará un cliente después de aplicar un descuento.",
    tarjetas: [
      "Mostrar precio final",
      "Solicitar precio original del producto",
      "Calcular el monto del descuento",
      "Solicitar porcentaje de descuento",
      "Restar descuento al precio original",
    ],
    ordenCorrecto: [
      "Solicitar precio original del producto",
      "Solicitar porcentaje de descuento",
      "Calcular el monto del descuento",
      "Restar descuento al precio original",
      "Mostrar precio final",
    ],
  },
  {
    id: 2,
    titulo: "Monitoreo de temperatura",
    Icono: Thermometer,
    escena: "Laboratorio",
    descripcion:
      "Un laboratorio necesita registrar la temperatura de una muestra y confirmar el registro.",
    tarjetas: [
      "Registrar la temperatura en el sistema",
      "Solicitar temperatura medida",
      "Mostrar confirmación del registro",
      "Verificar el número de muestra",
      "Abrir pantalla de captura",
    ],
    ordenCorrecto: [
      "Abrir pantalla de captura",
      "Verificar el número de muestra",
      "Solicitar temperatura medida",
      "Registrar la temperatura en el sistema",
      "Mostrar confirmación del registro",
    ],
  },
  {
    id: 3,
    titulo: "Recuperación de energía",
    Icono: Gamepad2,
    escena: "Zona de batalla",
    descripcion:
      "El personaje perdió energía después de una batalla y necesita recuperarse para continuar.",
    tarjetas: [
      "Volver al mapa",
      "Revisar nivel de energía",
      "Abrir inventario",
      "Recuperar energía",
      "Mostrar energía actual",
    ],
    ordenCorrecto: [
      "Revisar nivel de energía",
      "Abrir inventario",
      "Recuperar energía",
      "Mostrar energía actual",
      "Volver al mapa",
    ],
  },
]

const etiquetas = {
  unidad: "Escena",
  instruccion:
    "Selecciona las tarjetas en el orden correcto para armar el algoritmo.",
  zonaDisponibles: "Tarjetas disponibles",
  zonaConstruccion: "Tu algoritmo",
  botonValidar: "Validar algoritmo",
  exitoTitulo: "¡Algoritmo correcto!",
  falloTitulo: "El orden no es correcto",
  falloMensaje: "Revisa la secuencia lógica e inténtalo otra vez.",
  mensajeFinal: "Terminaste los ejercicios de clase del Bloque 1.",
}

function EjerciciosClase({ onFinish }) {
  return (
    <OrdenarEjercicios
      ejercicios={ejercicios}
      etiquetas={etiquetas}
      onFinish={onFinish}
    />
  )
}

export default EjerciciosClase
