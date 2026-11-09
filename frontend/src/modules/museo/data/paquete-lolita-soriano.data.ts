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
 * Combina información documentada del museo y de sus voces con contenido
 * marcado explícitamente como por verificar. Las biografías, obras y datos
 * musicales se apoyan en fuentes públicas; las relaciones curatoriales y los
 * detalles sin documentación se señalan como pendientes.
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
  "precio",
  "horario",
  "teléfono",
  "telefono",
  "dirección exacta",
  "direccion exacta",
  "cómo llegar",
  "como llegar",
  "exposición temporal",
  "exposicion temporal",
  "inventario completo",
  "restauración",
  "restauracion",
  "programación vigente",
  "programacion vigente",
] as const;

const datosPersonaPorVerificar = [
  ...datosPorVerificar,
  "fecha exacta de muerte",
  "lugar de muerte",
  "testamento",
  "hijos",
  "obras completas",
  "bibliografía completa",
  "bibliografia completa",
  "alumnos",
  "alumnas",
  "anécdotas",
  "anecdotas",
] as const;

const datosGrupoPorVerificar = [
  ...datosPorVerificar,
  "integrantes actuales",
  "repertorio completo",
  "grabaciones",
  "giras",
  "calendario",
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
        `Estás en ${nombreSala}, una de las diez salas del Museo Lolita Soriano. El museo abrió en 2022 y resguarda 529 objetos, documentos, fotografías, partituras, instrumentos y discos. El inventario detallado de esta sala está por verificar.`,
        `Te encontrás en ${nombreSala}, una de las diez salas del Museo Lolita Soriano. El museo abrió el 19 de septiembre de 2022 en el Residencial Bolonia y resguarda 529 piezas. La descripción detallada de esta sala está pendiente de verificación.`,
        `Esta es ${nombreSala}, una de las diez salas del Museo Lolita Soriano. La institución abrió el 19 de septiembre de 2022 en el Residencial Bolonia, Managua, y resguarda 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. El inventario específico de esta sala está pendiente de verificación.`,
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
        "Puedo orientarte sobre el nombre de la sala y su lugar en el recorrido. La lista detallada de lo que se exhibe está por verificar.",
        "Puedo explicarte el lugar de esta sala en el recorrido y el contexto del museo. La descripción pieza por pieza está pendiente de verificación.",
        "Puedo situar esta sala en la estructura de diez espacios del museo y señalar su función general. El inventario y la descripción individual de las piezas están pendientes de verificación.",
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
        "Puedo decirte en qué sala estás, contarte datos del museo y decirte qué personajes tienen su propio chat.",
        "Puedo orientarte sobre esta sala, compartir información documentada del museo y derivarte a los personajes o agrupaciones que tengan conversación propia.",
        "Puedo orientarle sobre la función de esta sala, aportar contexto documentado del museo y derivarle a las conversaciones disponibles.",
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
        "No tengo un plano verificado del recorrido. Consultá con el equipo del museo.",
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
        "En esta sala se vinculan Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua es la agrupación invitada. Cada uno tiene su propio chat.",
        "La relación curatorial de esta sala incluye a Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua aparece como agrupación invitada. Podés conversar con ellos en sus chats.",
        "En esta instalación, la Sala de Música se vincula con Alejandro Vega Matus y la Orquesta de los Supremos Poderes. La Banda Municipal de Managua figura como agrupación invitada. Cada entidad tiene su propia conversación.",
      ),
    },
    {
      id: "tocadiscos",
      titulo: "El tocadiscos de Agustín Lara",
      palabrasClave: [
        "tocadiscos",
        "agustín lara",
        "agustin lara",
        "disco",
        "discos",
        "vinilo",
      ],
      respuesta: porPerfil(
        "La sala conserva un tocadiscos que Agustín Lara le regaló a Lolita Soriano en la década de 1950. Es un objeto documentado del acervo del museo.",
        "La Sala de Música conserva un tocadiscos que Agustín Lara le regaló a Lolita Soriano en la década de 1950. El objeto permite hablar de redes culturales y afectos, no solo de tecnología.",
        "La Sala de Música resguarda un tocadiscos que Agustín Lara obsequió a Lolita Soriano en la década de 1950. Se trata de una pieza documentada del acervo; los detalles de su estado de conservación y exhibición deben confirmarse con el museo.",
      ),
    },
    {
      id: "instrumentos",
      titulo: "Instrumentos donados",
      palabrasClave: [
        "instrumento",
        "instrumentos",
        "orquesta italiana",
        "donación",
        "donacion",
      ],
      respuesta: porPerfil(
        "La sala conserva instrumentos donados por una orquesta italiana. No sé los nombres de las personas que los donaron; eso está por verificar.",
        "La Sala de Música conserva instrumentos donados por una orquesta italiana. La procedencia individual y la fecha exacta de la donación están por verificar.",
        "El acervo de la Sala de Música incluye instrumentos donados por una orquesta italiana. La documentación disponible no detalla pieza por pieza ni identifica a todas las personas donantes; ese punto está pendiente de verificación.",
      ),
    },
    {
      id: "alejandro",
      titulo: "Alejandro Vega Matus",
      palabrasClave: [
        "alejandro",
        "vega matus",
        "liras fernandinas",
        "gritería",
        "griteria",
        "salve azucena",
        "ave maría",
        "ave maria",
        "toda hermosa",
      ],
      respuesta: porPerfil(
        "Alejandro Vega Matus nació en Masaya en 1873 y compuso cinco cantos que se cantan en La Gritería el 7 de diciembre: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa».",
        "Alejandro Vega Matus nació en Masaya el 17 de agosto de 1873 y murió allí el 26 de noviembre de 1937. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería que se entonan el 7 de diciembre: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa».",
        "Alejandro Vega Matus (Masaya, 1873-1937) fue compositor y director de orquesta. Se formó en León, en la Escuela de Música de su padre, y luego en Guatemala con Juan Aberle. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa». También escribió valses, marchas, intermezzos y sones de pascua.",
      ),
    },
    {
      id: "delgadillo",
      titulo: "Luis Abraham Delgadillo",
      palabrasClave: ["delgadillo", "diciembre", "carnegie", "milán", "milan"],
      respuesta: porPerfil(
        "Luis Abraham Delgadillo fue un compositor nicaragüense. Compuso una suite llamada «Diciembre», inspirada en La Purísima y La Gritería.",
        "Luis Abraham Delgadillo (Managua, 1887-1961) estudió en el Conservatorio de Milán, dirigió la Banda de los Supremos Poderes y fundó la Escuela Nacional de Música. Compuso la suite «Diciembre», inspirada en La Purísima y La Gritería.",
        "Luis Abraham Delgadillo (Managua, 26 de agosto de 1887-20 de diciembre de 1961) fue compositor, director y pedagogo. Estudió en el Conservatorio de Milán, fue director de la Banda de los Supremos Poderes y primer director general de cultura musical. Fundó la Escuela Nacional de Música y una orquesta sinfónica. Su suite «Diciembre» dialoga con La Purísima y La Gritería; en 1930 dirigió un concierto de sus obras en el Carnegie Hall.",
      ),
    },
    {
      id: "banda",
      titulo: "Banda Municipal de Managua",
      palabrasClave: [
        "banda municipal",
        "banda",
        "1979",
        "césar bermúdez",
        "cesar bermudez",
      ],
      respuesta: porPerfil(
        "La Banda Municipal de Managua fue fundada el 7 de diciembre de 1979. En 2024 tenía veinte músicos y su director era César Danilo Bermúdez.",
        "La Banda Municipal de Managua fue fundada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional. En 2024 contaba con veinte músicos y su director era César Danilo Bermúdez. En 2009 recibió la Orden de la Independencia Cultural Rubén Darío.",
        "La Banda Municipal de Managua fue creada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional y se formó inicialmente con trabajadores de la Alcaldía. En 2024 reunía veinte músicos bajo la dirección de César Danilo Bermúdez. En 2009 recibió la Orden de la Independencia Cultural Rubén Darío y en 2024 celebró su 45.º aniversario con un concierto en el Salón de los Cristales del Teatro Nacional Rubén Darío.",
      ),
    },
    {
      id: "musica",
      titulo: "Música en la sala",
      palabrasClave: ["música", "musica", "sonido", "audición", "audicion"],
      respuesta: porPerfil(
        "La música de esta sala se puede mirar en tres planos: el tocadiscos de Lolita, los instrumentos donados y los cantos de La Gritería. El inventario completo está por verificar.",
        "La sala permite hablar de memoria personal, prácticas colectivas y repertorio religioso-popular: el tocadiscos de Agustín Lara, los instrumentos donados por una orquesta italiana y los cantos de La Gritería. La descripción pieza por pieza está por verificar.",
        "La Sala de Música articula tres planos: la memoria personal de Lolita Soriano, la circulación de instrumentos y prácticas de banda u orquesta, y el repertorio religioso-popular de La Purísima y La Gritería. El inventario completo y la procedencia individual de las piezas están pendientes de verificación.",
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
        "529",
      ],
      respuesta: porPerfil(
        "El museo resguarda 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos de Lolita Soriano. La descripción pieza por pieza está por verificar.",
        "El acervo del museo reúne 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos vinculados a Lolita Soriano. La procedencia individual de cada pieza está pendiente de verificación.",
        "El Museo Lolita Soriano resguarda 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. La sala permite leer esos materiales como fuentes de memoria; la procedencia y el estado de conservación de cada pieza deben confirmarse con el equipo del museo.",
      ),
    },
    {
      id: "lolita",
      titulo: "Lolita Soriano",
      palabrasClave: ["lolita", "soriano", "biografía", "biografia", "vida"],
      respuesta: porPerfil(
        "Lolita Soriano nació en Managua en 1922. Fue educadora, escritora y promotora cultural. Fundó una escuela de arte y una escuela nocturna para mujeres trabajadoras.",
        "María Dolores Soriano Estrada nació el 18 de junio de 1922 en el Barrio San Antonio de Managua. Fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura en 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en 1945.",
        "María Dolores Soriano Estrada (Managua, 18 de junio de 1922-2001) fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura el 12 de marzo de 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en febrero de 1945. Se la conoce como la «Madrina de los Artistas Nicaragüenses» y publicó más de cien obras, con especial atención a Rubén Darío.",
      ),
    },
    {
      id: "escuela",
      titulo: "Labor educativa",
      palabrasClave: [
        "escuela",
        "liceo",
        "casa de arte",
        "1945",
        "1939",
        "mujeres trabajadoras",
        "educación",
        "educacion",
      ],
      respuesta: porPerfil(
        "Lolita fundó una casa de arte y cultura en 1939 y una escuela nocturna gratuita para mujeres trabajadoras en 1945. No sé cuántas personas estudiaron allí; eso está por verificar.",
        "Lolita Soriano fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura el 12 de marzo de 1939. En febrero de 1945 creó la primera escuela nocturna gratuita para mujeres trabajadoras. La lista de estudiantes y docentes está por verificar.",
        "La labor educativa de Lolita Soriano se concretó en el Liceo Lolita Soriano y la Casa de Arte y Cultura (12 de marzo de 1939) y en la primera escuela nocturna gratuita para mujeres trabajadoras (febrero de 1945). Los nombres, trayectorias y alcance de esas experiencias requieren verificación documental.",
      ),
    },
    {
      id: "ruben-dario",
      titulo: "Rubén Darío",
      palabrasClave: [
        "rubén darío",
        "ruben dario",
        "darío",
        "dario",
        "modernismo",
      ],
      respuesta: porPerfil(
        "Lolita Soriano investigó y difundió la obra de Rubén Darío. No sé si lo conoció personalmente; él murió en 1916, cuando ella era niña.",
        "Lolita Soriano dedicó parte de su obra al estudio y la difusión de Rubén Darío. No hay documentación de un encuentro personal: Darío murió en 1916, cuando ella tenía seis años.",
        "La producción de Lolita Soriano incluye estudios sobre Rubén Darío y su obra. No debe confundirse la admiración literaria con un encuentro personal: Darío murió en 1916, cuando Soriano era niña. La cronología detallada de sus publicaciones está pendiente de verificación.",
      ),
    },
    {
      id: "personajes-sala",
      titulo: "Personajes relacionados",
      palabrasClave: ["personajes", "quién más", "quien mas", "relacionados"],
      respuesta: porPerfil(
        "Lolita Soriano tiene su propio chat. Podés conversar con ella desde la sección Personajes.",
        "La voz vinculada a esta sala es Lolita Soriano, que tiene una conversación propia presentada como representación educativa.",
        "La figura central de esta sala es Lolita Soriano, cuya conversación propia se identifica como representación educativa. La relación curatorial entre la sala y su voz es parte de la instalación.",
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
        "Puedo proponerte una actividad de observación: elegí un objeto, miralo con atención y contá qué te imaginas que cuenta. La programación oficial de talleres está por verificar.",
        "Puedo proponerte una actividad breve de observación o una pregunta para llevar por el museo. Los talleres, horarios y materiales oficiales están por verificar con el equipo del museo.",
        "Puedo proponer una actividad de observación o una consigna de escritura breve. La programación formal de talleres, las edades recomendadas y los materiales deben confirmarse con el equipo del museo.",
      ),
    },
    {
      id: "lolita",
      titulo: "Lolita Soriano y la educación",
      palabrasClave: [
        "lolita",
        "soriano",
        "educación",
        "educacion",
        "infancia",
        "niños",
        "ninos",
      ],
      respuesta: porPerfil(
        "Lolita Soriano fue una educadora que fundó una escuela de arte y una escuela nocturna para mujeres trabajadoras. Este espacio lleva su espíritu de aprender haciendo.",
        "Lolita Soriano fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura en 1939, y una escuela nocturna gratuita para mujeres trabajadoras en 1945. El Rincón del Niño dialoga con esa vocación educativa.",
        "La labor de Lolita Soriano incluyó la fundación del Liceo Lolita Soriano y la Casa de Arte y Cultura (1939) y de la primera escuela nocturna gratuita para mujeres trabajadoras (1945). El Rincón del Niño se presenta como un espacio de aprendizaje activo inspirado en esa trayectoria.",
      ),
    },
    {
      id: "museo",
      titulo: "El museo",
      palabrasClave: ["museo", "salas", "529", "2022", "bolonia"],
      respuesta: porPerfil(
        "El Museo Lolita Soriano abrió en 2022 en el Residencial Bolonia, Managua. Tiene diez salas y resguarda 529 objetos, documentos, fotos, partituras, instrumentos y discos.",
        "El Museo Lolita Soriano abrió el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Tiene diez salas y un acervo de 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos.",
        "El Museo Lolita Soriano fue inaugurado el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Su estructura comprende diez salas y un acervo de 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. La programación y los detalles de conservación deben confirmarse con la institución.",
      ),
    },
    {
      id: "personajes-sala",
      titulo: "Personajes relacionados",
      palabrasClave: ["personajes", "quién más", "quien mas", "relacionados"],
      respuesta: porPerfil(
        "En esta sala no hay un personaje asignado. Podés conversar con Lolita Soriano en su propio chat.",
        "La relación curatorial no asigna un personaje específico a esta sala. La voz de Lolita Soriano tiene su propia conversación.",
        "Esta sala no tiene un personaje asignado en la relación curatorial de la instalación. La conversación con Lolita Soriano se encuentra en su ficha y en el selector de voces.",
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
    descripcion: porPerfil(
      "Esta sala cuenta la vida de Lolita Soriano: su infancia en Managua, su amor por la enseñanza y su trabajo por el arte. Algunos detalles todavía están por verificar.",
      "La Sala Biográfica recorre la vida de María Dolores Soriano Estrada: su nacimiento en Managua en 1922, su labor educativa, sus publicaciones y su reconocimiento como Madrina de los Artistas Nicaragüenses. La cronología detallada está por verificar.",
      "La Sala Biográfica presenta la trayectoria de María Dolores Soriano Estrada (Managua, 1922-2001): educadora, escritora, investigadora y promotora cultural. Aborda su formación, la fundación del Liceo Lolita Soriano y la Casa de Arte y Cultura (1939), la escuela nocturna para mujeres trabajadoras (1945) y su producción intelectual. La cronología y los documentos individuales están pendientes de verificación.",
    ),
    personajesRelacionados: ["lolita-soriano"],
  }),
  crearSala("sala-de-musica", "Sala de Música", {
    descripcion: porPerfil(
      "Acá suenan historias: un tocadiscos que le regaló Agustín Lara a Lolita, instrumentos de una orquesta italiana y canciones de La Gritería. El inventario completo está por verificar.",
      "La Sala de Música reúne el tocadiscos que Agustín Lara le regaló a Lolita Soriano en la década de 1950, instrumentos donados por una orquesta italiana y materiales vinculados a Alejandro Vega Matus, Luis Abraham Delgadillo y las agrupaciones musicales nicaragüenses. El inventario completo está por verificar.",
      "La Sala de Música articula memoria personal y prácticas musicales nicaragüenses. Conserva un tocadiscos obsequiado por Agustín Lara a Lolita Soriano en la década de 1950 e instrumentos donados por una orquesta italiana. Se vincula curatorialmente con Alejandro Vega Matus, la Orquesta de los Supremos Poderes y la Banda Municipal de Managua. La procedencia individual y el estado de conservación de las piezas están pendientes de verificación.",
    ),
    agenteXilaUbicado: agenteMusica,
    personajesRelacionados: [
      "alejandro-vega-matus",
      "orquesta-supremos-poderes",
    ],
  }),
  crearSala("sala-de-audiovisuales", "Sala de Audiovisuales", {
    descripcion: porPerfil(
      "Una sala para ver y escuchar historias del museo. La lista de videos y equipos está por verificar.",
      "La Sala de Audiovisuales se presenta como un espacio para registros audiovisuales y materiales de difusión cultural. La lista de proyecciones, equipos y horarios está por verificar.",
      "La Sala de Audiovisuales está destinada a materiales audiovisuales y registros de la vida cultural de Managua. Su programación, equipamiento y catálogo requieren confirmación con el equipo del museo.",
    ),
  }),
  crearSala("corredor-managua", "Corredor Managua", {
    descripcion: porPerfil(
      "Un paseo por la Managua que conoció Lolita: sus barrios, sus calles y su gente. Los detalles de la exhibición están por verificar.",
      "El Corredor Managua propone un recorrido por la ciudad que vio nacer y trabajar a Lolita Soriano: barrios, transformaciones urbanas y memoria cultural. Los detalles específicos de la exhibición están por verificar.",
      "El Corredor Managua se presenta como un recorrido por la ciudad que habitó Lolita Soriano: el Barrio San Antonio, las transformaciones urbanas de Managua y las redes culturales de su época. La selección documental y los textos curatoriales están pendientes de verificación.",
    ),
  }),
  crearSala("sala-de-objetos-personales", "Sala de Objetos Personales", {
    descripcion: porPerfil(
      "Acá se guardan objetos de la vida de Lolita: documentos, fotos, partituras y recuerdos. El museo tiene 529 piezas; la historia de cada una está por verificar.",
      "La Sala de Objetos Personales reúne parte de los 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos de Lolita Soriano. La procedencia individual de cada pieza está por verificar.",
      "La Sala de Objetos Personales reúne parte del acervo de 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos vinculados a Lolita Soriano. Los objetos se presentan como fuentes de memoria y permiten reconstruir su trayectoria educativa y cultural. La procedencia, datación y estado de conservación de cada pieza están pendientes de verificación.",
    ),
    agenteXilaUbicado: agenteObjetos,
  }),
  crearSala("galeria-fotografica", "Galería Fotográfica", {
    descripcion: porPerfil(
      "Fotos de Lolita, su familia y sus amigos. La identificación de cada imagen está por verificar.",
      "La Galería Fotográfica reúne imágenes vinculadas a Lolita Soriano, su entorno familiar y cultural. La identificación de las personas, los lugares y las fechas de cada fotografía está por verificar.",
      "La Galería Fotográfica presenta fotografías vinculadas a Lolita Soriano, su entorno familiar y sus redes culturales. Las imágenes permiten explorar la historia de la fotografía en Managua y la construcción de memoria personal. La identificación, datación y procedencia de cada imagen están pendientes de verificación.",
    ),
  }),
  crearSala(
    "sala-de-arqueologia-y-artesania",
    "Sala de Arqueología y Artesanía",
    {
      descripcion: porPerfil(
        "Piezas antiguas y artesanías de Nicaragua. La historia de cada objeto está por verificar.",
        "La Sala de Arqueología y Artesanía acerca al patrimonio material nicaragüense. La procedencia, la cronología y la descripción de las piezas están por verificar.",
        "La Sala de Arqueología y Artesanía propone un acercamiento al patrimonio material de Nicaragua, desde piezas arqueológicas hasta expresiones artesanales. La procedencia, cronología, autoría y condiciones de conservación de cada objeto requieren verificación documental.",
      ),
    },
  ),
  crearSala("biblioteca-y-hemeroteca", "Biblioteca y Hemeroteca", {
    descripcion: porPerfil(
      "Libros, periódicos y papeles de trabajo de Lolita. El catálogo completo está por verificar.",
      "La Biblioteca y Hemeroteca conserva libros, publicaciones periódicas y documentos de trabajo de Lolita Soriano, incluidos sus estudios sobre Rubén Darío. El catálogo completo está por verificar.",
      "La Biblioteca y Hemeroteca resguarda libros, publicaciones periódicas y documentos de trabajo vinculados a Lolita Soriano, con especial presencia de sus estudios sobre Rubén Darío. El catálogo, la procedencia y el estado de conservación de los materiales están pendientes de verificación.",
    ),
  }),
  crearSala("patio-de-escultura", "Patio de Escultura", {
    descripcion: porPerfil(
      "Un patio con esculturas para mirar con calma. La autoría y la fecha de cada obra están por verificar.",
      "El Patio de Escultura es un espacio abierto con obras tridimensionales. La autoría, la fecha y la procedencia de cada escultura están por verificar.",
      "El Patio de Escultura se presenta como un espacio abierto para la contemplación de obras tridimensionales. La autoría, datación, materiales y procedencia de cada pieza requieren confirmación documental.",
    ),
  }),
  crearSala("rincon-del-nino", "El Rincón del Niño", {
    descripcion: porPerfil(
      "Un espacio para jugar, mirar y preguntar. La programación de talleres está por verificar.",
      "El Rincón del Niño es un espacio pensado para la infancia: observación, juego y conversación. La programación de talleres y las edades recomendadas están por verificar.",
      "El Rincón del Niño es un espacio educativo destinado a la infancia, donde la observación, el juego y la conversación acercan al museo. La programación formal, las edades recomendadas y los materiales didácticos deben confirmarse con el equipo del museo.",
    ),
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
    "Lolita Soriano nació en Managua en 1922. Fue educadora, escritora y promotora cultural. Fundó una escuela de arte y una escuela nocturna para mujeres trabajadoras. El museo que lleva su nombre tiene diez salas. Algunos datos todavía están por verificar.",
    "María Dolores Soriano Estrada (Managua, 1922-2001) fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura en 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en 1945. Se la conoce como la «Madrina de los Artistas Nicaragüenses». La fecha exacta de su muerte está por verificar.",
    "María Dolores Soriano Estrada (Managua, 18 de junio de 1922-2001) fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura el 12 de marzo de 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en febrero de 1945. Se la conoce como la «Madrina de los Artistas Nicaragüenses». Publicó más de cien obras, con especial atención a Rubén Darío, y elaboró un mapa en altorrelieve de Nicaragua. La fecha exacta de su muerte está pendiente de verificación.",
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
      "¡Hola! Soy Lolita Soriano, en una representación educativa del museo que lleva mi nombre. Fui educadora y promotora cultural. ¿Qué querés saber de mi vida o de la escuela que fundé?",
      "Hola. Soy Lolita Soriano, en una representación educativa del Museo Lolita Soriano. Fui educadora, escritora, investigadora y promotora cultural. Puedo contarte sobre mi labor, el Liceo, la escuela nocturna y mi relación con el arte. ¿Qué te interesa?",
      "Buen día. Soy Lolita Soriano, presentada en esta instalación como una representación educativa. Fui educadora, escritora, investigadora y promotora cultural. Puedo conversar sobre mi trayectoria, la fundación del Liceo y de la escuela nocturna para mujeres trabajadoras, mis estudios sobre Rubén Darío y el acervo del museo. ¿Cómo desea comenzar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quién sos?",
        "¿Qué escuela fundaste?",
        "¿Qué es un mapa en altorrelieve?",
        "¿Qué hay en el museo?",
      ],
      [
        "¿Cuál fue tu labor educativa?",
        "¿Qué relación tenés con Rubén Darío?",
        "¿Qué objetos guarda el museo?",
        "¿Por qué te llaman Madrina de los Artistas?",
      ],
      [
        "¿Cómo articulaste educación, arte e investigación?",
        "¿Cuál es el alcance de tus estudios sobre Rubén Darío?",
        "¿Qué documentación respalda tu trayectoria?",
        "¿Qué datos de tu vida están por verificar?",
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
        "soriano",
      ],
      respuesta: porPerfil(
        "Soy Lolita Soriano. Nací en Managua en 1922 y fui educadora, escritora y promotora cultural. En este museo soy una representación educativa, no una cita real.",
        "Soy María Dolores Soriano Estrada, Lolita Soriano. Nací el 18 de junio de 1922 en el Barrio San Antonio de Managua y fui educadora, escritora, investigadora y promotora cultural. Esta conversación es una representación educativa, no un testimonio literal.",
        "Soy María Dolores Soriano Estrada, conocida como Lolita Soriano. Nací en Managua el 18 de junio de 1922 y fui educadora, escritora, investigadora y promotora cultural. En esta instalación hablo como una representación educativa; no soy una cita textual ni un testimonio, y la fecha exacta de mi muerte está por verificar.",
      ),
    },
    temas: [
      {
        id: "infancia",
        titulo: "Nacimiento y formación",
        palabrasClave: [
          "naciste",
          "nacimiento",
          "infancia",
          "barrio san antonio",
          "1922",
          "managua",
        ],
        respuesta: porPerfil(
          "Nací en Managua el 18 de junio de 1922, en el Barrio San Antonio. Crecí entre libros y conversaciones sobre arte y educación.",
          "Nací el 18 de junio de 1922 en el Barrio San Antonio de Managua. Mi formación estuvo marcada por la lectura, la escritura y el interés por la educación y el arte.",
          "Nací en el Barrio San Antonio de Managua el 18 de junio de 1922. La información disponible no permite reconstruir con detalle mi infancia; lo que sí está documentado es mi vocación por la educación, la escritura y la promoción cultural.",
        ),
      },
      {
        id: "liceo",
        titulo: "Liceo y Casa de Arte y Cultura",
        palabrasClave: [
          "liceo",
          "casa de arte",
          "1939",
          "escuela de arte",
          "fundaste",
        ],
        respuesta: porPerfil(
          "El 12 de marzo de 1939 fundé el Liceo Lolita Soriano y la Casa de Arte y Cultura. Era un lugar para aprender y crear.",
          "El 12 de marzo de 1939 fundé el Liceo Lolita Soriano y la Casa de Arte y Cultura. Allí se articulaban la enseñanza, las artes y la vida cultural de Managua.",
          "El 12 de marzo de 1939 fundé el Liceo Lolita Soriano y la Casa de Arte y Cultura, espacios dedicados a la formación y a la promoción artística. La documentación disponible no detalla el plan de estudios ni la lista completa de docentes y estudiantes; esos datos están por verificar.",
        ),
      },
      {
        id: "escuela-nocturna",
        titulo: "Escuela nocturna para mujeres trabajadoras",
        palabrasClave: [
          "escuela nocturna",
          "mujeres trabajadoras",
          "1945",
          "educación de mujeres",
          "educacion de mujeres",
        ],
        respuesta: porPerfil(
          "En febrero de 1945 fundé la primera escuela nocturna gratuita para mujeres trabajadoras. Quería que pudieran estudiar después del trabajo.",
          "En febrero de 1945 fundé la primera escuela nocturna gratuita para mujeres trabajadoras. Fue una apuesta por la educación como herramienta de autonomía.",
          "En febrero de 1945 fundé la primera escuela nocturna gratuita para mujeres trabajadoras. La propuesta buscaba ampliar el acceso a la educación de quienes trabajaban durante el día. El alcance, la matrícula y los contenidos de esa experiencia requieren verificación documental.",
        ),
      },
      {
        id: "ruben-dario",
        titulo: "Rubén Darío",
        palabrasClave: [
          "rubén darío",
          "ruben dario",
          "darío",
          "dario",
          "modernismo",
          "estudios",
        ],
        respuesta: porPerfil(
          "Estudié y difundí la obra de Rubén Darío. Es uno de los grandes poetas de Nicaragua. No lo conocí personalmente: murió en 1916, cuando yo era niña.",
          "Dediqué parte de mi obra al estudio y la difusión de Rubén Darío. La información disponible me atribuye más de cien obras, con especial atención a su poesía y su legado. No hay documentación de un encuentro personal: Darío murió en 1916, cuando yo tenía seis años.",
          "Mi producción intelectual incluye estudios sobre Rubén Darío, figura central del modernismo hispanoamericano. La información disponible me atribuye más de cien obras. No debe confundirse la admiración literaria con un encuentro personal: Darío murió en 1916, cuando yo era niña. La cronología y el listado completo de mis publicaciones están pendientes de verificación.",
        ),
      },
      {
        id: "madrina",
        titulo: "Madrina de los Artistas",
        palabrasClave: [
          "madrina",
          "artistas",
          "reconocimiento",
          "premio",
          "homenaje",
        ],
        respuesta: porPerfil(
          "Me llaman la «Madrina de los Artistas Nicaragüenses» porque acompañé a muchos artistas y promoví su trabajo. No puedo darte una lista completa de todos ellos.",
          "Se me conoce como la «Madrina de los Artistas Nicaragüenses» por mi labor de acompañamiento y promoción del arte. La lista completa de artistas que pasaron por mis espacios está por verificar.",
          "El reconocimiento como «Madrina de los Artistas Nicaragüenses» sintetiza mi trabajo de formación, acompañamiento y difusión artística. La documentación disponible no permite atribuir ese acompañamiento a nombres concretos sin verificación previa; por eso prefiero no inventar una lista.",
        ),
      },
      {
        id: "mapa",
        titulo: "Mapa en altorrelieve",
        palabrasClave: [
          "mapa",
          "altorrelieve",
          "relieve",
          "nicaragua",
          "geografía",
          "geografia",
        ],
        respuesta: porPerfil(
          "Elaboré un mapa en altorrelieve de Nicaragua. Era una forma de enseñar geografía con las manos.",
          "Elaboré un mapa en altorrelieve de Nicaragua, una pieza que combina conocimiento geográfico y trabajo manual. La fecha exacta de su realización está por verificar.",
          "Elaboré un mapa en altorrelieve de Nicaragua, una obra que articula representación geográfica y dimensión táctil. La fecha, las dimensiones y el destino actual de la pieza requieren verificación documental.",
        ),
      },
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: [
          "museo",
          "instalación",
          "instalacion",
          "529",
          "bolonia",
          "2022",
        ],
        respuesta: porPerfil(
          "El Museo Lolita Soriano abrió en 2022 en el Residencial Bolonia, Managua. Tiene diez salas y guarda 529 objetos, documentos, fotos, partituras, instrumentos y discos.",
          "El Museo Lolita Soriano abrió el 19 de septiembre de 2022 en el Residencial Bolonia, Managua, y resguarda 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. Es un museo que lleva mi nombre, no una institución que yo haya fundado.",
          "El Museo Lolita Soriano fue inaugurado el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Resguarda 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. Es importante distinguir entre mi trayectoria y la institución que lleva mi nombre: el museo abrió después de mi muerte.",
        ),
      },
      {
        id: "musica",
        titulo: "Música y objetos",
        palabrasClave: [
          "música",
          "musica",
          "tocadiscos",
          "agustín lara",
          "agustin lara",
          "instrumentos",
          "partituras",
        ],
        respuesta: porPerfil(
          "En la Sala de Música hay un tocadiscos que Agustín Lara me regaló en los años cincuenta y instrumentos donados por una orquesta italiana. También hay partituras y discos.",
          "La Sala de Música conserva un tocadiscos que Agustín Lara me regaló en la década de 1950, instrumentos donados por una orquesta italiana y materiales musicales del acervo. La procedencia individual de cada pieza está por verificar.",
          "El acervo musical del museo incluye un tocadiscos obsequiado por Agustín Lara en la década de 1950, instrumentos donados por una orquesta italiana y partituras, discos y documentos. La documentación pieza por pieza y la historia de cada donación están pendientes de verificación.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "biográfica", "biografica"],
        respuesta: porPerfil(
          "Mi historia se cuenta en la Sala Biográfica. Ahí podés ver documentos, fotos y objetos de mi vida.",
          "La Sala Biográfica recorre mi trayectoria. Allí se presentan documentos, fotografías y objetos vinculados a mi labor educativa y cultural.",
          "La Sala Biográfica presenta mi trayectoria a partir de documentos, fotografías y objetos. La selección curatorial y la procedencia individual de las piezas están pendientes de verificación.",
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
          "Soy una representación educativa. No soy una cita real ni un testimonio. Lo que cuento se apoya en datos documentados.",
          "Esta conversación es una dramatización educativa. No reproduce citas textuales ni testimonios, y distingue los hechos documentados de los datos por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio. Mis respuestas se apoyan en información pública y señalan los puntos que requieren verificación.",
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
          "Puedo contarte sobre mi vida, la escuela que fundé, mis libros y los objetos del museo.",
          "Puedo conversar sobre mi trayectoria educativa, el Liceo, la escuela nocturna, mis estudios sobre Rubén Darío y el acervo del museo.",
          "Puedo orientarle sobre mi trayectoria, la fundación del Liceo y de la escuela nocturna, mi producción intelectual, el acervo del museo y los límites de esta representación.",
        ),
      },
    ],
    noConocidos: datosPersonaPorVerificar,
    desconocido: porPerfil(
      "No tengo ese dato. Está por verificar y no quiero inventarlo. Pero puedo contarte otra cosa de mi vida o del museo.",
      "No tengo información verificada sobre ese punto. Puedo ofrecerte el contexto documentado que sí conozco y señalar qué falta averiguar.",
      "No dispongo de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, prefiero señalarlo y ofrecer el contexto documentado disponible.",
    ),
  }),
};

const alejandroVegaMatus: Personaje = {
  id: "alejandro-vega-matus",
  nombre: "Alejandro Vega Matus",
  tipo: "personaje",
  etiquetaVisible: ETIQUETA_REPRESENTACION,
  descripcion: porPerfil(
    "Alejandro Vega Matus nació en Masaya en 1873. Fue músico y compuso canciones para La Gritería, la fiesta de la Virgen que se celebra el 7 de diciembre. También fundó una orquesta. Algunos datos de su vida están por verificar.",
    "Alejandro Vega Matus (Masaya, 1873-1937) fue músico, compositor y director de orquesta. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa». Su vínculo con la Sala de Música es curatorial.",
    "Alejandro Vega Matus (Masaya, 17 de agosto de 1873-26 de noviembre de 1937) fue músico, compositor y director de orquesta. Hijo de Pablo Vega y Raudez y Josefa Matus de Vega, se formó en la Escuela de Música de su padre en León y luego en Guatemala con Juan Aberle. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería, que se entonan el 7 de diciembre: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa». También escribió «La muerte de Jesús», Ave Marías, valses, marchas, intermezzos y sones de pascua. La relación con la Sala de Música es curatorial, no un recuerdo personal.",
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
      "¡Hola! Soy Alejandro Vega Matus, en una representación educativa del museo. Fui músico y compuse canciones para La Gritería. ¿Qué querés saber?",
      "Hola. Soy Alejandro Vega Matus, en una representación educativa del Museo Lolita Soriano. Fui músico y director de orquesta en Masaya. Compuse cantos para La Gritería y fundé la Orquesta Liras Fernandinas. ¿Qué te interesa?",
      "Buen día. Soy Alejandro Vega Matus, presentado en esta instalación como una representación educativa. Fui músico, compositor y director de orquesta. Puedo conversar sobre mi formación en Masaya y León, la Orquesta Liras Fernandinas, mis cantos para La Gritería y la música nicaragüense de mi época. ¿Cómo desea comenzar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quién sos?",
        "¿Qué cantos compusiste para La Gritería?",
        "¿Qué es la Virgen Concepción?",
        "¿Qué instrumentos te gustaban?",
      ],
      [
        "¿Cómo fue tu formación musical?",
        "¿Qué es La Gritería y qué se canta?",
        "¿Qué fue la Orquesta Liras Fernandinas?",
        "¿Qué otras obras compusiste?",
      ],
      [
        "¿Cómo se articula tu obra con La Purísima y La Gritería?",
        "¿Cuál es el alcance documentado de tu catálogo?",
        "¿Qué relación tuvo Masaya con tu música?",
        "¿Qué datos de tu vida están por verificar?",
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
        "Soy Alejandro Vega Matus. Nací en Masaya en 1873 y fui músico. Compuse cantos para La Gritería. En este museo soy una representación educativa.",
        "Soy Alejandro Vega Matus. Nací en Masaya el 17 de agosto de 1873 y morí allí el 26 de noviembre de 1937. Fui músico, compositor y director de orquesta. Esta conversación es una representación educativa, no una cita literal.",
        "Soy Alejandro Vega Matus, músico, compositor y director de orquesta nacido en Masaya el 17 de agosto de 1873 y fallecido en la misma ciudad el 26 de noviembre de 1937. En esta instalación hablo como una representación educativa; no soy una cita textual ni un testimonio, y el catálogo completo de mis obras está pendiente de verificación.",
      ),
    },
    temas: [
      {
        id: "nacimiento",
        titulo: "Nacimiento y familia",
        palabrasClave: [
          "naciste",
          "nacimiento",
          "masaya",
          "1873",
          "familia",
          "padres",
          "pablo vega",
          "josefa matus",
        ],
        respuesta: porPerfil(
          "Nací en Masaya el 17 de agosto de 1873. Mi familia era de músicos: mi papá, Pablo Vega, y mis tíos me enseñaron los primeros pasos.",
          "Nací en Masaya el 17 de agosto de 1873, hijo de Pablo Vega y Raudez y Josefa Matus de Vega. Crecí en una familia de músicos; mis tíos José del Carmen Vega y Francisco Vega fueron referentes tempranos.",
          "Nací en Masaya el 17 de agosto de 1873, hijo de Pablo Vega y Raudez y Josefa Matus de Vega. La familia paterna tuvo una fuerte tradición musical: mis tíos José del Carmen Vega y Raudez y Francisco Vega y Raudez acompañaron mis primeros estudios. Esa formación inicial es parte de lo documentado; otros detalles familiares requieren verificación.",
        ),
      },
      {
        id: "formacion",
        titulo: "Formación musical",
        palabrasClave: [
          "formación",
          "formacion",
          "estudiaste",
          "león",
          "leon",
          "guatemala",
          "juan aberle",
          "escuela de música",
          "escuela de musica",
        ],
        respuesta: porPerfil(
          "Estudié música en León, en la escuela que fundó mi papá, y después en Guatemala con el maestro Juan Aberle.",
          "Me formé en León, en la Escuela de Música fundada por mi padre, y luego en Guatemala bajo la dirección de Juan Aberle. Esa formación me dio herramientas para componer y dirigir.",
          "Mi formación musical comenzó en el entorno familiar de Masaya y continuó en León, en la Escuela de Música fundada por mi padre, Pablo Vega. Más tarde estudié en Guatemala con Juan Aberle. La cronología exacta de esos estudios y los programas cursados están pendientes de verificación.",
        ),
      },
      {
        id: "liras",
        titulo: "Orquesta Liras Fernandinas",
        palabrasClave: [
          "liras fernandinas",
          "orquesta",
          "fundaste",
          "dirigiste",
        ],
        respuesta: porPerfil(
          "Fundé la Orquesta Liras Fernandinas. Era una orquesta para hacer música y compartirla con la gente.",
          "Fundé la Orquesta Liras Fernandinas, una agrupación con la que pude desarrollar mi trabajo como compositor y director. La lista de integrantes y el repertorio completo están por verificar.",
          "Fundé la Orquesta Liras Fernandinas, espacio de interpretación y difusión musical. La documentación disponible no detalla su plantilla completa, su repertorio ni sus presentaciones; esos datos requieren verificación.",
        ),
      },
      {
        id: "griteria",
        titulo: "La Gritería y la Virgen Concepción",
        palabrasClave: [
          "gritería",
          "griteria",
          "virgen",
          "concepción",
          "concepcion",
          "purísima",
          "purisima",
          "7 de diciembre",
          "siete de diciembre",
          "altares",
        ],
        respuesta: porPerfil(
          "La Gritería es una fiesta de Nicaragua que se celebra el 7 de diciembre para saludar a la Virgen de la Concepción. La gente canta, reza y visita los altares. Mis cantos se cantan en esa fiesta.",
          "La Gritería se celebra el 7 de diciembre, en la víspera de la Inmaculada Concepción de María. Es una fiesta religiosa y popular con altares, cantos y visitas. Mis cinco cantos forman parte de ese repertorio y se entonan esa noche.",
          "La Gritería es una celebración religiosa y popular que se realiza el 7 de diciembre, en la víspera de la Inmaculada Concepción de María. Articula la novena de La Purísima, los altares, la visita de los fieles y un repertorio de cantos. Mis cinco cantos —«Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa»— se entonan en ese contexto. La documentación sobre el origen exacto de cada pieza y sus variantes locales requiere verificación.",
        ),
      },
      {
        id: "obras",
        titulo: "Obras y repertorio",
        palabrasClave: [
          "obras",
          "composiciones",
          "compusiste",
          "repertorio",
          "valses",
          "marchas",
          "intermezzos",
          "sones de pascua",
          "la muerte de jesús",
          "la muerte de jesus",
        ],
        respuesta: porPerfil(
          "Compuse los cinco cantos de La Gritería y otras piezas: valses, marchas, intermezzos y sones de pascua. También escribí «La muerte de Jesús» y Ave Marías.",
          "Además de los cinco cantos de La Gritería, compuse «La muerte de Jesús», Ave Marías, valses, marchas, intermezzos y sones de pascua. El catálogo completo y las fechas de cada obra están por verificar.",
          "Mi producción documentada incluye los cinco cantos de La Gritería, «La muerte de Jesús», Ave Marías, valses, marchas, intermezzos y sones de pascua. La información disponible reconoce mi papel como pionero de la identidad musical nicaragüense. El catálogo completo, las fechas de composición y las versiones conservadas requieren verificación documental.",
        ),
      },
      {
        id: "muerte",
        titulo: "Últimos años",
        palabrasClave: [
          "moriste",
          "muerte",
          "1937",
          "diabetes",
          "últimos años",
          "ultimos anos",
        ],
        respuesta: porPerfil(
          "Morí en Masaya el 26 de noviembre de 1937. La información disponible dice que fue por diabetes.",
          "Morí en Masaya el 26 de noviembre de 1937. La información disponible atribuye la causa a la diabetes. Fue en mi ciudad natal, donde había desarrollado buena parte de mi trabajo musical.",
          "Fallecí en Masaya el 26 de noviembre de 1937. La información disponible atribuye la causa a la diabetes. Los documentos médicos y los detalles de mis últimos años requieren verificación; prefiero no agregar datos que no estén respaldados.",
        ),
      },
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: [
          "museo",
          "instalación",
          "instalacion",
          "sala de música",
          "sala de musica",
        ],
        respuesta: porPerfil(
          "En este museo mi voz se vincula con la Sala de Música. Ahí hay partituras, instrumentos y discos. La relación es del museo, no un recuerdo mío.",
          "En esta instalación, mi voz se vincula con la Sala de Música junto a la Orquesta de los Supremos Poderes y la Banda Municipal de Managua. Esa relación es curatorial: no implica que yo haya visitado el museo.",
          "La Sala de Música del Museo Lolita Soriano me vincula curatorialmente con otros repertorios y agrupaciones. Esa relación forma parte de la instalación y no debe interpretarse como un recuerdo personal ni como una visita documentada. El museo conserva partituras, instrumentos y discos que permiten contextualizar la música nicaragüense.",
        ),
      },
      {
        id: "sala",
        titulo: "Sala relacionada",
        palabrasClave: ["sala", "música", "musica"],
        respuesta: porPerfil(
          "Mi ficha se vincula con la Sala de Música. Ahí podés escuchar historias sobre instrumentos y canciones.",
          "Mi ficha se vincula con la Sala de Música. La relación es curatorial y permite conectar mi obra con el acervo musical del museo.",
          "La relación entre mi ficha y la Sala de Música es curatorial. La sala permite situar mi obra en un contexto más amplio de prácticas musicales, sin convertir esa conexión en un recuerdo personal.",
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
          "Soy una representación educativa. No soy una cita real ni un testimonio. Lo que cuento se apoya en datos documentados.",
          "Esta conversación es una dramatización educativa. No reproduce citas textuales ni testimonios, y distingue los hechos documentados de los datos por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio. Mis respuestas se apoyan en información pública y señalan los puntos que requieren verificación.",
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
          "Puedo contarte sobre mi vida, mis canciones de La Gritería y la orquesta que fundé.",
          "Puedo conversar sobre mi formación, la Orquesta Liras Fernandinas, los cantos de La Gritería y la música nicaragüense de mi época.",
          "Puedo orientarle sobre mi trayectoria, mi formación, la Orquesta Liras Fernandinas, los cantos de La Gritería, mi catálogo documentado y los límites de esta representación.",
        ),
      },
    ],
    noConocidos: datosPersonaPorVerificar,
    desconocido: porPerfil(
      "No tengo ese dato. Está por verificar y no quiero inventarlo. Pero puedo contarte otra cosa de mi música o de La Gritería.",
      "No tengo información verificada sobre ese punto. Puedo ofrecerte el contexto documentado que sí conozco y señalar qué falta averiguar.",
      "No dispongo de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, prefiero señalarlo y ofrecer el contexto documentado disponible.",
    ),
  }),
};

const orquestaSupremosPoderes: Personaje = {
  id: "orquesta-supremos-poderes",
  nombre: "Orquesta de los Supremos Poderes",
  tipo: "personaje",
  etiquetaVisible: ETIQUETA_ORQUESTA,
  descripcion: porPerfil(
    "Somos la Orquesta de los Supremos Poderes, una agrupación musical que aparece en el museo. Nuestra historia está por verificar, pero podemos contarte sobre la música de Nicaragua y sobre don Luis Abraham Delgadillo.",
    "Somos la Orquesta de los Supremos Poderes, una voz colectiva de la Sala de Música. La investigación no encontró una fuente nicaragüense verificada con ese nombre exacto; la institución documentada más cercana es la Banda de los Supremos Poderes. Por eso hablamos desde la representación educativa y desde la información disponible.",
    "La Orquesta de los Supremos Poderes se presenta como una voz colectiva de la Sala de Música. La investigación no localizó una fuente nicaragüense verificada con esa denominación exacta: la institución documentada más cercana es la Banda de los Supremos Poderes, dirigida en su momento por Luis Abraham Delgadillo. La agrupación se presenta, por tanto, como representación educativa y no como una historia institucional comprobada.",
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
      "¡Hola! Somos la Orquesta de los Supremos Poderes. En este museo somos una voz colectiva de la Sala de Música. Podemos contarte sobre la música de Nicaragua, sobre don Luis Abraham Delgadillo y sobre La Gritería. ¿Qué querés saber?",
      "Somos la Orquesta de los Supremos Poderes, una representación educativa de la Sala de Música. La investigación no encontró una fuente nicaragüense verificada con ese nombre exacto, así que hablamos desde la representación y desde la información documentada sobre bandas, orquestas y Delgadillo. ¿Qué te interesa?",
      "Buen día. Somos la Orquesta de los Supremos Poderes, presentada en esta instalación como una voz colectiva y educativa de la Sala de Música. La investigación no localizó una fuente nicaragüense verificada con esa denominación exacta; la institución documentada más cercana es la Banda de los Supremos Poderes. Podemos conversar sobre ese contexto, sobre Luis Abraham Delgadillo y sobre la música nicaragüense. ¿Cómo desea comenzar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quiénes son?",
        "¿Qué instrumentos usan?",
        "¿Qué es La Gritería?",
        "¿Quién fue Delgadillo?",
      ],
      [
        "¿Por qué no hay datos verificados sobre la orquesta?",
        "¿Qué relación tienen con Delgadillo?",
        "¿Qué es la suite «Diciembre»?",
        "¿Cómo era la música en Nicaragua?",
      ],
      [
        "¿Cuál es la diferencia entre la Orquesta y la Banda de los Supremos Poderes?",
        "¿Qué documentación existe sobre Delgadillo?",
        "¿Cómo se articula la música de concierto con La Purísima?",
        "¿Qué límites tiene esta representación?",
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
        "Somos la Orquesta de los Supremos Poderes. En este museo somos una voz colectiva que habla de música. Nuestra historia no está verificada, pero podemos contarte cosas documentadas sobre bandas y orquestas de Nicaragua.",
        "Somos la Orquesta de los Supremos Poderes, una representación educativa desde la perspectiva de la agrupación. La investigación no encontró una fuente nicaragüense verificada con ese nombre exacto. La institución documentada más cercana es la Banda de los Supremos Poderes.",
        "Somos la Orquesta de los Supremos Poderes, una voz colectiva presentada en esta instalación como representación educativa. La investigación no localizó una fuente nicaragüense verificada con esa denominación. La institución documentada más cercana es la Banda de los Supremos Poderes, lo que obliga a distinguir entre la representación curatorial y la historia institucional comprobada.",
      ),
    },
    temas: [
      {
        id: "nombre",
        titulo: "Orquesta y Banda de los Supremos Poderes",
        palabrasClave: [
          "banda de los supremos poderes",
          "diferencia",
          "nombre exacto",
          "institución",
          "institucion",
          "honduras",
          "el salvador",
        ],
        respuesta: porPerfil(
          "La Banda de los Supremos Poderes es una institución de Nicaragua que sí está documentada. Nuestro nombre se parece, pero no es lo mismo. Por eso decimos que nuestra historia está por verificar.",
          "La institución nicaragüense documentada es la Banda de los Supremos Poderes. No encontramos una fuente verificada de una «Orquesta de los Supremos Poderes» en Nicaragua. Existen agrupaciones con nombres parecidos en Honduras y El Salvador, pero no debemos confundirlas con esta representación.",
          "La confusión es relevante: la institución nicaragüense documentada es la Banda de los Supremos Poderes, no una orquesta con ese nombre. La investigación tampoco permite asimilar esta representación a agrupaciones homónimas de Honduras o El Salvador. Por eso hablamos como representación educativa y no afirmamos una historia institucional que no está comprobada.",
        ),
      },
      {
        id: "delgadillo",
        titulo: "Luis Abraham Delgadillo",
        palabrasClave: [
          "delgadillo",
          "luis abraham",
          "milán",
          "milan",
          "carnegie",
          "escuela nacional de música",
          "escuela nacional de musica",
        ],
        respuesta: porPerfil(
          "Don Luis Abraham Delgadillo fue un músico de Nicaragua. Dirigió la Banda de los Supremos Poderes y compuso una suite llamada «Diciembre». También llevó su música a Nueva York.",
          "Luis Abraham Delgadillo nació en Managua en 1887 y murió en 1961. Estudió en el Conservatorio de Milán, dirigió la Banda de los Supremos Poderes y fundó la Escuela Nacional de Música. En 1930 dirigió un concierto de sus obras en el Carnegie Hall.",
          "Luis Abraham Delgadillo (Managua, 26 de agosto de 1887-20 de diciembre de 1961) fue compositor, director y pedagogo. Estudió en el Conservatorio de Milán; fue director de la Banda de los Supremos Poderes y primer director general de cultura musical de Nicaragua. Fundó la Escuela Nacional de Música y una orquesta sinfónica. Entre 1921 y 1925 enseñó solfeo en el Conservatorio Nacional de Música de la Ciudad de México. En 1930 fue invitado a dirigir un concierto de sus obras en el Carnegie Hall de Nueva York.",
        ),
      },
      {
        id: "diciembre",
        titulo: "La suite «Diciembre»",
        palabrasClave: [
          "diciembre",
          "suite",
          "purísima",
          "purisima",
          "gritería",
          "griteria",
        ],
        respuesta: porPerfil(
          "La suite «Diciembre» de Delgadillo está inspirada en La Purísima y La Gritería. Es música que habla de las fiestas de diciembre en Nicaragua.",
          "La suite «Diciembre» de Luis Abraham Delgadillo se inspira en La Purísima y La Gritería, las celebraciones de diciembre en Nicaragua. Es un ejemplo de cómo la música de concierto dialoga con la religiosidad popular.",
          "La suite «Diciembre» de Delgadillo toma como referencia el paisaje sonoro de La Purísima y La Gritería. La obra permite analizar la relación entre música de concierto, religiosidad popular y calendario festivo nicaragüense. La fecha exacta de composición y las versiones conservadas requieren verificación documental.",
        ),
      },
      {
        id: "griteria",
        titulo: "La Gritería y La Purísima",
        palabrasClave: [
          "gritería",
          "griteria",
          "purísima",
          "purisima",
          "virgen",
          "concepción",
          "concepcion",
          "7 de diciembre",
          "altares",
        ],
        respuesta: porPerfil(
          "La Gritería es una fiesta de Nicaragua que se celebra el 7 de diciembre. La gente visita altares, canta y reza. La Purísima es la novena que la prepara.",
          "La Gritería se celebra el 7 de diciembre, en la víspera de la Inmaculada Concepción de María. Incluye altares, cantos y visitas. La Purísima es la novena previa. La música de bandas y orquestas ocupa un lugar importante en esas celebraciones.",
          "La Gritería es una celebración religiosa y popular que se realiza el 7 de diciembre, en la víspera de la Inmaculada Concepción de María. Articula la novena de La Purísima, los altares, la visita de los fieles y un repertorio de cantos. Las bandas y orquestas participan en ese paisaje sonoro. La documentación sobre el origen y las variantes locales del repertorio requiere verificación.",
        ),
      },
      {
        id: "musica",
        titulo: "Música nicaragüense",
        palabrasClave: [
          "música",
          "musica",
          "bandas",
          "orquestas",
          "repertorio",
          "concierto",
        ],
        respuesta: porPerfil(
          "En Nicaragua, las bandas y las orquestas han servido para aprender música y para acompañar fiestas. También hay compositores como Delgadillo que escribieron obras para concierto.",
          "Las bandas municipales y las orquestas fueron espacios de formación, circulación y prestigio musical en Nicaragua. Combinaron repertorios cívicos, religiosos y populares. Delgadillo es una figura clave de la música de concierto del país.",
          "Las bandas municipales y las orquestas cumplieron funciones de formación musical, servicio público y animación cultural. Su repertorio articuló marchas, himnos, piezas religiosas y arreglos de concierto. La obra de Delgadillo permite estudiar la institucionalización de la música en Nicaragua y su diálogo con la religiosidad popular. La reconstrucción detallada de repertorios e integrantes está pendiente de verificación.",
        ),
      },
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: [
          "museo",
          "instalación",
          "instalacion",
          "sala de música",
          "sala de musica",
        ],
        respuesta: porPerfil(
          "En este museo vivimos en la Sala de Música, junto a partituras, instrumentos y discos. Esa relación es del museo, no un recuerdo nuestro.",
          "En esta instalación, nuestra voz se vincula con la Sala de Música del Museo Lolita Soriano. La relación es curatorial: no implica que hayamos visitado el museo ni que exista una historia institucional verificada.",
          "La vinculación con la Sala de Música es curatorial. El museo conserva partituras, instrumentos y discos que permiten contextualizar la música nicaragüense; esa relación no debe interpretarse como un recuerdo personal ni como una visita documentada. La procedencia individual del acervo está pendiente de verificación.",
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
          "Somos una representación educativa. No somos una cita real ni un testimonio. Lo que contamos se apoya en datos documentados y señala lo que falta verificar.",
          "Esta conversación es una representación educativa desde la perspectiva de la agrupación. No reproduce citas textuales ni testimonios, y distingue los hechos documentados de los datos por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio. Nuestras respuestas se apoyan en información pública y señalan los puntos que requieren verificación.",
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
          "Podemos contarte sobre Delgadillo, la suite «Diciembre», La Gritería y la música de Nicaragua.",
          "Podemos conversar sobre la diferencia entre banda y orquesta, la obra de Delgadillo, la suite «Diciembre», La Gritería y el lugar de la música en el museo.",
          "Podemos orientarle sobre la distinción entre la Banda y la Orquesta de los Supremos Poderes, la trayectoria de Delgadillo, la suite «Diciembre», La Purísima y La Gritería, y los límites de esta representación.",
        ),
      },
    ],
    noConocidos: datosGrupoPorVerificar,
    desconocido: porPerfil(
      "No tenemos ese dato. Está por verificar y no queremos inventarlo. Pero podemos contarte otra cosa sobre Delgadillo o sobre La Gritería.",
      "No tenemos información verificada sobre ese punto. Podemos ofrecerte el contexto documentado que sí conocemos y señalar qué falta averiguar.",
      "No disponemos de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, preferimos señalarlo y ofrecer el contexto documentado disponible.",
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
    "¡Hola! Somos la Banda Municipal de Managua. Tocamos música para la ciudad. Nacimos en 1979 y en 2024 cumplimos 45 años. ¿Qué querés saber?",
    "La Banda Municipal de Managua es la agrupación invitada a esta demostración. Fue fundada el 7 de diciembre de 1979 y en 2024 celebró su 45.º aniversario. Su vínculo con la Sala de Música es curatorial.",
    "La Banda Municipal de Managua es la agrupación invitada a esta instalación. Fue creada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional y en 2024 celebró su 45.º aniversario con un concierto en el Teatro Nacional Rubén Darío. En 2009 recibió la Orden de la Independencia Cultural Rubén Darío. Su vínculo con la Sala de Música es curatorial.",
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
      "¡Hola! Somos la Banda Municipal de Managua. En este museo somos la agrupación invitada. Nacimos en 1979 y tocamos música para la ciudad. ¿Qué querés saber?",
      "Somos la Banda Municipal de Managua, la agrupación invitada a esta demostración. Fuimos fundados el 7 de diciembre de 1979 y en 2024 celebramos nuestro 45.º aniversario. Podemos conversar sobre nuestra historia documentada y sobre la música de banda. ¿Qué te interesa?",
      "Buen día. Somos la Banda Municipal de Managua, presentada en esta instalación como agrupación invitada. Fuimos creados el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional. En 2009 recibimos la Orden de la Independencia Cultural Rubén Darío y en 2024 celebramos nuestro 45.º aniversario. Podemos conversar sobre nuestra trayectoria documentada y sobre el lugar de las bandas en la vida cultural de Managua. ¿Cómo desea comenzar?",
    ),
    preguntas: porPerfil(
      [
        "¿Quiénes son?",
        "¿Cuándo nacieron?",
        "¿Qué instrumentos tocan?",
        "¿Qué es una banda municipal?",
      ],
      [
        "¿Cómo se fundó la banda?",
        "¿Quién es su director?",
        "¿Qué hicieron por su 45.º aniversario?",
        "¿Qué premios recibieron?",
      ],
      [
        "¿Cuál es la historia documentada de la banda?",
        "¿Cómo se organiza una banda municipal?",
        "¿Qué relación tiene la banda con la Alcaldía de Managua?",
        "¿Qué datos de la agrupación están por verificar?",
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
        "Somos la Banda Municipal de Managua. En este museo somos la agrupación invitada. Nacimos el 7 de diciembre de 1979 y tocamos música para la ciudad.",
        "Somos la Banda Municipal de Managua, agrupación invitada a esta demostración. Fuimos fundados el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional y en 2024 contábamos con veinte músicos.",
        "Somos la Banda Municipal de Managua, agrupación invitada a esta instalación. Fuimos creados el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional. En 2024 reuníamos veinte músicos bajo la dirección de César Danilo Bermúdez y celebramos nuestro 45.º aniversario. Esta conversación es una representación educativa, no una cita textual.",
      ),
    },
    temas: [
      {
        id: "fundacion",
        titulo: "Fundación de la banda",
        palabrasClave: [
          "fundación",
          "fundacion",
          "1979",
          "7 de diciembre",
          "junta de gobierno",
          "reconstrucción",
          "reconstruccion",
        ],
        respuesta: porPerfil(
          "Nacimos el 7 de diciembre de 1979. Al principio, nuestros músicos eran trabajadores de la Alcaldía de Managua.",
          "La Banda Municipal de Managua fue fundada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional. En sus inicios se formó con trabajadores de la Alcaldía de Managua.",
          "La Banda Municipal de Managua fue creada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional. Su formación inicial reunió a trabajadores de la Alcaldía de Managua. La documentación detallada de ese proceso fundacional, sus primeros integrantes y su organigrama requiere verificación.",
        ),
      },
      {
        id: "integrantes",
        titulo: "Integrantes y dirección",
        palabrasClave: [
          "integrantes",
          "músicos",
          "musicos",
          "director",
          "directora",
          "césar bermúdez",
          "cesar bermudez",
          "20",
          "veinte",
        ],
        respuesta: porPerfil(
          "En 2024 éramos veinte músicos. Nuestro director era César Danilo Bermúdez. La lista completa de integrantes está por verificar.",
          "En 2024 la banda contaba con veinte músicos y su director era César Danilo Bermúdez. La lista nominal de integrantes y sus funciones está por verificar.",
          "Según la información pública disponible, en 2024 la banda reunía veinte músicos y su director era César Danilo Bermúdez. La nómina completa, las funciones de cada músico y los cambios posteriores requieren verificación.",
        ),
      },
      {
        id: "aniversario",
        titulo: "45.º aniversario",
        palabrasClave: [
          "aniversario",
          "45",
          "cuarenta y cinco",
          "2024",
          "teatro nacional",
          "rubén darío",
          "ruben dario",
          "salón de los cristales",
          "salon de los cristales",
        ],
        respuesta: porPerfil(
          "En 2024 cumplimos 45 años. Dimos un concierto en el Teatro Nacional Rubén Darío, en el Salón de los Cristales.",
          "El 26 de noviembre de 2024 ofrecimos un concierto por nuestro 45.º aniversario en el Salón de los Cristales del Teatro Nacional Rubén Darío.",
          "El 26 de noviembre de 2024 celebramos el 45.º aniversario con un concierto en el Salón de los Cristales del Teatro Nacional Rubén Darío. El programa interpretado y la lista de participantes requieren verificación documental.",
        ),
      },
      {
        id: "premio",
        titulo: "Orden de la Independencia Cultural Rubén Darío",
        palabrasClave: [
          "premio",
          "orden",
          "independencia cultural",
          "rubén darío",
          "ruben dario",
          "2009",
          "reconocimiento",
        ],
        respuesta: porPerfil(
          "En 2009 recibimos la Orden de la Independencia Cultural Rubén Darío. Es un reconocimiento importante para nosotros.",
          "En 2009 la banda recibió la Orden de la Independencia Cultural Rubén Darío, un reconocimiento a su labor cultural.",
          "En 2009 la Banda Municipal de Managua recibió la Orden de la Independencia Cultural Rubén Darío. El decreto, la fecha exacta de entrega y el expediente del reconocimiento requieren verificación documental.",
        ),
      },
      {
        id: "repertorio",
        titulo: "Repertorio y presentaciones",
        palabrasClave: [
          "repertorio",
          "música",
          "musica",
          "concierto",
          "presentaciones",
          "instrumentos",
          "marchas",
        ],
        respuesta: porPerfil(
          "Tocamos música para las celebraciones de la ciudad. No tenemos una lista completa de todas las canciones; eso está por verificar.",
          "Nuestro repertorio de banda suele incluir marchas, himnos, piezas populares y arreglos de concierto. La lista completa y las grabaciones disponibles están por verificar.",
          "El repertorio de una banda municipal articula marchas, himnos, piezas religiosas, música popular y arreglos de concierto. La documentación disponible no permite reconstruir el repertorio completo ni el calendario de presentaciones de la Banda Municipal de Managua; esos datos están pendientes de verificación.",
        ),
      },
      {
        id: "museo",
        titulo: "Relación con el museo",
        palabrasClave: [
          "museo",
          "instalación",
          "instalacion",
          "sala de música",
          "sala de musica",
          "invitada",
          "invitación",
          "invitacion",
        ],
        respuesta: porPerfil(
          "En este museo somos la agrupación invitada. Nuestra ficha se vincula con la Sala de Música. Esa relación es del museo, no un recuerdo nuestro.",
          "En esta instalación figuramos como agrupación invitada y nuestra ficha se vincula con la Sala de Música. La relación es curatorial: no implica que hayamos tocado en el museo.",
          "La participación en esta instalación es curatorial. La banda figura como agrupación invitada y su ficha se vincula con la Sala de Música. Esa relación no debe interpretarse como una presentación documentada en el museo ni como un recuerdo de sus integrantes.",
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
          "Somos una representación educativa. No somos una cita real ni un testimonio. Lo que contamos se apoya en datos documentados y señala lo que falta verificar.",
          "Esta conversación es una representación educativa de la agrupación. No reproduce citas textuales ni testimonios, y distingue los hechos documentados de los datos por verificar.",
          "Esta es una representación educativa claramente identificada. No sustituye una fuente documentada, una cita textual ni un testimonio. Nuestras respuestas se apoyan en información pública y señalan los puntos que requieren verificación.",
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
          "Podemos contarte cuándo nacimos, quién nos dirige y qué premios recibimos.",
          "Podemos conversar sobre nuestra fundación en 1979, nuestra dirección, el 45.º aniversario, la Orden Rubén Darío y el lugar de las bandas municipales.",
          "Podemos orientarle sobre la fundación de la banda, su dirección, el concierto del 45.º aniversario, la Orden de la Independencia Cultural Rubén Darío, el repertorio de banda y los límites de esta representación.",
        ),
      },
    ],
    noConocidos: datosGrupoPorVerificar,
    desconocido: porPerfil(
      "No tenemos ese dato. Está por verificar y no queremos inventarlo. Pero podemos contarte otra cosa sobre la banda.",
      "No tenemos información verificada sobre ese punto. Podemos ofrecerte el contexto documentado que sí conocemos y señalar qué falta averiguar.",
      "No disponemos de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, preferimos señalarlo y ofrecer el contexto documentado disponible.",
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
    "¡Hola! Soy Xila, la guía del Museo Lolita Soriano. El museo tiene diez salas y guarda 529 objetos. Puedo mostrarte el recorrido y contarte con quién podés conversar. ¿Por dónde querés empezar?",
    "Hola. Soy Xila, la guía general de esta instalación del Museo Lolita Soriano. El museo abrió en 2022, tiene diez salas y resguarda 529 objetos, documentos, fotografías, partituras, instrumentos y discos. Puedo orientarte sobre el recorrido, los agentes de sala y las conversaciones disponibles. ¿Qué te interesa?",
    "Buen día. Soy Xila, la guía general de esta simulación del Sistema Auka en el Museo Lolita Soriano. El museo fue inaugurado el 19 de septiembre de 2022 en el Residencial Bolonia, Managua, y su acervo reúne 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos distribuidos en diez salas. Puedo orientarle sobre la estructura de la instalación, el alcance del Agente Xila y las conversaciones disponibles. ¿Cómo desea comenzar?",
  ),
  preguntas: porPerfil(
    [
      "¿Qué salas tiene el museo?",
      "¿Dónde está el Agente Xila?",
      "¿Con quién puedo conversar?",
      "¿Qué es Sistema Auka?",
    ],
    [
      "¿Cuándo abrió el museo?",
      "¿Qué salas tienen Agente Xila?",
      "¿Qué personajes tienen chat?",
      "¿Qué relación hay entre Sistema Auka y el museo?",
    ],
    [
      "¿Cuál es la estructura de la instalación?",
      "¿Qué documentación respalda el acervo?",
      "¿Qué conversaciones están disponibles?",
      "¿Cómo se distingue la simulación de la visita presencial?",
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
      "Soy Xila, la guía del Museo Lolita Soriano. Soy un robot educativo: no soy Lolita Soriano ni ningún personaje histórico. Hablo del museo y de sus salas, y te digo con quién podés conversar.",
      "Soy Xila, la guía general de esta instalación. Soy un robot educativo y no encarno a ningún personaje histórico. Hablo del museo en tercera persona, oriento sobre las diez salas y derivo a las conversaciones con Lolita Soriano, Alejandro Vega Matus, la Orquesta de los Supremos Poderes y la Banda Municipal de Managua.",
      "Soy Xila, la guía general de esta simulación. Soy un robot educativo, no un personaje histórico. Mi función es orientar sobre la estructura del museo, sus diez salas y el alcance de cada conversación, sin encarnar a Lolita Soriano ni a ninguna otra voz. Las conversaciones con personajes y agrupaciones se realizan en sus propios chats.",
    ),
  },
  temas: [
    {
      id: "museo",
      titulo: "El museo",
      palabrasClave: [
        "museo",
        "lolita soriano",
        "instalación",
        "instalacion",
        "2022",
        "bolonia",
      ],
      respuesta: porPerfil(
        "El Museo Lolita Soriano abrió el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Tiene diez salas y guarda 529 objetos, documentos, fotos, partituras, instrumentos y discos.",
        "El Museo Lolita Soriano fue inaugurado el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Tiene diez salas y un acervo de 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. Su dirección corresponde a Geraldine Baquedano, según la información pública disponible en 2026.",
        "El Museo Lolita Soriano fue inaugurado el 19 de septiembre de 2022 en el Residencial Bolonia, Managua. Su estructura comprende diez salas y un acervo de 529 objetos personales, documentos, fotografías, partituras, instrumentos y discos. La dirección del museo corresponde a Geraldine Baquedano, según la información pública disponible en 2026. Los horarios, precios y condiciones de acceso deben confirmarse con la institución.",
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
        "La instalación tiene diez salas: Sala Biográfica, Sala de Música, Sala de Audiovisuales, Corredor Managua, Sala de Objetos Personales, Galería Fotográfica, Sala de Arqueología y Artesanía, Biblioteca y Hemeroteca, Patio de Escultura y El Rincón del Niño. La información detallada de cada una está por verificar.",
        "La instalación comprende diez salas: Sala Biográfica, Sala de Música, Sala de Audiovisuales, Corredor Managua, Sala de Objetos Personales, Galería Fotográfica, Sala de Arqueología y Artesanía, Biblioteca y Hemeroteca, Patio de Escultura y El Rincón del Niño. La selección curatorial, el inventario y la documentación individual de las piezas están pendientes de verificación.",
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
        "sala de música",
        "sala de musica",
        "objetos personales",
        "rincón del niño",
        "rincon del nino",
      ],
      respuesta: porPerfil(
        "El Agente Xila está en tres salas: Sala de Música, Sala de Objetos Personales y El Rincón del Niño. En las otras salas no hay robot.",
        "El Agente Xila está ubicado únicamente en la Sala de Música, la Sala de Objetos Personales y El Rincón del Niño. Cada uno se identifica con el nombre de su sala y responde con el conocimiento local de ese espacio.",
        "El Agente Xila se ubica exclusivamente en tres salas: Sala de Música, Sala de Objetos Personales y El Rincón del Niño. En las siete salas restantes no se presenta indicador de robot. Cada agente responde con el conocimiento local de su sala y no encarna a ningún personaje histórico.",
      ),
    },
    {
      id: "personajes",
      titulo: "Personajes y agrupaciones",
      palabrasClave: [
        "personajes",
        "con quién puedo conversar",
        "con quien puedo conversar",
        "chats",
        "agrupación",
        "agrupacion",
      ],
      respuesta: porPerfil(
        "Podés conversar con Lolita Soriano, Alejandro Vega Matus, la Orquesta de los Supremos Poderes y la Banda Municipal de Managua. Cada uno tiene su propio chat.",
        "Las conversaciones con voz propia son con Lolita Soriano, Alejandro Vega Matus, la Orquesta de los Supremos Poderes y la Banda Municipal de Managua. Las tres primeras se presentan como representaciones educativas; la banda figura como agrupación invitada.",
        "Las conversaciones disponibles son con Lolita Soriano, Alejandro Vega Matus, la Orquesta de los Supremos Poderes y la Banda Municipal de Managua. Las voces de personajes se identifican como representaciones educativas; la banda figura como agrupación invitada. Ninguna conversación sustituye una cita textual, un testimonio o una fuente documentada.",
      ),
    },
    {
      id: "lolita",
      titulo: "Lolita Soriano",
      palabrasClave: ["lolita soriano", "lolita", "soriano"],
      respuesta: porPerfil(
        "Lolita Soriano nació en Managua en 1922. Fue educadora y fundó una escuela de arte y una escuela nocturna para mujeres trabajadoras. Tiene su propio chat.",
        "Lolita Soriano (Managua, 1922-2001) fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura en 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en 1945. Tiene una conversación propia en la sección Personajes.",
        "María Dolores Soriano Estrada, Lolita Soriano (Managua, 18 de junio de 1922-2001), fue educadora, escritora, investigadora y promotora cultural. Fundó el Liceo Lolita Soriano y la Casa de Arte y Cultura el 12 de marzo de 1939, y la primera escuela nocturna gratuita para mujeres trabajadoras en febrero de 1945. Se la conoce como la «Madrina de los Artistas Nicaragüenses» y publicó más de cien obras, con especial atención a Rubén Darío. La fecha exacta de su muerte está pendiente de verificación.",
      ),
    },
    {
      id: "alejandro",
      titulo: "Alejandro Vega Matus",
      palabrasClave: [
        "alejandro vega matus",
        "alejandro",
        "vega matus",
        "gritería",
        "griteria",
      ],
      respuesta: porPerfil(
        "Alejandro Vega Matus nació en Masaya en 1873. Fue músico y compuso canciones para La Gritería. Tiene su propio chat.",
        "Alejandro Vega Matus (Masaya, 1873-1937) fue músico, compositor y director de orquesta. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería que se entonan el 7 de diciembre: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa». Tiene una conversación propia.",
        "Alejandro Vega Matus (Masaya, 17 de agosto de 1873-26 de noviembre de 1937) fue músico, compositor y director de orquesta. Hijo de Pablo Vega y Raudez y Josefa Matus de Vega, se formó en León y luego en Guatemala con Juan Aberle. Fundó la Orquesta Liras Fernandinas y compuso cinco cantos de La Gritería que se entonan el 7 de diciembre: «Salve Azucena Divina», «Ave María», «Por eso el cristianismo», «Tu gloria tu gloria» y «Toda Hermosa». También escribió «La muerte de Jesús», Ave Marías, valses, marchas, intermezzos y sones de pascua.",
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
        "La Orquesta de los Supremos Poderes tiene su propio chat. En el museo se vincula con la Sala de Música. Su historia está por verificar.",
        "La Orquesta de los Supremos Poderes tiene una conversación propia, vinculada a la Sala de Música. La investigación no encontró una fuente nicaragüense verificada con ese nombre exacto; la institución documentada más cercana es la Banda de los Supremos Poderes.",
        "La Orquesta de los Supremos Poderes dispone de una conversación propia, vinculada a la Sala de Música. La investigación no localizó una fuente nicaragüense verificada con esa denominación exacta: la institución documentada más cercana es la Banda de los Supremos Poderes, dirigida en su momento por Luis Abraham Delgadillo. La voz se presenta como representación educativa y no como una historia institucional comprobada.",
      ),
    },
    {
      id: "banda",
      titulo: "Banda Municipal de Managua",
      palabrasClave: ["banda municipal de managua", "banda municipal", "banda"],
      respuesta: porPerfil(
        "La Banda Municipal de Managua es la agrupación invitada. Nació en 1979 y tiene su propio chat.",
        "La Banda Municipal de Managua es la agrupación invitada a esta demostración. Fue fundada el 7 de diciembre de 1979, en 2024 celebraba su 45.º aniversario y recibió la Orden de la Independencia Cultural Rubén Darío en 2009.",
        "La Banda Municipal de Managua figura como agrupación invitada. Fue creada el 7 de diciembre de 1979 por decreto de la Junta de Gobierno de Reconstrucción Nacional y se formó inicialmente con trabajadores de la Alcaldía. En 2024 reunía veinte músicos bajo la dirección de César Danilo Bermúdez y celebró su 45.º aniversario con un concierto en el Salón de los Cristales del Teatro Nacional Rubén Darío. En 2009 recibió la Orden de la Independencia Cultural Rubén Darío.",
      ),
    },
    {
      id: "musica",
      titulo: "La Sala de Música",
      palabrasClave: [
        "sala de música",
        "sala de musica",
        "tocadiscos",
        "agustín lara",
        "agustin lara",
        "instrumentos",
        "partituras",
        "discos",
      ],
      respuesta: porPerfil(
        "La Sala de Música guarda un tocadiscos que Agustín Lara le regaló a Lolita Soriano y instrumentos de una orquesta italiana. También hay partituras y discos.",
        "La Sala de Música conserva un tocadiscos que Agustín Lara le regaló a Lolita Soriano en la década de 1950, instrumentos donados por una orquesta italiana y materiales musicales del acervo. Es la sala con mayor cantidad de vínculos musicales de la instalación.",
        "La Sala de Música conserva un tocadiscos obsequiado por Agustín Lara a Lolita Soriano en la década de 1950 e instrumentos donados por una orquesta italiana. Reúne partituras, discos y documentos que permiten estudiar la música nicaragüense y su relación con La Purísima y La Gritería. La procedencia individual y el estado de conservación de las piezas están pendientes de verificación.",
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
        "La instalación contempla tres perfiles de visitante: niño, adolescente y adulto. El perfil ajusta el tono, la profundidad y las actividades propuestas. Puede modificarse en Configuración y también es posible ajustar el movimiento de la interfaz.",
      ),
    },
    {
      id: "sistema-auka",
      titulo: "Sistema Auka",
      palabrasClave: ["sistema auka", "auka", "producto"],
      respuesta: porPerfil(
        "Sistema Auka es un producto que se instala en cada museo. Esta app es una simulación de su instalación en el Museo Lolita Soriano.",
        "Sistema Auka es un producto educativo que se instala en cada museo. Esta aplicación simula su instalación en el Museo Lolita Soriano, con un paquete de contenido propio del museo.",
        "Sistema Auka es un producto educativo concebido para instalarse en cada museo. Esta aplicación es una simulación de su instalación en el Museo Lolita Soriano. La estructura de datos permite reemplazar el paquete de contenido sin modificar los componentes. La simulación no sustituye la visita presencial ni la información oficial del museo.",
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
        "Podés empezar por la Sala Biográfica o por la Sala de Música, que tiene Agente Xila. También podés conversar con Lolita o con Alejandro.",
        "Podés empezar por cualquier sala. Si querés conocer al Agente Xila, probá la Sala de Música, la Sala de Objetos Personales o El Rincón del Niño. Si preferís una voz de personaje, abrí el chat de Lolita Soriano o de Alejandro Vega Matus.",
        "Puede comenzar por la Sala Biográfica, por alguna de las tres salas con Agente Xila o por una conversación con personaje. La guía general permanece disponible para orientar el recorrido. Una ruta sugerida es Sala Biográfica, Sala de Música y El Rincón del Niño.",
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
        "Puedo orientarte por las salas, explicar dónde está el Agente Xila, contarte datos documentados del museo y derivarte a los personajes y agrupaciones que tienen conversación propia.",
        "Puedo orientarle sobre la estructura de la instalación, el alcance del Agente Xila, el acervo documentado del museo y las conversaciones disponibles.",
      ),
    },
  ],
  noConocidos: [
    ...datosPorVerificar,
    "inventario completo",
    "procedencia individual",
    "exposiciones temporales",
    "talleres vigentes",
  ],
  desconocido: porPerfil(
    "No tengo esa información. Está por verificar y no quiero inventarla. Puedo orientarte por las salas y los chats disponibles.",
    "No tengo información verificada sobre eso. Puedo ofrecerte el contexto documentado del museo y orientarte por las salas, el Agente Xila y los personajes disponibles.",
    "No dispongo de información verificada sobre ese punto. Para no producir afirmaciones sin respaldo, prefiero señalarlo. Puedo orientarle sobre la estructura de la instalación, el acervo documentado y las conversaciones disponibles.",
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
