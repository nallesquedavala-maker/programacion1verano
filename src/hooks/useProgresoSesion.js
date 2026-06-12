import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

// Carga y guarda automáticamente el progreso de una sesión en Supabase.
// datos = { temas: { "1": { quiz, ejercicios } }, minijuego: {...} }
export function useProgresoSesion(sesionId) {
  const { usuario } = useAuth()
  const [datos, setDatos] = useState({ temas: {} })
  const [cargando, setCargando] = useState(true)
  const [estadoGuardado, setEstadoGuardado] = useState("guardado")
  const temporizador = useRef(null)
  const datosCargados = useRef(false)

  useEffect(() => {
    if (!usuario) return

    let activo = true

    async function cargar() {
      const { data } = await supabase
        .from("progreso")
        .select("datos")
        .eq("user_id", usuario.id)
        .eq("sesion_id", sesionId)
        .maybeSingle()

      if (!activo) return

      if (data?.datos) {
        setDatos({ temas: {}, ...data.datos })
      }

      datosCargados.current = true
      setCargando(false)
    }

    cargar()

    return () => {
      activo = false
    }
  }, [usuario, sesionId])

  function actualizarDatos(actualizador) {
    setDatos((datosPrevios) => {
      const nuevosDatos =
        typeof actualizador === "function"
          ? actualizador(datosPrevios)
          : actualizador

      if (datosCargados.current) {
        setEstadoGuardado("guardando")

        clearTimeout(temporizador.current)
        temporizador.current = setTimeout(async () => {
          const { error } = await supabase.from("progreso").upsert({
            user_id: usuario.id,
            sesion_id: sesionId,
            datos: nuevosDatos,
            actualizado_en: new Date().toISOString(),
          })

          setEstadoGuardado(error ? "error" : "guardado")
        }, 600)
      }

      return nuevosDatos
    })
  }

  return { datos, actualizarDatos, cargando, estadoGuardado }
}
