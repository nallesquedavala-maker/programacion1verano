import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { supabaseConfigurado } from "./lib/supabase"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SesionUno from "./pages/SesionUno"
import SesionGenerica from "./pages/SesionGenerica"
import PanelProfesor from "./pages/PanelProfesor"

function PantallaCarga() {
  return (
    <main className="page">
      <div className="container">
        <div className="loading-block" style={{ marginTop: "120px" }}>
          <span className="spinner spinner-dark" aria-hidden="true" />
          Cargando...
        </div>
      </div>
    </main>
  )
}

function RutaPrivada({ children }) {
  const { usuario, cargando } = useAuth()

  if (cargando) return <PantallaCarga />
  if (!usuario) return <Navigate to="/login" replace />

  return children
}

function RutaProfesor({ children }) {
  const { usuario, esProfesor, cargando } = useAuth()

  if (cargando) return <PantallaCarga />
  if (!usuario) return <Navigate to="/login" replace />
  if (!esProfesor) return <Navigate to="/" replace />

  return children
}

function Sesion() {
  const { id } = useParams()
  const sesionId = Number(id)

  if (!sesionId || sesionId < 1 || sesionId > 10) {
    return <Navigate to="/" replace />
  }

  return sesionId === 1 ? <SesionUno /> : <SesionGenerica />
}

function AvisoConfiguracion() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="panel-result">
          <div className="panel-result-icon fail">
            <AlertCircle aria-hidden="true" />
          </div>
          <h2>Falta configurar Supabase</h2>
          <p>
            Crea un archivo <code>.env</code> en la raíz del proyecto (puedes
            copiar <code>.env.example</code>) con tus claves de Supabase:
          </p>
          <pre className="config-snippet">
            {`VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY`}
          </pre>
          <p>
            Después ejecuta el archivo <code>supabase/schema.sql</code> en el
            SQL Editor de tu proyecto de Supabase y reinicia la app.
          </p>
        </div>
      </div>
    </main>
  )
}

function App() {
  if (!supabaseConfigurado) {
    return <AvisoConfiguracion />
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RutaPrivada>
                <Dashboard />
              </RutaPrivada>
            }
          />
          <Route
            path="/sesion/:id"
            element={
              <RutaPrivada>
                <Sesion />
              </RutaPrivada>
            }
          />
          <Route
            path="/profesor"
            element={
              <RutaProfesor>
                <PanelProfesor />
              </RutaProfesor>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
