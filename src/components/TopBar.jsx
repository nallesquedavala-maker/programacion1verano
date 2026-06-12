import { Link } from "react-router-dom"
import { Gamepad2, LogOut, ShieldCheck, Cloud, CloudOff } from "lucide-react"
import { useAuth } from "../context/AuthContext"

function TopBar({ estadoGuardado }) {
  const { perfil, esProfesor, cerrarSesion } = useAuth()

  return (
    <nav className="topbar">
      <Link to="/" className="topbar-brand">
        <Gamepad2 aria-hidden="true" />
        <span>Programación I Quest</span>
      </Link>

      <div className="topbar-right">
        {estadoGuardado && (
          <span
            className={`save-indicator ${estadoGuardado}`}
            role="status"
            aria-live="polite"
          >
            {estadoGuardado === "guardando" ? (
              <>
                <span className="spinner spinner-dark" aria-hidden="true" />
                Guardando...
              </>
            ) : estadoGuardado === "error" ? (
              <>
                <CloudOff aria-hidden="true" />
                Sin conexión
              </>
            ) : (
              <>
                <Cloud aria-hidden="true" />
                Progreso guardado
              </>
            )}
          </span>
        )}

        {esProfesor && (
          <Link to="/profesor" className="btn btn-outline btn-sm">
            <ShieldCheck aria-hidden="true" />
            Panel de profesor
          </Link>
        )}

        <span className="topbar-user" title={perfil?.correo}>
          {perfil?.nombre}
        </span>

        <button
          className="btn btn-outline btn-sm"
          onClick={cerrarSesion}
          aria-label="Cerrar sesión"
        >
          <LogOut aria-hidden="true" />
          Salir
        </button>
      </div>
    </nav>
  )
}

export default TopBar
