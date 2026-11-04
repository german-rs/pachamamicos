# Pachamamicos

[![Deploy](https://github.com/german-rs/pachamamicos/actions/workflows/deploy.yml/badge.svg)](https://github.com/german-rs/pachamamicos/actions/workflows/deploy.yml)

Código fuente de [pachamamicos.cl](https://pachamamicos.cl): un sitio en español de Chile con guías, blog y textos comentados sobre meditación, mindfulness y espiritualidad. En una fase posterior sumará un calendario de eventos.

> **Estado:** en construcción (Fase 1: blog).

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) (sitio estático) |
| Estilos | [Tailwind CSS](https://tailwindcss.com) |
| Contenido | Markdown / MDX con content collections tipadas |
| Hosting | GitHub Pages (despliegue con GitHub Actions) |
| DNS | Cloudflare |

## Principios

- **Estático y sin JavaScript por defecto.**
- **Ligero:** decoración con SVG y CSS, sin imágenes pesadas.
- **Accesible:** tema oscuro único, contraste verificado, foco visible.
- **SEO por diseño:** metadatos, datos estructurados, sitemap y RSS generados desde el esquema del contenido.
- **Simple de mantener:** publicar es crear un archivo Markdown y hacer commit.

## Requisitos

- Node.js (versión LTS vigente, compatible con la versión de Astro instalada)
- npm

## Inicio rápido

```bash
git clone https://github.com/german-rs/pachamamicos.git
cd pachamamicos
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:4321`.

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `./dist/` |
| `npm run preview` | Sirve localmente el resultado del build |
| `npx astro check` | Verifica tipos y esquemas de contenido |

## Estructura

```
├─ .github/workflows/   # Despliegue a GitHub Pages
├─ docs/                # Arquitectura y guía de estilo
├─ public/              # CNAME, robots.txt, favicon, imágenes OG
└─ src/
   ├─ components/       # Componentes de interfaz
   ├─ content/          # blog/, guias/, textos/ (Markdown)
   ├─ data/             # Configuración del sitio y metadatos de obras
   ├─ layouts/          # Plantillas de página
   ├─ pages/            # Rutas
   ├─ styles/           # Estilos globales y tema de Tailwind
   └─ utils/            # SEO, tiempo de lectura, filtros
```

## Contenido

Hay tres colecciones separadas, con esquemas validados al compilar:

| Colección | Ruta | Propósito |
|---|---|---|
| `blog` | `/blog/` | Crónicas, prácticas y reseñas |
| `guias` | `/guias/` | Guías para principiantes, con fecha de actualización obligatoria |
| `textos` | `/textos/` | Textos clásicos traducidos y comentados |

Para publicar, crea un archivo en `src/content/<colección>/` con el slug como nombre y completa el frontmatter. Si falta un campo obligatorio, el build falla antes de desplegar. Mientras trabajas en un borrador, mantén `draft: true`.

## Despliegue

Cada push a `main` ejecuta el workflow de GitHub Actions, que compila el sitio y lo publica en GitHub Pages en [pachamamicos.cl](https://pachamamicos.cl). El dominio se mantiene con el archivo `public/CNAME`.

## Documentación

- [Arquitectura](./docs/ARQUITECTURA.md): rutas, colecciones, SEO técnico, despliegue y puntos de extensión.
- [Guía de estilo](./docs/GUIA-DE-ESTILO.md): marca, color, tipografía, componentes y voz.

## Hoja de ruta

- [x] Base del sitio y despliegue
- [ ] Plantillas y colecciones (`blog`, `guias`, `textos`)
- [ ] Páginas institucionales
- [ ] Primeros contenidos y SEO
- [ ] Calendario de eventos (Supabase)
- [ ] Reproductor de audio
- [ ] Libros digitales

## Contribuir

Pachamamicos es un proyecto de comunidad. Si encuentras un error o tienes una sugerencia, abre un [issue](https://github.com/german-rs/pachamamicos/issues).

## Licencia

Pendiente de definir. Propuesta: código bajo licencia MIT; textos, imágenes y marca con todos los derechos reservados.

---

Hecho con cariño por el Equipo Pachamamicos.