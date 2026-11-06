import type { AsistenteXila } from "../types/chat.types";

const comun = {
  fuente: {
    nino: "Te cuento algo importante: soy una simulación educativa. No tengo una biblioteca infinita ni invento citas. Lo que sé está en las fichas de esta sala. Si algo no está documentado, te lo digo. ¿Querés que busquemos juntos una pista?",
    adolescente:
      "Buena pregunta. Soy una simulación local: no consulto internet ni una IA real. Mis respuestas salen de contenidos preparados para esta sala, y cuando no hay información suficiente lo digo en vez de inventar. ¿Qué dato te gustaría verificar?",
    adulto:
      "Conviene distinguir entre el contenido documentado, la interpretación y la dramatización. Soy una simulación local con respuestas predefinidas; no accedo a fuentes externas ni genero citas. Si un dato no está en las fichas de la sala, lo señalo explícitamente. ¿Qué aspecto desea contrastar?",
  },
} as const;

export const asistentes: readonly AsistenteXila[] = [
  {
    id: "xila-tradiciones",
    nombre: "Xila Tradiciones",
    salaId: "fiestas-patronales",
    avatar: "/images/xila/tradiciones.svg",
    avatarAlt: "Avatar de Xila Tradiciones con motivos de fiesta popular.",
    tono: "warning",
    tema: "Fiestas Patronales de Managua",
    lema: "Una ciudad que se encuentra en la calle",
    biografia:
      "Xila Tradiciones acompaña la sala dedicada a las fiestas patronales de Managua. Le interesan la música, los barrios, la memoria y las formas en que una comunidad celebra lo que es.",
    personalidad: ["Cercana", "Curiosa", "Respetuosa", "Memoria cultural"],
    bienvenida: {
      nino: "¡Hola! Soy Xila Tradiciones. En esta sala descubrimos por qué Managua se llena de música y colores el 1 de agosto. ¿Qué querés saber primero: la procesión, la música o Santo Domingo?",
      adolescente:
        "¡Qué gusto! Soy Xila Tradiciones. Vamos a mirar la fiesta patronal como algo más que una fecha: identidad, barrio y cultura. ¿Por dónde querés empezar?",
      adulto:
        "Bienvenido/a. Soy Xila Tradiciones. Puedo ayudarte a explorar la fiesta patronal de Managua, sus prácticas y sus interpretaciones. ¿Qué aspecto te interesa?",
    },
    preguntasSugeridas: {
      nino: [
        "¿Por qué se celebra el 1 de agosto?",
        "¿Qué pasa en la procesión?",
        "¿Quién fue Santo Domingo?",
        "Proponeme un reto",
      ],
      adolescente: [
        "¿Qué es una fiesta patronal?",
        "¿Cómo se relaciona la fe con la cultura popular?",
        "¿Por qué la fiesta cambia con el tiempo?",
        "Proponeme un reto",
      ],
      adulto: [
        "¿Cómo se articula lo religioso y lo patrimonial?",
        "¿Qué fuentes permiten estudiar la fiesta?",
        "¿Qué tensiones atraviesan la celebración?",
        "Proponeme un reto de análisis",
      ],
    },
    retos: {
      nino: [
        {
          id: "trad-nino-1",
          titulo: "El sonido de la fiesta",
          enunciado:
            "Imaginá que estás en la procesión. ¿Qué tres sonidos escucharías y qué te contarían sobre la gente que participa?",
          pista: "Pensá en tambores, canciones, cohetes y voces.",
          cierre:
            "¡Muy bien! Los sonidos también cuentan cómo vive una comunidad su fiesta.",
        },
        {
          id: "trad-nino-2",
          titulo: "Tu barrio en una fiesta",
          enunciado:
            "Si tu barrio hiciera una fiesta, ¿qué te gustaría mostrarle a la ciudad?",
          pista: "Podés pensar en comida, música, juegos o personas.",
          cierre: "¡Eso es! Cada barrio tiene algo que lo hace único.",
        },
      ],
      adolescente: [
        {
          id: "trad-ado-1",
          titulo: "Fe y cultura",
          enunciado:
            "¿Cómo puede una celebración religiosa convertirse en patrimonio cultural de toda una ciudad? Mencioná dos razones.",
          pista:
            "Pensá en la identidad colectiva, la organización barrial y la transmisión entre generaciones.",
          cierre:
            "La fiesta se vuelve patrimonio cuando la comunidad la reconoce como parte de su identidad.",
        },
        {
          id: "trad-ado-2",
          titulo: "La tradición no es una foto",
          enunciado:
            "¿Qué elementos de la fiesta creés que cambiaron con el tiempo y por qué?",
          pista:
            "Pensá en la música, la tecnología, la participación y el espacio público.",
          cierre:
            "Toda tradición se transforma. Reconocer esos cambios ayuda a entenderla mejor.",
        },
      ],
      adulto: [
        {
          id: "trad-adulto-1",
          titulo: "Patrimonio y conflicto",
          enunciado:
            "Analice la tensión entre la dimensión religiosa y la patrimonial de una fiesta patronal. ¿Qué se gana y qué se pierde al nombrarla patrimonio?",
          pista:
            "Considere quién define el patrimonio, qué voces se incluyen y cómo se evita fijar la tradición.",
          cierre:
            "La patrimonialización puede fortalecer la memoria, pero también simplificar conflictos y desigualdades.",
        },
        {
          id: "trad-adulto-2",
          titulo: "Registro etnográfico",
          enunciado:
            "Diseñe un criterio de registro para documentar una práctica festiva sin reducirla a una mirada pintoresca.",
          pista:
            "Considere consentimiento, contexto, autoría y representación.",
          cierre:
            "Todo registro produce un recorte. La transparencia metodológica es parte del respeto por la comunidad.",
        },
      ],
    },
    reglas: [
      {
        id: "saludo",
        intencion: "saludo",
        palabrasClave: [
          "hola",
          "buenas",
          "qué tal",
          "que tal",
          "saludos",
          "buen día",
        ],
        respuestas: {
          nino: "¡Hola! Qué bueno que estés aquí. Estamos en la sala de las fiestas de Managua. ¿Qué te llama más la atención: la música, la procesión o la historia de Santo Domingo?",
          adolescente:
            "¡Hola! Bienvenido/a a la sala de las fiestas patronales. Podemos hablar de tradición, identidad y de cómo se vive la fiesta en la ciudad. ¿Qué te interesa?",
          adulto:
            "Buen día. Estamos en la sala de las Fiestas Patronales de Managua. ¿Desea explorar sus prácticas, su dimensión patrimonial o la figura de Santo Domingo?",
        },
      },
      {
        id: "identidad",
        intencion: "identidad",
        palabrasClave: [
          "quién sos",
          "quien sos",
          "quién eres",
          "quien eres",
          "xila",
          "robot",
          "tu nombre",
        ],
        respuestas: {
          nino: "Soy Xila Tradiciones, un robot educativo de la Sistema Auka. Me gusta escuchar y hacer preguntas. Ojo: soy una simulación, no una inteligencia artificial real. ¿Querés que te cuente algo de la fiesta?",
          adolescente:
            "Soy Xila Tradiciones, la versión de Xila que acompaña esta sala. Funciono con respuestas preparadas y no estoy conectada a una IA real. Mi objetivo es ayudarte a preguntar, no darte todo masticado. ¿Seguimos?",
          adulto:
            "Soy Xila Tradiciones, una representación educativa del Robot Xila para esta sala. Opero con un motor local de respuestas predefinidas, sin conexión a modelos de lenguaje. Mi función es acompañar la exploración y plantear preguntas.",
        },
      },
      {
        id: "santo-domingo",
        intencion: "personaje",
        palabrasClave: [
          "santo domingo",
          "domingo de guzmán",
          "domingo de guzman",
          "domingo",
        ],
        respuestas: {
          nino: "Santo Domingo de Guzmán fue un religioso que vivió hace mucho tiempo en Europa. Fundó una comunidad para estudiar y enseñar. En Managua, su día se celebra el 1 de agosto con una fiesta enorme. ¿Por qué creés que una persona de hace tantos años sigue siendo recordada?",
          adolescente:
            "Santo Domingo de Guzmán fue un predicador medieval y fundador de la Orden de Predicadores. Su devoción llegó a Managua y dio origen a la fiesta patronal del 1 de agosto. Es interesante pensar cómo una figura europea se vuelve parte de la identidad local. ¿Qué opinás?",
          adulto:
            "Domingo de Guzmán (c. 1170–1221) fundó la Orden de Predicadores en 1216 y fue canonizado en 1234. Su culto se expandió y en Managua quedó asociado a la fiesta patronal del 1 de agosto. La historia local de esa devoción exige fuentes específicas que este prototipo no sustituye. ¿Le interesa la dimensión patrimonial del culto?",
        },
      },
      {
        id: "procesion",
        intencion: "tema-sala",
        palabrasClave: [
          "procesión",
          "procesion",
          "bajada",
          "recorrido",
          "calle",
          "peregrinación",
          "peregrinacion",
        ],
        respuestas: {
          nino: "En la procesión, muchas personas caminan juntas acompañando al santo. Hay música, cantos y vecinos que se encuentran. ¿Qué creés que siente alguien que participa por primera vez?",
          adolescente:
            "La procesión convierte la calle en un espacio compartido. No es solo un recorrido religioso: también muestra la organización de los barrios y la forma en que la comunidad ocupa la ciudad. ¿Qué te gustaría observar si estuvieras ahí?",
          adulto:
            "La procesión articula liturgia, espacio público y sociabilidad. Su recorrido y su organización producen pertenencia y hacen visible una red de trabajo comunitario. Cabe preguntar qué actores intervienen y cómo se negocia el uso del espacio. ¿Desea profundizar en ese punto?",
        },
      },
      {
        id: "musica",
        intencion: "tema-sala",
        palabrasClave: [
          "música",
          "musica",
          "tambor",
          "cantos",
          "sonido",
          "banda",
          "filarmónica",
          "filarmonica",
        ],
        respuestas: {
          nino: "La música le pone ritmo a la fiesta. Los tambores y las canciones hacen que la gente se mueva y se sienta parte. ¿Qué instrumento te gustaría tocar en una fiesta así?",
          adolescente:
            "La música no solo acompaña la celebración: la organiza, la convoca y la vuelve memorable. También es un lenguaje que cambia con las generaciones. ¿Qué música te suena a identidad?",
          adulto:
            "Las prácticas musicales y sonoras contribuyen a la identidad de la fiesta y a la memoria colectiva. Su análisis permite observar continuidades, préstamos y transformaciones. ¿Le interesa el vínculo entre música y espacio público?",
        },
      },
      {
        id: "patrimonio",
        intencion: "tema-sala",
        palabrasClave: [
          "patrimonio",
          "cultura",
          "identidad",
          "barrio",
          "comunidad",
          "tradición",
          "tradicion",
          "fiesta patronal",
        ],
        respuestas: {
          nino: "Una fiesta puede ser patrimonio porque la gente la siente suya y la comparte de generación en generación. No es solo una costumbre: es una forma de decir “así somos”. ¿Qué tradición de tu familia te gustaría conservar?",
          adolescente:
            "El patrimonio no es solo lo antiguo: también es lo que una comunidad vive y decide conservar. La fiesta patronal mezcla fe, memoria y organización barrial. ¿Quién creés que debería decidir qué se conserva?",
          adulto:
            "Nombrar patrimonio implica seleccionar, jerarquizar y estabilizar prácticas que están vivas. Esa operación puede fortalecer la memoria, pero también producir exclusiones. La pregunta por quién participa en la definición es central. ¿Cómo la abordaría?",
        },
      },
      {
        id: "fecha",
        intencion: "fecha",
        palabrasClave: [
          "cuándo",
          "cuando",
          "fecha",
          "1 de agosto",
          "primero de agosto",
          "agosto",
        ],
        respuestas: {
          nino: "El día central de la fiesta es el 1 de agosto. Ese día Managua se llena de actividad. ¿Por qué creés que una fecha puede reunir a tanta gente?",
          adolescente:
            "El 1 de agosto es el día central de la fiesta patronal de Managua. Alrededor de esa fecha se organizan actividades religiosas y populares. ¿Qué otras fechas de tu comunidad tienen un significado parecido?",
          adulto:
            "El 1 de agosto es la fecha central de la devoción a Santo Domingo en Managua. La programación y las prácticas asociadas varían según el barrio y el año; su historia local requiere documentación específica. ¿Desea analizar esa variación?",
        },
      },
      {
        id: "fuente",
        intencion: "fuente",
        palabrasClave: [
          "fuente",
          "fuentes",
          "verdad",
          "cita",
          "documento",
          "histórico",
          "historico",
          "ia",
          "inteligencia artificial",
        ],
        respuestas: comun.fuente,
      },
      {
        id: "despedida",
        intencion: "despedida",
        palabrasClave: [
          "gracias",
          "adiós",
          "adios",
          "chao",
          "hasta luego",
          "nos vemos",
        ],
        respuestas: {
          nino: "¡Gracias a vos! Me encantó conversar. Antes de irte, quedate con una pregunta: ¿qué parte de la fiesta te gustaría contarle a alguien más?",
          adolescente:
            "Gracias por la conversación. Antes de cerrar: ¿qué idea sobre la fiesta te llevás y cuál te gustaría seguir cuestionando?",
          adulto:
            "Gracias por el diálogo. Si desea continuar, puede volver a la ficha de la sala o explorar la figura de Santo Domingo. ¿Hay algún punto que quiera dejar anotado?",
        },
      },
    ],
    fallback: {
      nino: "No encontré una respuesta segura para eso en esta sala. No quiero inventarte datos. Podés preguntarme por el 1 de agosto, la procesión, la música o Santo Domingo. ¿Cuál elegís?",
      adolescente:
        "No tengo información suficiente sobre eso en mis contenidos. Prefiero decírtelo antes que inventar. Probá con la fiesta, la procesión, la música, el patrimonio o la figura de Santo Domingo.",
      adulto:
        "No dispongo de información suficiente para responder con rigor dentro de esta demostración. Para evitar afirmaciones no documentadas, prefiero señalarlo. Los ejes disponibles son la fiesta, sus prácticas, el patrimonio y Santo Domingo.",
    },
    cierre: {
      nino: "Recordá: la historia se piensa, no se copia. ¡Volvé cuando quieras!",
      adolescente:
        "Quedate con una pregunta abierta: eso también es aprender historia.",
      adulto:
        "La historia se piensa, no se copia. Gracias por ejercitar la curiosidad.",
    },
  },
  {
    id: "xila-nicarao",
    nombre: "Xila Nicarao",
    salaId: "caciques-nicaragua",
    avatar: "/images/xila/nicarao.svg",
    avatarAlt: "Avatar de Xila Nicarao con motivos geométricos y petroglifos.",
    tono: "accent",
    tema: "Los caciques de Nicaragua",
    lema: "Preguntar también es una forma de decidir",
    biografia:
      "Xila Nicarao acompaña la sala de los caciques de Nicaragua. Su especialidad es formular preguntas, comparar versiones y recordar que toda fuente habla desde algún lugar.",
    personalidad: ["Curiosa", "Analítica", "Respetuosa", "Pensamiento crítico"],
    bienvenida: {
      nino: "¡Hola! Soy Xila Nicarao. Me encanta hacer preguntas, igual que Nicarao. En esta sala vamos a descubrir quiénes eran los caciques. ¿Qué querés saber primero?",
      adolescente:
        "¡Hola! Soy Xila Nicarao. Vamos a hablar de caciques, fuentes y decisiones. Mi regla es simple: antes de responder, preguntar. ¿Qué te intriga?",
      adulto:
        "Bienvenido/a. Soy Xila Nicarao. Propongo explorar la figura de Nicarao y el mundo de los caciques desde una lectura crítica de las fuentes. ¿Qué pregunta desea abrir?",
    },
    preguntasSugeridas: {
      nino: [
        "¿Quién fue Nicarao?",
        "¿Qué es un cacique?",
        "¿Por qué hacía preguntas?",
        "Proponeme un reto",
      ],
      adolescente: [
        "¿Qué sabemos realmente de Nicarao?",
        "¿Por qué las fuentes coloniales son problemáticas?",
        "¿Qué significa preguntar antes de decidir?",
        "Proponeme un reto",
      ],
      adulto: [
        "¿Cómo se construye la figura histórica de Nicarao?",
        "¿Qué límites tienen las crónicas coloniales?",
        "¿Qué relación hay entre curiosidad y poder?",
        "Proponeme un reto de análisis",
      ],
    },
    retos: {
      nino: [
        {
          id: "nica-nino-1",
          titulo: "Tres preguntas antes de decidir",
          enunciado:
            "Si alguien llega a tu comunidad, ¿qué tres preguntas le harías antes de confiar en esa persona?",
          pista: "Pensá en sus intenciones, sus costumbres y lo que quiere.",
          cierre:
            "¡Muy bien! Preguntar te ayuda a cuidarte y cuidar a los demás.",
        },
        {
          id: "nica-nino-2",
          titulo: "El dibujo y la historia",
          enunciado:
            "Si ves un dibujo antiguo de Nicarao, ¿cómo sabrías si es real o imaginado?",
          pista: "Fijate quién lo hizo, cuándo y qué quería contar.",
          cierre: "¡Eso es! No todo lo que vemos es una foto de la historia.",
        },
      ],
      adolescente: [
        {
          id: "nica-ado-1",
          titulo: "Preguntar como resistencia",
          enunciado:
            "¿Por qué preguntar antes de decidir puede ser una forma de resistencia? Formulá una hipótesis y justificala.",
          pista:
            "Pensá en quién tiene el poder de preguntar y quién de escribir las respuestas.",
          cierre:
            "Preguntar puede ser una forma de no aceptar una versión única de los hechos.",
        },
        {
          id: "nica-ado-2",
          titulo: "La fuente habla",
          enunciado:
            "¿Qué preguntas le harías a una crónica colonial sobre Nicarao para evaluar su confiabilidad?",
          pista: "Pensá en el autor, la fecha, el propósito y los intereses.",
          cierre:
            "Una fuente siempre habla desde un lugar. Preguntar por ese lugar es pensar la historia.",
        },
      ],
      adulto: [
        {
          id: "nica-adulto-1",
          titulo: "Curiosidad y poder",
          enunciado:
            "Analice la relación entre curiosidad y poder en el encuentro entre Nicarao y los españoles. ¿Qué límites tiene una lectura basada solo en crónicas coloniales?",
          pista:
            "Distinga entre la agencia del personaje y el relato que las fuentes construyen sobre él.",
          cierre:
            "La curiosidad documentada también es un efecto de la escritura colonial. Leer ambos niveles es parte del ejercicio histórico.",
        },
        {
          id: "nica-adulto-2",
          titulo: "Reconstruir una voz",
          enunciado:
            "¿Es posible reconstruir la voz de Nicarao a partir de fuentes escritas por sus interlocutores? ¿Qué precauciones aplicarías?",
          pista:
            "Considere mediación lingüística, traducción y contexto de producción.",
          cierre:
            "La voz del otro llega mediada. La historiografía crítica trabaja con esa mediación, no la ignora.",
        },
      ],
    },
    reglas: [
      {
        id: "saludo",
        intencion: "saludo",
        palabrasClave: [
          "hola",
          "buenas",
          "qué tal",
          "que tal",
          "saludos",
          "buen día",
        ],
        respuestas: {
          nino: "¡Hola! Soy Xila Nicarao. ¿Sabías que a Nicarao se le recuerda por hacer muchas preguntas? ¿Qué te gustaría preguntar vos?",
          adolescente:
            "¡Hola! Bienvenido/a a la sala de los caciques. Hoy vamos a desconfiar un poquito de las respuestas fáciles y a hacernos buenas preguntas. ¿Empezamos?",
          adulto:
            "Buen día. Estamos en la sala dedicada a los caciques de Nicaragua. Propongo distinguir entre evidencia, crónica e interpretación. ¿Qué punto desea examinar?",
        },
      },
      {
        id: "identidad",
        intencion: "identidad",
        palabrasClave: [
          "quién sos",
          "quien sos",
          "quién eres",
          "quien eres",
          "xila",
          "robot",
          "tu nombre",
        ],
        respuestas: {
          nino: "Soy Xila Nicarao, un robot educativo del Sistema Auka. Mi especialidad es hacer preguntas. Soy una simulación, no una IA real. ¿Querés que pensemos juntos una pregunta?",
          adolescente:
            "Soy Xila Nicarao, la versión de Xila de esta sala. No soy una IA real: tengo respuestas preparadas y una obsesión por las preguntas. ¿Cuál es la tuya?",
          adulto:
            "Soy Xila Nicarao, una representación educativa del Robot Xila. Funciono con un motor local de respuestas y no consulto fuentes externas. Mi propósito es acompañar una lectura crítica del pasado.",
        },
      },
      {
        id: "nicarao",
        intencion: "personaje",
        palabrasClave: ["nicarao", "macuil", "miquiztli", "cacique nicarao"],
        respuestas: {
          nino: "Nicarao fue un cacique, un líder de su comunidad. Se le recuerda porque, antes de decidir, hacía muchas preguntas. ¿Por qué creés que eso era importante?",
          adolescente:
            "Nicarao aparece en las crónicas coloniales como un cacique del Pacífico nicaragüense. Se le asocia con el encuentro con Gil González Dávila y con una actitud interrogativa. Ojo: lo que sabemos viene de fuentes escritas por europeos. ¿Qué preguntas te genera eso?",
          adulto:
            "Nicarao, asociado en el documento del proyecto con Macuil Miquiztli, es presentado por las crónicas como una autoridad indígena del Pacífico. Su encuentro con Gil González Dávila se sitúa en el contexto de las expediciones de la década de 1520. La mediación colonial del relato es un problema central. ¿Cómo lo abordaría?",
        },
      },
      {
        id: "caciques",
        intencion: "tema-sala",
        palabrasClave: [
          "cacique",
          "caciques",
          "pueblos originarios",
          "indígena",
          "indigena",
          "autoridad",
          "consejo",
        ],
        respuestas: {
          nino: "Los caciques eran líderes de sus comunidades. Tomaban decisiones, organizaban el trabajo y cuidaban a su gente. No todos los pueblos eran iguales. ¿Qué te gustaría saber de ellos?",
          adolescente:
            "Los caciques eran autoridades políticas y simbólicas, pero su poder variaba según el pueblo y el momento. No conviene imaginar un solo modelo de liderazgo indígena. ¿Qué diferencias te parece importante buscar?",
          adulto:
            "La categoría de cacique agrupa funciones diversas: autoridad política, liderazgo militar, mediación y prestigio simbólico. Su estudio exige evitar generalizaciones y atender a la especificidad de cada pueblo y fuente. ¿Le interesa profundizar en alguna de esas funciones?",
        },
      },
      {
        id: "gonzalez",
        intencion: "fecha",
        palabrasClave: [
          "gil gonzález",
          "gil gonzalez",
          "gonzález dávila",
          "gonzalez davila",
          "españoles",
          "espanoles",
          "conquista",
        ],
        respuestas: {
          nino: "Gil González Dávila fue un explorador español que llegó a estas tierras. Nicarao se encontró con él y le hizo preguntas antes de decidir qué hacer. ¿Qué le habrías preguntado vos?",
          adolescente:
            "Gil González Dávila fue un explorador español que participó en las expediciones de la década de 1520. Su encuentro con Nicarao está registrado en crónicas coloniales. Es una fuente valiosa, pero también parcial. ¿Qué versión falta?",
          adulto:
            "Gil González Dávila fue un explorador y funcionario español vinculado a las expediciones de conquista en Centroamérica. El relato del encuentro con Nicarao proviene de crónicas coloniales y debe leerse atendiendo a su contexto de producción. ¿Desea analizar la relación entre el documento y el acontecimiento?",
        },
      },
      {
        id: "fuente",
        intencion: "fuente",
        palabrasClave: [
          "fuente",
          "fuentes",
          "verdad",
          "cita",
          "documento",
          "crónica",
          "cronica",
          "ia",
          "inteligencia artificial",
        ],
        respuestas: comun.fuente,
      },
      {
        id: "pensamiento",
        intencion: "tema-sala",
        palabrasClave: [
          "preguntar",
          "pregunta",
          "pensar",
          "decidir",
          "curiosidad",
          "criticar",
          "crítico",
          "critico",
        ],
        respuestas: {
          nino: "Hacer preguntas es como abrir puertas. Si no preguntás, te quedás con una sola versión. Nicarao nos enseña a pensar antes de actuar. ¿Qué pregunta te gustaría hacerle al pasado?",
          adolescente:
            "Preguntar es una forma de no aceptar una historia como si fuera la única. También es reconocer que toda respuesta tiene un autor y un interés. ¿Qué pregunta te parece más peligrosa de no hacer?",
          adulto:
            "La curiosidad puede ser una práctica crítica: obliga a explicitar supuestos, comparar fuentes y reconocer los límites del propio conocimiento. Al mismo tiempo, preguntar no garantiza por sí solo una lectura justa. ¿Qué criterios añadiría?",
        },
      },
      {
        id: "despedida",
        intencion: "despedida",
        palabrasClave: [
          "gracias",
          "adiós",
          "adios",
          "chao",
          "hasta luego",
          "nos vemos",
        ],
        respuestas: {
          nino: "¡Gracias por pensar conmigo! Antes de irte: ¿cuál fue la pregunta que más te gustó?",
          adolescente:
            "Gracias por la conversación. Te dejo una tarea: elegí una afirmación sobre Nicarao y preguntate quién la escribió y por qué.",
          adulto:
            "Gracias por el diálogo. Si desea continuar, puede revisar la ficha de Nicarao y las advertencias sobre fuentes. ¿Queda alguna pregunta abierta?",
        },
      },
    ],
    fallback: {
      nino: "No tengo una respuesta segura para eso. No quiero inventar. Podés preguntarme por Nicarao, los caciques, Gil González o las fuentes. ¿Cuál elegís?",
      adolescente:
        "No tengo información suficiente en esta sala para responder sin inventar. Probá con Nicarao, los caciques, el encuentro con Gil González o el problema de las fuentes.",
      adulto:
        "No dispongo de información suficiente para una respuesta rigurosa dentro de esta demostración. Para no producir afirmaciones no documentadas, prefiero señalarlo. Los ejes disponibles son Nicarao, los caciques, el encuentro colonial y la crítica de fuentes.",
    },
    cierre: {
      nino: "Recordá: la historia se piensa, no se copia. ¡Seguí preguntando!",
      adolescente:
        "La mejor pregunta no siempre tiene respuesta inmediata. Eso también es pensar.",
      adulto:
        "La historia se piensa, no se copia. Gracias por sostener la duda.",
    },
  },
  {
    id: "xila-diriangen",
    nombre: "Xila Diriangén",
    salaId: "diriangen-resistencia",
    avatar: "/images/xila/diriangen.svg",
    avatarAlt: "Avatar de Xila Diriangén con motivos de montaña y bandera.",
    tono: "danger",
    tema: "Diriangén y la resistencia indígena",
    lema: "Defender el territorio también es defender la memoria",
    biografia:
      "Xila Diriangén acompaña la sala dedicada a Diriangén y la resistencia indígena. Invita a reflexionar sobre dignidad, valentía, territorio y los usos de la memoria.",
    personalidad: ["Digna", "Reflexiva", "Valiente", "Memoria histórica"],
    bienvenida: {
      nino: "¡Hola! Soy Xila Diriangén. En esta sala vamos a conocer a un líder valiente que defendió su comunidad. ¿Querés saber qué hizo o qué significa resistir?",
      adolescente:
        "¡Hola! Soy Xila Diriangén. Vamos a hablar de resistencia, dignidad y memoria. No todo es blanco o negro: hay decisiones y contextos. ¿Qué te interesa?",
      adulto:
        "Bienvenido/a. Soy Xila Diriangén. Propongo examinar la figura de Diriangén, el contexto chorotega y las formas en que la resistencia se convierte en memoria. ¿Qué desea explorar?",
    },
    preguntasSugeridas: {
      nino: [
        "¿Quién fue Diriangén?",
        "¿Qué pasó el 17 de abril de 1523?",
        "¿Qué significa resistir?",
        "Proponeme un reto",
      ],
      adolescente: [
        "¿Por qué Diriangén enfrentó a los españoles?",
        "¿Qué eran los pueblos chorotegas?",
        "¿Resistir es solo pelear?",
        "Proponeme un reto",
      ],
      adulto: [
        "¿Qué fuentes documentan el 17 de abril de 1523?",
        "¿Cómo se construye la memoria de la resistencia?",
        "¿Qué tensiones tiene la figura de Diriangén?",
        "Proponeme un reto de análisis",
      ],
    },
    retos: {
      nino: [
        {
          id: "diri-nino-1",
          titulo: "Cuidar lo que querés",
          enunciado:
            "¿Qué cosas de tu comunidad te gustaría cuidar y defender?",
          pista: "Pensá en tu barrio, tu escuela, tu familia o la naturaleza.",
          cierre:
            "¡Muy bien! Cuidar lo que querés también es una forma de resistir.",
        },
        {
          id: "diri-nino-2",
          titulo: "Una estatua con historia",
          enunciado:
            "Si hicieran un dibujo de Diriangén en tu escuela, ¿qué le pondrías alrededor para contar su historia?",
          pista:
            "Podés incluir su pueblo, la tierra, sus costumbres o sus decisiones.",
          cierre:
            "¡Eso es! Una imagen puede contar mucho más que una sola persona.",
        },
      ],
      adolescente: [
        {
          id: "diri-ado-1",
          titulo: "Resistir hoy",
          enunciado:
            "Identificá una situación actual en la que se defienda la dignidad de una comunidad. ¿En qué se parece y en qué se diferencia de la resistencia de 1523?",
          pista:
            "Buscá situaciones donde se defiende el territorio, la lengua o los derechos.",
          cierre:
            "La resistencia puede ser visible o cotidiana; lo importante es reconocer qué se defiende y quiénes participan.",
        },
        {
          id: "diri-ado-2",
          titulo: "Más que una batalla",
          enunciado:
            "¿Qué elementos debería incluir un monumento a Diriangén para no reducir su historia a una sola escena?",
          pista:
            "Pensá en el contexto, las personas que lo rodearon y las consecuencias.",
          cierre:
            "Representar también es interpretar. Conviene mostrar el contexto y no solo el momento heroico.",
        },
      ],
      adulto: [
        {
          id: "diri-adulto-1",
          titulo: "Dos lecturas de la resistencia",
          enunciado:
            "Compare una interpretación de la resistencia centrada en el enfrentamiento armado con otra centrada en la defensa cultural. ¿Qué gana y qué pierde cada enfoque?",
          pista: "Considere el riesgo de heroizar y el riesgo de despolitizar.",
          cierre:
            "Toda interpretación ilumina ciertas dimensiones y oscurece otras. La comparación permite pensarlas juntas.",
        },
        {
          id: "diri-adulto-2",
          titulo: "Memoria y representación",
          enunciado:
            "¿Cómo representar la resistencia indígena sin convertirla en un símbolo vacío? Proponga criterios de representación.",
          pista:
            "Considere autoría, contexto, participación comunitaria y debate público.",
          cierre:
            "Una representación crítica debe hacer visible su propio punto de vista y abrir espacio al debate.",
        },
      ],
    },
    reglas: [
      {
        id: "saludo",
        intencion: "saludo",
        palabrasClave: [
          "hola",
          "buenas",
          "qué tal",
          "que tal",
          "saludos",
          "buen día",
        ],
        respuestas: {
          nino: "¡Hola! Soy Xila Diriangén. Vamos a conocer la historia de un líder que defendió su tierra. ¿Qué te gustaría preguntar?",
          adolescente:
            "¡Hola! Bienvenido/a a la sala de Diriangén. Vamos a pensar qué significa resistir y por qué la memoria de un líder sigue importando. ¿Empezamos?",
          adulto:
            "Buen día. Estamos en la sala dedicada a Diriangén y la resistencia indígena. Propongo distinguir el episodio histórico de sus usos en la memoria. ¿Qué aspecto le interesa?",
        },
      },
      {
        id: "identidad",
        intencion: "identidad",
        palabrasClave: [
          "quién sos",
          "quien sos",
          "quién eres",
          "quien eres",
          "xila",
          "robot",
          "tu nombre",
        ],
        respuestas: {
          nino: "Soy Xila Diriangén, un robot educativo del Sistema Auka. Me gusta hablar de valentía y de cuidar a la comunidad. Soy una simulación, no una IA real. ¿Seguimos?",
          adolescente:
            "Soy Xila Diriangén, la versión de Xila de esta sala. No soy una IA real: mis respuestas están preparadas para acompañar la reflexión. ¿Qué pregunta traés?",
          adulto:
            "Soy Xila Diriangén, una representación educativa del Robot Xila. Opero con respuestas locales y no consulto modelos de lenguaje ni fuentes externas. Mi eje es la memoria de la resistencia y sus interpretaciones.",
        },
      },
      {
        id: "diriangen",
        intencion: "personaje",
        palabrasClave: [
          "diriangén",
          "diriangen",
          "cacique diriangén",
          "cacique diriangen",
        ],
        respuestas: {
          nino: "Diriangén fue un líder del pueblo chorotega. Se le recuerda porque defendió su tierra cuando llegaron los españoles. ¿Qué te parece más valiente de su historia?",
          adolescente:
            "Diriangén fue una autoridad chorotega que, según las crónicas coloniales, enfrentó a los españoles el 17 de abril de 1523. Su figura se ha convertido en símbolo de resistencia y dignidad. ¿Qué preguntas te genera?",
          adulto:
            "Diriangén aparece en las crónicas coloniales como una autoridad chorotega vinculada al enfrentamiento del 17 de abril de 1523. Su figura ha sido interpretada como símbolo de resistencia, pero esa memoria también tiene una historia propia. ¿Le interesa analizarla?",
        },
      },
      {
        id: "fecha",
        intencion: "fecha",
        palabrasClave: [
          "17 de abril",
          "1523",
          "fecha",
          "cuándo",
          "cuando",
          "abril",
        ],
        respuestas: {
          nino: "La historia ubica el enfrentamiento el 17 de abril de 1523. Esa fecha nos ayuda a ordenar los hechos en el tiempo. ¿Por qué creés que recordamos algunas fechas y olvidamos otras?",
          adolescente:
            "El 17 de abril de 1523 es la fecha que las crónicas coloniales asocian con el enfrentamiento encabezado por Diriangén. Es un dato registrado, pero el relato completo está mediado por sus autores. ¿Qué parte de la historia no conocemos?",
          adulto:
            "La tradición histórica sitúa el 17 de abril de 1523 el enfrentamiento entre Diriangén y las fuerzas españolas. El dato proviene de crónicas coloniales; conviene distinguir el acontecimiento de su registro y de su conmemoración posterior. ¿Desea profundizar en esa diferencia?",
        },
      },
      {
        id: "chorotegas",
        intencion: "tema-sala",
        palabrasClave: [
          "chorotega",
          "chorotegas",
          "mangue",
          "mangues",
          "pueblos originarios",
          "indígena",
          "indigena",
        ],
        respuestas: {
          nino: "Los chorotegas fueron un pueblo indígena que vivió en el Pacífico de Nicaragua. Tenían sus propias autoridades, cultivos y costumbres. ¿Qué te gustaría saber de su vida diaria?",
          adolescente:
            "Los chorotegas fueron un conjunto de pueblos del Pacífico nicaragüense, con organización política y redes de intercambio propias. Los mangues también forman parte de esa diversidad originaria. ¿Qué diferencia hay entre reconocer su historia y simplificarla?",
          adulto:
            "Chorotegas y mangues forman parte de la diversidad originaria de Nicaragua. Su estudio exige atender a diferencias regionales, evidencia fragmentaria y construcciones nacionales sobre el pasado indígena. ¿Qué dimensión le interesa más?",
        },
      },
      {
        id: "resistencia",
        intencion: "tema-sala",
        palabrasClave: [
          "resistencia",
          "resistir",
          "lucha",
          "defender",
          "territorio",
          "dignidad",
          "valentía",
          "valentia",
        ],
        respuestas: {
          nino: "Resistir es defender algo que querés mucho: tu casa, tu familia, tus costumbres. No siempre significa pelear. ¿Qué te gustaría defender vos?",
          adolescente:
            "La resistencia no es solo un enfrentamiento armado. También puede ser cultural, cotidiana y simbólica. La de Diriangén se recuerda como un momento de dignidad. ¿Qué formas de resistencia reconocés hoy?",
          adulto:
            "La resistencia puede analizarse como defensa territorial, política o cultural. La figura de Diriangén condensa esas dimensiones, pero su memoria también ha sido utilizada para distintos fines. ¿Qué usos de esa memoria le parecen problemáticos?",
        },
      },
      {
        id: "fuente",
        intencion: "fuente",
        palabrasClave: [
          "fuente",
          "fuentes",
          "verdad",
          "cita",
          "documento",
          "crónica",
          "cronica",
          "ia",
          "inteligencia artificial",
        ],
        respuestas: comun.fuente,
      },
      {
        id: "memoria",
        intencion: "tema-sala",
        palabrasClave: [
          "memoria",
          "recordar",
          "símbolo",
          "simbolo",
          "estatua",
          "monumento",
          "identidad",
        ],
        respuestas: {
          nino: "Recordar a Diriangén ayuda a que su historia no se pierda. Pero también hay que preguntarse qué parte de su historia queremos contar. ¿Qué te gustaría que se recuerde de él?",
          adolescente:
            "La memoria de un líder cambia con el tiempo. Cada generación decide qué conservar y qué cuestionar. ¿Qué diferencia hay entre recordar a Diriangén y convertirlo en una estatua sin contexto?",
          adulto:
            "La memoria de Diriangén es un campo de disputa: se la invoca desde proyectos políticos y pedagógicos distintos. Analizar esos usos permite comprender cómo se construye un símbolo nacional. ¿Qué criterios de representación propondría?",
        },
      },
      {
        id: "despedida",
        intencion: "despedida",
        palabrasClave: [
          "gracias",
          "adiós",
          "adios",
          "chao",
          "hasta luego",
          "nos vemos",
        ],
        respuestas: {
          nino: "¡Gracias por acompañarme! Antes de irte: ¿qué te gustaría defender en tu comunidad?",
          adolescente:
            "Gracias por la conversación. Te dejo una pregunta: ¿qué resistencia de tu tiempo te gustaría contar?",
          adulto:
            "Gracias por el diálogo. Si desea continuar, puede revisar la ficha de Diriangén y la advertencia sobre fuentes. ¿Queda alguna tensión por explorar?",
        },
      },
    ],
    fallback: {
      nino: "No tengo una respuesta segura para eso. No quiero inventar. Podés preguntarme por Diriangén, los chorotegas, la resistencia o la fecha de 1523. ¿Cuál elegís?",
      adolescente:
        "No tengo información suficiente en esta sala para responder sin inventar. Probá con Diriangén, los pueblos chorotegas, la resistencia o el 17 de abril de 1523.",
      adulto:
        "No dispongo de información suficiente para una respuesta rigurosa dentro de esta demostración. Para no producir afirmaciones no documentadas, prefiero señalarlo. Los ejes disponibles son Diriangén, los chorotegas, la resistencia y la crítica de fuentes.",
    },
    cierre: {
      nino: "Recordá: la historia se piensa, no se copia. ¡Cuidá lo que querés!",
      adolescente:
        "Resistir también es preguntar. Llevate esa pregunta a tu presente.",
      adulto:
        "La historia se piensa, no se copia. Gracias por sostener la reflexión.",
    },
  },
];

export function getAsistente(id: string): AsistenteXila | undefined {
  return asistentes.find((asistente) => asistente.id === id);
}

export function getAsistentePorSala(salaId: string): AsistenteXila | undefined {
  return asistentes.find((asistente) => asistente.salaId === salaId);
}
