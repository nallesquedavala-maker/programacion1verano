import { useEffect, useState } from "react"
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Info,
  Play,
  X,
} from "lucide-react"
import { supabase } from "../../lib/supabase"
import { NOMBRES_ICONOS, obtenerIcono } from "../../data/iconos"
import PythonConsole from "../PythonConsole"
import { salidaCoincide } from "../../utils/validarSalida"

const IDS_SESIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function mezclar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

function nuevoTema(id) {
  return {
    id,
    titulo: "",
    icono: "Code2",
    gamma: "",
    quiz: [],
    ejercicios: { tipo: "ninguno", items: [] },
  }
}

function nuevaPregunta() {
  return {
    pregunta: "",
    opciones: ["", ""],
    correcta: 0,
    explicacion: "",
  }
}

function nuevoItemOrdenar() {
  return {
    titulo: "",
    escena: "",
    descripcion: "",
    icono: "ListOrdered",
    pasos: "",
  }
}

function nuevoItemPython() {
  return {
    titulo: "",
    descripcion: "",
    codigoInicial: "",
    entrada: "",
    salidaEsperada: "",
  }
}

function minijuegoVacio() {
  return {
    titulo: "",
    descripcion: "",
    codigoInicial: "",
    entrada: "",
    salidaEsperada: "",
  }
}

function minijuegoTieneContenido(minijuego) {
  return Boolean(
    minijuego &&
      (minijuego.titulo?.trim() ||
        minijuego.descripcion?.trim() ||
        minijuego.codigoInicial?.trim() ||
        minijuego.entrada?.trim() ||
        minijuego.salidaEsperada?.trim())
  )
}

// Convierte el contenido guardado (con tarjetas/ordenCorrecto) al formato
// editable (pasos como texto) y viceversa.
function contenidoAFormulario(contenido) {
  const temas = (contenido?.temas || []).map((tema) => ({
    ...tema,
    ejercicios: {
      tipo: tema.ejercicios?.tipo || "ninguno",
      items: (tema.ejercicios?.items || []).map((item) =>
        tema.ejercicios?.tipo === "ordenar"
          ? {
              titulo: item.titulo || "",
              escena: item.escena || "",
              descripcion: item.descripcion || "",
              icono: item.icono || "ListOrdered",
              pasos: (item.ordenCorrecto || []).join("\n"),
            }
          : { ...item }
      ),
    },
  }))

  const proyecto = contenido?.proyecto
    ? {
        titulo: contenido.proyecto.titulo || "",
        descripcion: contenido.proyecto.descripcion || "",
        requisitos: (contenido.proyecto.requisitos || []).join("\n"),
      }
    : { titulo: "", descripcion: "", requisitos: "" }

  const minijuego = contenido?.minijuego
    ? {
        titulo: contenido.minijuego.titulo || "",
        descripcion: contenido.minijuego.descripcion || "",
        codigoInicial: contenido.minijuego.codigoInicial || "",
        entrada: contenido.minijuego.entrada || "",
        salidaEsperada: contenido.minijuego.salidaEsperada || "",
      }
    : minijuegoVacio()

  return { temas, proyecto, minijuego }
}

function formularioAContenido(formulario) {
  const temas = formulario.temas.map((tema) => ({
    ...tema,
    ejercicios: {
      tipo: tema.ejercicios.tipo,
      items:
        tema.ejercicios.tipo === "ordenar"
          ? tema.ejercicios.items.map((item) => {
              const pasos = item.pasos
                .split("\n")
                .map((linea) => linea.trim())
                .filter(Boolean)

              return {
                titulo: item.titulo,
                escena: item.escena,
                descripcion: item.descripcion,
                icono: item.icono,
                ordenCorrecto: pasos,
                tarjetas: mezclar(pasos),
              }
            })
          : tema.ejercicios.items,
    },
  }))

  const tieneProyecto =
    formulario.proyecto.titulo.trim() ||
    formulario.proyecto.descripcion.trim() ||
    formulario.proyecto.requisitos.trim()

  const proyecto = tieneProyecto
    ? {
        titulo: formulario.proyecto.titulo.trim(),
        descripcion: formulario.proyecto.descripcion,
        requisitos: formulario.proyecto.requisitos
          .split("\n")
          .map((linea) => linea.trim())
          .filter(Boolean),
      }
    : null

  const minijuego = minijuegoTieneContenido(formulario.minijuego)
    ? {
        titulo: formulario.minijuego.titulo.trim(),
        descripcion: formulario.minijuego.descripcion,
        codigoInicial: formulario.minijuego.codigoInicial,
        entrada: formulario.minijuego.entrada,
        salidaEsperada: formulario.minijuego.salidaEsperada,
      }
    : null

  return {
    temas,
    ...(proyecto ? { proyecto } : {}),
    ...(minijuego ? { minijuego } : {}),
  }
}

function EditorSesion() {
  const [sesionId, setSesionId] = useState(2)
  const [titulo, setTitulo] = useState("")
  const [subtitulo, setSubtitulo] = useState("")
  const [publicada, setPublicada] = useState(false)
  const [formulario, setFormulario] = useState({
    temas: [],
    proyecto: { titulo: "", descripcion: "", requisitos: "" },
    minijuego: minijuegoVacio(),
  })
  const [temaAbierto, setTemaAbierto] = useState(null)
  const [probandoMinijuego, setProbandoMinijuego] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    let activo = true
    setCargando(true)
    setMensaje(null)

    async function cargar() {
      const { data } = await supabase
        .from("sesiones")
        .select("*")
        .eq("id", sesionId)
        .single()

      if (!activo) return

      setTitulo(data?.titulo || `Sesión ${sesionId}`)
      setSubtitulo(data?.subtitulo || "")
      setPublicada(Boolean(data?.publicada))
      setFormulario(contenidoAFormulario(data?.contenido))
      setTemaAbierto(null)
      setCargando(false)
    }

    cargar()

    return () => {
      activo = false
    }
  }, [sesionId])

  function actualizarTema(indice, cambios) {
    setFormulario((previo) => ({
      ...previo,
      temas: previo.temas.map((tema, i) =>
        i === indice ? { ...tema, ...cambios } : tema
      ),
    }))
  }

  function agregarTema() {
    setFormulario((previo) => {
      const siguienteId =
        previo.temas.length > 0
          ? Math.max(...previo.temas.map((t) => t.id)) + 1
          : 1
      return { ...previo, temas: [...previo.temas, nuevoTema(siguienteId)] }
    })
    setTemaAbierto(formulario.temas.length)
  }

  function eliminarTema(indice) {
    setFormulario((previo) => ({
      ...previo,
      temas: previo.temas.filter((_, i) => i !== indice),
    }))
    setTemaAbierto(null)
  }

  async function guardar() {
    setGuardando(true)
    setMensaje(null)

    const { error } = await supabase.from("sesiones").upsert({
      id: sesionId,
      titulo: titulo.trim() || `Sesión ${sesionId}`,
      subtitulo: subtitulo.trim(),
      publicada,
      contenido: formularioAContenido(formulario),
      actualizada_en: new Date().toISOString(),
    })

    setGuardando(false)
    setMensaje(
      error
        ? { tipo: "error", texto: `No se pudo guardar: ${error.message}` }
        : { tipo: "exito", texto: "Sesión guardada correctamente." }
    )
  }

  const esSesionUno = sesionId === 1

  return (
    <section className="panel-section">
      <div className="editor-toolbar">
        <label className="field" style={{ maxWidth: "220px" }}>
          <span className="field-label">Sesión a editar</span>
          <select
            className="select-input"
            value={sesionId}
            onChange={(e) => setSesionId(Number(e.target.value))}
          >
            {IDS_SESIONES.map((id) => (
              <option key={id} value={id}>
                Sesión {id}
              </option>
            ))}
          </select>
        </label>

        <div className="editor-toolbar-actions">
          <button
            className={`btn ${publicada ? "btn-success" : "btn-outline"}`}
            onClick={() => setPublicada(!publicada)}
            disabled={cargando}
          >
            {publicada ? (
              <>
                <Eye aria-hidden="true" /> Publicada
              </>
            ) : (
              <>
                <EyeOff aria-hidden="true" /> Oculta para alumnos
              </>
            )}
          </button>

          <button
            className="btn btn-primary"
            onClick={guardar}
            disabled={cargando || guardando}
          >
            {guardando ? (
              <>
                <span className="spinner" aria-hidden="true" /> Guardando...
              </>
            ) : (
              <>
                <Save aria-hidden="true" /> Guardar sesión
              </>
            )}
          </button>
        </div>
      </div>

      {mensaje && (
        <div
          className={`console-feedback ${
            mensaje.tipo === "exito" ? "success" : "error"
          }`}
          role="status"
        >
          {mensaje.tipo === "exito" ? (
            <CheckCircle2 aria-hidden="true" />
          ) : (
            <AlertCircle aria-hidden="true" />
          )}
          {mensaje.texto}
        </div>
      )}

      {cargando ? (
        <div className="loading-block">
          <span className="spinner spinner-dark" aria-hidden="true" />
          Cargando sesión...
        </div>
      ) : (
        <>
          <div className="editor-grid-2">
            <label className="field">
              <span className="field-label">Título</span>
              <input
                className="text-input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder={`Sesión ${sesionId}`}
              />
            </label>

            <label className="field">
              <span className="field-label">Subtítulo</span>
              <input
                className="text-input"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                placeholder="Ej. Estructuras de control + ciclos"
              />
            </label>
          </div>

          {esSesionUno ? (
            <div className="editor-note">
              <Info aria-hidden="true" />
              El contenido de la Sesión 1 (quizzes, ejercicios y minijuego)
              está construido directamente en el código de la app. Aquí solo
              puedes cambiar su título, subtítulo y visibilidad.
            </div>
          ) : (
            <>
              <h3 className="editor-section-title">
                Temas de la sesión ({formulario.temas.length})
              </h3>

              {formulario.temas.map((tema, indice) => (
                <TemaEditor
                  key={indice}
                  tema={tema}
                  indice={indice}
                  abierto={temaAbierto === indice}
                  onToggle={() =>
                    setTemaAbierto(temaAbierto === indice ? null : indice)
                  }
                  onChange={(cambios) => actualizarTema(indice, cambios)}
                  onEliminar={() => eliminarTema(indice)}
                />
              ))}

              <button className="btn btn-outline" onClick={agregarTema}>
                <Plus aria-hidden="true" />
                Agregar tema
              </button>

              <h3 className="editor-section-title">
                Proyecto de la sesión (opcional)
              </h3>

              <div className="editor-card">
                <label className="field">
                  <span className="field-label">Título del proyecto</span>
                  <input
                    className="text-input"
                    value={formulario.proyecto.titulo}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        proyecto: { ...previo.proyecto, titulo: e.target.value },
                      }))
                    }
                    placeholder="Ej. Proyecto Final · Entregable 2"
                  />
                </label>

                <label className="field">
                  <span className="field-label">Descripción</span>
                  <textarea
                    className="text-area"
                    rows={4}
                    value={formulario.proyecto.descripcion}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        proyecto: {
                          ...previo.proyecto,
                          descripcion: e.target.value,
                        },
                      }))
                    }
                    placeholder="Explica qué deben construir los alumnos..."
                  />
                </label>

                <label className="field">
                  <span className="field-label">
                    Requisitos (uno por línea)
                  </span>
                  <textarea
                    className="text-area"
                    rows={4}
                    value={formulario.proyecto.requisitos}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        proyecto: {
                          ...previo.proyecto,
                          requisitos: e.target.value,
                        },
                      }))
                    }
                    placeholder={"Crear una variable...\nSolicitar el nombre..."}
                  />
                </label>
              </div>

              <h3 className="editor-section-title">
                Minijuego / Boss Level (opcional)
              </h3>

              <div className="editor-note">
                <Info aria-hidden="true" />
                Si dejas estos campos vacíos, la sesión no mostrará ningún
                minijuego. Si lo llenas, el alumno deberá escribir código,
                ejecutarlo en la plataforma y se calificará comparando su salida
                con la salida esperada.
              </div>

              <div className="editor-card">
                <div className="editor-question-header">
                  <input
                    className="text-input"
                    value={formulario.minijuego.titulo}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        minijuego: {
                          ...previo.minijuego,
                          titulo: e.target.value,
                        },
                      }))
                    }
                    placeholder="Título del minijuego (Ej. Boss: Calculadora)"
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setProbandoMinijuego(true)}
                    disabled={!minijuegoTieneContenido(formulario.minijuego)}
                    title="Probar el minijuego como lo verá el alumno"
                  >
                    <Play aria-hidden="true" />
                    Probar
                  </button>
                </div>

                <label className="field">
                  <span className="field-label">Instrucción para el alumno</span>
                  <textarea
                    className="text-area"
                    rows={2}
                    value={formulario.minijuego.descripcion}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        minijuego: {
                          ...previo.minijuego,
                          descripcion: e.target.value,
                        },
                      }))
                    }
                    placeholder="Ej. Escribe un programa que imprima la suma de 5 y 7"
                  />
                </label>

                <div className="editor-grid-2">
                  <label className="field">
                    <span className="field-label">Código inicial (opcional)</span>
                    <textarea
                      className="text-area mono"
                      rows={3}
                      value={formulario.minijuego.codigoInicial}
                      onChange={(e) =>
                        setFormulario((previo) => ({
                          ...previo,
                          minijuego: {
                            ...previo.minijuego,
                            codigoInicial: e.target.value,
                          },
                        }))
                      }
                      placeholder="# Código con el que inicia el editor"
                    />
                  </label>

                  <label className="field">
                    <span className="field-label">
                      Entradas para input() (una por línea, opcional)
                    </span>
                    <textarea
                      className="text-area mono"
                      rows={3}
                      value={formulario.minijuego.entrada}
                      onChange={(e) =>
                        setFormulario((previo) => ({
                          ...previo,
                          minijuego: {
                            ...previo.minijuego,
                            entrada: e.target.value,
                          },
                        }))
                      }
                      placeholder={"Ana\n20"}
                    />
                  </label>
                </div>

                <label className="field">
                  <span className="field-label">
                    Salida esperada (con esto se califica · si hay varias
                    válidas, sepáralas con una línea de ---)
                  </span>
                  <textarea
                    className="text-area mono"
                    rows={3}
                    value={formulario.minijuego.salidaEsperada}
                    onChange={(e) =>
                      setFormulario((previo) => ({
                        ...previo,
                        minijuego: {
                          ...previo.minijuego,
                          salidaEsperada: e.target.value,
                        },
                      }))
                    }
                    placeholder={
                      "La computadora eligió: piedra\nEmpate\n---\nLa computadora eligió: papel\nPerdiste\n---\nLa computadora eligió: tijera\nGanaste"
                    }
                  />
                </label>
              </div>
            </>
          )}
        </>
      )}

      {probandoMinijuego && (
        <div
          className="modal-overlay"
          onClick={(evento) => {
            if (evento.target === evento.currentTarget)
              setProbandoMinijuego(false)
          }}
        >
          <section className="modal-panel" role="dialog" aria-modal="true">
            <button
              className="panel-close"
              onClick={() => setProbandoMinijuego(false)}
              aria-label="Cerrar prueba"
            >
              <X aria-hidden="true" />
            </button>

            <header className="modal-header">
              <div className="modal-header-icon">
                <Play aria-hidden="true" />
              </div>
              <div>
                <p className="modal-header-eyebrow">
                  Prueba del minijuego (sin publicar)
                </p>
                <h2>{formulario.minijuego.titulo || "Boss Level"}</h2>
              </div>
            </header>

            <div className="modal-body">
              <PythonConsole
                modoPrueba
                ejercicio={{
                  id: "prueba-minijuego",
                  titulo: formulario.minijuego.titulo || "Boss Level",
                  descripcion: formulario.minijuego.descripcion || "",
                  codigoInicial: formulario.minijuego.codigoInicial || "",
                  entrada: formulario.minijuego.entrada || "",
                  salidaEsperada: formulario.minijuego.salidaEsperada || "",
                  validar: ({ salida }) =>
                    salidaCoincide(salida, formulario.minijuego.salidaEsperada),
                }}
              />
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

function TemaEditor({ tema, indice, abierto, onToggle, onChange, onEliminar }) {
  const IconoTema = obtenerIcono(tema.icono)
  const [pruebaItem, setPruebaItem] = useState(null)

  function actualizarPregunta(indicePregunta, cambios) {
    onChange({
      quiz: tema.quiz.map((pregunta, i) =>
        i === indicePregunta ? { ...pregunta, ...cambios } : pregunta
      ),
    })
  }

  function actualizarItem(indiceItem, cambios) {
    onChange({
      ejercicios: {
        ...tema.ejercicios,
        items: tema.ejercicios.items.map((item, i) =>
          i === indiceItem ? { ...item, ...cambios } : item
        ),
      },
    })
  }

  function cambiarTipoEjercicios(tipo) {
    onChange({ ejercicios: { tipo, items: [] } })
  }

  return (
    <div className="editor-card">
      <button className="editor-card-header" onClick={onToggle}>
        <span className="mission-icon editor-tema-icon">
          <IconoTema aria-hidden="true" />
        </span>
        <span className="editor-card-title">
          Misión {tema.id}: {tema.titulo || "(sin título)"}
        </span>
        <span className="editor-card-meta">
          {tema.quiz.length} preguntas ·{" "}
          {tema.ejercicios.tipo === "ninguno"
            ? "sin ejercicios"
            : `${tema.ejercicios.items.length} ejercicios (${tema.ejercicios.tipo})`}
        </span>
        {abierto ? (
          <ChevronUp aria-hidden="true" />
        ) : (
          <ChevronDown aria-hidden="true" />
        )}
      </button>

      {abierto && (
        <div className="editor-card-body">
          <div className="editor-grid-3">
            <label className="field">
              <span className="field-label">Título del tema</span>
              <input
                className="text-input"
                value={tema.titulo}
                onChange={(e) => onChange({ titulo: e.target.value })}
                placeholder="Ej. Ciclos while"
              />
            </label>

            <label className="field">
              <span className="field-label">Icono</span>
              <select
                className="select-input"
                value={tema.icono}
                onChange={(e) => onChange({ icono: e.target.value })}
              >
                {NOMBRES_ICONOS.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Link de microclase (Gamma)</span>
              <input
                className="text-input"
                value={tema.gamma}
                onChange={(e) => onChange({ gamma: e.target.value })}
                placeholder="https://gamma.app/docs/..."
              />
            </label>
          </div>

          <h4 className="editor-subsection-title">
            Quiz ({tema.quiz.length} preguntas)
          </h4>

          {tema.quiz.map((pregunta, indicePregunta) => (
            <div key={indicePregunta} className="editor-question">
              <div className="editor-question-header">
                <span className="built-step-number">{indicePregunta + 1}</span>
                <input
                  className="text-input"
                  value={pregunta.pregunta}
                  onChange={(e) =>
                    actualizarPregunta(indicePregunta, {
                      pregunta: e.target.value,
                    })
                  }
                  placeholder="Escribe la pregunta..."
                />
                <button
                  className="icon-button danger"
                  onClick={() =>
                    onChange({
                      quiz: tema.quiz.filter((_, i) => i !== indicePregunta),
                    })
                  }
                  aria-label="Eliminar pregunta"
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </div>

              {pregunta.opciones.map((opcion, indiceOpcion) => (
                <div key={indiceOpcion} className="editor-option-row">
                  <input
                    type="radio"
                    name={`correcta-${tema.id}-${indicePregunta}`}
                    checked={pregunta.correcta === indiceOpcion}
                    onChange={() =>
                      actualizarPregunta(indicePregunta, {
                        correcta: indiceOpcion,
                      })
                    }
                    aria-label={`Marcar opción ${indiceOpcion + 1} como correcta`}
                  />
                  <input
                    className="text-input"
                    value={opcion}
                    onChange={(e) =>
                      actualizarPregunta(indicePregunta, {
                        opciones: pregunta.opciones.map((o, i) =>
                          i === indiceOpcion ? e.target.value : o
                        ),
                      })
                    }
                    placeholder={`Opción ${indiceOpcion + 1}`}
                  />
                  {pregunta.opciones.length > 2 && (
                    <button
                      className="icon-button danger"
                      onClick={() =>
                        actualizarPregunta(indicePregunta, {
                          opciones: pregunta.opciones.filter(
                            (_, i) => i !== indiceOpcion
                          ),
                          correcta:
                            pregunta.correcta >= indiceOpcion &&
                            pregunta.correcta > 0
                              ? pregunta.correcta - 1
                              : pregunta.correcta,
                        })
                      }
                      aria-label="Eliminar opción"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}

              <div className="editor-question-footer">
                {pregunta.opciones.length < 4 && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      actualizarPregunta(indicePregunta, {
                        opciones: [...pregunta.opciones, ""],
                      })
                    }
                  >
                    <Plus aria-hidden="true" /> Opción
                  </button>
                )}

                <input
                  className="text-input"
                  value={pregunta.explicacion}
                  onChange={(e) =>
                    actualizarPregunta(indicePregunta, {
                      explicacion: e.target.value,
                    })
                  }
                  placeholder="Explicación que verá el alumno al responder"
                />
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline btn-sm"
            onClick={() => onChange({ quiz: [...tema.quiz, nuevaPregunta()] })}
          >
            <Plus aria-hidden="true" />
            Agregar pregunta
          </button>

          <h4 className="editor-subsection-title">Ejercicios</h4>

          <label className="field" style={{ maxWidth: "260px" }}>
            <span className="field-label">Tipo de ejercicios</span>
            <select
              className="select-input"
              value={tema.ejercicios.tipo}
              onChange={(e) => cambiarTipoEjercicios(e.target.value)}
            >
              <option value="ninguno">Sin ejercicios (solo quiz)</option>
              <option value="ordenar">Ordenar pasos (tarjetas)</option>
              <option value="python">Consola Python</option>
            </select>
          </label>

          {tema.ejercicios.tipo === "ordenar" &&
            tema.ejercicios.items.map((item, indiceItem) => (
              <div key={indiceItem} className="editor-question">
                <div className="editor-question-header">
                  <span className="built-step-number">{indiceItem + 1}</span>
                  <input
                    className="text-input"
                    value={item.titulo}
                    onChange={(e) =>
                      actualizarItem(indiceItem, { titulo: e.target.value })
                    }
                    placeholder="Título del ejercicio"
                  />
                  <button
                    className="icon-button danger"
                    onClick={() =>
                      onChange({
                        ejercicios: {
                          ...tema.ejercicios,
                          items: tema.ejercicios.items.filter(
                            (_, i) => i !== indiceItem
                          ),
                        },
                      })
                    }
                    aria-label="Eliminar ejercicio"
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>

                <div className="editor-grid-2">
                  <label className="field">
                    <span className="field-label">Escena / contexto</span>
                    <input
                      className="text-input"
                      value={item.escena}
                      onChange={(e) =>
                        actualizarItem(indiceItem, { escena: e.target.value })
                      }
                      placeholder="Ej. Tienda, Laboratorio..."
                    />
                  </label>

                  <label className="field">
                    <span className="field-label">Descripción</span>
                    <input
                      className="text-input"
                      value={item.descripcion}
                      onChange={(e) =>
                        actualizarItem(indiceItem, {
                          descripcion: e.target.value,
                        })
                      }
                      placeholder="Qué problema resuelve el alumno"
                    />
                  </label>
                </div>

                <label className="field">
                  <span className="field-label">
                    Pasos EN ORDEN CORRECTO (uno por línea — la app los
                    revuelve automáticamente)
                  </span>
                  <textarea
                    className="text-area mono"
                    rows={5}
                    value={item.pasos}
                    onChange={(e) =>
                      actualizarItem(indiceItem, { pasos: e.target.value })
                    }
                    placeholder={"Inicio\nPedir calificación\nMostrar resultado\nFin"}
                  />
                </label>
              </div>
            ))}

          {tema.ejercicios.tipo === "python" &&
            tema.ejercicios.items.map((item, indiceItem) => (
              <div key={indiceItem} className="editor-question">
                <div className="editor-question-header">
                  <span className="built-step-number">{indiceItem + 1}</span>
                  <input
                    className="text-input"
                    value={item.titulo}
                    onChange={(e) =>
                      actualizarItem(indiceItem, { titulo: e.target.value })
                    }
                    placeholder="Título del ejercicio"
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setPruebaItem(indiceItem)}
                    title="Probar este ejercicio como lo verá el alumno"
                  >
                    <Play aria-hidden="true" />
                    Probar
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() =>
                      onChange({
                        ejercicios: {
                          ...tema.ejercicios,
                          items: tema.ejercicios.items.filter(
                            (_, i) => i !== indiceItem
                          ),
                        },
                      })
                    }
                    aria-label="Eliminar ejercicio"
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>

                <label className="field">
                  <span className="field-label">Instrucción para el alumno</span>
                  <textarea
                    className="text-area"
                    rows={2}
                    value={item.descripcion}
                    onChange={(e) =>
                      actualizarItem(indiceItem, {
                        descripcion: e.target.value,
                      })
                    }
                    placeholder='Ej. Muestra exactamente: Hola Aventurero'
                  />
                </label>

                <div className="editor-grid-2">
                  <label className="field">
                    <span className="field-label">
                      Código inicial (opcional)
                    </span>
                    <textarea
                      className="text-area mono"
                      rows={3}
                      value={item.codigoInicial}
                      onChange={(e) =>
                        actualizarItem(indiceItem, {
                          codigoInicial: e.target.value,
                        })
                      }
                      placeholder="# Código con el que inicia el editor"
                    />
                  </label>

                  <label className="field">
                    <span className="field-label">
                      Entradas para input() (una por línea, opcional)
                    </span>
                    <textarea
                      className="text-area mono"
                      rows={3}
                      value={item.entrada}
                      onChange={(e) =>
                        actualizarItem(indiceItem, { entrada: e.target.value })
                      }
                      placeholder={"Ana\n20"}
                    />
                  </label>
                </div>

                <label className="field">
                  <span className="field-label">
                    Salida esperada (con esto se califica · si hay varias
                    válidas, sepáralas con una línea de ---)
                  </span>
                  <textarea
                    className="text-area mono"
                    rows={3}
                    value={item.salidaEsperada}
                    onChange={(e) =>
                      actualizarItem(indiceItem, {
                        salidaEsperada: e.target.value,
                      })
                    }
                    placeholder={"Hola Aventurero"}
                  />
                </label>
              </div>
            ))}

          {tema.ejercicios.tipo !== "ninguno" && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                onChange({
                  ejercicios: {
                    ...tema.ejercicios,
                    items: [
                      ...tema.ejercicios.items,
                      tema.ejercicios.tipo === "ordenar"
                        ? nuevoItemOrdenar()
                        : nuevoItemPython(),
                    ],
                  },
                })
              }
            >
              <Plus aria-hidden="true" />
              Agregar ejercicio
            </button>
          )}

          <div className="editor-card-footer">
            <button className="btn btn-outline btn-sm danger" onClick={onEliminar}>
              <Trash2 aria-hidden="true" />
              Eliminar tema {indice + 1}
            </button>
          </div>
        </div>
      )}

      {pruebaItem !== null && tema.ejercicios.items[pruebaItem] && (
        <div
          className="modal-overlay"
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) setPruebaItem(null)
          }}
        >
          <section className="modal-panel" role="dialog" aria-modal="true">
            <button
              className="panel-close"
              onClick={() => setPruebaItem(null)}
              aria-label="Cerrar prueba"
            >
              <X aria-hidden="true" />
            </button>

            <header className="modal-header">
              <div className="modal-header-icon">
                <Play aria-hidden="true" />
              </div>
              <div>
                <p className="modal-header-eyebrow">Prueba del profesor (sin publicar)</p>
                <h2>{tema.ejercicios.items[pruebaItem].titulo || "Ejercicio sin título"}</h2>
              </div>
            </header>

            <div className="modal-body">
              <PythonConsole
                modoPrueba
                ejercicio={{
                  id: `prueba-${pruebaItem}`,
                  titulo: tema.ejercicios.items[pruebaItem].titulo || "Ejercicio de prueba",
                  descripcion: tema.ejercicios.items[pruebaItem].descripcion || "",
                  codigoInicial: tema.ejercicios.items[pruebaItem].codigoInicial || "",
                  entrada: tema.ejercicios.items[pruebaItem].entrada || "",
                  salidaEsperada: tema.ejercicios.items[pruebaItem].salidaEsperada || "",
                  validar: ({ salida }) =>
                    salidaCoincide(
                      salida,
                      tema.ejercicios.items[pruebaItem].salidaEsperada
                    ),
                }}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default EditorSesion
