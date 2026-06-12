export const bloques = [
  {
    id: 1,
    titulo: "¿Qué es un algoritmo?",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué es un algoritmo?",
        opciones: [
          "Un lenguaje de programación",
          "Una computadora",
          "Un conjunto ordenado de pasos para resolver un problema",
          "Un videojuego"
        ],
        correcta: 2,
        explicacion:
          "Un algoritmo es una secuencia ordenada de pasos para resolver un problema."
      },
      {
        id: 2,
        pregunta:
          "¿Cuál de estos ejemplos representa un algoritmo correctamente ordenado?",
        opciones: [
          "1. Comer → 2. Buscar comida → 3. Cocinar",
          "1. Buscar comida → 2. Cocinar → 3. Comer",
          "1. Dormir → 2. Comer → 3. Buscar comida",
          "1. Cocinar → 2. Comer → 3. Comprar ingredientes"
        ],
        correcta: 1,
        explicacion:
          "Un algoritmo debe seguir un orden lógico."
      },
      {
        id: 3,
        pregunta:
          "¿Cuál de las siguientes características debe tener un algoritmo?",
        opciones: [
          "Ser infinito",
          "Ser confuso",
          "Tener pasos claros y ordenados",
          "Tener dibujos"
        ],
        correcta: 2,
        explicacion:
          "Los algoritmos deben ser claros, ordenados y tener un objetivo."
      },
      {
        id: 4,
        pregunta:
          "Verdadero o falso: Los algoritmos solo existen en programación.",
        opciones: ["Verdadero", "Falso"],
        correcta: 1,
        explicacion:
          "También existen en actividades cotidianas como cocinar o seguir GPS."
      },
      {
        id: 5,
        pregunta:
          "¿Qué problema tiene este algoritmo: 1. Publicar foto → 2. Abrir Instagram → 3. Elegir imagen?",
        opciones: [
          "Está muy largo",
          "Tiene demasiados pasos",
          "El orden es incorrecto",
          "No tiene problema"
        ],
        correcta: 2,
        explicacion:
          "El algoritmo tiene un orden incorrecto."
      }
    ]
  },
  {
    id: 2,
    titulo: "Diagramas de flujo",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué es un diagrama de flujo?",
        opciones: [
          "Un lenguaje de programación",
          "Una representación gráfica de un algoritmo",
          "Una base de datos",
          "Un archivo de Python"
        ],
        correcta: 1,
        explicacion:
          "Un diagrama de flujo representa visualmente los pasos de un algoritmo."
      },
      {
        id: 2,
        pregunta: "¿Para qué sirve un diagrama de flujo?",
        opciones: [
          "Para decorar un programa",
          "Para visualizar los pasos de un algoritmo",
          "Para instalar Python",
          "Para hacer que el programa corra más rápido"
        ],
        correcta: 1,
        explicacion:
          "Sirve para visualizar el flujo de pasos antes de programar."
      },
      {
        id: 3,
        pregunta: "¿Qué símbolo representa una decisión en un diagrama de flujo?",
        opciones: [
          "Rectángulo",
          "Óvalo",
          "Rombo",
          "Flecha"
        ],
        correcta: 2,
        explicacion:
          "El rombo se usa para representar decisiones, normalmente con respuestas como sí/no."
      },
      {
        id: 4,
        pregunta: "¿Qué símbolo se utiliza para inicio y fin?",
        opciones: [
          "Rectángulo",
          "Círculo",
          "Óvalo",
          "Rombo"
        ],
        correcta: 2,
        explicacion:
          "El óvalo se usa para marcar el inicio o el final del flujo."
      },
      {
        id: 5,
        pregunta: "¿Qué representa una flecha en un diagrama de flujo?",
        opciones: [
          "Una variable",
          "La dirección del flujo",
          "Un error",
          "Una operación matemática"
        ],
        correcta: 1,
        explicacion:
          "La flecha indica hacia dónde continúa el flujo del algoritmo."
      },
      {
        id: 6,
        pregunta: "¿Cuál es una ventaja de usar diagramas de flujo?",
        opciones: [
          "Hace el programa más rápido automáticamente",
          "Ayuda a visualizar los pasos de una solución",
          "Elimina todos los errores de programación",
          "Instala librerías automáticamente"
        ],
        correcta: 1,
        explicacion:
          "Los diagramas ayudan a entender la solución antes de escribir código."
      },
      {
        id: 7,
        pregunta: "¿Por qué usar un diagrama de flujo antes de programar?",
        opciones: [
          "Evita usar pseudocódigo",
          "Visualiza el problema antes de escribir código",
          "Hace que cualquier lenguaje funcione igual",
          "Reemplaza completamente al programa"
        ],
        correcta: 1,
        explicacion:
          "Ayuda a planificar la solución y detectar errores lógicos antes de programar."
      },
      {
        id: 8,
        pregunta:
          "En el ejemplo de aprobado/reprobado, ¿qué ocurre después de pedir la calificación?",
        opciones: [
          "Terminar el programa",
          "Tomar una decisión: calificación >= 60",
          "Imprimir el nombre del alumno",
          "Cerrar el sistema"
        ],
        correcta: 1,
        explicacion:
          "Después de pedir la calificación se evalúa una condición para decidir si aprueba o reprueba."
      },
            {
        id: 8,
        pregunta:
          "En el ejemplo de aprobado/reprobado, ¿qué ocurre después de pedir la calificación?",
        opciones: [
          "Terminar el programa",
          "Tomar una decisión: calificación >= 60",
          "Imprimir el nombre del alumno",
          "Cerrar el sistema"
        ],
        correcta: 1,
        explicacion:
          "Después de pedir la calificación se evalúa una condición para decidir si aprueba o reprueba."
      }
    ]
  },

  {
    id: 3,
    titulo: "Pseudocódigo",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué es el pseudocódigo?",
        opciones: [
          "Un lenguaje de programación",
          "Una forma estructurada de describir algoritmos",
          "Una base de datos",
          "Un compilador"
        ],
        correcta: 1,
        explicacion:
          "El pseudocódigo permite describir algoritmos sin usar un lenguaje específico."
      },
      {
        id: 2,
        pregunta: "¿Cuál es una ventaja del pseudocódigo?",
        opciones: [
          "Solo funciona en Python",
          "Ayuda a planificar soluciones",
          "Ejecuta programas",
          "Instala software"
        ],
        correcta: 1,
        explicacion:
          "Ayuda a diseñar la lógica antes de programar."
      },
      {
        id: 3,
        pregunta: "¿Qué palabra suele indicar el inicio de un algoritmo?",
        opciones: [
          "Programa",
          "Inicio",
          "Leer",
          "Mostrar"
        ],
        correcta: 1,
        explicacion:
          "La mayoría de los pseudocódigos comienzan con INICIO."
      },
      {
        id: 4,
        pregunta: "¿Qué instrucción se usa para solicitar datos al usuario?",
        opciones: [
          "Mostrar",
          "Leer",
          "Inicio",
          "Fin"
        ],
        correcta: 1,
        explicacion:
          "Leer se utiliza para capturar información."
      },
      {
        id: 5,
        pregunta: "¿Qué instrucción se usa para mostrar información?",
        opciones: [
          "Mostrar",
          "Leer",
          "Inicio",
          "Variable"
        ],
        correcta: 0,
        explicacion:
          "Mostrar presenta información al usuario."
      },
      {
        id: 6,
        pregunta: "¿Qué hace la instrucción 'Leer nombre'?",
        opciones: [
          "Muestra el nombre",
          "Solicita un dato al usuario",
          "Elimina una variable",
          "Finaliza el programa"
        ],
        correcta: 1,
        explicacion:
          "Leer permite capturar datos."
      },
      {
        id: 7,
        pregunta: "¿Qué estructura permite tomar decisiones?",
        opciones: [
          "Inicio",
          "Mostrar",
          "Si / SiNo",
          "Leer"
        ],
        correcta: 2,
        explicacion:
          "Las decisiones se representan con Si / SiNo."
      },
      {
        id: 8,
        pregunta: "¿Qué ocurre primero?",
        opciones: [
          "Mostrar resultado",
          "Leer datos"
        ],
        correcta: 1,
        explicacion:
          "Primero se obtienen los datos y después se procesan."
      }
    ]
  },
  {
  id: 4,
  titulo: "Introducción a Python",
  quiz: [
    {
      id: 1,
      pregunta: "¿Quién creó Python?",
      opciones: [
        "Bill Gates",
        "Guido van Rossum",
        "Linus Torvalds",
        "Mark Zuckerberg"
      ],
      correcta: 1,
      explicacion:
        "Python fue creado por Guido van Rossum."
    },
    {
      id: 2,
      pregunta: "¿De dónde proviene el nombre Python?",
      opciones: [
        "De una serpiente gigante",
        "De una montaña",
        "Del grupo humorístico Monty Python",
        "De una empresa tecnológica"
      ],
      correcta: 2,
      explicacion:
        "Está inspirado en el grupo humorístico Monty Python."
    },
    {
      id: 3,
      pregunta: "¿Cuál es la versión recomendada actualmente?",
      opciones: [
        "Python 1",
        "Python 2",
        "Python 3",
        "Python X"
      ],
      correcta: 2,
      explicacion:
        "Python 3 es la versión con soporte oficial."
    },
    {
      id: 4,
      pregunta: "¿Por qué Python es fácil de aprender?",
      opciones: [
        "Porque usa pocas letras",
        "Porque su sintaxis se parece al pseudocódigo",
        "Porque funciona sin computadora",
        "Porque no tiene reglas"
      ],
      correcta: 1,
      explicacion:
        "Su sintaxis es clara y similar al pseudocódigo."
    },
    {
      id: 5,
      pregunta: "¿Cuál es una característica de Python?",
      opciones: [
        "Solo funciona en Windows",
        "Es multiplataforma",
        "Solo sirve para web",
        "Solo funciona online"
      ],
      correcta: 1,
      explicacion:
        "Funciona en Windows, Linux y macOS."
    },
    {
      id: 6,
      pregunta: "¿Qué empresa utiliza Python?",
      opciones: [
        "Netflix",
        "NASA",
        "YouTube",
        "Todas las anteriores"
      ],
      correcta: 3,
      explicacion:
        "Todas utilizan Python."
    },
    {
      id: 7,
      pregunta: "¿Dónde se utiliza Python?",
      opciones: [
        "IA",
        "Finanzas",
        "Web",
        "Todas las anteriores"
      ],
      correcta: 3,
      explicacion:
        "Python es extremadamente versátil."
    },
    {
      id: 8,
      pregunta: "¿Qué significa que Python sea interpretado?",
      opciones: [
        "Se ejecuta línea por línea",
        "Necesita compilarse",
        "Solo funciona en navegador",
        "Traduce idiomas"
      ],
      correcta: 0,
      explicacion:
        "Python se ejecuta mediante un intérprete."
    },
    {
      id: 9,
      pregunta: "¿Qué organización protege Python?",
      opciones: [
        "Google",
        "Python Software Foundation",
        "OpenAI",
        "Linux Foundation"
      ],
      correcta: 1,
      explicacion:
        "La PSF es la organización oficial."
    },
    {
      id: 10,
      pregunta: "Según el Zen de Python, ¿qué es importante?",
      opciones: [
        "La complejidad",
        "La legibilidad",
        "La velocidad",
        "Las líneas de código"
      ],
      correcta: 1,
      explicacion:
        "La legibilidad es uno de los principios más importantes."
    }
  ]
},
{
    id: 5,
     titulo: "print()",
    quiz: [
  {
    id: 5,
    pregunta: "¿Para qué sirve la función print()?",
    opciones: [
      "Mostrar información en pantalla",
      "Leer información del usuario",
      "Crear variables",
      "Guardar archivos"
    ],
    correcta: 0,
    explicacion:
      "print() se utiliza para mostrar información al usuario."
  },
  {
    id: 2,
    pregunta: "¿Qué mostrará el siguiente código?\nprint('Hola')",
    opciones: [
      "Hola",
      "'Hola'",
      "Error",
      "Nada"
    ],
    correcta: 0,
    explicacion:
      "print() muestra el contenido del texto sin las comillas."
  },
  {
    id: 3,
    pregunta: "¿Qué mostrará el siguiente código?\nprint(10)",
    opciones: [
      "Diez",
      "10",
      "Error",
      "Nada"
    ],
    correcta: 1,
    explicacion:
      "print() puede mostrar números directamente."
  },
  {
    id: 4,
    pregunta: "¿Cuál de las siguientes instrucciones es correcta?",
    opciones: [
      "print(Hola)",
      "mostrar('Hola')",
      "print('Hola')",
      "imprimir('Hola')"
    ],
    correcta: 2,
    explicacion:
      "La sintaxis correcta utiliza print() y texto entre comillas."
  },
  {
    id: 5,
    pregunta: "¿Qué mostrará este código?\nprint('Bienvenido')",
    opciones: [
      "Bienvenido",
      "'Bienvenido'",
      "Error",
      "Nada"
    ],
    correcta: 0,
    explicacion:
      "El texto se imprime tal como está escrito."
  },
  {
    id: 6,
    pregunta: "¿Qué ocurre si escribimos?\nprint(Hola)",
    opciones: [
      "Se muestra Hola",
      "Se muestra 'Hola'",
      "Produce un error",
      "No ocurre nada"
    ],
    correcta: 2,
    explicacion:
      "Python interpreta Hola como una variable porque no tiene comillas."
  },
  {
    id: 7,
    pregunta: "¿Qué mostrará este código?\nprint('Hola')\nprint('Mundo')",
    opciones: [
      "Hola Mundo en la misma línea",
      "Hola y Mundo en líneas separadas",
      "Error",
      "Nada"
    ],
    correcta: 1,
    explicacion:
      "Cada print() genera una nueva línea."
  },
  {
    id: 8,
    pregunta: "¿Qué elemento es obligatorio para escribir texto con print()?",
    opciones: [
      "Paréntesis y comillas",
      "Solo paréntesis",
      "Solo comillas",
      "Ninguno"
    ],
    correcta: 0,
    explicacion:
      "Los textos deben escribirse entre comillas dentro de print()."
  },
  {
    id: 9,
    pregunta: "¿Cuál de estos ejemplos imprimirá correctamente un número?",
    opciones: [
      "print(25)",
      "mostrar(25)",
      "imprimir(25)",
      "texto(25)"
    ],
    correcta: 0,
    explicacion:
      "print() permite mostrar números y texto."
  },
  {
    id: 10,
    pregunta: "¿Qué función utilizaremos con frecuencia para comunicarnos con el usuario?",
    opciones: [
      "input()",
      "print()",
      "while()",
      "for()"
    ],
    correcta: 1,
    explicacion:
      "print() es la función básica para mostrar mensajes al usuario."
  }
]
},
{
  id: 6,
  titulo: "input()",
  quiz: [
    {
      id: 1,
      pregunta:
        "¿Cuál de las siguientes funciones permite mostrar en pantalla su argumento?",
      opciones: ["print()", "input()", "string()", "Todas son correctas"],
      correcta: 0,
      explicacion:
        "print() permite mostrar información en pantalla."
    },
    {
      id: 2,
      pregunta:
        "¿Cuál de las siguientes funciones permite obtener información del teclado por parte del usuario?",
      opciones: [
        "write()",
        "print()",
        "input()",
        "Todas son correctas",
        "Ninguna es correcta"
      ],
      correcta: 2,
      explicacion:
        "input() permite capturar información ingresada por el usuario."
    },
    {
      id: 3,
      pregunta:
        "¿Qué se mostrará en pantalla al ejecutar la siguiente línea?\nprint(220 + 35)",
      opciones: ["22035", "255", "220 + 35", "Depende"],
      correcta: 1,
      explicacion:
        "Cuando los números no están entre comillas, Python realiza la suma."
    },
    {
      id: 4,
      pregunta:
        "¿Qué se mostrará en pantalla al ejecutar la siguiente línea?\nprint('220' + '35')",
      opciones: ["22035", "255", "220 + 35", "Depende"],
      correcta: 0,
      explicacion:
        "Cuando los valores están entre comillas, Python los trata como texto y los concatena."
    },
    {
      id: 5,
      pregunta:
        "La función input() permite obtener información ingresada por el usuario y almacenarla para ser utilizada posteriormente. ¿Verdadero o falso?",
      opciones: ["Verdadero", "Falso"],
      correcta: 0,
      explicacion:
        "input() obtiene información del usuario; normalmente se guarda para usarla después."
    }
  ]
},
{
  id: 7,
  titulo: "Variables",
  quiz: [
    {
      id: 1,
      pregunta: "¿Qué es una variable?",
      opciones: [
        "Un espacio donde se guarda información",
        "Una función para mostrar texto",
        "Un error de Python",
        "Una operación matemática"
      ],
      correcta: 0,
      explicacion:
        "Una variable guarda información para usarla después."
    },
    {
      id: 2,
      pregunta: "¿Qué símbolo se usa para asignar un valor a una variable?",
      opciones: ["==", "=", "+", ":"],
      correcta: 1,
      explicacion:
        "El signo = se usa para asignar valores."
    },
    {
      id: 3,
      pregunta: "¿Cuál variable está escrita correctamente?",
      opciones: ["1nombre", "mi nombre", "mi-nombre", "nombre"],
      correcta: 3,
      explicacion:
        "nombre es válido porque no inicia con número ni tiene espacios o guiones."
    },
    {
      id: 4,
      pregunta: "¿Cuál variable NO es válida en Python?",
      opciones: ["edad", "ciudad_usuario", "numero1", "mi nombre"],
      correcta: 3,
      explicacion:
        "Los nombres de variables no pueden tener espacios."
    },
    {
      id: 5,
      pregunta: "¿Qué mostrará este código?\nnombre = 'Ana'\nprint(nombre)",
      opciones: ["nombre", "Ana", "'Ana'", "Error"],
      correcta: 1,
      explicacion:
        "print(nombre) muestra el valor guardado en la variable."
    },
    {
      id: 6,
      pregunta: "¿Qué valor guarda esta variable?\nedad = 20",
      opciones: ["edad", "20", "print", "input"],
      correcta: 1,
      explicacion:
        "La variable edad guarda el valor 20."
    },
    {
      id: 7,
      pregunta: "¿Cuál es una buena práctica al nombrar variables?",
      opciones: [
        "Usar nombres descriptivos",
        "Usar solo una letra siempre",
        "Usar espacios",
        "Usar guiones"
      ],
      correcta: 0,
      explicacion:
        "Los nombres descriptivos ayudan a entender el código."
    },
    {
      id: 8,
      pregunta: "¿Qué hace este código?\nnombre = input('Nombre:')",
      opciones: [
        "Muestra un mensaje fijo",
        "Guarda la respuesta del usuario en la variable nombre",
        "Borra una variable",
        "Cierra el programa"
      ],
      correcta: 1,
      explicacion:
        "input() recibe información y la guarda en la variable nombre."
    },
    {
      id: 9,
      pregunta: "¿Cuál es la forma correcta de mostrar una variable?",
      opciones: [
        "print('nombre')",
        "print(nombre)",
        "input(nombre)",
        "mostrar(nombre)"
      ],
      correcta: 1,
      explicacion:
        "print(nombre) muestra el contenido de la variable."
    },
    {
      id: 10,
      pregunta: "¿Qué diferencia hay entre print('nombre') y print(nombre)?",
      opciones: [
        "No hay diferencia",
        "print('nombre') imprime el texto nombre y print(nombre) imprime el valor de la variable",
        "print(nombre) siempre da error",
        "print('nombre') guarda información"
      ],
      correcta: 1,
      explicacion:
        "Las comillas imprimen texto literal; sin comillas se usa la variable."
    }
  ]
},
{
  id: 8,
  titulo: "Tipos de datos",
  quiz: [
    {
      id: 1,
      pregunta: "¿Qué tipo de dato es \"Hola Mundo\"?",
      opciones: ["int", "float", "str", "list"],
      correcta: 2,
      explicacion:
        "Todo lo que está entre comillas es un string."
    },
    {
      id: 2,
      pregunta: "¿Qué tipo de dato es 25?",
      opciones: ["float", "str", "int", "list"],
      correcta: 2,
      explicacion:
        "25 es un número entero."
    },
    {
      id: 3,
      pregunta: "¿Qué tipo de dato es 3.14?",
      opciones: ["float", "int", "str", "list"],
      correcta: 0,
      explicacion:
        "Los números con decimal son float."
    },
    {
      id: 4,
      pregunta: "¿Cuál de los siguientes es un string?",
      opciones: ["15", "\"15\"", "15.0", "[15]"],
      correcta: 1,
      explicacion:
        "Al estar entre comillas se convierte en texto."
    },
    {
      id: 5,
      pregunta: "¿Cuál de los siguientes es una lista?",
      opciones: [
        "\"Ana, Luis, Pedro\"",
        "(Ana, Luis, Pedro)",
        "[\"Ana\", \"Luis\", \"Pedro\"]",
        "{Ana, Luis, Pedro}"
      ],
      correcta: 2,
      explicacion:
        "Las listas utilizan corchetes []."
    },
    {
      id: 6,
      pregunta: "¿Qué tipo de dato es -8?",
      opciones: ["str", "float", "int", "list"],
      correcta: 2,
      explicacion:
        "Los enteros pueden ser negativos."
    },
    {
      id: 7,
      pregunta: "¿Qué tipo de dato es -2.5?",
      opciones: ["float", "int", "str", "list"],
      correcta: 0,
      explicacion:
        "Tiene decimal, por lo tanto es float."
    },
    {
      id: 8,
      pregunta: "¿Cuál es el tipo de dato de [1,2,3]?",
      opciones: ["str", "int", "float", "list"],
      correcta: 3,
      explicacion:
        "Los corchetes indican una lista."
    },
    {
      id: 9,
      pregunta: "¿Cuál de estos valores es texto?",
      opciones: ["100", "\"100\"", "100.5", "[100]"],
      correcta: 1,
      explicacion:
        "Al estar entre comillas se considera texto."
    },
    {
      id: 10,
      pregunta: "¿Para qué sirve un tipo de dato?",
      opciones: [
        "Para decorar el código",
        "Para indicar qué tipo de información guarda una variable",
        "Para imprimir mensajes",
        "Para crear carpetas"
      ],
      correcta: 1,
      explicacion:
        "Los tipos de datos indican qué información almacena una variable."
    }
  ]
},
{
  id: 9,
  titulo: "Operadores",
  quiz: [
    {
      id: 1,
      pregunta: "¿Qué operador se utiliza para sumar?",
      opciones: ["-", "/", "+", "*"],
      correcta: 2,
      explicacion:
        "El operador + se utiliza para realizar sumas."
    },
    {
      id: 2,
      pregunta: "¿Qué operador se utiliza para restar?",
      opciones: ["-", "+", "*", "/"],
      correcta: 0,
      explicacion:
        "El operador - se utiliza para realizar restas."
    },
    {
      id: 3,
      pregunta: "¿Qué operador se utiliza para multiplicar?",
      opciones: ["x", "*", "+", "/"],
      correcta: 1,
      explicacion:
        "En Python la multiplicación se representa con *."
    },
    {
      id: 4,
      pregunta: "¿Qué operador se utiliza para dividir?",
      opciones: ["÷", "/", "*", "-"],
      correcta: 1,
      explicacion:
        "En Python la división se representa con /."
    },
    {
      id: 5,
      pregunta: "¿Cuál es el resultado de 10 + 5?",
      opciones: ["5", "15", "50", "105"],
      correcta: 1,
      explicacion:
        "10 + 5 es igual a 15."
    },
    {
      id: 6,
      pregunta: "¿Cuál es el resultado de 20 - 8?",
      opciones: ["12", "28", "160", "10"],
      correcta: 0,
      explicacion:
        "20 - 8 es igual a 12."
    },
    {
      id: 7,
      pregunta: "¿Cuál es el resultado de 4 * 3?",
      opciones: ["7", "12", "43", "1"],
      correcta: 1,
      explicacion:
        "4 multiplicado por 3 es igual a 12."
    },
    {
      id: 8,
      pregunta: "¿Cuál es el resultado de 20 / 4?",
      opciones: ["5", "4", "24", "80"],
      correcta: 0,
      explicacion:
        "20 dividido entre 4 es igual a 5."
    },
    {
      id: 9,
      pregunta: "¿Cuál es el resultado de 10 + 5 * 2?",
      opciones: ["30", "20", "25", "15"],
      correcta: 1,
      explicacion:
        "Primero se realiza la multiplicación (5×2=10) y después la suma (10+10=20)."
    },
    {
      id: 10,
      pregunta: "¿Para qué sirven los operadores?",
      opciones: [
        "Para crear variables",
        "Para realizar cálculos",
        "Para imprimir texto",
        "Para crear comentarios"
      ],
      correcta: 1,
      explicacion:
        "Los operadores permiten realizar operaciones matemáticas."
    }
  ]
},
]

