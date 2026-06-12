import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setCargando(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user || null)
      if (!data.session) setCargando(false)
    })

    const { data: suscripcion } = supabase.auth.onAuthStateChange(
      (_evento, sesion) => {
        setUsuario(sesion?.user || null)
        if (!sesion) {
          setPerfil(null)
          setCargando(false)
        }
      }
    )

    return () => suscripcion.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!usuario) return

    let activo = true

    async function cargarPerfil() {
      const { data } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", usuario.id)
        .single()

      if (activo) {
        setPerfil(data || null)
        setCargando(false)
      }
    }

    cargarPerfil()

    return () => {
      activo = false
    }
  }, [usuario])

  async function iniciarSesion(correo, contrasena) {
    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    })
    return error
  }

  async function registrarse(nombre, correo, contrasena) {
    const { error } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
      options: { data: { nombre } },
    })
    return error
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
  }

  const esProfesor = perfil?.rol === "profesor"

  return (
    <AuthContext.Provider
      value={{
        usuario,
        perfil,
        cargando,
        esProfesor,
        iniciarSesion,
        registrarse,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
