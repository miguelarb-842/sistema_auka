# Sistema Auka · Robot Xila

Museo digital educativo de demostración sobre el patrimonio histórico y cultural de Nicaragua. Combina salas temáticas, fichas de personajes y una conversación simulada con tres versiones del Robot Xila, adaptada a tres perfiles de visitante.

> **Prototipo frontend.** No incluye backend, base de datos, autenticación, APIs externas ni inteligencia artificial real. Todo el contenido y el chat funcionan localmente en el navegador.

---

## Stack

- **Next.js 16** con App Router y generación estática (SSG)
- **React 19** + **TypeScript** en modo estricto
- **HeroUI 3** (`@heroui/react` y `@heroui/styles`)
- **Tailwind CSS 4**
- **Lucide React** para iconografía
- **next-themes** para el tema claro/oscuro
- Ilustraciones SVG originales y locales

## Requisitos

- Node.js 20 o superior
- Yarn 1.22 (el proyecto incluye `yarn.lock`)

## Puesta en marcha

```bash
yarn install
yarn dev
```

La aplicación queda disponible en `http://localhost:3000`.

### Scripts

| Comando | Descripción |
| --- | --- |
| `yarn dev` | Servidor de desarrollo |
| `yarn build` | Build de producción con generación estática |
| `yarn start` | Servir el build de producción |
| `yarn lint` | ESLint con corrección automática |
| `npx tsc --noEmit` | Verificación de tipos sin emitir archivos |

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
| `/salas` | Catálogo de salas con búsqueda y filtros por tema |
| `/salas/[salaId]` | Detalle de sala: contexto, bloques, elementos, personajes, retos y asistente |
| `/personajes` | Catálogo de personajes y pueblos con búsqueda y filtros |
| `/personajes/[personajeId]` | Ficha adaptada por perfil, acontecimientos, valores y personificación |
| `/chat` | Selector de los tres asistentes Xila |
| `/chat/[salaId]` | Conversación simulada con el asistente de la sala |
| `/acerca` | Misión, alcance, criterios de contenido y arquitectura |
| `/configuracion` | Tema, tamaño de texto y perfil de visitante |

También existen estados globales de `loading`, `error` y `not-found`, además de metadata por ruta y `generateStaticParams` para las rutas dinámicas.

### Salas demostrativas

1. **Fiestas Patronales de Managua**
2. **Caciques de Nicaragua** — Nicarao y Macuil Miquiztli
3. **Diriangén y la resistencia indígena** — 17 de abril de 1523

### Personajes

- Nicarao
- Diriangén
- Pueblos chorotegas y mangues (entrada colectiva)
- Santo Domingo de Guzmán (figura cultural)

---

## Perfiles de visitante

| Perfil | Edad sugerida | Adaptación |
| --- | --- | --- |
| Niño | 6 a 11 años | Lenguaje breve, ejemplos cotidianos y retos concretos |
| Adolescente | 12 a 17 años | Preguntas de análisis y argumentación |
| Adulto | 18 años en adelante | Lecturas críticas, matices y preguntas abiertas |

El perfil cambia el tono de Xila, la extensión de los textos, las preguntas sugeridas, los retos y las pistas. Se elige en un onboarding inicial y puede cambiarse en **Configuración**. Al cambiarlo, la conversación abierta se reinicia con el nuevo tono.

## Chat Xila

- Tres asistentes, uno por sala: **Xila Tradiciones**, **Xila Nicarao** y **Xila Diriangén**.
- Motor local de reglas y respuestas predefinidas; no consulta internet ni aprende.
- Preguntas sugeridas, retos, pistas e indicador de escritura.
- Si el tema no está cubierto, Xila lo indica en lugar de inventar información.
- La conversación no se envía a ningún servidor y se pierde al recargar la página.
- La interfaz marca explícitamente que se trata de una simulación sin IA real.

## Criterios de contenido

El contenido se clasifica con tres etiquetas visibles:

| Etiqueta | Significado |
| --- | --- |
| **Documentado** | Información general sostenida por la documentación disponible |
| **Interpretación** | Lecturas y análisis propuestos, presentados como preguntas o hipótesis |
| **Demostrativo** | Material introductorio del prototipo, pendiente de fuentes y validación |

Reglas del proyecto:

- No se inventan fechas, citas, testimonios ni retratos verificados.
- Las personificaciones y dramatizaciones están marcadas como tales; no son citas históricas.
- Las ilustraciones son representaciones artísticas conceptuales, no reconstrucciones.
- Las fuentes específicas y la validación institucional quedan pendientes para una versión final.

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
│   ├── chat/[salaId]/
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
│   ├── home/
│   ├── salas/
│   ├── personajes/
│   ├── chat-xila/
│   ├── configuracion/
│   └── acerca/
└── types/                        # Tipos compartidos (IDs, perfiles, UI)
```

Cada módulo se organiza internamente según lo que necesita:

```text
modules/<dominio>/
├── components/    # Componentes propios del dominio
├── context/       # Estado compartido (solo configuración)
├── data/          # Contenido separado de la interfaz
├── hooks/         # Lógica reutilizable (chat)
├── pages/         # Composición de la vista del dominio
├── services/      # Acceso a datos y reglas de negocio
├── types/         # Tipos del dominio
└── utils/         # Utilidades específicas
```

Principios aplicados:

- Los componentes de módulo no se mezclan con los componentes globales.
- Los datos viven en archivos revisables, separados de la UI.
- Los servicios exponen funciones pequeñas y tipadas.
- Las rutas de `app/` solo resuelven parámetros, metadata y composición.
- TypeScript estricto y tipos explícitos para IDs, perfiles y estados de contenido.

## Accesibilidad y responsive

- Enlace «Saltar al contenido», landmarks semánticos y jerarquía de encabezados.
- Navegación por teclado, foco visible y `aria-pressed` en filtros y selectores.
- Regiones `aria-live` para la conversación y los estados dinámicos.
- Contraste basado en los tokens de HeroUI, compatible con tema claro y oscuro.
- Diseño responsive con navegación móvil en drawer y rejillas adaptativas.
- Preferencias de tipografía (pequeño, normal, grande) aplicadas globalmente.

## Ilustraciones

Todas las imágenes de `public/images/` son SVG originales creados para esta demostración. Se sirven con `next/image` y `dangerouslyAllowSVG` está limitado por la configuración del proyecto. No representan retratos históricos verificados.

---

## Limitaciones conocidas

- El documento completo de la propuesta (`Propuesta_Valor_con_Anexos_v3.docx`) no estaba disponible durante el desarrollo; el contenido se basa en el brief y se marca como introductorio.
- La paleta OKLCH oficial no fue suministrada. Se conserva la paleta base de HeroUI v3 sin inventar sustitutos; el bloque de tokens está documentado en `src/app/globals.css`.
- Las fuentes históricas específicas, la revisión editorial y la validación con comunidades e instituciones quedan pendientes.
- No hay persistencia de conversaciones, cuentas ni sincronización entre dispositivos.
- El chat es una simulación determinista por reglas: no comprende lenguaje natural fuera de sus coincidencias preparadas.

## Verificación

```bash
npx tsc --noEmit
yarn lint
yarn build
```

El build genera las rutas estáticas de salas, personajes y chats, además de las páginas fijas.

## Créditos

Sistema Auka · Robot Xila. Prototipo frontend educativo. Proyecto derivado de la plantilla Next.js + HeroUI (MIT).
