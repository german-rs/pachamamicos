# Pachamamicos · Documentación de arquitectura

> **Versión:** 1.1 (incorpora Tailwind CSS) · **Fase:** 1 (blog) · **Sitio:** https://pachamamicos.cl · **Repo:** german-rs/pachamamicos
> **Documento hermano:** [`GUIA-DE-ESTILO.md`](./GUIA-DE-ESTILO.md)

---

## 1. Propósito y alcance

Pachamamicos es un medio digital en español de Chile que reúne eventos de meditación, mindfulness y espiritualidad, acompañados de guías para principiantes y textos clásicos comentados. Lo hace una sola persona a tiempo parcial, firmando como **Equipo Pachamamicos**.

**Este documento cubre la Fase 1: el blog.** El canal principal es SEO, así que sin artículos indexados no hay audiencia, aportes, afiliados ni auspicios.

| Dentro de la Fase 1 | Fuera de alcance (con puerta abierta) |
|---|---|
| Portada, `blog`, `guias`, `textos` | Calendario de eventos (`/eventos/`) con Supabase |
| Quiénes somos, Apoya, Afiliados, Privacidad, Contacto | Reproductor de audio |
| SEO técnico, RSS, sitemap, 404 | Tienda o venta de libros digitales |
| Botón de aporte voluntario (enlace a Ko-fi) | Lista de correo |
| Despliegue en GitHub Pages | Listados destacados y auspicios |

## 2. Principios de arquitectura

1. **Estático primero.** Todo se genera en build. Cero servidores propios.
2. **Cero JavaScript por defecto.** Solo se agrega JS cuando una función lo exige (islas de Astro, más adelante en el calendario).
3. **Ligero siempre.** Sin fotos pesadas, sin ilustraciones de pago. Stickers, texturas y decoración en SVG y CSS. Con Tailwind solo se genera el CSS de las clases que se usan.
4. **Una persona puede mantenerlo.** Publicar = crear un archivo Markdown, hacer commit y listo.
5. **SEO por diseño.** Los metadatos salen del esquema del contenido, no de memoria.
6. **Accesible por defecto.** Tema oscuro con contraste verificado, foco visible, estructura semántica.
7. **Crecer sin reescribir.** Rutas y carpetas reservadas para las fases siguientes.

## 3. Stack

| Capa | Elección | Nota |
|---|---|---|
| Framework | **Astro** (versión estable vigente) | Sitio estático, content collections |
| Contenido | **Markdown / MDX** | MDX solo si hace falta un componente dentro del texto |
| Estilos | **Tailwind CSS v4** | Tokens definidos en `@theme`. Ver sección 3.1 y la guía de estilo |
| Fuentes | **Autoalojadas** (`@fontsource`, subset latin) | Sin Google Fonts en runtime |
| Imágenes | `astro:assets` (sharp) | AVIF/WebP, tamaños responsivos |
| Sitemap | `@astrojs/sitemap` | |
| RSS | `@astrojs/rss` | |
| Hosting | **GitHub Pages** | Despliegue con GitHub Actions |
| DNS | **Cloudflare** | Ver sección 11 |
| Analítica | Cloudflare Web Analytics + Google Search Console | Sin cookies |
| Futuro | Supabase | Solo Fase calendario |

> **Verificar al implementar:** en las versiones más recientes de Astro puede cambiar de dónde se importa `z` (zod) y la forma del loader. Revisa la documentación oficial de *Content collections* de la versión instalada.

### 3.1 Tailwind CSS

**Integración.** Con Tailwind v4 se usa el plugin de Vite (`@tailwindcss/vite`) dentro de `astro.config.mjs`. No existe `tailwind.config.js`: la configuración vive en CSS, en `src/styles/global.css`, con la directiva `@theme`. Confirma el método vigente en la documentación de Astro y de Tailwind al instalar, porque la integración `@astrojs/tailwind` corresponde a Tailwind v3.

**Reglas de uso en este proyecto**

1. **Un solo tema oscuro.** No se usan variantes `dark:`. Los colores base ya son oscuros y se declara `color-scheme: dark`.
2. **Paleta cerrada.** Se vacía la paleta por defecto (`--color-*: initial;`) y solo existen los colores de la marca. Así no se cuelan colores sin contraste verificado.
3. **Tokens en `@theme`.** Colores, fuentes, tamaños de texto, radios y sombras de la guía de estilo se traducen a variables de tema y generan utilidades (`bg-fondo`, `text-texto`, `font-display`, `shadow-dura`).
4. **Espaciado.** La escala por defecto de Tailwind (base de 4 px) coincide con la de la guía. Se usan las utilidades estándar:

   | Guía | `--e-1` | `--e-2` | `--e-3` | `--e-4` | `--e-5` | `--e-6` | `--e-7` | `--e-8` | `--e-9` |
   |---|---|---|---|---|---|---|---|---|---|
   | Tailwind | `1` | `2` | `3` | `4` | `6` | `8` | `12` | `16` | `24` |

5. **Puntos de quiebre.** Se ajustan a los de la guía: `sm` 640 px (por defecto), `md` 960 px (`60rem`) y `lg` 1200 px (`75rem`).
6. **Componentes como componentes de Astro**, no como clases con `@apply`. Un patrón repetido (tarjeta, chip, botón) se resuelve con un componente `.astro` que concentra las clases.
7. **Decoración "hecha a mano"** (`clip-path` de cinta y papel rasgado, rotaciones) va en `global.css` como clases propias o con valores arbitrarios. Los polígonos largos no se escriben en línea.
8. **Cuerpo de artículos (`.prose`)** en `src/styles/prose.css`, con CSS propio sobre las variables del tema. Así se controlan subrayados, viñetas y citas según la guía. `@tailwindcss/typography` es una alternativa si se prefiere, pero obliga a sobrescribir bastante.
9. **Orden de clases** consistente. Se recomienda `prettier-plugin-tailwindcss` para ordenarlas automáticamente.

**Base de `src/styles/global.css` (referencia)**

```css
@import "tailwindcss";

@theme {
  /* Paleta cerrada: se elimina la de Tailwind */
  --color-*: initial;

  --color-fondo: #0F0D14;
  --color-superficie: #1A1722;
  --color-superficie-2: #26212F;
  --color-borde: #6B6280;
  --color-texto: #F2EEE6;
  --color-texto-suave: #BFB8CC;
  --color-tinta: #0F0D14;

  --color-celeste: #4CC9F0;
  --color-lima: #B6F23A;
  --color-violeta: #B794F6;
  --color-rosa: #FF7BC0;
  --color-amarillo: #FFD93D;
  --color-error: #FF8A80;

  /* Tipografía */
  --font-display: "Ranchers", "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-acento: "DynaPuff", "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-texto: "Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --text-hero: clamp(2.75rem, 1.5rem + 6vw, 5rem);
  --text-hero--line-height: 1;

  /* Forma */
  --radius-s: 8px;
  --radius-m: 16px;
  --radius-l: 24px;
  --shadow-dura: 6px 6px 0 #F2EEE6;
  --shadow-dura-hover: 8px 8px 0 #F2EEE6;

  /* Puntos de quiebre */
  --breakpoint-md: 60rem;
  --breakpoint-lg: 75rem;
}

@layer base {
  html {
    color-scheme: dark;
    background-color: var(--color-fondo);
    color: var(--color-texto);
    font-family: var(--font-texto);
    font-synthesis: none;
  }
  :focus-visible {
    outline: 3px solid var(--color-amarillo);
    outline-offset: 3px;
  }
  ::selection {
    background: var(--color-amarillo);
    color: var(--color-tinta);
  }
}
```

La lista completa de tamaños (`--text-h1`, `--text-h2`, `--text-cuerpo`, etc.) y los componentes decorativos siguen la guía de estilo (secciones 4 a 6) y se agregan a este mismo archivo.

**Carga de fuentes.** Se importan en `BaseLayout.astro` desde `@fontsource` (solo subset `latin`), no desde un CDN.

## 4. Mapa del sitio y rutas

| Ruta | Página | Colección / fuente | Indexa |
|---|---|---|---|
| `/` | Portada | Últimos de cada colección | Sí |
| `/blog/` | Listado del blog (paginado) | `blog` | Sí |
| `/blog/[slug]/` | Artículo | `blog` | Sí |
| `/guias/` | Listado de guías | `guias` | Sí |
| `/guias/[slug]/` | Guía | `guias` | Sí |
| `/textos/` | Listado de obras | `src/data/obras.ts` | Sí |
| `/textos/[obra]/` | Portada de la obra (índice de capítulos) | `textos` + `obras.ts` | Sí |
| `/textos/[obra]/[slug]/` | Capítulo o texto comentado | `textos` | Sí |
| `/quienes-somos/` | Equipo Pachamamicos, enfoque, política de contenido | Página | Sí |
| `/apoya/` | Aporte voluntario y en qué se usa | Página | Sí |
| `/afiliados/` | Política de afiliados y transparencia | Página | Sí |
| `/privacidad/` | Política de privacidad | Página | Sí |
| `/contacto/` | Contacto | Página | Sí |
| `/rss.xml` | Feed global | Las tres colecciones | n/a |
| `/sitemap-index.xml` | Sitemap | Generado | n/a |
| `/404.html` | Página de error | Página | `noindex` |

**Rutas reservadas (no crear aún):** `/eventos/`, `/eventos/[slug]/`, `/libros/`, `/escuchar/`.

### Reglas de URL

- Minúsculas, sin tildes, sin `ñ` (usa `n`), palabras separadas por guion, máximo 5 palabras relevantes.
- **Sin fechas en la URL.** Los artículos se actualizan.
- Con slash final en todo (`trailingSlash: 'always'`), porque GitHub Pages sirve carpetas.
- **Una URL publicada no se cambia.** GitHub Pages no hace redirecciones del servidor; Astro solo puede generar redirecciones con meta refresh, que son débiles para SEO.
- El slug es el nombre del archivo: `src/content/blog/como-empezar-a-meditar.md` → `/blog/como-empezar-a-meditar/`.

### Cuándo va algo en cada sección

| Sección | Intención de búsqueda | Vida útil | Ejemplo |
|---|---|---|---|
| **Blog** | Informativa y de actualidad, crónicas | Media | "Qué fue el retiro de silencio de…" |
| **Guías** | "Cómo", "qué es", para principiantes | Evergreen, se actualiza | "Cómo empezar a meditar en casa" |
| **Textos** | Obra clásica y su comentario | Evergreen | "Dhammapada, capítulo 1: los pares" |

## 5. Estructura de carpetas

```
pachamamicos/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ docs/
│  ├─ ARQUITECTURA.md
│  └─ GUIA-DE-ESTILO.md
├─ public/
│  ├─ CNAME                      # contiene: pachamamicos.cl
│  ├─ robots.txt
│  ├─ favicon.svg
│  ├─ favicon.ico
│  ├─ apple-touch-icon.png
│  ├─ og/                        # imagen OG por sección (1200×630, < 100 KB)
│  │  ├─ default.jpg
│  │  ├─ blog.jpg
│  │  ├─ guias.jpg
│  │  └─ textos.jpg
│  └─ fonts/                     # solo si no se usa @fontsource
├─ src/
│  ├─ assets/
│  │  └─ img/                    # imágenes procesadas por astro:assets
│  ├─ components/
│  │  ├─ base/                   # Header, Footer, SkipLink, Seo, JsonLd
│  │  ├─ ui/                     # Boton, Chip, Tarjeta, Callout, Cinta, Sticker
│  │  ├─ article/                # Meta, Toc, Fuentes, AvisoAfiliado, BloqueAporte, Relacionados
│  │  └─ icons/                  # sprite.svg + <Icono name="" />
│  ├─ content/
│  │  ├─ blog/
│  │  ├─ guias/
│  │  └─ textos/
│  │     └─ dhammapada/
│  │        ├─ 00-introduccion.md
│  │        └─ 01-los-pares.md
│  ├─ content.config.ts          # esquemas de las colecciones
│  ├─ data/
│  │  ├─ site.ts                 # nombre, URL, descripción, enlaces sociales, Ko-fi
│  │  └─ obras.ts                # metadatos de cada obra de /textos/
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  ├─ ListLayout.astro
│  │  ├─ ArticleLayout.astro     # compartido por blog, guías y textos
│  │  └─ PageLayout.astro        # páginas institucionales
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ blog/[...page].astro    # listado paginado
│  │  ├─ blog/[slug].astro
│  │  ├─ guias/index.astro
│  │  ├─ guias/[slug].astro
│  │  ├─ textos/index.astro
│  │  ├─ textos/[obra]/index.astro
│  │  ├─ textos/[obra]/[slug].astro
│  │  ├─ quienes-somos.astro
│  │  ├─ apoya.astro
│  │  ├─ afiliados.astro
│  │  ├─ privacidad.astro
│  │  ├─ contacto.astro
│  │  ├─ rss.xml.ts
│  │  └─ 404.astro
│  ├─ styles/
│  │  ├─ global.css              # @import "tailwindcss", @theme (tokens), capa base, decoración
│  │  └─ prose.css               # estilos del cuerpo de artículos (.prose)
│  └─ utils/
│     ├─ reading-time.ts
│     ├─ seo.ts                  # arma title, canonical, OG, JSON-LD
│     └─ collections.ts          # filtros: sin borradores, orden por fecha
├─ astro.config.mjs
├─ .prettierrc                   # con prettier-plugin-tailwindcss
├─ tsconfig.json
└─ package.json                  # sin tailwind.config.js (Tailwind v4 se configura en CSS)
```

## 6. Configuración base

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pachamamicos.cl',
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Dependencias principales

```bash
npm install tailwindcss @tailwindcss/vite
npm install @astrojs/sitemap @astrojs/rss
npm install @fontsource/ranchers @fontsource-variable/dynapuff @fontsource-variable/nunito-sans
npm install -D prettier prettier-plugin-tailwindcss
```

Verifica nombres y versiones en npm al instalar.

### `public/CNAME`

```
pachamamicos.cl
```

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://pachamamicos.cl/sitemap-index.xml
```

## 7. Colecciones de contenido

Tres colecciones con un núcleo común y campos propios. Los esquemas validan al compilar: si falta un dato obligatorio, el build falla antes de publicar.

### `src/content.config.ts` (referencia)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fuente = z.object({
  titulo: z.string(),
  url: z.string().url().optional(),
  nota: z.string().optional(),       // p. ej. "traducción propia", "dominio público"
});

const nucleo = ({ image }: { image: any }) => ({
  title: z.string().min(10).max(70),            // se usa en <title> y H1
  description: z.string().min(80).max(160),     // meta description y bajada
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  autor: z.string().default('Equipo Pachamamicos'),
  cover: image().optional(),
  coverAlt: z.string().optional(),
  tags: z.array(z.string()).max(5).default([]),
  fuentes: z.array(fuente).default([]),
  afiliados: z.boolean().default(false),        // muestra aviso de afiliados
  draft: z.boolean().default(false),
  relacionados: z.array(z.string()).max(3).default([]), // slugs
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      ...nucleo({ image }),
      categoria: z.enum(['cronicas', 'practica', 'resenas', 'comunidad']),
    }),
});

const guias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guias' }),
  schema: ({ image }) =>
    z.object({
      ...nucleo({ image }),
      updatedDate: z.coerce.date(),              // obligatorio en guías
      nivel: z.enum(['principiante', 'intermedio']).default('principiante'),
      tema: z.enum(['meditacion', 'mindfulness', 'respiracion', 'espiritualidad', 'eventos']),
    }),
});

const textos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/textos' }),
  schema: ({ image }) =>
    z.object({
      ...nucleo({ image }),
      obra: z.string(),                          // 'dhammapada' (coincide con obras.ts)
      orden: z.number().int(),                   // 0 = introducción
      capitulo: z.string().optional(),           // "Capítulo 1: Los pares"
      versiculos: z.string().optional(),         // "1–20"
      traduccion: z.object({
        tipo: z.enum(['propia', 'dominio-publico', 'con-permiso']),
        detalle: z.string(),                     // quién, de qué edición
      }),
    }),
});

export const collections = { blog, guias, textos };
```

### Notas de diseño de las colecciones

- **`autor` es de marca.** Valor por defecto `Equipo Pachamamicos`. Nunca un nombre personal.
- **`updatedDate` obligatorio en guías.** Es una señal de frescura y confianza. Se muestra en pantalla.
- **`fuentes` es un campo, no un párrafo.** Se renderiza siempre como bloque "Fuentes" al final, con enlaces. Es la base de la señal E-E-A-T.
- **`traduccion` obligatorio en textos.** Declara si la traducción es propia, de dominio público o con permiso. Evita problemas de derechos y da transparencia.
- **`draft: true`** excluye el archivo del build, del RSS y del sitemap (ver `utils/collections.ts`).
- **Categorías cerradas (enum), tags abiertas.** Las categorías definen la navegación; las tags son metadatos y **no generan páginas** en la Fase 1 (evita páginas finas indexables).
- **`obras.ts`** guarda lo que es de la obra y no de cada capítulo: título, autor original, tradición, descripción, imagen, orden.

### Reglas de calidad por tipo

| | Blog | Guías | Textos |
|---|---|---|---|
| Extensión orientativa | 600–1.200 palabras | 1.200–2.500 palabras | Según capítulo |
| Fuentes citadas | Recomendado | **Obligatorio (≥ 2)** | Obligatorio |
| `updatedDate` | Opcional | **Obligatorio** | Opcional |
| Aviso de afiliados | Si hay enlaces | Si hay enlaces | Rara vez |
| Bloque de aporte | Sí | Sí | Sí |

## 8. Layouts y componentes

### Jerarquía de layouts

```
BaseLayout        → <html lang="es-CL">, <head> (Seo, fuentes, global.css), Header, <main>, Footer
 ├─ ListLayout     → título de sección, color de sección, grilla de tarjetas, paginación
 ├─ ArticleLayout  → breadcrumb, cabecera, meta, TOC, cuerpo (.prose), fuentes, aporte, relacionados
 └─ PageLayout     → páginas institucionales con columna de lectura
```

### Componentes clave

| Componente | Función | JS |
|---|---|---|
| `Seo.astro` | `<title>`, description, canonical, Open Graph, Twitter Card, `robots` | No |
| `JsonLd.astro` | Datos estructurados (ver sección 9) | No |
| `Header.astro` | Logo, navegación, enlace de aporte. Menú móvil con `<details>` | No |
| `Tarjeta.astro` | Tarjeta de artículo, color según sección | No |
| `Meta.astro` | Equipo Pachamamicos · fecha · actualizado · tiempo de lectura | No |
| `Toc.astro` | Índice con `<details>`, se genera de los encabezados | No |
| `Fuentes.astro` | Lista de fuentes citadas | No |
| `AvisoAfiliado.astro` | Aviso al inicio si `afiliados: true` | No |
| `BloqueAporte.astro` | Invitación a aportar, enlace a Ko-fi | No |
| `Callout.astro` | Nota, precaución, práctica, cita | No |
| `Cinta`, `Sticker` | Decoración (CSS/SVG), `aria-hidden` | No |

## 9. SEO técnico

### 9.1 Metadatos por página

| Elemento | Regla |
|---|---|
| `<title>` | `{title} · Pachamamicos`, máximo ~60 caracteres. Portada: título propio |
| `<meta description>` | 80–160 caracteres, viene de `description` |
| `<link rel="canonical">` | URL absoluta con slash final |
| `<html lang>` | `es-CL` |
| Open Graph | `og:title`, `og:description`, `og:type` (`article` o `website`), `og:url`, `og:image`, `og:locale = es_CL` |
| Twitter Card | `summary_large_image` |
| `<meta name="robots">` | `noindex` en 404 y en borradores si llegaran a compilarse |
| `theme-color` | `#0F0D14` |
| `color-scheme` | `dark` |

### 9.2 Datos estructurados (JSON-LD)

| Página | Tipo |
|---|---|
| Todo el sitio | `Organization` (Pachamamicos) y `WebSite` |
| Artículos (las tres colecciones) | `BlogPosting` o `Article`, con `author` y `publisher` de tipo **`Organization`**, `datePublished`, `dateModified` |
| Artículos y listados | `BreadcrumbList` |

No se agregan `FAQPage` ni `HowTo`: Google restringió su uso en resultados y no aportan hoy.

### 9.3 Imágenes sociales (OG)

- **Fase 1:** una imagen estática por sección (`public/og/`), 1200×630, menos de 100 KB, generadas una sola vez con SVG.
- **Fase 2 (opcional):** generación por artículo en build (por ejemplo con Satori). Solo si el tiempo lo justifica.

### 9.4 Estructura de contenido para buscadores

- Un solo `<h1>` por página, igual al `title` del artículo.
- Jerarquía sin saltos: `h2` → `h3`.
- Primer párrafo responde la intención de búsqueda en 2–3 líneas.
- Enlazado interno: cada guía enlaza a 2–3 artículos o textos relacionados, y viceversa.
- Texto alternativo descriptivo en toda imagen con contenido.
- Texto del enlace descriptivo (nada de "haz clic aquí").

### 9.5 Rastreo e indexación

- `sitemap-index.xml` automático, enviado a Google Search Console.
- RSS global en `/rss.xml`, con `<link rel="alternate">` en el `<head>`.
- Páginas de listado paginadas con enlaces a siguiente y anterior; canonical a sí mismas.
- 404 personalizada.
- Verificar la propiedad en Search Console el día 1 y revisar cobertura cada semana durante los primeros meses.

## 10. Rendimiento y accesibilidad

### Presupuesto de rendimiento

| Métrica | Objetivo |
|---|---|
| Lighthouse móvil (Rendimiento, Accesibilidad, Buenas prácticas, SEO) | ≥ 95 |
| LCP | < 2,5 s |
| CLS | < 0,1 |
| INP | < 200 ms |
| JavaScript propio por defecto | **0 KB** |
| CSS total (gzip) | < 20 KB (Tailwind genera solo las clases usadas) |
| Fuentes | ≤ 3 familias, subset `latin`, WOFF2, `font-display: swap`, solo se precargan las críticas |
| Imagen de portada de artículo | < 100 KB |
| Sprite SVG de iconos y stickers | < 20 KB |

### Imágenes

- Siempre vía `astro:assets`: AVIF/WebP, `width` y `height` explícitos, `loading="lazy"` salvo la primera visible.
- Si un artículo no tiene portada, se genera una **portada CSS/SVG** con el color de su sección. No se exige foto.
- Nada de GIF animados.

### Accesibilidad (WCAG 2.2 AA como mínimo)

- Contraste verificado de la paleta (ver guía de estilo, sección 3).
- Foco visible en todo elemento interactivo.
- Enlace "Saltar al contenido".
- Áreas táctiles de al menos 44×44 px.
- Decoración con `aria-hidden="true"`; la información nunca vive solo en la decoración.
- `prefers-reduced-motion` respetado.
- Menú móvil sin JS (`<details>`), operable con teclado.

## 11. Despliegue

### 11.1 Flujo

```
Commit en main → GitHub Actions → astro build → GitHub Pages → pachamamicos.cl
```

- En **Settings → Pages**, origen: **GitHub Actions**.
- Dominio personalizado: `pachamamicos.cl`, con *Enforce HTTPS* activo.
- Archivo `public/CNAME` para que el dominio persista en cada despliegue.

### 11.2 `.github/workflows/deploy.yml` (referencia)

```yaml
name: Deploy a GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3     # revisa la versión vigente en la documentación
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Agregar antes del build un paso `npx astro check` para que errores de esquema o tipos bloqueen el despliegue.

### 11.3 Cloudflare (DNS)

- El dominio ya funciona. Mantén los registros que GitHub Pages indica para un dominio apex (A y AAAA hacia GitHub) y un `CNAME` de `www` hacia `german-rs.github.io`.
- Si el proxy de Cloudflare (nube naranja) está activo, el modo SSL/TLS debe ser **Full (strict)**. Si el HTTPS de GitHub falla al renovar, pasa temporalmente a "solo DNS" (nube gris).
- Define una sola versión canónica (apex o `www`) y redirige la otra.
- Cloudflare Web Analytics: gratuita y sin cookies.

> Confirma en la documentación vigente de GitHub Pages las IP actuales antes de tocar los registros.

## 12. Flujo de publicación

### 12.1 Pasos

1. Crear el archivo en `src/content/{blog|guias|textos}/` con el slug como nombre.
2. Completar el frontmatter (el esquema avisa si falta algo).
3. Escribir en Markdown. Mantener `draft: true` mientras se trabaja.
4. Revisar con `npm run dev`.
5. Cambiar a `draft: false`, commit en `main`.
6. Esperar el despliegue (1–3 minutos).
7. Solicitar indexación en Search Console (opcional pero útil al inicio).
8. Compartir en Instagram.

### 12.2 Plantilla de frontmatter (guía)

```md
---
title: "Cómo empezar a meditar en casa: guía para principiantes"
description: "Pasos simples para sentarte, respirar y sostener una práctica corta de meditación, sin experiencia previa ni materiales especiales."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tema: "meditacion"
nivel: "principiante"
tags: ["meditacion", "principiantes"]
cover: "../../assets/img/guia-meditar-en-casa.jpg"
coverAlt: "Cojín de meditación junto a una ventana"
fuentes:
  - titulo: "Nombre de la fuente"
    url: "https://ejemplo.org"
afiliados: false
draft: true
---
```

### 12.3 Checklist antes de publicar

- [ ] El `title` responde claramente a una búsqueda real.
- [ ] La `description` tiene entre 80 y 160 caracteres.
- [ ] El primer párrafo da la respuesta central.
- [ ] Hay fuentes citadas con enlace.
- [ ] No hay promesas de sanación ni lenguaje médico (ver guía de estilo, sección 12).
- [ ] Si hay enlaces de afiliado: `afiliados: true` y `rel="sponsored noopener"`.
- [ ] Imágenes con `alt` y peso razonable.
- [ ] Enlaza al menos a 2 contenidos internos.
- [ ] Revisión ortográfica en español de Chile.
- [ ] Probado en móvil.

## 13. Monetización dentro del sitio

| Elemento | Dónde | Comportamiento |
|---|---|---|
| **Botón de aporte** (Ko-fi) | Final de cada artículo, pie de página, página `/apoya/` | Enlace externo con `rel="noopener"`; sin script de terceros |
| **Página `/apoya/`** | Menú | Explica en qué se usa el aporte (dominio, tiempo de cobertura de eventos) |
| **Afiliados** | Dentro de guías y reseñas | Aviso visible **antes** del contenido, enlaces con `rel="sponsored noopener"`, política en `/afiliados/` |
| **Libros propios** | Fase posterior | Ruta `/libros/` reservada |

**Reglas:** el aporte nunca bloquea contenido; ninguna recomendación se hace solo por comisión; el aviso de afiliados es claro y no se esconde. Antes de activar Ko-fi, verifica en su página oficial las tarifas vigentes y que Chile esté soportado por el procesador de pagos. La tributación de estos ingresos se consulta con un contador.

## 14. Puntos de extensión (fases siguientes)

| Fase | Qué agrega | Cómo encaja sin rehacer nada |
|---|---|---|
| **Calendario** | `/eventos/` con datos en Supabase | Generar páginas en build leyendo Supabase y reconstruir con un cron de GitHub Actions; si se necesita filtro en vivo, una isla de Astro acotada. Colección o tabla `eventos` con `slug`, fecha, lugar, organizador. Guías y blog enlazan a eventos |
| **Reproductor** | Audio de prácticas | Componente aislado (isla) cargado solo en páginas que lo usan. Archivos en hosting de audio externo para no pesar el repo |
| **Lista de correo** | Formulario | Servicio externo con formulario embebido o enlace; sin romper el presupuesto de JS global |
| **Libros** | `/libros/` | Nueva colección `libros`; enlaces a plataformas de venta |
| **Listados destacados y auspicios** | Campo `destacado` en eventos; bloque "Con apoyo de" | Solo al cumplirse las señales del modelo de negocio |
| **Búsqueda** | Pagefind | Índice estático generado en build, carga bajo demanda |

## 15. Páginas institucionales y cumplimiento

- **Quiénes somos:** quiénes son el Equipo Pachamamicos (proyecto de comunidad, sin nombres personales), enfoque, cómo trabajamos, cómo elegimos eventos y fuentes, **política de contenido** (sin promesas de sanación, no reemplaza ayuda profesional), cómo corregimos errores y cómo contactarnos.
- **Contacto:** correo del proyecto (no personal) o formulario externo.
- **Afiliados:** qué son, qué ganamos, cómo no influye en las recomendaciones.
- **Privacidad:** qué datos se recogen (analítica sin cookies, enlaces externos) y qué terceros intervienen. Revisa con asesoría los requisitos de la normativa chilena de protección de datos personales vigente.
- **Pie de página** con enlaces a todas ellas.

Estas páginas también sostienen la señal de confianza (E-E-A-T) de un sitio firmado por una marca y no por una persona.

## 16. Plan de implementación sugerido

| Hito | Contenido | Resultado |
|---|---|---|
| **H0 · Base** | Configuración Astro, Tailwind v4 con `@theme`, CNAME, workflow, fuentes, `BaseLayout`, 404 | Sitio vacío publicado con identidad |
| **H1 · Plantillas** | Colecciones, `ArticleLayout`, `ListLayout`, tarjetas, Seo y JSON-LD, RSS y sitemap | Se puede publicar un artículo completo |
| **H2 · Institucional** | Quiénes somos, Apoya, Afiliados, Privacidad, Contacto, portada | Sitio coherente y confiable |
| **H3 · Contenido inicial** | 8–10 artículos (meta de los 2 primeros meses), Search Console, Cloudflare Analytics | Indexación en marcha |
| **H4 · Textos** | Obra Dhammapada: introducción y primeros capítulos | Primer producto editorial |

### Definition of Done de la Fase 1

- Lighthouse móvil ≥ 95 en las cuatro categorías.
- Sitemap enviado y propiedad verificada en Search Console.
- Tres colecciones con al menos un contenido real cada una.
- Botón de aporte funcionando.
- Todas las páginas institucionales publicadas.
- Sin errores de `astro check`.

## 17. Registro de decisiones

| # | Decisión | Motivo |
|---|---|---|
| D1 | Sitio 100 % estático en Astro + GitHub Pages | Costo cero, rendimiento y simplicidad |
| D2 | Tres colecciones separadas (`blog`, `guias`, `textos`) | Intenciones de búsqueda y formatos distintos |
| D3 | Firma "Equipo Pachamamicos", `Organization` en JSON-LD | Proyecto de comunidad; anonimato del autor |
| D4 | Tema oscuro único | Identidad de marca, uso real en móviles, contraste más fácil de lograr |
| D5 | Dos registros visuales: expresivo y de lectura | Carácter sin sacrificar legibilidad ni SEO |
| D6 | Decoración solo en SVG y CSS | Peso mínimo, sin costo de ilustración |
| D7 | Sin páginas de tags en Fase 1 | Evitar contenido fino indexable |
| D8 | Sin JS por defecto | Rendimiento y simplicidad |
| D9 | Supabase solo en la fase del calendario | El blog no lo necesita |
| D10 | URLs sin fecha, inmutables | GitHub Pages no tiene redirecciones del servidor |
| D11 | Tailwind CSS v4 con tokens en `@theme` y paleta cerrada | Velocidad de desarrollo para una sola persona, CSS final mínimo, consistencia con la guía de estilo |
| D12 | Componentes Astro en lugar de `@apply`; sin variantes `dark:` | Un solo tema oscuro; patrones repetidos viven en un único componente |

## 18. Riesgos y pendientes

| Riesgo o pendiente | Mitigación |
|---|---|
| Los primeros meses el tráfico será bajo | Priorizar publicar y medir tráfico por sobre ingresos |
| Derechos de traducciones de textos clásicos | Usar traducción propia o de dominio público y declararlo en `traduccion` |
| Instagram es una plataforma ajena | Sumar lista de correo en una fase posterior |
| Dependencia de la comisión de Ko-fi, PayPal o Stripe | Verificar tarifas y soporte para Chile antes de activar |
| Versiones de Astro, Tailwind y acciones de GitHub cambian | Revisar documentación oficial al implementar; fijar versiones en `package.json` |
| Clases utilitarias largas que dificultan leer el marcado | Componentes pequeños y `prettier-plugin-tailwindcss` |
| Una sola persona mantiene todo | Plantillas, esquemas y checklists para reducir carga |