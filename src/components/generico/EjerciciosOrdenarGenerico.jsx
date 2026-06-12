import OrdenarEjercicios from "../OrdenarEjercicios"
import { obtenerIcono } from "../../data/iconos"

const ETIQUETAS_BASE = {
  unidad: "Ejercicio",
  instruccion: "Selecciona las tarjetas en el orden correcto.",
  zonaDisponibles: "Tarjetas disponibles",
  zonaConstruccion: "Tu respuesta",
  botonValidar: "Validar orden",
  exitoTitulo: "¡Orden correcto!",
  falloTitulo: "El orden no es correcto",
  falloMensaje: "Revisa la secuencia lógica e inténtalo otra vez.",
  mensajeFinal: "Terminaste los ejercicios de este tema.",
}

// Ejercicios de ordenamiento definidos por la profesora.
// Cada item: { titulo, escena, descripcion, icono, tarjetas[], ordenCorrecto[] }
function EjerciciosOrdenarGenerico({ items, onFinish }) {
  const ejercicios = items.map((item, indice) => ({
    id: indice + 1,
    titulo: item.titulo || `Ejercicio ${indice + 1}`,
    escena: item.escena || "Ejercicio",
    descripcion: item.descripcion || "",
    Icono: obtenerIcono(item.icono),
    tarjetas: item.tarjetas || [],
    ordenCorrecto: item.ordenCorrecto || [],
  }))

  if (ejercicios.length === 0) {
    return <p>Este tema aún no tiene ejercicios cargados.</p>
  }

  return (
    <OrdenarEjercicios
      ejercicios={ejercicios}
      etiquetas={ETIQUETAS_BASE}
      onFinish={onFinish}
    />
  )
}

export default EjerciciosOrdenarGenerico
