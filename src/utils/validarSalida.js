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

// Una "salida esperada" puede contener VARIAS salidas válidas separadas por una
// línea de guiones (--- o más). Útil para ejercicios con azar (random), donde el
// programa correcto puede producir distintos resultados.
export function dividirVariantes(salidaEsperada) {
  const lineas = (salidaEsperada || "").replace(/\r\n/g, "\n").split("\n")
  const bloques = []
  let actual = []

  for (const linea of lineas) {
    if (/^[ \t]*-{3,}[ \t]*$/.test(linea)) {
      bloques.push(actual.join("\n"))
      actual = []
    } else {
      actual.push(linea)
    }
  }
  bloques.push(actual.join("\n"))

  const limpios = bloques.filter((bloque) => normalizarSalida(bloque) !== "")
  return limpios.length > 0 ? limpios : [""]
}

function quitarAcentos(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "")
}

// Normalización TOLERANTE para calificar: además de lo anterior, ignora
// diferencias cosméticas que no cambian el sentido de la salida, para no
// reprobar a un alumno cuyo resultado es correcto. Ignora:
// - mayúsculas/minúsculas        (Hola = hola)
// - tildes/acentos               (eligio = eligió)
// - espacios de más entre palabras y al inicio/fin de cada línea
// - puntuación al final de la línea (punto, coma, signos, etc.)
// - líneas en blanco de sobra
export function normalizarParaComparar(texto) {
  return (texto || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((linea) =>
      quitarAcentos(linea)
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .replace(/[.,;:!¡¿?]+$/u, "")
        .trim()
    )
    .filter((linea) => linea !== "")
    .join("\n")
}

// Aprueba si la salida obtenida coincide con CUALQUIERA de las salidas válidas,
// usando la comparación tolerante.
export function salidaCoincide(salida, salidaEsperada) {
  const obtenida = normalizarParaComparar(salida)
  return dividirVariantes(salidaEsperada).some(
    (variante) => normalizarParaComparar(variante) === obtenida
  )
}
