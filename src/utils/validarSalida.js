// Normaliza la salida de consola para comparar de forma tolerante:
// - unifica saltos de línea Windows/Unix
// - quita espacios al final de CADA línea (la causa más común de falsos errores)
// - colapsa líneas en blanco repetidas
// - recorta espacios y saltos al inicio y final del bloque
export function normalizarSalida(texto) {
  return (texto || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((linea) => linea.replace(/[ \t]+$/u, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

// Compara la salida obtenida contra la esperada usando la normalización anterior.
export function salidaCoincide(salida, salidaEsperada) {
  return normalizarSalida(salida) === normalizarSalida(salidaEsperada)
}
