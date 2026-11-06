import type { Personaje } from "../types/personaje.types";

export const personajes: readonly Personaje[] = [
  {
    id: "nicarao",
    nombre: "Nicarao",
    alias: "Macuil Miquiztli, según la referencia del documento",
    tipo: "historico",
    epoca: "Siglo XVI · Nicaragua prehispánica y colonial temprana",
    lugar: "Región del Pacífico de la actual Nicaragua",
    resumen:
      "Cacique recordado por su actitud interrogativa ante el encuentro con los españoles.",
    descripcion: {
      nino: "Nicarao fue un líder indígena que hacía muchas preguntas. Su historia nos enseña que pensar antes de decidir es muy importante.",
      adolescente:
        "Nicarao es una figura clave para pensar el encuentro entre pueblos originarios y españoles. Su historia llegó hasta nosotros a través de fuentes escritas por los europeos.",
      adulto:
        "La figura de Nicarao permite abordar el encuentro colonial desde la agencia indígena y, al mismo tiempo, examinar los límites de las fuentes que lo nombran.",
    },
    biografia: {
      nino: [
        "Nicarao fue un cacique, es decir, un líder de su comunidad. Vivió en las tierras del Pacífico de la actual Nicaragua.",
        "Cuando llegaron los españoles, Nicarao quiso saber quiénes eran, qué buscaban y cómo pensaban. Por eso hizo muchas preguntas antes de decidir qué hacer.",
        "Su historia nos recuerda que escuchar y preguntar también es una forma de cuidar a los demás.",
      ],
      adolescente: [
        "Nicarao es presentado en las fuentes coloniales como un cacique de la región del Pacífico nicaragüense. Su nombre se asocia en el documento del proyecto con Macuil Miquiztli.",
        "Las crónicas lo vinculan al encuentro con Gil González Dávila durante las expediciones españolas de la década de 1520. El relato destaca su disposición a preguntar antes de aceptar las propuestas de los recién llegados.",
        "Ese gesto ha sido interpretado como una muestra de curiosidad política y de prudencia. También conviene recordar que la historia fue escrita por sus interlocutores europeos.",
      ],
      adulto: [
        "Nicarao, asociado en la documentación del proyecto con el nombre Macuil Miquiztli, aparece en las crónicas coloniales como una autoridad indígena del Pacífico de la actual Nicaragua.",
        "Su figura se vincula al encuentro con Gil González Dávila en el contexto de las expediciones españolas de la década de 1520. Las fuentes subrayan su actitud interrogativa: antes de aceptar alianzas o propuestas, procuraba comprender las intenciones y la naturaleza de los recién llegados.",
        "La investigación histórica debe distinguir entre el Nicarao de las crónicas y el Nicarao de la memoria posterior. El primero está mediado por la escritura europea y por los intereses de la conquista; el segundo ha sido invocado como símbolo de identidad y de pensamiento crítico.",
      ],
    },
    contexto: {
      nino: "En aquella época, Nicaragua estaba habitada por muchos pueblos con sus propias autoridades, lenguas y costumbres. Nicarao era uno de esos líderes.",
      adolescente:
        "El territorio estaba organizado en pueblos con autoridades propias. La llegada de los españoles alteró sus redes políticas, económicas y culturales.",
      adulto:
        "La diversidad política del Pacífico nicaragüense se articulaba en comunidades con autoridades locales, redes de intercambio y formas propias de resolver conflictos. La conquista introdujo una nueva lógica de poder que transformó esas estructuras.",
    },
    acontecimientos: [
      {
        id: "autoridad",
        titulo: "Una autoridad de su comunidad",
        descripcion:
          "Las fuentes lo presentan como cacique de un pueblo del Pacífico. La información disponible no permite reconstruir con precisión toda su trayectoria.",
        estado: "documentado",
      },
      {
        id: "encuentro",
        titulo: "El encuentro con Gil González Dávila",
        descripcion:
          "Las crónicas sitúan el encuentro en el contexto de las expediciones españolas de la década de 1520. Destacan su interés por preguntar antes de decidir.",
        estado: "documentado",
      },
      {
        id: "lectura",
        titulo: "Una figura leída desde distintos lugares",
        descripcion:
          "La memoria de Nicarao ha sido utilizada para hablar de identidad, curiosidad y resistencia. Esas lecturas son interpretaciones posteriores, no citas del personaje.",
        estado: "interpretacion",
      },
    ],
    valores: [
      {
        titulo: "Curiosidad",
        descripcion:
          "Preguntar para comprender, en lugar de aceptar sin pensar.",
        icono: "curiosidad",
      },
      {
        titulo: "Diálogo",
        descripcion:
          "Escuchar y conversar con el otro antes de tomar una decisión.",
        icono: "dialogo",
      },
      {
        titulo: "Memoria",
        descripcion:
          "Reconocer el valor de las historias que nos llegan del pasado.",
        icono: "memoria",
      },
    ],
    preguntasReflexion: [
      "¿Por qué creés que Nicarao hizo tantas preguntas antes de decidir?",
      "¿Qué preguntas le harías hoy a una persona que llega de otro lugar?",
      "¿Qué cambia cuando escuchamos la versión de ambas partes de una historia?",
    ],
    salaId: "caciques-nicaragua",
    salasRelacionadas: ["caciques-nicaragua"],
    ilustracion: "/images/personajes/nicarao.svg",
    ilustracionAlt:
      "Retrato ilustrado de Nicarao con manto geométrico y tocado de plumas, frente a un lago y volcanes.",
    notaRepresentacion:
      "Representación artística conceptual. No corresponde a una fotografía ni a un retrato histórico verificado.",
    notaFuentes:
      "Las fuentes coloniales sobre Nicarao son posteriores a los hechos y deben leerse de forma crítica. Este prototipo no reproduce citas textuales del personaje.",
    personificacion: {
      disponible: true,
      introduccion:
        "Xila presenta una breve dramatización inspirada en la actitud interrogativa de Nicarao. Es una interpretación educativa, no una reconstrucción literal de sus palabras.",
      advertencia:
        "Dramatización educativa. Las respuestas son imaginadas a partir del contexto histórico; no son citas reales ni testimonios del personaje.",
      intercambios: [
        {
          id: "preguntar",
          preguntaVisitante: "¿Por qué preguntabas tanto antes de decidir?",
          respuestaDramatizada:
            "No puedo aceptar una palabra que no entiendo. Si conozco las intenciones del otro, puedo cuidar mejor a mi pueblo.",
          contextoXila:
            "Las fuentes destacan la actitud interrogativa de Nicarao. Este parlamento es una recreación educativa, no una cita histórica.",
        },
        {
          id: "saber",
          preguntaVisitante: "¿Qué querías saber de los españoles?",
          respuestaDramatizada:
            "Quería saber quiénes eran, qué buscaban y qué estaban dispuestos a dar. Una alianza sin conocimiento es una trampa.",
          contextoXila:
            "El encuentro con Gil González Dávila ocurrió en un contexto de expediciones y negociaciones. La fuente principal es colonial y debe leerse con cautela.",
        },
        {
          id: "decidir",
          preguntaVisitante: "¿Qué significa decidir bien?",
          respuestaDramatizada:
            "Decidir bien es escuchar al consejo, medir el riesgo y no olvidar a quienes dependen de tu decisión.",
          contextoXila:
            "La imagen del consejo permite pensar el liderazgo como una práctica colectiva, aunque las fuentes no detallen todas las decisiones de Nicarao.",
        },
      ],
    },
  },
  {
    id: "diriangen",
    nombre: "Diriangén",
    tipo: "historico",
    epoca: "Siglo XVI · 1523",
    lugar: "Territorio chorotega, Pacífico de la actual Nicaragua",
    resumen:
      "Líder chorotega recordado por la resistencia frente a los españoles el 17 de abril de 1523.",
    descripcion: {
      nino: "Diriangén fue un líder valiente que defendió su tierra y su comunidad cuando llegaron los españoles.",
      adolescente:
        "Diriangén es recordado por enfrentar a los españoles en 1523. Su historia ayuda a pensar qué significa resistir y cómo se construye la memoria.",
      adulto:
        "Diriangén se ha convertido en una figura central de la memoria de la resistencia indígena en Nicaragua. Su historia exige leer las fuentes coloniales con criterio y evitar tanto la idealización como la simplificación.",
    },
    biografia: {
      nino: [
        "Diriangén fue un líder del pueblo chorotega. Su pueblo vivía en la zona del Pacífico de la actual Nicaragua.",
        "Cuando los españoles quisieron imponerse, Diriangén defendió su tierra. La historia cuenta que el 17 de abril de 1523 enfrentó a los invasores.",
        "Hoy se le recuerda como un símbolo de valentía y de amor por la comunidad.",
      ],
      adolescente: [
        "Diriangén fue un cacique chorotega. Los pueblos chorotegas habitaban el Pacífico nicaragüense y tenían sus propias autoridades y formas de organización.",
        "Según las crónicas coloniales, el 17 de abril de 1523 encabezó un enfrentamiento contra los españoles. Es uno de los episodios más citados de la resistencia indígena en el país.",
        "Su figura ha sido interpretada de muchas maneras: como símbolo de dignidad, de defensa del territorio y de identidad nacional.",
      ],
      adulto: [
        "Diriangén fue una autoridad chorotega en el Pacífico de la actual Nicaragua. Su nombre aparece vinculado al enfrentamiento con los españoles del 17 de abril de 1523, registrado por crónicas coloniales.",
        "El episodio debe leerse dentro de un proceso más amplio de conquista, negociación y resistencia. La información disponible es fragmentaria y proviene de fuentes producidas por los europeos o por sus descendientes.",
        "La memoria de Diriangén ha tenido usos políticos y pedagógicos diversos. Analizar esos usos permite comprender cómo una figura histórica se convierte en símbolo de identidad colectiva.",
      ],
    },
    contexto: {
      nino: "Los chorotegas vivían en el Pacífico de Nicaragua. Tenían sus casas, cultivos, autoridades y costumbres. La llegada de los españoles cambió sus vidas.",
      adolescente:
        "Los pueblos chorotegas mantenían redes de intercambio y una organización política propia. La conquista española buscó imponer tributos, evangelización y control territorial.",
      adulto:
        "La conquista articuló violencia militar, misiones religiosas, tributos y reorganización del espacio. Los pueblos originarios respondieron de formas diversas: alianzas, negociaciones, huida y resistencia armada.",
    },
    acontecimientos: [
      {
        id: "liderazgo",
        titulo: "Liderazgo chorotega",
        descripcion:
          "Diriangén es presentado como autoridad de un pueblo chorotega. Las fuentes no permiten reconstruir toda su trayectoria.",
        estado: "documentado",
      },
      {
        id: "abril",
        titulo: "17 de abril de 1523",
        descripcion:
          "Según las crónicas coloniales, ese día Diriangén encabezó la resistencia contra los españoles.",
        estado: "documentado",
      },
      {
        id: "simbolo",
        titulo: "Un símbolo de la memoria",
        descripcion:
          "La figura de Diriangén ha sido invocada como ejemplo de dignidad y defensa del territorio. Esa lectura es parte de la memoria posterior.",
        estado: "interpretacion",
      },
    ],
    valores: [
      {
        titulo: "Dignidad",
        descripcion: "No aceptar que otros decidan por la propia comunidad.",
        icono: "dignidad",
      },
      {
        titulo: "Valentía",
        descripcion: "Sostener una decisión difícil para cuidar a los demás.",
        icono: "valentia",
      },
      {
        titulo: "Identidad",
        descripcion:
          "Reconocer el valor de la propia historia y de la propia tierra.",
        icono: "identidad",
      },
      {
        titulo: "Comunidad",
        descripcion:
          "Entender la resistencia como una responsabilidad colectiva.",
        icono: "comunidad",
      },
    ],
    preguntasReflexion: [
      "¿Qué se defiende cuando se defiende un territorio?",
      "¿Qué formas de resistencia existen hoy en tu comunidad?",
      "¿Cómo contar la historia de un líder sin convertirlo en una estatua sin preguntas?",
    ],
    salaId: "diriangen-resistencia",
    salasRelacionadas: ["diriangen-resistencia"],
    ilustracion: "/images/personajes/diriangen.svg",
    ilustracionAlt:
      "Retrato ilustrado de Diriangén con manto rojo geométrico, frente a volcanes al amanecer.",
    notaRepresentacion:
      "Representación artística conceptual. No corresponde a una fotografía ni a un retrato histórico verificado.",
    notaFuentes:
      "La fecha del 17 de abril de 1523 proviene de crónicas coloniales. El prototipo no reproduce citas textuales del personaje.",
    personificacion: {
      disponible: true,
      introduccion:
        "Xila presenta una breve dramatización inspirada en la memoria de Diriangén. Es una interpretación educativa, no un testimonio histórico literal.",
      advertencia:
        "Dramatización educativa. Las respuestas son imaginadas a partir del contexto histórico; no son citas reales ni declaraciones del personaje.",
      intercambios: [
        {
          id: "resistir",
          preguntaVisitante: "¿Por qué decidiste resistir?",
          respuestaDramatizada:
            "Porque mi pueblo no era una tierra sin dueños ni una voluntad que pudiera entregarse sin consulta. Resistir fue defender una forma de vivir.",
          contextoXila:
            "Las crónicas registran el enfrentamiento del 17 de abril de 1523. Este parlamento es una recreación educativa, no una cita histórica.",
        },
        {
          id: "miedo",
          preguntaVisitante: "¿Tenías miedo?",
          respuestaDramatizada:
            "El miedo no desaparece cuando hay algo que cuidar. Se aprende a caminar con él.",
          contextoXila:
            "La valentía, en la memoria de Diriangén, se asocia a la responsabilidad hacia la comunidad más que a la ausencia de miedo.",
        },
        {
          id: "memoria",
          preguntaVisitante: "¿Qué querés que recordemos?",
          respuestaDramatizada:
            "Que ninguna historia es completa si se cuenta sin las preguntas de quienes la vivieron.",
          contextoXila:
            "La memoria de Diriangén ha sido interpretada de muchas formas. Xila propone distinguir entre el personaje histórico y sus usos simbólicos.",
        },
      ],
    },
  },
  {
    id: "pueblos-chorotegas",
    nombre: "Pueblos chorotegas y mangues",
    alias: "Pueblos originarios del Pacífico y del interior",
    tipo: "colectivo",
    epoca: "Periodo prehispánico y colonial temprano",
    lugar: "Pacífico y centro de la actual Nicaragua",
    resumen:
      "Entrada cultural para comprender la diversidad, la organización y la memoria de los pueblos chorotegas y mangues.",
    descripcion: {
      nino: "Los chorotegas y los mangues fueron pueblos indígenas con sus propias historias, comidas, palabras y formas de vivir.",
      adolescente:
        "No son un solo pueblo ni una sola historia. Esta entrada reúne contexto sobre comunidades originarias del Pacífico y del centro de Nicaragua.",
      adulto:
        "Los pueblos chorotegas y mangues forman parte de la diversidad originaria de Nicaragua. Su estudio exige evitar generalizaciones y distinguir entre evidencias, crónicas e interpretaciones.",
    },
    biografia: {
      nino: [
        "Los pueblos chorotegas vivieron en la zona del Pacífico de Nicaragua. Los mangues también dejaron su historia y su cultura.",
        "Tenían autoridades, cultivos, mercados y celebraciones. Se organizaban en comunidades y compartían conocimientos con otros pueblos.",
        "Hoy su legado sigue presente en palabras, comidas, técnicas y relatos de la cultura nicaragüense.",
      ],
      adolescente: [
        "Los chorotegas fueron un conjunto de pueblos del Pacífico nicaragüense. Los mangues, emparentados con grupos de Mesoamérica, habitaron zonas del centro y del Pacífico.",
        "Su historia incluye redes de intercambio, organización política local, prácticas agrícolas y formas de transmisión oral del conocimiento.",
        "La colonización transformó profundamente sus sociedades. Su memoria forma parte de la identidad cultural de Nicaragua y exige un tratamiento cuidadoso.",
      ],
      adulto: [
        "Los chorotegas y los mangues se inscriben en la compleja diversidad de pueblos originarios de Nicaragua. Las fuentes permiten reconstruir parcialmente sus lenguas, economías y formas de organización.",
        "La relación entre ambos grupos y con otros pueblos del territorio debe evitarse como un relato homogéneo: las identidades, alianzas y conflictos variaron en el tiempo y el espacio.",
        "La investigación contemporánea subraya la importancia de distinguir la evidencia histórica de las construcciones nacionales sobre el pasado indígena.",
      ],
    },
    contexto: {
      nino: "Nicaragua siempre fue un lugar con muchos pueblos. Cada uno tenía su manera de vivir y de contar historias.",
      adolescente:
        "La diversidad de los pueblos originarios permite entender que Nicaragua no tuvo una sola cultura fundadora, sino muchas historias entrelazadas.",
      adulto:
        "La pluralidad étnica y lingüística del territorio nicaragüense es anterior al Estado nacional. Reconocerla implica revisar los relatos que simplifican el pasado indígena.",
    },
    acontecimientos: [
      {
        id: "diversidad",
        titulo: "Una diversidad de pueblos",
        descripcion:
          "Chorotegas y mangues no eran un bloque único: compartían rasgos y mantenían diferencias regionales.",
        estado: "documentado",
      },
      {
        id: "organizacion",
        titulo: "Organización y territorio",
        descripcion:
          "Las comunidades articulaban agricultura, intercambio y autoridad local. La colonización transformó esos vínculos.",
        estado: "documentado",
      },
      {
        id: "legado",
        titulo: "Un legado que se discute",
        descripcion:
          "Su memoria está presente en la cultura y en los debates sobre identidad nacional. Es necesario distinguir evidencia de interpretación.",
        estado: "interpretacion",
      },
    ],
    valores: [
      {
        titulo: "Comunidad",
        descripcion:
          "El conocimiento y el trabajo se sostienen en redes colectivas.",
        icono: "comunidad",
      },
      {
        titulo: "Memoria",
        descripcion: "Recordar la pluralidad del pasado enriquece el presente.",
        icono: "memoria",
      },
      {
        titulo: "Identidad",
        descripcion: "La identidad nacional se construye con muchas historias.",
        icono: "identidad",
      },
    ],
    preguntasReflexion: [
      "¿Por qué es importante recordar que Nicaragua fue un territorio de muchos pueblos?",
      "¿Qué palabras o costumbres de tu comunidad podrían tener raíces originarias?",
      "¿Qué se pierde cuando se cuenta una sola historia sobre el pasado?",
    ],
    salaId: "caciques-nicaragua",
    salasRelacionadas: ["caciques-nicaragua", "diriangen-resistencia"],
    ilustracion: "/images/personajes/pueblos-chorotegas.svg",
    ilustracionAlt:
      "Escena ilustrada de artesanos y familias chorotegas compartiendo cerámica, textiles y relatos alrededor del fuego.",
    notaRepresentacion:
      "Representación artística conceptual de una escena cultural. No corresponde a una fotografía histórica.",
    notaFuentes:
      "Entrada de contexto. La información debe completarse con la bibliografía del documento del proyecto y fuentes especializadas.",
    personificacion: {
      disponible: false,
      introduccion:
        "Esta entrada representa a un conjunto de pueblos, no a una persona. Por eso no se ofrece una personificación individual.",
      advertencia:
        "No aplica: no se dramatiza a una persona histórica individual.",
      intercambios: [],
    },
  },
  {
    id: "santo-domingo",
    nombre: "Santo Domingo de Guzmán",
    tipo: "cultural",
    epoca: "1170–1221 · Europa medieval",
    lugar: "Caleruega, Reino de Castilla (actual España)",
    resumen:
      "Fundador de la Orden de Predicadores y figura central de la devoción que da nombre a las fiestas patronales de Managua.",
    descripcion: {
      nino: "Santo Domingo de Guzmán fue una persona que vivió hace mucho tiempo y que ayudó a crear una comunidad religiosa. En Managua se celebra su día el 1 de agosto.",
      adolescente:
        "Santo Domingo de Guzmán fue un predicador medieval y fundador de la Orden de Predicadores. Su figura llegó a Managua a través de la tradición católica y dio nombre a la fiesta patronal.",
      adulto:
        "Santo Domingo de Guzmán (1170–1221) fundó la Orden de Predicadores. Su devoción en Managua articula la fiesta patronal del 1 de agosto, cuya historia local debe documentarse con fuentes específicas.",
    },
    biografia: {
      nino: [
        "Santo Domingo de Guzmán nació hace muchos años, en Europa. Quería compartir sus ideas y ayudar a las personas.",
        "Fundó una comunidad de religiosos que se dedicaba a estudiar y a predicar. Esa comunidad se llama Orden de Predicadores.",
        "En Managua, muchas personas lo recuerdan cada 1 de agosto con una gran fiesta.",
      ],
      adolescente: [
        "Domingo de Guzmán nació alrededor de 1170 en Caleruega, en el Reino de Castilla. Fue un predicador y organizador religioso.",
        "En 1216 fundó la Orden de Predicadores, conocida también como los dominicos. Su propuesta combinaba estudio, vida comunitaria y predicación.",
        "Su devoción se extendió por el mundo católico y llegó a Nicaragua. En Managua, el 1 de agosto es el día central de la fiesta patronal.",
      ],
      adulto: [
        "Domingo de Guzmán (c. 1170–1221) nació en Caleruega y desarrolló una intensa actividad como predicador en el sur de Francia. En 1216 fundó la Orden de Predicadores, que combinó la vida contemplativa con el estudio y la predicación.",
        "Fue canonizado en 1234. Su culto se expandió por Europa y América a través de las órdenes religiosas y de las redes de la Iglesia católica.",
        "En Managua, su figura está asociada a la fiesta patronal del 1 de agosto. La historia local de esa devoción requiere fuentes específicas que el prototipo no sustituye.",
      ],
    },
    contexto: {
      nino: "En la época de Santo Domingo, la gente viajaba poco y las ideas se compartían de otras maneras. Él quiso que su comunidad estudiara y enseñara.",
      adolescente:
        "La Europa medieval estaba atravesada por disputas religiosas, nuevas órdenes y transformaciones urbanas. La propuesta de Domingo de Guzmán respondió a ese contexto.",
      adulto:
        "La Orden de Predicadores surgió en un contexto de expansión urbana, conflicto religioso y renovación de las formas de vida consagrada. Su historia se entrelaza con la predicación, la educación y la organización eclesiástica.",
    },
    acontecimientos: [
      {
        id: "orden",
        titulo: "Fundación de la Orden de Predicadores",
        descripcion:
          "En 1216, Domingo de Guzmán fundó una orden dedicada a la predicación y al estudio.",
        estado: "documentado",
      },
      {
        id: "canonizacion",
        titulo: "Canonización",
        descripcion:
          "Fue canonizado en 1234. Su culto se expandió progresivamente por el mundo católico.",
        estado: "documentado",
      },
      {
        id: "managua",
        titulo: "Devoción en Managua",
        descripcion:
          "Su figura da nombre a la fiesta patronal de Managua, celebrada el 1 de agosto. La historia local debe documentarse con fuentes específicas.",
        estado: "interpretacion",
      },
    ],
    valores: [
      {
        titulo: "Diálogo",
        descripcion: "La predicación como encuentro y transmisión de ideas.",
        icono: "dialogo",
      },
      {
        titulo: "Comunidad",
        descripcion: "La vida religiosa como experiencia compartida.",
        icono: "comunidad",
      },
      {
        titulo: "Memoria",
        descripcion:
          "Una figura que atraviesa siglos y se resignifica en cada lugar.",
        icono: "memoria",
      },
    ],
    preguntasReflexion: [
      "¿Cómo llega una figura religiosa europea a convertirse en parte de una fiesta nicaragüense?",
      "¿Qué diferencia hay entre la historia de una persona y la devoción que se construye alrededor de ella?",
      "¿Qué elementos de una fiesta patronal pertenecen a la religión y cuáles a la cultura popular?",
    ],
    salaId: "fiestas-patronales",
    salasRelacionadas: ["fiestas-patronales"],
    ilustracion: "/images/personajes/santo-domingo.svg",
    ilustracionAlt:
      "Ilustración conceptual de Santo Domingo de Guzmán con hábito, libro y halo abstracto, entre arcos y flores.",
    notaRepresentacion:
      "Representación artística conceptual. No corresponde a una fotografía ni a un retrato histórico verificado.",
    notaFuentes:
      "Datos biográficos generales sobre Domingo de Guzmán y la Orden de Predicadores. La historia local de la devoción en Managua debe completarse con bibliografía específica.",
    personificacion: {
      disponible: false,
      introduccion:
        "La personificación se reserva para figuras cuya memoria permite un diálogo educativo claramente contextualizado.",
      advertencia: "No disponible en este prototipo.",
      intercambios: [],
    },
  },
];

export function getPersonaje(id: string): Personaje | undefined {
  return personajes.find((personaje) => personaje.id === id);
}

export function getPersonajesPorSala(salaId: string): readonly Personaje[] {
  return personajes.filter((personaje) =>
    personaje.salasRelacionadas.includes(salaId as never),
  );
}
