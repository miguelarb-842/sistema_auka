# Sistema Auka · Instalación simulada en el Museo Lolita Soriano

Aplicación frontend que simula la instalación de **Sistema Auka** en el **Museo Lolita Soriano**. Sistema Auka es un producto educativo instalable en museos: cada institución recibe un paquete de contenido propio con sus salas, su guía general, sus agentes Xila y sus conversaciones con personajes y agrupaciones.

> **Simulación educativa.** No incluye backend, base de datos, autenticación, APIs externas ni inteligencia artificial real. Todo el contenido está marcado como **demostrativo** y **por verificar**. No se presentan biografías, fechas, obras, repertorios, integrantes, horarios ni precios como datos verificados.

---

## Stack

- **Next.js 16** con App Router y generación estática
- **React 19** + **TypeScript** en modo estricto
- **HeroUI 3** (`@heroui/react` y `@heroui/styles`)
- **Tailwind CSS 4**
- **Lucide React** para iconografía
- **next-themes** para el tema claro/oscuro
- Inter, escala tipográfica y paleta OKLCH

## Requisitos

- Node.js 20 o superior
- **pnpm** (el proyecto se verifica con `pnpm`)

## Puesta en marcha

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`.

### Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción con generación estática |
| `pnpm start` | Servir el build de producción |
| `pnpm lint` | ESLint con corrección automática |
| `pnpm exec tsc --noEmit` | Verificación de tipos sin emitir archivos |

### Variable de entorno opcional

`metadataBase` usa `NEXT_PUBLIC_SITE_URL` para construir URLs absolutas de metadatos y Open Graph. Si no se define, se usa `http://localhost:3000`.

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.example
```

---

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio: presentación, salas destacadas, perfiles y criterios de contenido |
| `/salas` | Catálogo de las diez salas con búsqueda y filtros |
| `/salas/[salaId]` | Detalle de sala, vínculos provisionales y Agente Xila cuando existe |
| `/personajes` | Catálogo de personajes y agrupación invitada |
| `/personajes/[personajeId]` | Ficha de personaje con etiqueta de representación |
| `/agrupaciones/[agrupacionId]` | Ficha de la agrupación invitada |
| `/chat` | Selector de guía general, agentes de sala y voces con chat |
| `/chat/guia-general` | Conversación con la guía general del museo |
| `/chat/sala/[salaId]` | Conversación con el Agente Xila de una sala |
| `/chat/personaje/[personajeId]` | Conversación con un personaje |
| `/chat/agrupacion/[agrupacionId]` | Conversación con la agrupación invitada |
| `/acerca` | Producto, instalación simulada, criterios y límites |
| `/configuracion` | Tema, tamaño de texto y perfil de visitante |

También existen estados globales de `loading`, `error` y `not-found`, metadata por ruta y `generateStaticParams` para las rutas dinámicas.

---

## Contenido del museo

### Salas

1. Sala Biográfica
2. Sala de Música
3. Sala de Audiovisuales
4. Corredor Managua
5. Sala de Objetos Personales
6. Galería Fotográfica
7. Sala de Arqueología y Artesanía
8. Biblioteca y Hemeroteca
9. Patio de Escultura
10. El Rincón del Niño

### Agente Xila

El Agente Xila está ubicado únicamente en tres salas:

- Sala de Música
- Sala de Objetos Personales
- El Rincón del Niño

En las otras siete salas no se muestra el Agente Xila. Cada agente se identifica como `Agente Xila · [sala]`.

### Voces con chat

| Voz | Etiqueta visible | Vínculo provisional |
| --- | --- | --- |
| Lolita Soriano | Representación educativa | Sala Biográfica · **Por verificar** |
| Alejandro Vega Matus | Representación educativa | Sala de Música · **Por verificar** |
| Orquesta de los Supremos Poderes | Representación educativa desde la perspectiva de la agrupación | Sala de Música · **Por verificar** |
| Banda Municipal de Managua | Agrupación invitada, demostración | Sala de Música |

Las relaciones son provisionales y están marcadas como **Por verificar**. Las conversaciones con personajes y agrupaciones son representaciones educativas: no son citas reales, testimonios ni evidencia histórica.

---

## Paquete de contenido e intercambio de museo

La entidad raíz es `Museo`. Los componentes y páginas no contienen datos del museo: piden salas, personajes, agrupaciones y configuraciones de chat al servicio del módulo `museo`.

```text
src/modules/museo/
├── data/
│   └── paquete-lolita-soriano.data.ts   # Paquete actual del Museo Lolita Soriano
├── services/
│   └── museo.service.ts                 # Acceso de solo lectura y repositorio
├── types/
│   └── museo.types.ts                   # Museo, Sala, ConfigChat, Personaje, etc.
└── paquete-contenido.ts                 # Punto único de intercambio
```

Para instalar Sistema Auka en otro museo:

1. Creá un paquete de contenido que cumpla el contrato `Museo`.
2. Reemplazá la exportación de `src/modules/museo/paquete-contenido.ts`.
3. Verificá que las relaciones, los chats y las etiquetas sigan siendo coherentes.

No es necesario modificar los componentes de interfaz, las rutas ni el motor de respuestas.

### Contrato principal

- `Museo`: nombre, etiqueta de instalación, salas, personajes, agrupaciones invitadas y guía general.
- `Sala`: descripción por perfil, estado de contenido y `agenteXilaUbicado` opcional.
- `Personaje` y `AgrupacionInvitada`: ficha con chat propio, etiqueta visible, relaciones provisionales y `retrato` opcional. El retrato es una referencia visual y no convierte la ficha en verificada.
- `ConfigChat`: bienvenida, preguntas sugeridas, retos opcionales y conocimiento local por perfil.

---

## Perfiles de visitante

| Perfil | Edad sugerida | Adaptación |
| --- | --- | --- |
| Niño | 6 a 11 años | Lenguaje breve, ejemplos cotidianos y retos concretos |
| Adolescente | 12 a 17 años | Preguntas de análisis y argumentación |
| Adulto | 18 años en adelante | Lecturas críticas, matices y preguntas abiertas |

El perfil cambia el tono de las conversaciones, la extensión de los textos, las preguntas sugeridas, los retos y las pistas. Se elige en un onboarding inicial y puede cambiarse en **Configuración**. Al cambiarlo, la conversación abierta se reinicia con el nuevo tono.

## Chat y motor de respuestas

- La interfaz de chat solo conoce el contrato `MotorRespuestas`:

  ```ts
  interface MotorRespuestas {
    responder(entrada: EntradaChat): Promise<RespuestaChat>;
  }
  ```

- La única implementación actual es `SimuladorRespuestas`, un motor local de reglas y respuestas preparadas.
- Los temas desconocidos se evalúan antes que los conocidos para evitar que una pregunta por precios, fechas, biografías o repertorios reciba una respuesta que parezca un dato verificado.
- El hook `useChat` maneja respuestas asíncronas, cancela esperas y descarta resultados obsoletos cuando cambia el perfil, la configuración o se reinicia la conversación.
- Preguntas sugeridas, retos, pistas e indicador de escritura.
- La conversación no se envía a ningún servidor y se pierde al recargar la página.

## Criterios de contenido

El contenido se clasifica con tres etiquetas visibles:

| Etiqueta | Significado |
| --- | --- |
| **Documentado** | Información sostenida por documentación validada por el museo |
| **Interpretación** | Lecturas y análisis del equipo del museo, no hechos cerrados |
| **Demostrativo** | Material introductorio de la simulación, pendiente de verificación |

En esta simulación **todo el contenido está en estado demostrativo y marcado como Por verificar**. Las etiquetas Documentado e Interpretación quedan disponibles para cuando el museo entregue y valide su información.

Reglas del proyecto:

- No se inventan biografías, fechas, obras, repertorios, integrantes, horarios ni precios.
- Las representaciones de personajes y agrupaciones están marcadas como tales; no son citas ni testimonios.
- Las ilustraciones son representaciones conceptuales, no retratos verificados.
- La verificación del contenido queda a cargo del equipo del museo.

## Persistencia local

Las preferencias se guardan en `localStorage`:

| Clave | Valores |
| --- | --- |
| `auka:perfil` | `nino`, `adolescente`, `adulto` |
| `auka:tipografia` | `sm`, `md`, `lg` |
| `auka:tema` | `light`, `dark` |

No se almacenan mensajes del chat ni datos personales.

---

## Arquitectura

El proyecto sigue **Screaming Architecture** para los dominios y **Atomic Design** para la interfaz global.

```text
src/
├── app/                          # Rutas, layouts y estados de Next.js
│   ├── salas/[salaId]/
│   ├── personajes/[personajeId]/
│   ├── agrupaciones/[agrupacionId]/
│   ├── chat/guia-general/
│   ├── chat/sala/[salaId]/
│   ├── chat/personaje/[personajeId]/
│   ├── chat/agrupacion/[agrupacionId]/
│   ├── configuracion/
│   ├── acerca/
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/ui/                # Sistema de diseño global (Atomic Design)
│   ├── atoms/                    # ButtonLink, Logo
│   ├── molecules/                # Breadcrumbs, ContentBadge, SearchInput, etc.
│   ├── organisms/                # Navbar, Footer
│   └── templates/                # PublicLayout
├── config/                       # Fuentes, navegación y datos del sitio
├── lib/                          # Utilidades compartidas
├── modules/                      # Dominios de la aplicación
│   ├── museo/                    # Entidad raíz, paquete y servicio de contenido
│   ├── home/
│   ├── salas/                    # Envoltorio de lectura sobre museo
│   ├── personajes/               # Envoltorio de lectura sobre museo
│   ├── chat-xila/                # Motor de respuestas, hook y UI de chat
│   ├── configuracion/
│   └── acerca/
└── types/                        # Tipos compartidos (perfiles y UI)
```

Principios aplicados:

- Los componentes de módulo no se mezclan con los componentes globales.
- Los datos del museo viven en el paquete de contenido, separados de la UI.
- Los servicios exponen funciones pequeñas y tipadas.
- Las rutas de `app/` solo resuelven parámetros, metadata y composición.
- TypeScript estricto y tipos explícitos para perfiles, estados de contenido y chats.

## Accesibilidad y responsive

- Enlace «Saltar al contenido», landmarks semánticos y jerarquía de encabezados.
- Navegación por teclado, foco visible y `aria-pressed` en filtros y selectores.
- Regiones `aria-live` para la conversación y los estados dinámicos.
- Contraste basado en los tokens de HeroUI, compatible con tema claro y oscuro.
- El efecto Holo Card respeta `prefers-reduced-motion` y no reclama gestos táctiles.
- Diseño responsive con navegación móvil en drawer y rejillas adaptativas.
- Preferencias de tipografía (pequeño, normal, grande) aplicadas globalmente.

## Ilustraciones

La ilustración de `public/images/hero-xila.svg` es un SVG original creado para esta demostración. Se sirve con `next/image`. No representa un retrato histórico verificado ni una reconstrucción del Agente Xila.

---

## Limitaciones conocidas

- No hay backend, base de datos, autenticación ni servicios externos.
- El chat es una simulación determinista por reglas: no comprende lenguaje natural fuera de sus coincidencias preparadas.
- No hay persistencia de conversaciones, cuentas ni sincronización entre dispositivos.
- Las fuentes históricas específicas, la revisión editorial y la validación con el museo quedan pendientes.
- El contenido biográfico, los objetos, las obras, los repertorios, los integrantes, los horarios y los precios no están verificados.

## Verificación

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

El build genera las rutas estáticas de salas, personajes, agrupaciones y chats, además de las páginas fijas.

## Créditos

Sistema Auka · Simulación de la instalación en el Museo Lolita Soriano. Proyecto frontend educativo derivado de la plantilla Next.js + HeroUI (MIT).
