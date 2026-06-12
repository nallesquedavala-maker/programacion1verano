import { useState } from "react"

function MinijuegoAdivinaNumero({ onFinish }) {
  const [numeroSecreto] = useState(() => Math.floor(Math.random() * 10) + 1)
  const [intento, setIntento] = useState("")
  const [mensaje, setMensaje] = useState("Adivina un número del 1 al 10.")
  const [intentos, setIntentos] = useState(0)
  const [completado, setCompletado] = useState(false)

  function validarIntento() {
    const numero = Number(intento)

    if (!numero || numero < 1 || numero > 10) {
      setMensaje("Escribe un número válido entre 1 y 10.")
      return
    }

    const nuevosIntentos = intentos + 1
    setIntentos(nuevosIntentos)

    if (numero === numeroSecreto) {
      setCompletado(true)
      setMensaje(`🎉 Correcto. El número era ${numeroSecreto}.`)
      return
    }

    if (numero < numeroSecreto) {
      setMensaje("📉 Muy bajo. Intenta con un número más grande.")
    } else {
      setMensaje("📈 Muy alto. Intenta con un número más pequeño.")
    }

    setIntento("")
  }

  function calcularPuntaje() {
    if (intentos <= 2) return 100
    if (intentos <= 4) return 80
    if (intentos <= 6) return 60
    return 40
  }

  return (
    <section className="boss-game">
      <h2>🎮 Boss Level: Adivina el número</h2>

      <p>
        La computadora eligió un número secreto entre <strong>1</strong> y{" "}
        <strong>10</strong>.
      </p>

      <p>{mensaje}</p>

      <input
        type="number"
        min="1"
        max="10"
        value={intento}
        disabled={completado}
        onChange={(e) => setIntento(e.target.value)}
        placeholder="Escribe tu número"
      />

      <div style={{ marginTop: "12px" }}>
        {!completado ? (
          <button onClick={validarIntento}>Probar intento</button>
        ) : (
          <button
            onClick={() =>
              onFinish?.({
                completado: true,
                intentos,
                puntaje: calcularPuntaje(),
              })
            }
          >
            Guardar minijuego
          </button>
        )}
      </div>

      <p>Intentos: {intentos}</p>

      {completado && (
        <h3>🏆 Puntaje: {calcularPuntaje()} pts</h3>
      )}
    </section>
  )
}

export default MinijuegoAdivinaNumero