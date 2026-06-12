import {
  BrainCircuit,
  Workflow,
  FileCode2,
  Code2,
  Printer,
  Keyboard,
  Package,
  Binary,
  Calculator,
  Repeat,
  GitBranch,
  ListOrdered,
  Database,
  FunctionSquare,
  Braces,
  Layers,
  Sigma,
  Hash,
  Type,
  Gamepad2,
} from "lucide-react"

// Catálogo de iconos que la profesora puede elegir en el editor de contenido.
export const ICONOS = {
  BrainCircuit,
  Workflow,
  FileCode2,
  Code2,
  Printer,
  Keyboard,
  Package,
  Binary,
  Calculator,
  Repeat,
  GitBranch,
  ListOrdered,
  Database,
  FunctionSquare,
  Braces,
  Layers,
  Sigma,
  Hash,
  Type,
  Gamepad2,
}

export const NOMBRES_ICONOS = Object.keys(ICONOS)

export function obtenerIcono(nombre) {
  return ICONOS[nombre] || Code2
}
