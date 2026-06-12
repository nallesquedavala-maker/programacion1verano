import { calificacionSesion, promedioAlumno } from "./calificaciones"

const IDS_SESIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// xlsx pesa mucho: se carga solo cuando se descarga un Excel.
async function cargarXLSX() {
  return await import("xlsx")
}

// Excel general: una fila por alumno con su calificación por sesión y promedio.
export async function exportarExcelGeneral(alumnos, progresoPorAlumno) {
  const XLSX = await cargarXLSX()
  const filas = alumnos.map((alumno) => {
    const progreso = progresoPorAlumno[alumno.id] || {}

    const fila = {
      Nombre: alumno.nombre,
      Correo: alumno.correo,
    }

    IDS_SESIONES.forEach((sesionId) => {
      const calificacion = calificacionSesion(progreso[sesionId])
      fila[`Sesión ${sesionId}`] = calificacion === null ? "—" : calificacion
    })

    const promedio = promedioAlumno(progreso)
    fila["Promedio"] = promedio === null ? "—" : promedio

    return fila
  })

  const hoja = XLSX.utils.json_to_sheet(filas)
  hoja["!cols"] = [
    { wch: 30 },
    { wch: 32 },
    ...IDS_SESIONES.map(() => ({ wch: 10 })),
    { wch: 10 },
  ]

  const libro = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(libro, hoja, "Calificaciones")
  XLSX.writeFile(libro, "calificaciones-grupo.xlsx")
}

// Excel individual: resumen por sesión + detalle por tema.
export async function exportarExcelAlumno(alumno, progreso) {
  const XLSX = await cargarXLSX()
  const libro = XLSX.utils.book_new()

  const resumen = IDS_SESIONES.map((sesionId) => {
    const calificacion = calificacionSesion(progreso[sesionId])
    return {
      Sesión: `Sesión ${sesionId}`,
      Calificación: calificacion === null ? "Sin avance" : calificacion,
    }
  })

  const promedio = promedioAlumno(progreso)
  resumen.push({
    Sesión: "PROMEDIO",
    Calificación: promedio === null ? "—" : promedio,
  })

  const hojaResumen = XLSX.utils.json_to_sheet(resumen)
  hojaResumen["!cols"] = [{ wch: 14 }, { wch: 14 }]
  XLSX.utils.book_append_sheet(libro, hojaResumen, "Resumen")

  const detalle = []

  IDS_SESIONES.forEach((sesionId) => {
    const temas = progreso[sesionId]?.temas || {}

    Object.keys(temas)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((idTema) => {
        const tema = temas[idTema]
        detalle.push({
          Sesión: sesionId,
          Tema: Number(idTema),
          "Quiz (%)": tema.quiz ? tema.quiz.porcentaje : "—",
          "Quiz aciertos": tema.quiz
            ? `${tema.quiz.aciertos} / ${tema.quiz.total}`
            : "—",
          "Ejercicios (pts/60)": tema.ejercicios ? tema.ejercicios.total : "—",
        })
      })

    const minijuego = progreso[sesionId]?.minijuego
    if (minijuego) {
      detalle.push({
        Sesión: sesionId,
        Tema: "Minijuego",
        "Quiz (%)": "—",
        "Quiz aciertos": "—",
        "Ejercicios (pts/60)": `Puntaje: ${minijuego.puntaje ?? "—"}`,
      })
    }
  })

  const hojaDetalle = XLSX.utils.json_to_sheet(
    detalle.length > 0
      ? detalle
      : [{ Sesión: "—", Tema: "Sin avance registrado" }]
  )
  hojaDetalle["!cols"] = [
    { wch: 8 },
    { wch: 12 },
    { wch: 10 },
    { wch: 14 },
    { wch: 20 },
  ]
  XLSX.utils.book_append_sheet(libro, hojaDetalle, "Detalle")

  const nombreArchivo = `calificaciones-${alumno.nombre
    .toLowerCase()
    .replace(/\s+/g, "-")}.xlsx`

  XLSX.writeFile(libro, nombreArchivo)
}
