import type {
  AgrupacionInvitada,
  ConfigChat,
  ConocimientoLocal,
  ContenidoPorPerfil,
  Museo,
  Personaje,
  RetoChat,
  RetratoFicha,
  Sala,
  TemaConocido,
  TipoChat,
} from "../types/museo.types";

/**
 * Paquete de contenido del Museo Lolita Soriano.
 *
 * Todo el contenido es marcador: no se inventan biografías, fechas, obras,
 * repertorios, integrantes, horarios ni precios. Las relaciones entre
 * personajes y salas son provisionales y están marcadas como «Por verificar».
 */

const ETIQUETA_REPRESENTACION = "Representación educativa";
const ETIQUETA_ORQUESTA =
  "Representación educativa desde la perspectiva de la agrupación";
const ETIQUETA_INVITADA = "Agrupación invitada, demostración";

const AVATAR_XILA = "/images/hero-xila.svg";
const AVATAR_XILA_ALT =
  "Ilustración conceptual de Xila, un robot educativo con detalles geométricos.";

const RETRATO_LOLITA: RetratoFicha = {
  src: "/images/personajes/lolita-soriano.webp",
  alt: "Retrato de Lolita Soriano, referencia visual para su ficha en el museo.",
};

const RETRATO_ALEJANDRO: RetratoFicha = {
  src: "/images/personajes/alejandro-vega-matus.webp",
  alt: "Retrato de Alejandro Vega Matus, referencia visual para su ficha en el museo.",
};

const RETRATO_LUIS: RetratoFicha = {
  src: "/images/personajes/luis-abraham-delgadillo.webp",
  alt: "Retrato de Luis Abraham Delgadillo, referencia visual de la Orquesta de los Supremos Poderes.",
};

const RETRATO_CESAR: RetratoFicha = {
  src: "/images/personajes/cesar-bermudez.webp",
  alt: "Retrato de César Bermúdez, referencia visual de la Banda Municipal de Managua.",
};

function porPerfil<T = string>(
  nino: T,
  adolescente: T,
  adulto: T,
): ContenidoPorPerfil<T> {
  return { nino, adolescente, adulto };
}

const datosPorVerificar = [
  "fecha",
  "precio",
  "horario",
  "biografía",
  "biografia",
  "repertorio",
  "integrante",
  "fundación",
  "fundacion",
  "teléfono",
  "telefono",
  "dirección",
  "direccion",
  "cómo llegar",
  "como llegar",
  "historia",
] as const;

const datosPersonaPorVerificar = [
  ...datosPorVerificar,
  "nací",
  "nació",
  "nacio",
  "familia",
  "premio",
  "estudió",
  "estudio",
  "trayectoria",
  "compositor",
  "compositora",
] as const;

const datosGrupoPorVerificar = [
  ...datosPorVerificar,
  "instrumento",
  "concierto",
  "director",
  "directora",
  "miembro",
  "repertorio",
] as const;

const saludo: TemaConocido = {
  id: "saludo",
  titulo: "Saludo",
  palabrasClave: [
    "hola",
    "buenas",
    "qué tal",
    "que tal",
    "saludos",
    "buen día",
  ],
  respuesta: porPerfil(
    "¡Hola! Qué bueno que estés acá. ¿Qué querés descubrir?",
    "¡Hola! Bienvenido/a. ¿Por dónde querés empezar?",
    "Buen día. ¿Cómo desea comenzar la visita?",
  ),
};

const despedida: TemaConocido = {
  id: "despedida",
  titulo: "Despedida",
  palabrasClave: [
    "gracias",
    "adiós",
    "adios",
    "chao",
    "hasta luego",
    "nos vemos",
  ],
  respuesta: porPerfil(
    "¡Gracias a vos! Volvé cuando quieras.",
    "Gracias por la conversación. Nos vemos en la próxima sala.",
    "Gracias por el diálogo. Quedo a disposición para otra consulta.",
  ),
};

const retosExploracion: ContenidoPorPerfil<readonly RetoChat[]> = {
  nino: [
    {
      id: "reto-observar",
      titulo: "Encontrá un detalle",
      enunciado:
        "Recorré la sala y elegí un detalle que te llame la atención. Contá por qué lo elegiste.",
      pista: "Puede ser un objeto, un sonido, una imagen o un espacio.",
      cierre:
        "¡Bien! Observar con atención también es una forma de investigar.",
    },
  ],
  adolescente: [
    {
      id: "reto-preguntas",
      titulo: "Tres preguntas para el museo",
      enunciado:
        "Anotá tres preguntas que te gustaría que el equipo del museo respondiera sobre esta sala.",
      pista: "Pensá en quiénes, qué, cuándo, dónde y por qué.",
      cierre:
        "Las buenas preguntas ayudan a orientar una investigación y a reconocer lo que falta.",
    },
  ],
  adulto: [
    {
      id: "reto-verificar",
      titulo: "Qué falta verificar",
      enunciado:
        "Identificá qué información haría falta para presentar esta sala con fuentes verificadas.",
      pista:
        "Considerá autoría, fechas, documentos, validación institucional y voces de la comunidad.",
      cierre:
        "Reconocer los vacíos también es parte del trabajo educativo y museográfico.",
    },
  ],
};

function crearConocimiento({
  identidad,
  temas,
  noConocidos = datosPorVerificar,
  desconocido,
}: {
  identidad: TemaConocido;
  temas: readonly TemaConocido[];
  noConocidos?: readonly string[];
  desconocido: ContenidoPorPerfil;
}): ConocimientoLocal {
  return {
    temasConocidos: [saludo, identidad, ...temas, despedida],
    temasNoConocidos: noConocidos,
    respuestaDesconocido: desconocido,
  };
}

function crearConfigChat({
  id,
  tipo,
  nombreVisible,
  etiquetaVisible,
  avatar,
  avatarAlt,
  bienvenida,
  preguntas,
  identidad,
  temas,
  noConocidos,
  desconocido,
}: {
  id: string;
  tipo: TipoChat;
  nombreVisible: string;
  etiquetaVisible: string;
  avatar?: string;
  avatarAlt?: string;
  bienvenida: ContenidoPorPerfil;
  preguntas: ContenidoPorPerfil<readonly string[]>;
  identidad: TemaConocido;
  temas: readonly TemaConocido[];
  noConocidos?: readonly string[];
  desconocido: ContenidoPorPerfil;
}): ConfigChat {
  return {
    id,
    tipo,
    nombreVisible,
    etiquetaVisible,
    avatar,
    avatarAlt,
    bienvenida,
    preguntasSugeridas: preguntas,
    retos: retosExploracion,
    conocimiento: crearConocimiento({
      identidad,
      temas,
      noConocidos,
      desconocido,
    }),
  };
}

function crearTemasBaseAgente(nombreSala: string): readonly TemaConocido[] {
  return [
    {
      id: "sala",
      titulo: "La sala",
      palabrasClave: [
        "sala",
        "dónde estoy",
        "donde estoy",
        "este lugar",
        "lugar",
      ],
      respuesta: porPerfil(
        `Estás en ${nombreSala}. La información completa de esta sala todavía está por verificar.`,
        `Te encontrás en ${nombreSala}. El contenido está por verificar y el equipo del museo entregará los datos definitivos.`,
        `Esta es ${nombreSala}. La información de la sala está pendiente de verificación; en esta simulación solo puedo orientarle sobre su existencia y su estado.`,
      ),
    },
    {
      id: "recorrido",
      titulo: "Qué se puede ver",
      palabrasClave: [
        "qué puedo ver",
        "que puedo ver",
        "qué hay",
        "que hay",
        "recorrido",
        "exhibición",
        "exhibicion",
        "contenido",
      ],
      respuesta: porPerfil(
        "Todavía no tengo una lista de lo que se exhibe. El equipo del museo la va a entregar. No quiero inventar objetos ni detalles.",
        "No tengo una descripción verificada de lo que se exhibe en esta sala. El equipo del museo entregará esa información.",
        "No dispongo de un inventario ni de una descripción verificada de la exhibición. Para no producir afirmaciones sin respaldo, prefiero señalar que ese contenido está pendiente.",
      ),
    },
    {
      id: "ayuda",
      titulo: "Ayuda",
      palabrasClave: [
        "ayuda",
        "ayudame",
        "ayúdame",
        "qué podés hacer",
        "que podes hacer",
        "cómo funciona",
        "como funciona",
      ],
      respuesta: porPerfil(
        "Puedo decirte en qué sala estás, qué información está por verificar y qué personajes tienen su propio chat.",
        "Puedo orientarte sobre esta sala, aclarar qué está por verificar y derivarte a los personajes o agrupaciones que tengan conversación propia.",
        "Puedo orientarle sobre el alcance de esta sala, señalar los vacíos de información y derivarle a las conversaciones disponibles.",
      ),
    },
    {
      id: "salida",
      titulo: "Ubicación física",
      palabrasClave: [
        "cómo llego",
        "como llego",
        "dónde queda",
        "donde queda",
        "salida",
        "mapa",
        "plano",
      ],
      respuesta: porPerfil(
        "No tengo un mapa de la sala. Pedile ayuda a una persona del museo.",
        "No tengo información verificada sobre la ubicación física ni el recorrido. Consultá con el equipo del museo.",
        "No dispongo de un plano ni de indicaciones de ubicación verificadas. Esa información debe consultarse con el equipo del museo.",
      ),
    },
  ];
}

function crearAgenteSala({
  id,
  nombreSala,
  temasExtra = [],
}: {
  id: string;
  nombreSala: string;
  temasExtra?: readonly TemaConocido[];
}): ConfigChat {
  return crearConfigChat({
    id,
    tipo: "agente-sala",
    nombreVisible: `Agente Xila · ${nombreSala}`,
    etiquetaVisible: "Agente Xila",
    avatar: AVATAR_XILA,
    avatarAlt: AVATAR_XILA_ALT,
    bienvenida: porPerfil(
      `¡Hola! Soy el Agente Xila de ${nombreSala}. Estoy acá para orientarte. La información de esta sala todavía está por verificar. ¿Qué querés saber?`,
      `Hola. Soy el Agente Xila de ${nombreSala}. Puedo orientarte dentro de la sala y responder con el contenido disponible, que por ahora es demostrativo. ¿Qué te interesa?`,
      `Buen día. Soy el Agente Xila de ${nombreSala}. Mi función es orientar la visita y responder según el conocimiento local de esta sala, todavía pendiente de verificación. ¿Cómo desea comenzar?`,
    ),
    preguntas: porPerfil(
      [
        "¿Dónde estoy?",
        "¿Qué puedo ver en esta sala?",
        "¿Hay personajes relacionados?",
        "¿Qué está por verificar?",
      ],
      [
        "¿Qué información hay de esta sala?",
        "¿Quién puede contarme más?",
        "¿Cómo sigo la visita?",
        "¿Qué está por verificar?",
      ],
      [
        "¿Cuál es el alcance de esta sala?",
        "¿Qué información está pendiente de verificación?",
        "¿Qué conversaciones hay disponibles?",
        "¿Cómo continuar la visita?",
      ],
    ),
    identidad: {
      id: "identidad",
      titulo: "Identidad del Agente Xila",
      palabrasClave: [
        "quién sos",
        "quien sos",
        "quién eres",
        "quien eres",
        "agente xila",
        "robot",
        "tu nombre",
      ],
      respuesta: porPerfil(
        `Soy el Agente Xila de ${nombreSala}, un robot educativo de esta simulación. Respondo con la información local de mi sala y no invento datos.`,
        `Soy el Agente Xila de ${nombreSala}, una representación educativa del robot guía. Mis respuestas se apoyan en el conocimiento local de esta sala y no completo datos que falten.`,
        `Soy el Agente Xila de ${nombreSala}, una representación educativa del robot guía del Sistema Auka. Respondo a partir del conocimiento local de esta sala; la información no disponible se señala como pendiente de verificación.`,
      ),
    },
    temas: [...crearTemasBaseAgente(nombreSala), ...temasExtra],
    noConocidos: datosPorVerificar,
    desconocido: porPerfil(
      "No tengo esa información. Está por verificar y no quiero inventarla. Podés preguntarme por la sala o por las conversaciones disponibles.",
      "No tengo información verificada sobre eso. El equipo del museo la entregará. Puedo orientarte con lo que sí está definido en esta simulación.",
      "No dispongo de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, prefiero señalarlo. Puedo orientarle sobre la sala o las conversaciones disponibles.",
    ),
  });
}

/* -------------------------------------------------------------------------- */
/* Configuraciones de las tres salas con Agente Xila                          */
/* -------------------------------------------------------------------------- */

const agenteMusica = crearAgenteSala({
  id: "agente-sala-musica",
  nombreSala: "Sala de Música",
  temasExtra: [
    {
      id: "personajes-sala",
      titulo: "Personajes y agrupación de la sala",
      palabrasClave: [
        "personajes",
        "alejandro",
        "orquesta",
        "banda",
        "quién puede contarme",
        "quien puede contarme",
      ],
      respuesta: porPerfil(
        "En esta sala se vinculan Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua es una agrupación invitada. Cada uno tiene su propio chat.",
        "La relación provisional de esta sala incluye a Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua aparece como agrupación invitada. Podés conversar con ellos en sus chats.",
        "En esta simulación, la Sala de Música se vincula provisionalmente con Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua figura como agrupación invitada. Cada entidad tiene su propia conversación.",
      ),
    },
    {
      id: "musica",
      titulo: "Música en la sala",
      palabrasClave: ["música", "musica", "sonido", "audición", "audicion"],
      respuesta: porPerfil(
        "La información sobre la música de esta sala está por verificar. No quiero inventar obras ni intérpretes.",
        "No tengo datos verificados sobre las prácticas musicales de esta sala. El equipo del museo entregará esa información.",
        "La información musical de esta sala está pendiente de verificación. No dispongo de obras, repertorios ni intérpretes documentados para esta simulación.",
      ),
    },
  ],
});

const agenteObjetos = crearAgenteSala({
  id: "agente-sala-objetos-personales",
  nombreSala: "Sala de Objetos Personales",
  temasExtra: [
    {
      id: "objetos",
      titulo: "Objetos personales",
      palabrasClave: [
        "objetos",
        "objeto",
        "pertenencias",
        "recuerdos",
        "colección",
        "coleccion",
      ],
      respuesta: porPerfil(
        "La información sobre los objetos de esta sala está por verificar. No quiero inventar piezas ni historias.",
        "No tengo una descripción verificada de los objetos personales de esta sala. El equipo del museo entregará ese contenido.",
        "La descripción de los objetos personales está pendiente de verificación. En esta simulación no se presentan piezas, procedencias ni historias no documentadas.",
      ),
    },
    {
      id: "personajes-sala",
      titulo: "Personajes relacionados",
      palabrasClave: ["personajes", "quién más", "quien mas", "relacionados"],
      respuesta: porPerfil(
        "No hay personajes vinculados a esta sala en la relación provisional.",
        "En la relación provisional de esta simulación no aparecen personajes vinculados a esta sala.",
        "La relación provisional de esta simulación no asigna personajes a esta sala. Esa vinculación está por verificar.",
      ),
    },
  ],
});

const agenteRincon = crearAgenteSala({
  id: "agente-sala-rincon-del-nino",
  nombreSala: "El Rincón del Niño",
  temasExtra: [
    {
      id: "actividades",
      titulo: "Actividades para niños",
      palabrasClave: [
        "actividades",
        "juegos",
        "niños",
        "ninos",
        "talleres",
        "para niños",
        "para ninos",
      ],
      respuesta: porPerfil(
        "La información sobre las actividades de esta sala está por verificar. No quiero inventar juegos ni horarios.",
        "No tengo datos verificados sobre las actividades de esta sala. El equipo del museo entregará esa información.",
        "La programación de actividades está pendiente de verificación. No dispongo de horarios, talleres ni dinámicas documentadas para esta simulación.",
      ),
    },
    {
      id: "personajes-sala",
      titulo: "Personajes relacionados",
      palabrasClave: ["personajes", "quién más", "quien mas", "relacionados"],
      respuesta: porPerfil(
        "No hay personajes vinculados a esta sala en la relación provisional.",
        "En la relación provisional de esta simulación no aparecen personajes vinculados a esta sala.",
        "La relación provisional de esta simulación no asigna personajes a esta sala. Esa vinculación está por verificar.",
      ),
    },
  ],
});

/* -------------------------------------------------------------------------- */
/* Las diez salas oficiales                                                    */
/* -------------------------------------------------------------------------- */

function crearSala(
  id: string,
  nombre: string,
  extras: Partial<Sala> = {},
): Sala {
  return {
    id,
    nombre,
    descripcion: porPerfil(
      `Estás en «${nombre}», una de las salas del Museo Lolita Soriano. Todavía no tenemos la información completa: el equipo del museo la va a entregar. Por ahora podés recorrerla y hacer preguntas.`,
      `«${nombre}» forma parte de la instalación del Museo Lolita Soriano. Su contenido está por verificar; el equipo del museo entregará los datos definitivos. Mientras tanto, podés explorar la sala y consultar al Agente Xila si está disponible.`,
      `«${nombre}» es una de las diez salas del Museo Lolita Soriano. La información de esta sala está pendiente de verificación y será entregada por el equipo del museo. En esta simulación se presenta como un espacio de exploración, sin datos históricos ni descripciones de colecciones.`,
    ),
    estado: "demostrativo",
    porVerificar: true,
    personajesRelacionados: [],
    ...extras,
  };
}

const salas: readonly Sala[] = [
  crearSala("sala-biografica", "Sala Biográfica", {
    personajesRelacionados: ["lolita-soriano"],
  }),
  crearSala("sala-de-musica", "Sala de Música", {
    agenteXilaUbicado: agenteMusica,
    personajesRelacionados: [
      "alejandro-vega-matus",
      "orquesta-supremos-poderes",
    ],
  }),
  crearSala("sala-de-audiovisuales", "Sala de Audiovisuales"),
  crearSala("corredor-managua", "Corredor Managua"),
  crearSala("sala-de-objetos-personales", "Sala de Objetos Personales", {
    agenteXilaUbicado: agenteObjetos,
  }),
  crearSala("galeria-fotografica", "Galería Fotográfica"),
  crearSala(
    "sala-de-arqueologia-y-artesania",
    "Sala de Arqueología y Artesanía",
  ),
  crearSala("biblioteca-y-hemeroteca", "Biblioteca y Hemeroteca"),
  crearSala("patio-de-escultura", "Patio de Escultura"),
  crearSala("rincon-del-nino", "El Rincón del Niño", {
    agenteXilaUbicado: agenteRincon,
  }),
];

/* -------------------------------------------------------------------------- */
/* Personajes con chat propio                                                  */
/* -------------------------------------------------------------------------- */

const lolitaSoriano: Personaje = {
  id: "lolita-soriano",
  nombre: "Lolita Soriano",
  tipo: "personaje",
  etiquetaVisible: ETIQUETA_REPRESENTACION,
  descripcion: porPerfil(
    "Lolita Soriano es el nombre de la persona que da nombre al museo de esta simulación. La información sobre su vida está por verificar. El equipo del museo la va a entregar.",
    "Lolita Soriano da nombre al Museo Lolita Soriano. Su ficha se vincula provisionalmente con la Sala Biográfica. La información biográfica está por verificar y será entregada por el equipo del museo.",
    "Lolita Soriano es la figura cuyo nombre identifica al Museo Lolita Soriano. La relación con la Sala Biográfica es provisional y la información biográfica está pendiente de verificación. Esta simulación no presenta datos de vida, obra ni trayectoria.",
  ),
  estado: "demostrativo",
  porVerificar: true,
  retrato: RETRATO_LOLITA,
  salasRelacionadas: ["sala-biografica"],
  chat: crearConfigChat({
    id: "personaje-lolita-soriano",
    tipo: "personaje",
    nombreVisible: "Lolita Soriano",
    etiquetaVisible: ETIQUETA_REPRESENTACION,
    avatar: RETRATO_LOLITA.src,
    avatarAlt: RETRATO_LOLITA.alt,
    bienvenida: porPerfil(
      "Soy Lolita Soriano. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. La información sobre mi vida está por verificar. ¿Qué te gustaría preguntar?",
      "Soy Lolita Soriano. Esta conversación es una representación educativa: no soy una cita real. La información sobre mi vida y mi obra está por verificar. ¿Qué te interesa?",
      "Soy Lolita Soriano. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. No dispongo de datos biográficos verificados; esa información será entregada por el equipo del museo. ¿Qué desea preguntar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quién sos?",
        "¿Qué relación tenés con el museo?",
        "¿Con qué sala te vinculás?",
        "¿Qué información está por verificar?",
      ],
      [
        "¿Cuál es tu vínculo con el museo?",
        "¿Qué información biográfica falta?",
        "¿Qué sala se te asigna?",
        "¿Qué significa representación educativa?",
      ],
      [
        "¿Qué alcance tiene esta representación?",
        "¿Qué datos biográficos están pendientes?",
        "¿Cuál es la relación provisional con la sala?",
        "¿Cómo se distingue esta dramatización de una fuente?",
      ],
    ),
    identidad: {
      id: "identidad",
      titulo: "Identidad",
      palabrasClave: [
        "quién sos",
        "quien sos",
        "quién eres",
        "quien eres",
        "tu nombre",
        "lolita",
      ],
      respuesta: porPerfil(
        "Soy Lolita Soriano, presentada en esta simulación como parte del museo que lleva mi nombre. No puedo darte datos de mi vida porque están por verificar.",
        "Soy Lolita Soriano. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. La información biográfica está por verificar.",
        "Soy Lolita Soriano, una representación educativa dentro de esta simulación. El museo lleva mi nombre, pero no dispongo de datos biográficos verificados para presentar aquí.",
      ),
    },
    temas: [
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: ["museo", "instalación", "instalacion"],
        respuesta: porPerfil(
          "El museo de esta simulación lleva mi nombre. La información sobre su historia está por verificar.",
          "El Museo Lolita Soriano lleva mi nombre. La historia del museo y de sus colecciones está por verificar.",
          "El Museo Lolita Soriano lleva mi nombre. La información sobre su historia, sus colecciones y mi vínculo con la institución está pendiente de verificación.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "biográfica", "biografica"],
        respuesta: porPerfil(
          "Mi ficha se vincula con la Sala Biográfica. Esa relación está por verificar.",
          "Mi ficha se vincula provisionalmente con la Sala Biográfica. La relación está marcada como por verificar.",
          "La relación provisional de esta simulación me vincula con la Sala Biográfica. Esa asignación está pendiente de verificación.",
        ),
      },
      {
        id: "representacion",
        titulo: "Representación educativa",
        palabrasClave: [
          "representación",
          "representacion",
          "dramatización",
          "dramatizacion",
          "cita",
          "testimonio",
        ],
        respuesta: porPerfil(
          "Soy una representación educativa. No soy una cita real ni un testimonio. La información está por verificar.",
          "Esta conversación es una dramatización educativa. No reproduce citas reales ni testimonios, y el contenido está por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio.",
        ),
      },
      {
        id: "ayuda",
        titulo: "Ayuda",
        palabrasClave: [
          "ayuda",
          "ayudame",
          "ayúdame",
          "qué podés hacer",
          "que podes hacer",
        ],
        respuesta: porPerfil(
          "Puedo presentarme, decirte qué información está por verificar y orientarte a mi sala.",
          "Puedo presentarme, aclarar los límites de esta representación y orientarte a la Sala Biográfica.",
          "Puedo presentarme, señalar los vacíos de información y orientarle hacia la sala y las demás conversaciones disponibles.",
        ),
      },
    ],
    noConocidos: datosPersonaPorVerificar,
    desconocido: porPerfil(
      "No tengo esa información. Está por verificar y no quiero inventarla. ¿Querés preguntarme otra cosa?",
      "No tengo datos verificados sobre eso. Mi presentación es educativa y la información está por verificar.",
      "No dispongo de información verificada sobre ese punto. Esta representación educativa no sustituye una fuente documentada.",
    ),
  }),
};

const alejandroVegaMatus: Personaje = {
  id: "alejandro-vega-matus",
  nombre: "Alejandro Vega Matus",
  tipo: "personaje",
  etiquetaVisible: ETIQUETA_REPRESENTACION,
  descripcion: porPerfil(
    "Alejandro Vega Matus es uno de los personajes de esta simulación. La información sobre su vida está por verificar. El equipo del museo la va a entregar.",
    "Alejandro Vega Matus se vincula provisionalmente con la Sala de Música. La información sobre su vida y su relación con la sala está por verificar.",
    "Alejandro Vega Matus es una de las figuras de esta simulación. Su vínculo con la Sala de Música es provisional y la información biográfica está pendiente de verificación. No se presentan datos de vida, obra ni trayectoria.",
  ),
  estado: "demostrativo",
  porVerificar: true,
  retrato: RETRATO_ALEJANDRO,
  salasRelacionadas: ["sala-de-musica"],
  chat: crearConfigChat({
    id: "personaje-alejandro-vega-matus",
    tipo: "personaje",
    nombreVisible: "Alejandro Vega Matus",
    etiquetaVisible: ETIQUETA_REPRESENTACION,
    avatar: RETRATO_ALEJANDRO.src,
    avatarAlt: RETRATO_ALEJANDRO.alt,
    bienvenida: porPerfil(
      "Soy Alejandro Vega Matus. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. La información sobre mi vida está por verificar. ¿Qué querés preguntar?",
      "Soy Alejandro Vega Matus. Esta conversación es una representación educativa: no soy una cita real. La información sobre mi vida y mi relación con la sala está por verificar. ¿Qué te interesa?",
      "Soy Alejandro Vega Matus. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. No dispongo de datos biográficos verificados; esa información será entregada por el equipo del museo. ¿Qué desea preguntar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quién sos?",
        "¿Con qué sala te vinculás?",
        "¿Qué información está por verificar?",
        "¿Qué significa representación educativa?",
      ],
      [
        "¿Cuál es tu vínculo con la Sala de Música?",
        "¿Qué información biográfica falta?",
        "¿Cómo se presenta tu historia?",
        "¿Qué significa representación educativa?",
      ],
      [
        "¿Qué alcance tiene esta representación?",
        "¿Qué datos biográficos están pendientes?",
        "¿Cuál es la relación provisional con la sala?",
        "¿Cómo se distingue esta dramatización de una fuente?",
      ],
    ),
    identidad: {
      id: "identidad",
      titulo: "Identidad",
      palabrasClave: [
        "quién sos",
        "quien sos",
        "quién eres",
        "quien eres",
        "tu nombre",
        "alejandro",
        "vega matus",
      ],
      respuesta: porPerfil(
        "Soy Alejandro Vega Matus, presentado en esta simulación como parte del museo. No puedo darte datos de mi vida porque están por verificar.",
        "Soy Alejandro Vega Matus. Esta es una representación educativa dentro de la simulación del Museo Lolita Soriano. La información biográfica está por verificar.",
        "Soy Alejandro Vega Matus, una representación educativa dentro de esta simulación. No dispongo de datos biográficos verificados para presentar aquí.",
      ),
    },
    temas: [
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: ["museo", "instalación", "instalacion"],
        respuesta: porPerfil(
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. La información sobre mi relación con el museo está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. Mi vínculo con la institución está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. No dispongo de información verificada sobre mi vínculo con la institución.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "música", "musica"],
        respuesta: porPerfil(
          "Mi ficha se vincula con la Sala de Música. Esa relación está por verificar.",
          "Mi ficha se vincula provisionalmente con la Sala de Música. La relación está marcada como por verificar.",
          "La relación provisional de esta simulación me vincula con la Sala de Música. Esa asignación está pendiente de verificación.",
        ),
      },
      {
        id: "representacion",
        titulo: "Representación educativa",
        palabrasClave: [
          "representación",
          "representacion",
          "dramatización",
          "dramatizacion",
          "cita",
          "testimonio",
        ],
        respuesta: porPerfil(
          "Soy una representación educativa. No soy una cita real ni un testimonio. La información está por verificar.",
          "Esta conversación es una dramatización educativa. No reproduce citas reales ni testimonios, y el contenido está por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio.",
        ),
      },
      {
        id: "ayuda",
        titulo: "Ayuda",
        palabrasClave: [
          "ayuda",
          "ayudame",
          "ayúdame",
          "qué podés hacer",
          "que podes hacer",
        ],
        respuesta: porPerfil(
          "Puedo presentarme, decirte qué información está por verificar y orientarte a mi sala.",
          "Puedo presentarme, aclarar los límites de esta representación y orientarte a la Sala de Música.",
          "Puedo presentarme, señalar los vacíos de información y orientarle hacia la sala y las demás conversaciones disponibles.",
        ),
      },
    ],
    noConocidos: datosPersonaPorVerificar,
    desconocido: porPerfil(
      "No tengo esa información. Está por verificar y no quiero inventarla. ¿Querés preguntarme otra cosa?",
      "No tengo datos verificados sobre eso. Mi presentación es educativa y la información está por verificar.",
      "No dispongo de información verificada sobre ese punto. Esta representación educativa no sustituye una fuente documentada.",
    ),
  }),
};

const orquestaSupremosPoderes: Personaje = {
  id: "orquesta-supremos-poderes",
  nombre: "Orquesta de los Supremos Poderes",
  tipo: "personaje",
  etiquetaVisible: ETIQUETA_ORQUESTA,
  descripcion: porPerfil(
    "La Orquesta de los Supremos Poderes es una agrupación de esta simulación. La información sobre su historia está por verificar.",
    "La Orquesta de los Supremos Poderes se presenta como una representación educativa desde la perspectiva de la agrupación. Su vínculo provisional es con la Sala de Música. La información sobre su historia, integrantes y repertorio está por verificar.",
    "La Orquesta de los Supremos Poderes se presenta como una representación educativa desde la perspectiva de la agrupación. Su relación con la Sala de Música es provisional. La información sobre trayectoria, integrantes y repertorio está pendiente de verificación.",
  ),
  estado: "demostrativo",
  porVerificar: true,
  retrato: RETRATO_LUIS,
  salasRelacionadas: ["sala-de-musica"],
  chat: crearConfigChat({
    id: "personaje-orquesta-supremos-poderes",
    tipo: "personaje",
    nombreVisible: "Orquesta de los Supremos Poderes",
    etiquetaVisible: ETIQUETA_ORQUESTA,
    avatar: RETRATO_LUIS.src,
    avatarAlt: RETRATO_LUIS.alt,
    bienvenida: porPerfil(
      "Somos la Orquesta de los Supremos Poderes. Esta es una representación educativa desde la perspectiva de la agrupación. La información sobre nuestra historia está por verificar. ¿Qué querés preguntar?",
      "Somos la Orquesta de los Supremos Poderes. Esta conversación es una representación educativa desde la perspectiva de la agrupación. La información sobre nuestra historia, integrantes y repertorio está por verificar. ¿Qué te interesa?",
      "Somos la Orquesta de los Supremos Poderes. Esta es una representación educativa desde la perspectiva de la agrupación. No disponemos de datos verificados sobre nuestra trayectoria, integrantes o repertorio. ¿Qué desea preguntar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quiénes son?",
        "¿Con qué sala se vinculan?",
        "¿Qué información está por verificar?",
        "¿Qué significa representación educativa?",
      ],
      [
        "¿Cuál es su vínculo con la Sala de Música?",
        "¿Qué información sobre la agrupación falta?",
        "¿Cómo se presenta la agrupación?",
        "¿Qué significa representación educativa?",
      ],
      [
        "¿Qué alcance tiene esta representación?",
        "¿Qué datos de la agrupación están pendientes?",
        "¿Cuál es la relación provisional con la sala?",
        "¿Cómo se distingue esta dramatización de una fuente?",
      ],
    ),
    identidad: {
      id: "identidad",
      titulo: "Identidad",
      palabrasClave: [
        "quiénes son",
        "quienes son",
        "quiénes somos",
        "quienes somos",
        "orquesta",
        "supremos poderes",
        "agrupación",
        "agrupacion",
      ],
      respuesta: porPerfil(
        "Somos la Orquesta de los Supremos Poderes, una agrupación presentada en esta simulación. No podemos dar datos de nuestra historia porque están por verificar.",
        "Somos la Orquesta de los Supremos Poderes. Esta es una representación educativa desde la perspectiva de la agrupación. La información sobre nuestra historia está por verificar.",
        "Somos la Orquesta de los Supremos Poderes, una representación educativa desde la perspectiva de la agrupación. No disponemos de información verificada sobre nuestra trayectoria.",
      ),
    },
    temas: [
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: ["museo", "instalación", "instalacion"],
        respuesta: porPerfil(
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. La información sobre nuestra relación con el museo está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. Nuestro vínculo con la institución está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. No disponemos de información verificada sobre nuestro vínculo con la institución.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "música", "musica"],
        respuesta: porPerfil(
          "Nuestra ficha se vincula con la Sala de Música. Esa relación está por verificar.",
          "Nuestra ficha se vincula provisionalmente con la Sala de Música. La relación está marcada como por verificar.",
          "La relación provisional de esta simulación nos vincula con la Sala de Música. Esa asignación está pendiente de verificación.",
        ),
      },
      {
        id: "representacion",
        titulo: "Representación educativa",
        palabrasClave: [
          "representación",
          "representacion",
          "dramatización",
          "dramatizacion",
          "cita",
          "testimonio",
        ],
        respuesta: porPerfil(
          "Somos una representación educativa. No somos una cita real ni un testimonio. La información está por verificar.",
          "Esta conversación es una dramatización educativa desde la perspectiva de la agrupación. No reproduce citas reales ni testimonios.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio.",
        ),
      },
      {
        id: "ayuda",
        titulo: "Ayuda",
        palabrasClave: [
          "ayuda",
          "ayudame",
          "ayúdame",
          "qué pueden hacer",
          "que pueden hacer",
        ],
        respuesta: porPerfil(
          "Podemos presentarnos, decir qué información está por verificar y orientarte a nuestra sala.",
          "Podemos presentarnos, aclarar los límites de esta representación y orientarte a la Sala de Música.",
          "Podemos presentarnos, señalar los vacíos de información y orientarle hacia la sala y las demás conversaciones disponibles.",
        ),
      },
    ],
    noConocidos: datosGrupoPorVerificar,
    desconocido: porPerfil(
      "No tenemos esa información. Está por verificar y no queremos inventarla. ¿Querés preguntar otra cosa?",
      "No tenemos datos verificados sobre eso. Nuestra presentación es educativa y la información está por verificar.",
      "No disponemos de información verificada sobre ese punto. Esta representación educativa no sustituye una fuente documentada.",
    ),
  }),
};

/* -------------------------------------------------------------------------- */
/* Agrupación invitada                                                         */
/* -------------------------------------------------------------------------- */

const bandaMunicipal: AgrupacionInvitada = {
  id: "banda-municipal-managua",
  nombre: "Banda Municipal de Managua",
  tipo: "agrupacion",
  etiquetaVisible: ETIQUETA_INVITADA,
  descripcion: porPerfil(
    "La Banda Municipal de Managua es la agrupación invitada a esta demostración. La información sobre la banda está por verificar.",
    "La Banda Municipal de Managua es la agrupación invitada a esta demostración y se vincula con la Sala de Música. La información sobre su historia, integrantes y repertorio está por verificar.",
    "La Banda Municipal de Managua figura como agrupación invitada, demostración, vinculada provisionalmente con la Sala de Música. La información sobre trayectoria, integrantes y repertorio está pendiente de verificación.",
  ),
  estado: "demostrativo",
  porVerificar: true,
  retrato: RETRATO_CESAR,
  salaRelacionada: "sala-de-musica",
  chat: crearConfigChat({
    id: "agrupacion-banda-municipal-managua",
    tipo: "agrupacion",
    nombreVisible: "Banda Municipal de Managua",
    etiquetaVisible: ETIQUETA_INVITADA,
    avatar: RETRATO_CESAR.src,
    avatarAlt: RETRATO_CESAR.alt,
    bienvenida: porPerfil(
      "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. La información sobre la banda está por verificar. ¿Qué querés preguntar?",
      "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. La información sobre nuestra historia, integrantes y repertorio está por verificar. ¿Qué te interesa?",
      "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. No disponemos de datos verificados sobre nuestra trayectoria, integrantes o repertorio. ¿Qué desea preguntar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quiénes son?",
        "¿Por qué son una agrupación invitada?",
        "¿Con qué sala se vinculan?",
        "¿Qué información está por verificar?",
      ],
      [
        "¿Cuál es su vínculo con la Sala de Música?",
        "¿Qué significa agrupación invitada?",
        "¿Qué información sobre la banda falta?",
        "¿Cómo se presenta la agrupación?",
      ],
      [
        "¿Qué alcance tiene esta demostración?",
        "¿Qué datos de la agrupación están pendientes?",
        "¿Cuál es la relación provisional con la sala?",
        "¿Cómo se distingue esta representación de una fuente?",
      ],
    ),
    identidad: {
      id: "identidad",
      titulo: "Identidad",
      palabrasClave: [
        "quiénes son",
        "quienes son",
        "quiénes somos",
        "quienes somos",
        "banda municipal",
        "banda",
        "managua",
      ],
      respuesta: porPerfil(
        "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. No podemos dar datos de la banda porque están por verificar.",
        "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. La información sobre nuestra historia está por verificar.",
        "Somos la Banda Municipal de Managua, presentada como agrupación invitada a esta demostración. No disponemos de información verificada sobre nuestra trayectoria.",
      ),
    },
    temas: [
      {
        id: "invitada",
        titulo: "Agrupación invitada",
        palabrasClave: [
          "invitada",
          "invitación",
          "invitacion",
          "demostración",
          "demostracion",
        ],
        respuesta: porPerfil(
          "Somos una agrupación invitada a esta demostración. La información sobre la invitación y la participación está por verificar.",
          "La Banda Municipal de Managua aparece como agrupación invitada, demostración. Los detalles de esa participación están por verificar.",
          "La agrupación figura como invitada a esta demostración. La naturaleza, el alcance y los detalles de la participación están pendientes de verificación.",
        ),
      },
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: ["museo", "instalación", "instalacion"],
        respuesta: porPerfil(
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. La información sobre nuestra relación con el museo está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. Nuestro vínculo con la institución está por verificar.",
          "Esta conversación forma parte de la simulación del Museo Lolita Soriano. No disponemos de información verificada sobre nuestro vínculo con la institución.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "música", "musica"],
        respuesta: porPerfil(
          "Nuestra ficha se vincula con la Sala de Música. Esa relación está por verificar.",
          "Nuestra ficha se vincula provisionalmente con la Sala de Música. La relación está marcada como por verificar.",
          "La relación provisional de esta simulación nos vincula con la Sala de Música. Esa asignación está pendiente de verificación.",
        ),
      },
      {
        id: "representacion",
        titulo: "Representación educativa",
        palabrasClave: [
          "representación",
          "representacion",
          "dramatización",
          "dramatizacion",
          "cita",
          "testimonio",
        ],
        respuesta: porPerfil(
          "Somos una representación educativa. No somos una cita real ni un testimonio. La información está por verificar.",
          "Esta conversación es una dramatización educativa. No reproduce citas reales ni testimonios, y el contenido está por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio.",
        ),
      },
      {
        id: "ayuda",
        titulo: "Ayuda",
        palabrasClave: [
          "ayuda",
          "ayudame",
          "ayúdame",
          "qué pueden hacer",
          "que pueden hacer",
        ],
        respuesta: porPerfil(
          "Podemos presentarnos, decir qué información está por verificar y orientarte a la Sala de Música.",
          "Podemos presentarnos, aclarar los límites de esta demostración y orientarte a la Sala de Música.",
          "Podemos presentarnos, señalar los vacíos de información y orientarle hacia la sala y las demás conversaciones disponibles.",
        ),
      },
    ],
    noConocidos: datosGrupoPorVerificar,
    desconocido: porPerfil(
      "No tenemos esa información. Está por verificar y no queremos inventarla. ¿Querés preguntar otra cosa?",
      "No tenemos datos verificados sobre eso. Nuestra presentación es educativa y la información está por verificar.",
      "No disponemos de información verificada sobre ese punto. Esta representación educativa no sustituye una fuente documentada.",
    ),
  }),
};

/* -------------------------------------------------------------------------- */
/* Guía general del museo                                                      */
/* -------------------------------------------------------------------------- */

const guiaGeneral: ConfigChat = crearConfigChat({
  id: "guia-general",
  tipo: "guia-general",
  nombreVisible: "Xila · Guía general",
  etiquetaVisible: "Guía general del museo",
  avatar: AVATAR_XILA,
  avatarAlt: AVATAR_XILA_ALT,
  bienvenida: porPerfil(
    "¡Hola! Soy Xila, la guía general de esta simulación del Sistema Auka en el Museo Lolita Soriano. Puedo orientarte por las diez salas y contarte qué conversaciones hay. El contenido está por verificar. ¿Por dónde querés empezar?",
    "Hola. Soy Xila, la guía general de esta instalación simulada del Sistema Auka en el Museo Lolita Soriano. Puedo orientarte por las diez salas, explicarte qué es el Agente Xila y derivarte a los personajes. ¿Qué te interesa?",
    "Buen día. Soy Xila, la guía general de esta simulación del Sistema Auka en el Museo Lolita Soriano. Puedo orientarle sobre las diez salas, el alcance del Agente Xila y las conversaciones disponibles. Todo el contenido está pendiente de verificación. ¿Cómo desea comenzar?",
  ),
  preguntas: porPerfil(
    [
      "¿Qué salas tiene el museo?",
      "¿Dónde está el Agente Xila?",
      "¿Con quién puedo conversar?",
      "¿Qué es Sistema Auka?",
    ],
    [
      "¿Cuántas salas tiene el museo?",
      "¿Qué salas tienen Agente Xila?",
      "¿Qué personajes tienen chat?",
      "¿Qué relación hay entre Sistema Auka y el museo?",
    ],
    [
      "¿Cuál es la estructura de la instalación?",
      "¿Qué alcance tiene el Agente Xila?",
      "¿Qué conversaciones están disponibles?",
      "¿Cómo se articula Sistema Auka con el museo?",
    ],
  ),
  identidad: {
    id: "identidad",
    titulo: "Identidad de la guía",
    palabrasClave: [
      "quién sos",
      "quien sos",
      "quién eres",
      "quien eres",
      "xila",
      "guía",
      "guia",
      "robot",
    ],
    respuesta: porPerfil(
      "Soy Xila, la guía general de esta simulación. Hablo del museo y de sus salas, pero no me hago pasar por ningún personaje. Si querés hablar con uno, te digo dónde está su chat.",
      "Soy Xila, la guía general de esta instalación simulada. Hablo del museo en tercera persona y no encarno a ningún personaje. Cuando alguien quiere conversar con un personaje, lo derivo a su chat.",
      "Soy Xila, la guía general de esta simulación. Mi función es orientar sobre el museo y sus salas sin encarnar a ningún personaje. Las conversaciones con personajes se realizan en sus propios chats.",
    ),
  },
  temas: [
    {
      id: "museo",
      titulo: "El museo",
      palabrasClave: ["museo", "lolita soriano", "instalación", "instalacion"],
      respuesta: porPerfil(
        "Esta simulación representa la instalación del Sistema Auka en el Museo Lolita Soriano. El museo tiene diez salas. La información de cada sala está por verificar.",
        "Esta app simula la instalación del Sistema Auka en el Museo Lolita Soriano. La instalación incluye diez salas, una guía general, tres agentes de sala y varias conversaciones con personajes. El contenido está por verificar.",
        "Esta aplicación simula la instalación del Sistema Auka en el Museo Lolita Soriano. La estructura de la simulación comprende diez salas, una guía general, tres agentes Xila ubicados en salas específicas y conversaciones con personajes y una agrupación invitada. Todo el contenido está pendiente de verificación.",
      ),
    },
    {
      id: "salas",
      titulo: "Las salas",
      palabrasClave: [
        "salas",
        "cuántas salas",
        "cuantas salas",
        "recorrido",
        "qué salas",
        "que salas",
      ],
      respuesta: porPerfil(
        "El museo tiene diez salas: Sala Biográfica, Sala de Música, Sala de Audiovisuales, Corredor Managua, Sala de Objetos Personales, Galería Fotográfica, Sala de Arqueología y Artesanía, Biblioteca y Hemeroteca, Patio de Escultura y El Rincón del Niño.",
        "La instalación tiene diez salas: Sala Biográfica, Sala de Música, Sala de Audiovisuales, Corredor Managua, Sala de Objetos Personales, Galería Fotográfica, Sala de Arqueología y Artesanía, Biblioteca y Hemeroteca, Patio de Escultura y El Rincón del Niño.",
        "La instalación comprende diez salas: Sala Biográfica, Sala de Música, Sala de Audiovisuales, Corredor Managua, Sala de Objetos Personales, Galería Fotográfica, Sala de Arqueología y Artesanía, Biblioteca y Hemeroteca, Patio de Escultura y El Rincón del Niño. La información de cada una está pendiente de verificación.",
      ),
    },
    {
      id: "agente",
      titulo: "El Agente Xila",
      palabrasClave: [
        "agente xila",
        "dónde está xila",
        "donde esta xila",
        "robots",
        "agentes",
      ],
      respuesta: porPerfil(
        "El Agente Xila está solo en tres salas: Sala de Música, Sala de Objetos Personales y El Rincón del Niño. En las otras salas no hay robot.",
        "El Agente Xila está ubicado únicamente en la Sala de Música, la Sala de Objetos Personales y El Rincón del Niño. Cada uno se identifica con el nombre de su sala.",
        "El Agente Xila se ubica exclusivamente en tres salas: Sala de Música, Sala de Objetos Personales y El Rincón del Niño. En las siete salas restantes no se presenta indicador de robot.",
      ),
    },
    {
      id: "personajes",
      titulo: "Personajes y agrupación",
      palabrasClave: [
        "personajes",
        "con quién puedo conversar",
        "con quien puedo conversar",
        "chats",
        "agrupación",
        "agrupacion",
      ],
      respuesta: porPerfil(
        "Podés conversar con Lolita Soriano, Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua es la agrupación invitada. Cada uno tiene su propio chat.",
        "Las conversaciones con personajes son con Lolita Soriano, Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua aparece como agrupación invitada. Todas las representaciones son educativas.",
        "Las conversaciones disponibles son con Lolita Soriano, Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua figura como agrupación invitada, demostración. Todas las voces son representaciones educativas y no citas reales.",
      ),
    },
    {
      id: "lolita",
      titulo: "Lolita Soriano",
      palabrasClave: ["lolita soriano", "lolita"],
      respuesta: porPerfil(
        "Lolita Soriano tiene su propio chat. Podés abrirlo desde la sección Personajes o desde el selector de conversaciones.",
        "Lolita Soriano tiene una conversación propia, presentada como representación educativa. Podés abrirla desde su ficha en Personajes o desde el selector de chats.",
        "Lolita Soriano dispone de una conversación propia identificada como representación educativa. Se accede desde su ficha o desde el selector de conversaciones. La información biográfica está pendiente de verificación.",
      ),
    },
    {
      id: "alejandro",
      titulo: "Alejandro Vega Matus",
      palabrasClave: ["alejandro vega matus", "alejandro", "vega matus"],
      respuesta: porPerfil(
        "Alejandro Vega Matus tiene su propio chat. Podés abrirlo desde la sección Personajes o desde el selector de conversaciones.",
        "Alejandro Vega Matus tiene una conversación propia, presentada como representación educativa. Podés abrirla desde su ficha en Personajes o desde el selector de chats.",
        "Alejandro Vega Matus dispone de una conversación propia identificada como representación educativa. Se accede desde su ficha o desde el selector de conversaciones. La información biográfica está pendiente de verificación.",
      ),
    },
    {
      id: "orquesta",
      titulo: "Orquesta de los Supremos Poderes",
      palabrasClave: [
        "orquesta de los supremos poderes",
        "orquesta",
        "supremos poderes",
      ],
      respuesta: porPerfil(
        "La Orquesta de los Supremos Poderes tiene su propio chat. Está vinculada a la Sala de Música y se presenta como representación educativa.",
        "La Orquesta de los Supremos Poderes tiene una conversación propia, vinculada provisionalmente a la Sala de Música. Se presenta como representación educativa desde la perspectiva de la agrupación.",
        "La Orquesta de los Supremos Poderes dispone de una conversación propia, vinculada provisionalmente a la Sala de Música. Su presentación es una representación educativa desde la perspectiva de la agrupación.",
      ),
    },
    {
      id: "banda",
      titulo: "Banda Municipal de Managua",
      palabrasClave: ["banda municipal de managua", "banda municipal", "banda"],
      respuesta: porPerfil(
        "La Banda Municipal de Managua es la agrupación invitada a esta demostración. Tiene su propio chat y está vinculada a la Sala de Música.",
        "La Banda Municipal de Managua aparece como agrupación invitada, demostración, vinculada a la Sala de Música. Tiene una conversación propia.",
        "La Banda Municipal de Managua figura como agrupación invitada, demostración, con vínculo provisional a la Sala de Música y conversación propia. La información sobre la agrupación está pendiente de verificación.",
      ),
    },
    {
      id: "perfiles",
      titulo: "Perfiles de visita",
      palabrasClave: [
        "perfil",
        "edad",
        "niño",
        "nino",
        "adolescente",
        "adulto",
        "tres perfiles",
      ],
      respuesta: porPerfil(
        "Podés elegir entre niño, adolescente y adulto en Configuración. Eso cambia el tono y la profundidad de los textos.",
        "La experiencia tiene tres perfiles: niño, adolescente y adulto. El perfil cambia el tono, la extensión de los textos y el tipo de actividad. Podés cambiarlo en Configuración.",
        "La instalación contempla tres perfiles de visitante: niño, adolescente y adulto. El perfil ajusta el tono, la profundidad y las actividades propuestas. Puede modificarse en Configuración.",
      ),
    },
    {
      id: "sistema-auka",
      titulo: "Sistema Auka",
      palabrasClave: ["sistema auka", "auka", "producto"],
      respuesta: porPerfil(
        "Sistema Auka es un producto que se instala en cada museo. Esta app es una simulación de su instalación en el Museo Lolita Soriano.",
        "Sistema Auka es un producto educativo que se instala en cada museo. Esta aplicación simula su instalación en el Museo Lolita Soriano, con un paquete de contenido propio del museo.",
        "Sistema Auka es un producto educativo concebido para instalarse en cada museo. Esta aplicación es una simulación de su instalación en el Museo Lolita Soriano. La estructura de datos permite reemplazar el paquete de contenido sin modificar los componentes.",
      ),
    },
    {
      id: "empezar",
      titulo: "Por dónde empezar",
      palabrasClave: [
        "por dónde empiezo",
        "por donde empiezo",
        "empezar",
        "empezamos",
        "qué hago",
        "que hago",
      ],
      respuesta: porPerfil(
        "Podés empezar por la Sala Biográfica o por la Sala de Música, que tiene Agente Xila. También podés conversar con un personaje.",
        "Podés empezar por cualquier sala. Si querés conocer al Agente Xila, probá la Sala de Música, la Sala de Objetos Personales o El Rincón del Niño. Si preferís una voz de personaje, abrí su chat.",
        "Puede comenzar por la Sala Biográfica, por alguna de las tres salas con Agente Xila o por una conversación con personaje. La guía general permanece disponible para orientar el recorrido.",
      ),
    },
    {
      id: "ayuda",
      titulo: "Ayuda",
      palabrasClave: [
        "ayuda",
        "ayudame",
        "ayúdame",
        "qué podés hacer",
        "que podes hacer",
        "cómo funciona",
        "como funciona",
      ],
      respuesta: porPerfil(
        "Puedo contarte qué salas hay, dónde está el Agente Xila y con quién podés conversar.",
        "Puedo orientarte por las salas, explicar dónde está el Agente Xila y derivarte a los personajes y a la agrupación invitada.",
        "Puedo orientarle sobre la estructura de la instalación, el alcance del Agente Xila y las conversaciones disponibles.",
      ),
    },
  ],
  noConocidos: [
    ...datosPorVerificar,
    "colección",
    "coleccion",
    "fundador",
    "fundadora",
    "director",
    "directora",
  ],
  desconocido: porPerfil(
    "No tengo esa información. Está por verificar y no quiero inventarla. Puedo orientarte por las salas y los chats disponibles.",
    "No tengo información verificada sobre eso. El equipo del museo la entregará. Puedo orientarte por las salas, el Agente Xila y los personajes disponibles.",
    "No dispongo de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, prefiero señalarlo. Puedo orientarle sobre la estructura de la instalación y las conversaciones disponibles.",
  ),
});

/* -------------------------------------------------------------------------- */
/* Entidad raíz                                                                */
/* -------------------------------------------------------------------------- */

export const museoLolitaSoriano: Museo = {
  id: "museo-lolita-soriano",
  nombre: "Museo Lolita Soriano",
  etiquetaInstalacion: "Museo Lolita Soriano · Simulación",
  salas,
  personajes: [lolitaSoriano, alejandroVegaMatus, orquestaSupremosPoderes],
  agrupacionesInvitadas: [bandaMunicipal],
  guiaGeneral,
};
