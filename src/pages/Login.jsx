import { useState } from "react"
import { Navigate } from "react-router-dom"
import {
  Gamepad2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  AlertCircle,
  MailCheck,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { DOMINIO_INSTITUCIONAL } from "../lib/supabase"

const MENSAJES_ERROR = {
  "Invalid login credentials": "Correo o contraseña incorrectos.",
  "User already registered": "Ese correo ya está registrado. Inicia sesión.",
  "Email not confirmed":
    "Tu correo aún no está confirmado. Revisa tu bandeja de entrada.",
  "Password should be at least 6 characters":
    "La contraseña debe tener al menos 6 caracteres.",
}

function traducirError(error) {
  if (!error) return null
  return MENSAJES_ERROR[error.message] || error.message
}

function Login() {
  const { usuario, cargando, iniciarSesion, registrarse } = useAuth()
  const [modo, setModo] = useState("login")
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [verContrasena, setVerContrasena] = useState(false)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [registroExitoso, setRegistroExitoso] = useState(false)

  if (!cargando && usuario) {
    return <Navigate to="/" replace />
  }

  const esRegistro = modo === "registro"

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError(null)

    const correoLimpio = correo.trim().toLowerCase()

    if (esRegistro) {
      if (nombre.trim().length < 3) {
        setError("Escribe tu nombre completo.")
        return
      }

      if (
        DOMINIO_INSTITUCIONAL &&
        !correoLimpio.endsWith(DOMINIO_INSTITUCIONAL.toLowerCase())
      ) {
        setError(
          `Debes registrarte con tu correo institucional (${DOMINIO_INSTITUCIONAL}).`
        )
        return
      }

      if (contrasena.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.")
        return
      }

      if (contrasena !== confirmar) {
        setError("Las contraseñas no coinciden.")
        return
      }
    }

    setEnviando(true)

    const errorAuth = esRegistro
      ? await registrarse(nombre.trim(), correoLimpio, contrasena)
      : await iniciarSesion(correoLimpio, contrasena)

    setEnviando(false)

    if (errorAuth) {
      setError(traducirError(errorAuth))
      return
    }

    if (esRegistro) {
      setRegistroExitoso(true)
    }
  }

  function cambiarModo(nuevoModo) {
    setModo(nuevoModo)
    setError(null)
    setRegistroExitoso(false)
  }

  if (registroExitoso && !usuario) {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="panel-result">
            <div className="panel-result-icon pass">
              <MailCheck aria-hidden="true" />
            </div>
            <h2>Revisa tu correo</h2>
            <p>
              Te enviamos un enlace de confirmación a <strong>{correo}</strong>.
              Ábrelo para activar tu cuenta y después inicia sesión.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: "18px" }}
              onClick={() => cambiarModo("login")}
            >
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <span className="header-badge">
            <Gamepad2 aria-hidden="true" />
            Programación I Verano 2026
          </span>
          <h1>Programación I Quest</h1>
          <p className="header-subtitle">
            {esRegistro
              ? "Crea tu cuenta para guardar tu progreso"
              : "Inicia sesión para continuar tu aventura"}
          </p>
        </header>

        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={!esRegistro}
            className={`auth-tab${!esRegistro ? " active" : ""}`}
            onClick={() => cambiarModo("login")}
          >
            <LogIn aria-hidden="true" />
            Iniciar sesión
          </button>
          <button
            role="tab"
            aria-selected={esRegistro}
            className={`auth-tab${esRegistro ? " active" : ""}`}
            onClick={() => cambiarModo("registro")}
          >
            <UserPlus aria-hidden="true" />
            Registrarme
          </button>
        </div>

        <form className="auth-form" onSubmit={manejarEnvio}>
          {esRegistro && (
            <label className="field">
              <span className="field-label">Nombre completo</span>
              <div className="field-input">
                <User aria-hidden="true" />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Ana López García"
                  autoComplete="name"
                  required
                />
              </div>
            </label>
          )}

          <label className="field">
            <span className="field-label">
              Correo {DOMINIO_INSTITUCIONAL ? "institucional" : "electrónico"}
            </span>
            <div className="field-input">
              <Mail aria-hidden="true" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder={
                  DOMINIO_INSTITUCIONAL
                    ? `tu.nombre${DOMINIO_INSTITUCIONAL}`
                    : "tu@correo.com"
                }
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <div className="field-input">
              <Lock aria-hidden="true" />
              <input
                type={verContrasena ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                autoComplete={esRegistro ? "new-password" : "current-password"}
                required
              />
              <button
                type="button"
                className="field-toggle"
                onClick={() => setVerContrasena(!verContrasena)}
                aria-label={
                  verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {verContrasena ? (
                  <EyeOff aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </button>
            </div>
          </label>

          {esRegistro && (
            <label className="field">
              <span className="field-label">Confirmar contraseña</span>
              <div className="field-input">
                <Lock aria-hidden="true" />
                <input
                  type={verContrasena ? "text" : "password"}
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  required
                />
              </div>
            </label>
          )}

          {error && (
            <div className="auth-error" role="alert">
              <AlertCircle aria-hidden="true" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={enviando}
          >
            {enviando ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {esRegistro ? "Creando cuenta..." : "Entrando..."}
              </>
            ) : esRegistro ? (
              <>
                <UserPlus aria-hidden="true" />
                Crear cuenta
              </>
            ) : (
              <>
                <LogIn aria-hidden="true" />
                Iniciar sesión
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
