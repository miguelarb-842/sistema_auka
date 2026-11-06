import type { Sala } from "../types/sala.types";

const avisoGeneral =
  "Contenido introductorio del prototipo. No sustituye una investigación histórica ni cuenta con validación institucional.";

export const salas: readonly Sala[] = [
  {
    id: "fiestas-patronales",
    nombre: "Fiestas Patronales de Managua",
    tema: "Tradiciones, fe y comunidad",
    lema: "Una ciudad que se encuentra en la calle",
    resumen:
      "Cada 1 de agosto, Managua celebra a Santo Domingo de Guzmán con música, procesiones y encuentros de barrio.",
    descripcion: {
      nino: "En esta sala vas a descubrir por qué Managua se llena de música, colores y personas cada 1 de agosto. ¡Hay fiesta, tambores y muchas historias!",
      adolescente:
        "Las fiestas patronales de Managua mezclan fe, identidad barrial y cultura popular. Explorá cómo una celebración religiosa se convierte también en patrimonio colectivo.",
      adulto:
        "La devoción a Santo Domingo de Guzmán articula una de las celebraciones populares más importantes de Managua. La sala propone leerla como un fenómeno religioso, cultural y comunitario, evitando reducirla a una sola interpretación.",
    },
    introduccion: {
      nino: "La fiesta de Santo Domingo es una celebración de la ciudad. La gente camina, canta, toca tambores y comparte. ¿Vos qué escucharías primero?",
      adolescente:
        "Una fiesta patronal no es solo una fecha en el calendario: es una forma en que una comunidad cuenta quién es. En esta sala vas a mirar sus símbolos, sus sonidos y sus tensiones.",
      adulto:
        "Las fiestas patronales permiten observar la relación entre culto, espacio público, memoria local y economía popular. Esta sala ofrece una introducción conceptual y procura distinguir los datos documentados de las descripciones de carácter etnográfico que aún requieren fuentes específicas.",
    },
    portada: "/images/salas/fiestas-patronales.svg",
    portadaAlt:
      "Ilustración conceptual de una procesión popular al atardecer, con música, banderas y una iglesia al fondo.",
    tono: "warning",
    duracion: "20–30 min",
    preguntasClave: [
      "¿Qué se celebra el 1 de agosto?",
      "¿Por qué una fiesta religiosa también puede ser patrimonio cultural?",
      "¿Quiénes participan y qué roles asumen?",
    ],
    bloques: [
      {
        id: "origen",
        titulo: "Una fiesta de barrio y de ciudad",
        estado: "documentado",
        contenido: {
          nino: "El 1 de agosto es el día central de las fiestas de Santo Domingo en Managua. La ciudad se organiza para caminar, cantar y encontrarse.",
          adolescente:
            "La celebración se organiza en torno a la devoción a Santo Domingo de Guzmán y tiene su día central el 1 de agosto. Su dimensión pública combina actos religiosos con prácticas populares propias de la vida barrial.",
          adulto:
            "La fiesta patronal de Managua se articula en torno a la devoción a Santo Domingo de Guzmán, con el 1 de agosto como fecha central. Su relevancia excede el ámbito litúrgico: ocupa el espacio público, moviliza redes barriales y produce formas de identidad local. Las fuentes del proyecto deberán precisar la historia de cada práctica.",
        },
      },
      {
        id: "practicas",
        titulo: "La bajada, la procesión y el encuentro",
        estado: "demostrativo",
        contenido: {
          nino: "Las personas acompañan al santo, bailan, tocan instrumentos y comparten con sus familias. Cada barrio tiene su manera de vivir la fiesta.",
          adolescente:
            "Las prácticas populares incluyen procesiones, música, organización barrial y encuentros comunitarios. En este prototipo se describen de forma introductoria: su forma exacta cambia según el barrio, el año y la comunidad.",
          adulto:
            "La procesión, la organización de los barrios, la música y las prácticas de sociabilidad conforman un repertorio que varía histórica y localmente. Esta sala las presenta como manifestaciones culturales de carácter popular, sin fijar una versión única ni sustituir el trabajo de campo o la investigación etnográfica.",
        },
      },
      {
        id: "identidad",
        titulo: "Fe, memoria y comunidad",
        estado: "interpretacion",
        contenido: {
          nino: "Una fiesta puede unir a mucha gente. También puede mostrar que una ciudad tiene muchas historias para contar.",
          adolescente:
            "Mirar la fiesta como patrimonio permite preguntar quién la organiza, quién participa y qué cambia con el tiempo. La tradición no es una foto quieta: se transforma.",
          adulto:
            "Interpretar la fiesta como patrimonio cultural implica atender a sus dimensiones religiosa, social, económica y simbólica. También exige reconocer tensiones: qué prácticas se preservan, cuáles se transforman y quiénes tienen voz en esa narración.",
        },
      },
    ],
    elementos: [
      {
        id: "procesion",
        titulo: "La procesión",
        descripcion: {
          nino: "Es un recorrido en el que muchas personas acompañan al santo con música y cantos.",
          adolescente:
            "La procesión convierte la calle en un espacio compartido y hace visible la organización de la comunidad.",
          adulto:
            "La procesión articula liturgia, espacio público y sociabilidad. Su recorrido y organización son también una forma de producir pertenencia.",
        },
        icono: "procesion",
      },
      {
        id: "musica",
        titulo: "La música",
        descripcion: {
          nino: "Tambores, canciones y sonidos acompañan la fiesta y le dan su propio ritmo.",
          adolescente:
            "La música no solo acompaña: marca el pulso de la celebración y convoca a participar.",
          adulto:
            "Las prácticas musicales y sonoras contribuyen a la identidad de la fiesta y a la memoria colectiva de quienes la viven.",
        },
        icono: "musica",
      },
      {
        id: "barrios",
        titulo: "Los barrios",
        descripcion: {
          nino: "Cada barrio participa y aporta algo: personas, comida, música o tiempo.",
          adolescente:
            "La organización barrial muestra que la fiesta se sostiene en redes de cooperación y trabajo colectivo.",
          adulto:
            "La dimensión barrial permite leer la fiesta como una práctica de organización social y de producción de identidad local.",
        },
        icono: "comunidad",
      },
      {
        id: "encuentro",
        titulo: "El encuentro",
        descripcion: {
          nino: "La fiesta también sirve para encontrarse con la familia y con los vecinos.",
          adolescente:
            "Más allá del acto religioso, la celebración crea espacios de encuentro y de circulación de relatos.",
          adulto:
            "La fiesta produce espacios de sociabilidad donde se negocian memorias, pertenencias y formas de estar juntos en la ciudad.",
        },
        icono: "comunidad",
      },
    ],
    personajesIds: ["santo-domingo"],
    asistenteId: "xila-tradiciones",
    retos: [
      {
        id: "reto-miradas",
        titulo: "Una fiesta, muchas miradas",
        enunciado: {
          nino: "¿Por qué creés que una fiesta religiosa también puede ser importante para personas que no van a la iglesia?",
          adolescente:
            "¿Cómo puede una celebración religiosa convertirse en patrimonio cultural de toda una ciudad? Mencioná dos razones.",
          adulto:
            "Analice la tensión entre la dimensión religiosa y la dimensión patrimonial de una fiesta patronal. ¿Qué se gana y qué se pierde al nombrarla patrimonio?",
        },
        pista: {
          nino: "Pensá en la música, la comida, los vecinos y el orgullo de pertenecer a un lugar.",
          adolescente:
            "Pensá en la identidad colectiva, la organización barrial y la transmisión de prácticas entre generaciones.",
          adulto:
            "Considere quién define el patrimonio, qué voces se incluyen y cómo se evita convertir la tradición en un objeto fijo.",
        },
        cierre: {
          nino: "¡Bien! Una fiesta puede unir a una comunidad aunque cada persona la viva de una manera diferente.",
          adolescente:
            "La fiesta se vuelve patrimonio cuando una comunidad la reconoce como parte de su identidad y la transmite.",
          adulto:
            "La patrimonialización puede fortalecer la memoria, pero también simplificar conflictos y desigualdades que atraviesan la práctica.",
        },
      },
      {
        id: "reto-barrio",
        titulo: "El mapa de tu barrio",
        enunciado: {
          nino: "Imaginá que tenés que mostrarle la fiesta a alguien que nunca vino. ¿Qué tres cosas le contarías?",
          adolescente:
            "Si tuvieras que documentar la fiesta de tu barrio, ¿qué registrarías y qué dejarías fuera? Justificá tus decisiones.",
          adulto:
            "Diseñe un criterio de registro etnográfico para documentar una práctica festiva sin reducirla a una mirada pintoresca.",
        },
        pista: {
          nino: "Podés pensar en sonidos, personas, comidas o lugares.",
          adolescente:
            "Un registro puede incluir voces, imágenes, sonidos y también las contradicciones de la comunidad.",
          adulto:
            "Considere consentimiento, contexto, autoría y la diferencia entre describir y representar.",
        },
        cierre: {
          nino: "¡Eso es! Tu mapa ya tiene una historia propia.",
          adolescente:
            "Documentar también es interpretar. Elegir qué mostrar siempre implica una responsabilidad.",
          adulto:
            "Todo registro produce un recorte. La transparencia metodológica es parte del respeto por la comunidad.",
        },
      },
    ],
    avisoContenido: avisoGeneral,
  },
  {
    id: "caciques-nicaragua",
    nombre: "Los caciques de Nicaragua",
    tema: "Pueblos originarios, memoria y preguntas",
    lema: "Preguntar también es una forma de decidir",
    resumen:
      "Una sala para acercarse a los pueblos originarios de Nicaragua y a la figura de Nicarao, un cacique que interrogó antes de actuar.",
    descripcion: {
      nino: "Vas a conocer a Nicarao, un líder indígena que hacía muchas preguntas. ¿Te animás a hacer las tuyas?",
      adolescente:
        "Nicarao es recordado por escuchar y preguntar antes de decidir. Esta sala te invita a analizar ese encuentro con mirada crítica.",
      adulto:
        "La sala aborda el mundo de los caciques y el encuentro entre Nicarao y Gil González Dávila, con énfasis en la lectura crítica de las fuentes coloniales.",
    },
    introduccion: {
      nino: "Hace mucho tiempo, en estas tierras vivían pueblos con sus propios idiomas, autoridades y formas de organizarse. Nicarao fue uno de sus líderes.",
      adolescente:
        "Los caciques eran autoridades políticas y espirituales en sus comunidades. La historia de Nicarao nos obliga a preguntar quién escribió lo que sabemos y desde qué lugar lo hizo.",
      adulto:
        "El estudio de los pueblos originarios de Nicaragua exige distinguir entre la evidencia arqueológica, los relatos coloniales y las interpretaciones posteriores. La figura de Nicarao llega principalmente a través de fuentes europeas que deben leerse con criterio crítico.",
    },
    portada: "/images/salas/caciques.svg",
    portadaAlt:
      "Ilustración conceptual de un consejo de caciques junto a un lago y volcanes, reunidos alrededor del fuego.",
    tono: "accent",
    duracion: "25–35 min",
    preguntasClave: [
      "¿Qué sabemos realmente sobre Nicarao?",
      "¿Qué significa preguntar antes de decidir?",
      "¿Cómo leer una fuente escrita por el otro?",
    ],
    bloques: [
      {
        id: "pueblos",
        titulo: "Los pueblos originarios y sus autoridades",
        estado: "documentado",
        contenido: {
          nino: "Antes de la llegada de los españoles, en Nicaragua vivían muchos pueblos con sus propias costumbres. Los caciques eran sus líderes.",
          adolescente:
            "El territorio que hoy llamamos Nicaragua estaba habitado por diversos pueblos con lenguas, economías y formas de organización política propias. Los caciques ejercían autoridad dentro de esas comunidades.",
          adulto:
            "La diversidad de los pueblos originarios de Nicaragua desborda cualquier relato único. Los caciques fueron autoridades con funciones políticas, militares y simbólicas variables según el grupo y el momento histórico. Las crónicas coloniales ofrecen información fragmentaria y mediada por la perspectiva europea.",
        },
      },
      {
        id: "nicarao",
        titulo: "Nicarao y el encuentro con Gil González Dávila",
        estado: "documentado",
        contenido: {
          nino: "Nicarao se encontró con el explorador español Gil González Dávila. Antes de tomar decisiones, hizo muchas preguntas.",
          adolescente:
            "Las fuentes coloniales vinculan a Nicarao, también mencionado en el documento como Macuil Miquiztli, con el encuentro con Gil González Dávila durante las expediciones españolas de la década de 1520. Es un relato contado desde el lado europeo.",
          adulto:
            "La figura de Nicarao, asociada en la documentación del proyecto con el nombre Macuil Miquiztli, aparece en las crónicas vinculada al encuentro con Gil González Dávila en el contexto de las expediciones españolas de la década de 1520. Se trata de fuentes producidas por los europeos, lo que exige distinguir entre el hecho, su registro y su interpretación.",
        },
        fuente:
          "Referencia conceptual del documento del proyecto. Las fuentes y fechas específicas deben completarse con la bibliografía final.",
      },
      {
        id: "preguntar",
        titulo: "Preguntar antes de decidir",
        estado: "interpretacion",
        contenido: {
          nino: "Hacer preguntas te ayuda a entender mejor una situación. Nicarao nos enseña que pensar antes de actuar es importante.",
          adolescente:
            "La actitud interrogativa de Nicarao se convierte en una lección política: decidir sin entender puede costar muy caro. ¿Qué preguntas harías vos?",
          adulto:
            "La tradición del proyecto destaca la actitud interrogativa de Nicarao como un valor pedagógico: la curiosidad como condición de una decisión informada. Es una lectura interpretativa, no una cita textual del personaje.",
        },
      },
    ],
    elementos: [
      {
        id: "territorio",
        titulo: "El lago y el territorio",
        descripcion: {
          nino: "El lago y los volcanes eran parte de la vida de los pueblos. El paisaje también cuenta historias.",
          adolescente:
            "El territorio no era solo un lugar: era una red de recursos, rutas y relaciones entre comunidades.",
          adulto:
            "El paisaje del Pacífico nicaragüense articuló asentamientos, intercambios y formas de vida cuya complejidad excede la imagen del lago como simple escenario.",
        },
        icono: "lago",
      },
      {
        id: "consejo",
        titulo: "El consejo",
        descripcion: {
          nino: "Los líderes se reunían para conversar y tomar decisiones juntos.",
          adolescente:
            "Las decisiones políticas no eran individuales: implicaban consejo, alianzas y evaluación de riesgos.",
          adulto:
            "Las formas de deliberación política variaban entre pueblos. La imagen del consejo permite pensar la autoridad como una práctica relacional.",
        },
        icono: "dialogo",
      },
      {
        id: "palabra",
        titulo: "La palabra",
        descripcion: {
          nino: "Las historias se contaban de una persona a otra. Así se guardaba la memoria.",
          adolescente:
            "La oralidad fue un vehículo central de memoria y conocimiento antes y después de la colonización.",
          adulto:
            "La transmisión oral plantea desafíos para el historiador: no es un archivo fijo, sino una práctica social que cambia con cada generación.",
        },
        icono: "memoria",
      },
      {
        id: "fuentes",
        titulo: "Las fuentes",
        descripcion: {
          nino: "Para saber quién fue alguien, hay que leer con cuidado lo que escribieron otros.",
          adolescente:
            "Una fuente colonial no es una ventana transparente: refleja los intereses de quien la escribió.",
          adulto:
            "Las crónicas coloniales son documentos históricos valiosos, pero también dispositivos de poder. Leerlas críticamente implica preguntar por su autoría, sus silencios y su contexto de producción.",
        },
        icono: "memoria",
      },
    ],
    personajesIds: ["nicarao", "pueblos-chorotegas"],
    asistenteId: "xila-nicarao",
    retos: [
      {
        id: "reto-preguntas",
        titulo: "La pregunta que abre la puerta",
        enunciado: {
          nino: "Si fueras Nicarao y alguien llegara a tu comunidad, ¿qué tres preguntas le harías antes de decidir?",
          adolescente:
            "¿Por qué preguntar antes de decidir puede ser una forma de resistencia? Formulá una hipótesis y justificala.",
          adulto:
            "Analice la relación entre curiosidad y poder en el encuentro entre Nicarao y los españoles. ¿Qué límites tiene una lectura del personaje basada solo en crónicas coloniales?",
        },
        pista: {
          nino: "Pensá en lo que querés saber de la otra persona: sus intenciones, sus costumbres, qué quiere.",
          adolescente:
            "Prestá atención a quién tiene el poder de hacer preguntas y quién tiene el poder de escribir las respuestas.",
          adulto:
            "Distinga entre la agencia del personaje y el relato que las fuentes construyen sobre él.",
        },
        cierre: {
          nino: "¡Muy bien! Las preguntas te ayudan a entender antes de actuar.",
          adolescente:
            "Preguntar puede ser una forma de no aceptar una versión única de los hechos.",
          adulto:
            "La curiosidad documentada en el relato también es un efecto de la escritura colonial: leer ambos niveles es parte del ejercicio histórico.",
        },
      },
      {
        id: "reto-fuente",
        titulo: "¿Quién escribió la historia?",
        enunciado: {
          nino: "Si encontrás un dibujo antiguo de Nicarao, ¿cómo sabrías si es de verdad o si alguien lo imaginó?",
          adolescente:
            "¿Qué preguntas le harías a una fuente colonial sobre Nicarao para saber si es confiable?",
          adulto:
            "¿Es posible reconstruir la voz de Nicarao a partir de una fuente escrita por sus interlocutores? ¿Qué precauciones metodológicas aplicarías?",
        },
        pista: {
          nino: "Fijate quién lo dibujó, cuándo y qué quería contar.",
          adolescente:
            "Pensá en el autor, la fecha, el propósito y los intereses de quien escribió.",
          adulto:
            "Considere la mediación lingüística, la traducción y el contexto de producción del documento.",
        },
        cierre: {
          nino: "¡Eso es! No todo lo que vemos en un dibujo es una foto de la historia.",
          adolescente:
            "Una fuente siempre habla desde un lugar. Preguntar por ese lugar es parte de pensar la historia.",
          adulto:
            "La voz del otro llega mediada. La historiografía crítica trabaja con esa mediación, no como un obstáculo que se elimina, sino como una condición del archivo.",
        },
      },
    ],
    avisoContenido:
      "Las fuentes coloniales sobre Nicarao son posteriores a los hechos y deben leerse críticamente. Contenido introductorio del prototipo.",
  },
  {
    id: "diriangen-resistencia",
    nombre: "Diriangén y la resistencia indígena",
    tema: "Dignidad, valentía y memoria",
    lema: "Defender el territorio también es defender la memoria",
    resumen:
      "La historia de Diriangén y los pueblos chorotegas invita a reflexionar sobre la dignidad, la resistencia y las decisiones que marcan una comunidad.",
    descripcion: {
      nino: "Vas a conocer a Diriangén, un líder valiente que defendió su tierra y su comunidad. ¿Qué harías vos?",
      adolescente:
        "Diriangén es recordado por enfrentar a los españoles en 1523. Esta sala te propone analizar la resistencia más allá de la batalla.",
      adulto:
        "La sala contextualiza a Diriangén y a los pueblos chorotegas, y examina cómo se construye la memoria de la resistencia y qué tensiones contiene.",
    },
    introduccion: {
      nino: "Diriangén fue un líder de los pueblos chorotegas. Cuando llegaron los españoles, decidió defender su tierra. Su historia nos ayuda a hablar de valentía.",
      adolescente:
        "La resistencia no es solo un enfrentamiento: también es la decisión de sostener una forma de vida. La historia de Diriangén nos invita a pensar qué se defiende cuando se resiste.",
      adulto:
        "La figura de Diriangén permite examinar la resistencia indígena como proceso político, militar y cultural. El reto consiste en evitar tanto la idealización heroica como la reducción de los pueblos originarios a víctimas sin agencia.",
    },
    portada: "/images/salas/diriangen.svg",
    portadaAlt:
      "Ilustración conceptual de Diriangén de pie ante figuras españolas distantes, al amanecer.",
    tono: "danger",
    duracion: "25–35 min",
    preguntasClave: [
      "¿Qué significa resistir?",
      "¿Qué se defiende cuando se defiende un territorio?",
      "¿Cómo se construye la memoria de un líder?",
    ],
    bloques: [
      {
        id: "chorotegas",
        titulo: "Los chorotegas y su territorio",
        estado: "documentado",
        contenido: {
          nino: "Los pueblos chorotegas vivían en el Pacífico de Nicaragua. Tenían sus propias autoridades, cultivos y costumbres.",
          adolescente:
            "Los chorotegas fueron uno de los pueblos originarios del Pacífico nicaragüense. Su organización social y política incluía autoridades locales y redes de intercambio.",
          adulto:
            "Los pueblos chorotegas ocuparon territorios del Pacífico de la actual Nicaragua y mantuvieron formas propias de organización política, economía y cultura. La documentación colonial los registra de manera parcial y desde una perspectiva externa.",
        },
      },
      {
        id: "encuentro",
        titulo: "El 17 de abril de 1523",
        estado: "documentado",
        contenido: {
          nino: "El 17 de abril de 1523, Diriangén enfrentó a los españoles. La fecha nos ayuda a ubicar su historia en el tiempo.",
          adolescente:
            "Según las fuentes coloniales, el 17 de abril de 1523 Diriangén encabezó una resistencia contra los españoles. Es un episodio registrado por cronistas europeos, con los límites propios de ese tipo de relato.",
          adulto:
            "La tradición histórica sitúa el 17 de abril de 1523 el enfrentamiento entre Diriangén y las fuerzas españolas. El episodio proviene de crónicas coloniales, por lo que debe leerse atendiendo al contexto de producción, a la mediación del relato y a la diferencia entre el acontecimiento y su memoria.",
        },
        fuente:
          "Referencia conceptual del documento del proyecto. Completar con la bibliografía y las fuentes finales.",
      },
      {
        id: "resistencia",
        titulo: "Resistir, decidir, recordar",
        estado: "interpretacion",
        contenido: {
          nino: "Resistir puede ser defender tu casa, tu familia y tus costumbres. No siempre se trata de pelear.",
          adolescente:
            "La resistencia puede adoptar muchas formas: militar, cultural, cotidiana. ¿Qué formas de resistencia reconocés hoy?",
          adulto:
            "Leer la resistencia como un concepto amplio permite incluir prácticas de defensa territorial, cultural y simbólica. La memoria de Diriangén funciona además como un lugar de identificación política y pedagógica.",
        },
      },
    ],
    elementos: [
      {
        id: "territorio",
        titulo: "El territorio",
        descripcion: {
          nino: "La tierra era el lugar donde vivía la comunidad. Defendarla era defender su hogar.",
          adolescente:
            "El territorio era una base material y simbólica: recursos, rutas, historias y pertenencia.",
          adulto:
            "La defensa del territorio articula dimensiones materiales y simbólicas. En contextos coloniales, el control del espacio implicaba también el control de la vida comunitaria.",
        },
        icono: "territorio",
      },
      {
        id: "dignidad",
        titulo: "La dignidad",
        descripcion: {
          nino: "Diriangén no aceptó que otros decidieran por su pueblo. Eso se llama dignidad.",
          adolescente:
            "La dignidad implica reconocer que una comunidad tiene derecho a decidir sobre su presente y su futuro.",
          adulto:
            "La dignidad aparece como un principio político: la negativa a ser tratado como objeto de la voluntad ajena.",
        },
        icono: "dignidad",
      },
      {
        id: "valentia",
        titulo: "La valentía",
        descripcion: {
          nino: "Valentía no es no tener miedo. Es actuar aunque tengas miedo, para cuidar a otros.",
          adolescente:
            "La valentía de Diriangén no puede separarse de la responsabilidad hacia su comunidad.",
          adulto:
            "La valentía, en el relato, se mide por la capacidad de sostener una decisión colectiva frente a un poder superior.",
        },
        icono: "valentia",
      },
      {
        id: "memoria",
        titulo: "La memoria",
        descripcion: {
          nino: "Recordar a Diriangén ayuda a que su historia no se pierda.",
          adolescente:
            "La memoria de un líder cambia con el tiempo: cada generación decide qué parte de su historia quiere conservar.",
          adulto:
            "La memoria de Diriangén es un campo de disputa: se la invoca desde distintos proyectos políticos y pedagógicos. Analizar esos usos es parte de comprender su legado.",
        },
        icono: "memoria",
      },
    ],
    personajesIds: ["diriangen", "pueblos-chorotegas"],
    asistenteId: "xila-diriangen",
    retos: [
      {
        id: "reto-resistir",
        titulo: "¿Qué significa resistir hoy?",
        enunciado: {
          nino: "¿Qué cosas de tu comunidad te gustaría cuidar y defender?",
          adolescente:
            "Identificá una situación actual en la que se defienda la dignidad de una comunidad. ¿En qué se parece y en qué se diferencia de la resistencia de 1523?",
          adulto:
            "Compare dos interpretaciones de la resistencia: una centrada en el enfrentamiento armado y otra en la defensa cultural. ¿Qué gana y qué pierde cada enfoque?",
        },
        pista: {
          nino: "Pensá en tu barrio, tu escuela, tu familia o la naturaleza.",
          adolescente:
            "Buscá situaciones donde una comunidad defiende su territorio, su lengua o sus derechos.",
          adulto:
            "Considere el riesgo de heroizar la resistencia y el riesgo de despolitizarla.",
        },
        cierre: {
          nino: "¡Muy bien! Cuidar lo que querés también es una forma de resistir.",
          adolescente:
            "La resistencia puede ser visible o cotidiana; lo importante es reconocer qué se defiende y quiénes participan.",
          adulto:
            "Toda interpretación de la resistencia ilumina ciertas dimensiones y oscurece otras. La comparación es una herramienta para pensarlas juntas.",
        },
      },
      {
        id: "reto-memoria",
        titulo: "La estatua y la pregunta",
        enunciado: {
          nino: "Si hicieran un dibujo de Diriangén en tu escuela, ¿qué le pondrías alrededor para contar su historia?",
          adolescente:
            "¿Qué elementos debería incluir un monumento a Diriangén para no reducir su historia a una sola escena?",
          adulto:
            "¿Cómo representar la resistencia indígena sin convertirla en un símbolo vacío? Proponga criterios de representación.",
        },
        pista: {
          nino: "Podés incluir su pueblo, la tierra, sus costumbres o sus decisiones.",
          adolescente:
            "Pensá en el contexto, las personas que lo rodearon, las consecuencias y las preguntas abiertas.",
          adulto:
            "Considere autoría, contexto, participación comunitaria y debate público.",
        },
        cierre: {
          nino: "¡Eso es! Una imagen puede contar mucho más que una sola persona.",
          adolescente:
            "Representar también es interpretar. Conviene mostrar el contexto y no solo el momento heroico.",
          adulto:
            "Una representación crítica debe hacer visible su propio punto de vista y abrir espacio al debate.",
        },
      },
    ],
    avisoContenido:
      "La fecha y los detalles del enfrentamiento provienen de crónicas coloniales. Contenido introductorio del prototipo.",
  },
];

export function getSala(id: string): Sala | undefined {
  return salas.find((sala) => sala.id === id);
}

export function getSalaPorAsistente(asistenteId: string): Sala | undefined {
  return salas.find((sala) => sala.asistenteId === asistenteId);
}
