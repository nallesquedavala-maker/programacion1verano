import { useState } from "react"

const niveles = [
  {
    titulo: "Nivel 1 — Banco digital",
    escena: "💳",
    historia:
      "El sistema del banco falló y el algoritmo de retiro quedó corrupto.",
    pasos: [
      "Insertar tarjeta",
      "❓ Paso perdido",
      "Ingresar cantidad",
      "Retirar dinero",
      "Imprimir comprobante",
    ],
    opciones: ["Ingresar PIN", "Apagar cajero", "Ver TikTok"],
    correcta: "Ingresar PIN",
  },
  {
    titulo: "Nivel 2 — Hospital",
    escena: "🏥",
    historia:
      "El sistema de registro de pacientes perdió un paso importante.",
    pasos: [
      "Abrir expediente",
      "Registrar nombre",
      "❓ Paso perdido",
      "Guardar registro",
      "Mostrar confirmación",
    ],
    opciones: ["Salir del hospital", "Capturar síntomas", "Comprar medicina"],
    correcta: "Capturar síntomas",
  },
  {
    titulo: "Nivel 3 — Nave espacial",
    escena: "🚀",
    historia:
      "La nave perdió parte de su secuencia de despegue.",
    pasos: [
      "Revisar combustible",
      "Encender motores",
      "❓ Paso perdido",
      "Despegar",
      "Mostrar estado de misión",
    ],
    opciones: [
      "Dormir piloto",
      "Abrir mapa de comida",
      "Verificar sistema de navegación",
    ],
    correcta: "Verificar sistema de navegación",
  },
]

function MinijuegoAlgoritmo() {
  const [nivelActual, setNivelActual] = useState(0)
  const [vidas, setVidas] = useState(3)
  const [xp, setXp] = useState(0)
  const [respuesta, setRespuesta] = useState(null)
  const [resultado, setResultado] = useState(null)

  const nivel = niveles[nivelActual]
  const juegoTerminado = nivelActual >= niveles.length || vidas <= 0

  function elegirRespuesta(opcion) {
    if (respuesta) return

    setRespuesta(opcion)

    if (opcion === nivel.correcta) {
      setResultado("correcto")
      setXp(xp + 100)
    } else {
      setResultado("incorrecto")
      setVidas(vidas - 1)
    }
  }

  function siguienteNivel() {
    setRespuesta(null)
    setResultado(null)
    setNivelActual(nivelActual + 1)
  }

  function reintentarNivel() {
    setRespuesta(null)
    setResultado(null)
  }

  function reiniciarJuego() {
    setNivelActual(0)
    setVidas(3)
    setXp(0)
    setRespuesta(null)
    setResultado(null)
  }

  if (juegoTerminado) {
    const gano = nivelActual >= niveles.length && vidas > 0

    return (
      <section style={contenedor}>
        <div style={pantallaFinal}>
          <h2>{gano ? "🏆 Algoritmos rescatados" : "💀 Juego terminado"}</h2>

          <p>
            {gano
              ? "Completaste todas las misiones y reparaste los algoritmos."
              : "Te quedaste sin vidas. Puedes intentarlo otra vez."}
          </p>

          <h3>XP final: {xp}</h3>
          <h3>Vidas restantes: {"❤️".repeat(Math.max(vidas, 0))}</h3>

          <p>
            {xp >= 300
              ? "⭐⭐⭐ Excelente"
              : xp >= 200
              ? "⭐⭐ Buen trabajo"
              : "⭐ Sigue practicando"}
          </p>

          <button onClick={reiniciarJuego}>Reiniciar minijuego</button>
        </div>
      </section>
    )
  }

  return (
    <section style={contenedor}>
      <div style={hero}>
        <div style={{ fontSize: "70px" }}>{nivel.escena}</div>

        <div>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Misión {nivelActual + 1} de {niveles.length}
          </p>

          <h2 style={{ margin: "6px 0" }}>{nivel.titulo}</h2>

          <p>{nivel.historia}</p>
        </div>
      </div>

      <div style={barraEstado}>
        <span>Vidas: {"❤️".repeat(vidas)}</span>
        <span>XP: {xp}</span>
      </div>

      <div style={panelAlgoritmo}>
        <h3>Algoritmo dañado</h3>

        <ol>
          {nivel.pasos.map((paso, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                fontWeight: paso.includes("❓") ? "700" : "500",
                color: paso.includes("❓") ? "#dc2626" : "#111827",
              }}
            >
              {paso}
            </li>
          ))}
        </ol>
      </div>

      <div style={panelOpciones}>
        <h3>Elige el paso que rescata el algoritmo</h3>

        <div style={gridOpciones}>
          {nivel.opciones.map((opcion) => {
            let background = "#ffffff"

            if (resultado && opcion === nivel.correcta) background = "#d1fae5"
            if (resultado === "incorrecto" && opcion === respuesta)
              background = "#fee2e2"

            return (
              <button
                key={opcion}
                onClick={() => elegirRespuesta(opcion)}
                disabled={!!respuesta}
                style={{
                  ...botonOpcion,
                  background,
                }}
              >
                {opcion}
              </button>
            )
          })}
        </div>
      </div>

      {resultado && (
        <div
          style={{
            ...feedback,
            background: resultado === "correcto" ? "#d1fae5" : "#fee2e2",
          }}
        >
          <h3>
            {resultado === "correcto"
              ? "🎉 ¡Algoritmo rescatado!"
              : "👎 Paso incorrecto"}
          </h3>

          <p>
            {resultado === "correcto"
              ? "Ganaste 100 XP."
              : "Perdiste una vida. Revisa la secuencia lógica."}
          </p>

          {resultado === "correcto" ? (
            <button onClick={siguienteNivel}>
              {nivelActual === niveles.length - 1
                ? "Finalizar minijuego"
                : "Siguiente misión"}
            </button>
          ) : (
            <button onClick={reintentarNivel}>Intentar otra vez</button>
          )}
        </div>
      )}
    </section>
  )
}

const contenedor = {
  border: "1px solid #d1d5db",
  borderRadius: "20px",
  padding: "28px",
  marginTop: "24px",
  background: "#ffffff",
  color: "#111827",
}

const hero = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  padding: "20px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #ecfeff, #eef2ff)",
  marginBottom: "18px",
}

const barraEstado = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "14px",
  borderRadius: "14px",
  background: "#f3f4f6",
  marginBottom: "20px",
  fontWeight: "700",
}

const panelAlgoritmo = {
  padding: "20px",
  borderRadius: "18px",
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  marginBottom: "18px",
}

const panelOpciones = {
  padding: "20px",
  borderRadius: "18px",
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
}

const gridOpciones = {
  display: "grid",
  gap: "12px",
}

const botonOpcion = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #c7d2fe",
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "left",
}

const feedback = {
  padding: "18px",
  borderRadius: "18px",
  marginTop: "20px",
}

const pantallaFinal = {
  textAlign: "center",
  padding: "30px",
  borderRadius: "20px",
  background: "#f9fafb",
}

export default MinijuegoAlgoritmo