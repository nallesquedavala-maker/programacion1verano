import { useEffect, useState } from "react"
import { loadPyodide } from "pyodide"
import {
  Play,
  Save,
  Target,
  Terminal,
  FileCode2,
  CheckCircle2,
  XCircle,
} from "lucide-react"

function PythonConsole({ ejercicio, onFinish, modoPrueba = false }) {
  const [pyodide, setPyodide] = useState(null)
  const [codigo, setCodigo] = useState(ejercicio.codigoInicial || "")
  const [salida, setSalida] = useState("")
  const [cargando, setCargando] = useState(true)
  const [ejecutando, setEjecutando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [intentos, setIntentos] = useState(0)

  useEffect(() => {
    setCodigo(ejercicio.codigoInicial || "")
    setSalida("")
    setResultado(null)
    setIntentos(0)
  }, [ejercicio.id])

  useEffect(() => {
    async function iniciarPyodide() {
      try {
        const py = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/",
        })

        setPyodide(py)
      } catch (error) {
        setSalida("Error al cargar Pyodide: " + error.message)
      } finally {
        setCargando(false)
      }
    }

    iniciarPyodide()
  }, [])

  async function ejecutarCodigo() {
    if (!pyodide || ejecutando) return

    setEjecutando(true)
    setResultado(null)
    setSalida("")
    setIntentos((n) => n + 1)

    let salidaCapturada = ""

    pyodide.setStdout({
      batched: (texto) => {
        salidaCapturada += texto + "\n"
      },
    })

    pyodide.setStderr({
      batched: (texto) => {
        salidaCapturada += texto + "\n"
      },
    })

    const entradas = (ejercicio.entrada || "")
  .split("\n")

let indiceEntrada = 0

pyodide.setStdin({
  stdin: () => {
    const valor = entradas[indiceEntrada] || ""
    indiceEntrada += 1
    return valor
      },
    })

    try {
      await pyodide.runPythonAsync(codigo)

      const salidaLimpia = salidaCapturada
        .replace(/\r\n/g, "\n")
        .trim()

      setSalida(salidaLimpia)

      const correcto = ejercicio.validar({
        codigo,
        salida: salidaLimpia,
      })

      setResultado(correcto ? "correcto" : "incorrecto")
    } catch (error) {
      setSalida(error.message)
      setResultado("incorrecto")
    } finally {
      setEjecutando(false)
    }
  }

  return (
    <section className="console-exercise">
      <h2>{ejercicio.titulo}</h2>

      <div className="console-goal">
        <Target aria-hidden="true" />
        <span>{ejercicio.descripcion}</span>
      </div>

      <div className="code-window">
        <div className="code-window-bar">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
          <span className="code-window-title">
            <FileCode2 aria-hidden="true" />
            main.py
          </span>
        </div>

        <textarea
          className="code-editor"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          spellCheck="false"
          placeholder="# Escribe tu código Python aquí..."
          aria-label="Editor de código Python"
        />
      </div>

      <div className="console-actions">
        <button
          className="btn btn-run"
          onClick={ejecutarCodigo}
          disabled={cargando || ejecutando}
        >
          {cargando ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Cargando Python...
            </>
          ) : ejecutando ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Ejecutando...
            </>
          ) : (
            <>
              <Play aria-hidden="true" />
              Ejecutar código
            </>
          )}
        </button>

        {resultado === "correcto" && (
          <button className="btn btn-save-exercise" onClick={() => onFinish?.({ intentos })}>
            <Save aria-hidden="true" />
            Guardar ejercicio
          </button>
        )}
      </div>

      <div className="terminal-window">
        <div className="terminal-bar">
          <Terminal aria-hidden="true" />
          Salida
        </div>

        <pre
          className={`terminal-output${!salida ? " empty" : ""}${
            resultado === "incorrecto" && salida ? " error" : ""
          }`}
        >
          {salida || "Aquí aparecerá el resultado..."}
        </pre>
      </div>

      {resultado === "correcto" && (
        <div className="console-feedback success" role="status">
          <CheckCircle2 aria-hidden="true" />
          ¡Correcto! Tu código generó la salida esperada.
        </div>
      )}

      {resultado === "incorrecto" && (
        <div className="console-feedback error" role="status">
          <XCircle aria-hidden="true" />
          Revisa tu código y vuelve a intentarlo.
        </div>
      )}

      {modoPrueba && resultado === "incorrecto" && (
        <div className="console-diff">
          <div className="console-diff-col">
            <span className="console-diff-label">Salida esperada</span>
            <pre>{mostrarTexto(ejercicio.salidaEsperada)}</pre>
          </div>
          <div className="console-diff-col">
            <span className="console-diff-label">Lo que obtuviste</span>
            <pre>{mostrarTexto(salida)}</pre>
          </div>
        </div>
      )}
    </section>
  )
}

// Hace visibles los espacios al final de línea (·) y las líneas en blanco,
// para que el profesor vea exactamente qué diferencia hizo fallar la comparación.
function mostrarTexto(texto) {
  if (!texto) return "(vacío)"
  return texto
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((linea) => linea.replace(/[ \t]+$/u, (espacios) => "·".repeat(espacios.length)))
    .join("\n")
}

export default PythonConsole