// Lógica de calificaciones compartida entre alumno y panel de profesor.
// El progreso de una sesión se guarda como:
// { temas: { "1": { quiz: {porcentaje,...}, ejercicios: {total,...} } }, minijuego: {...} }

export function calificacionDeTemas(temas) {
  const calificaciones = Object.values(temas || {}).flatMap((tema) => {
    const valores = []

    if (tema.quiz) valores.push(tema.quiz.porcentaje)

    if (tema.ejercicios) {
      valores.push(Math.round((tema.ejercicios.total / 60) * 100))
    }

    return valores
  })

  if (calificaciones.length === 0) return null

  const suma = calificaciones.reduce((total, valor) => total + valor, 0)
  return Math.round(suma / calificaciones.length)
}

export function calificacionSesion(datos) {
  return calificacionDeTemas(datos?.temas)
}

// Un tema está completo si tiene quiz y, cuando aplica, ejercicios.
// "temasSoloQuiz" son los ids de temas que no tienen ejercicios.
export function temaCompletado(temas, idTema, temasSoloQuiz = []) {
  const tema = temas?.[idTema]
  if (!tema?.quiz) return false
  if (temasSoloQuiz.includes(Number(idTema))) return true
  return Boolean(tema.ejercicios)
}

export function contarTemasCompletados(temas, idsTemas, temasSoloQuiz = []) {
  return idsTemas.filter((id) => temaCompletado(temas, id, temasSoloQuiz))
    .length
}

// Promedio general de un alumno considerando solo sesiones con avance.
export function promedioAlumno(progresoPorSesion) {
  const calificaciones = Object.values(progresoPorSesion)
    .map((datos) => calificacionSesion(datos))
    .filter((valor) => valor !== null)

  if (calificaciones.length === 0) return null

  const suma = calificaciones.reduce((total, valor) => total + valor, 0)
  return Math.round(suma / calificaciones.length)
}
