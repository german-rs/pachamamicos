# Pachamamicos · Guía de estilo

> **Versión:** 1.0 · **Aplica a:** sitio web (Fase 1, blog) · **Tema:** oscuro, único
> **Documento hermano:** [`ARQUITECTURA.md`](./ARQUITECTURA.md)

---

## 1. Esencia de marca

**Pachamamicos** es una comunidad que comparte eventos, guías y lecturas de meditación, mindfulness y espiritualidad. El nombre ya trae cercanía e informalidad; el sitio debe sentirse como **un lugar de encuentro hecho a mano**, no como una revista corporativa ni como un centro de bienestar de catálogo.

### Personalidad

| Es | No es |
|---|---|
| Cercana, alegre, curiosa | Solemne, esotérica de catálogo |
| Clara y práctica | Críptica o pretenciosa |
| Comunitaria ("nosotros") | Gurú o autoridad personal |
| Honesta sobre lo que sabe y lo que no | Prometedora de sanación o resultados |
| Colorida, juguetona, hecha a mano | Pulida en exceso, minimalista corporativa |

### Posicionamiento en una frase

> Un lugar oscuro, colorido y hecho a mano donde encontrar dónde meditar, cómo empezar y qué leer, escrito por una comunidad que también está aprendiendo.

### Sobre el guiño a la Pachamama

El nombre sugiere un guiño andino. Se resuelve con **nombre, tono y calidez**, no con motivos étnicos literales. No se usan ponchos, símbolos sagrados, plumas ni imágenes de pueblos originarios como decoración. Si en el futuro se quiere un vínculo cultural más explícito, debe hacerse con personas de esas comunidades, no como adorno.

### Referentes

| Referente | Qué tomamos | Qué no tomamos |
|---|---|---|
| **Vibra Fest** | Colores saturados, titulares gruesos y con personalidad, bloques de color por sección, tarjetas con presencia | La densidad visual, los grafitis y el ruido |
| **Lollapalooza Chile** | Fondo oscuro, tarjetas de color plano, jerarquía clara, bloques bien separados | El tono comercial y los carruseles de patrocinadores |
| **Herederos de la Paz (SGI)** | El espíritu de collage: cinta, notas pegadas, rotaciones leves, calidez de lo artesanal | Texturas de papel pesadas y tipografía manuscrita en textos largos |

## 2. Principios visuales

1. **Dos registros.**
   - **Expresivo:** portada, cabeceras de sección, tarjetas, botones, avisos. Color, rotaciones leves, cinta, stickers.
   - **Lectura:** cuerpo de artículos. Fondo limpio, tipografía legible, ancho de línea cómodo. Lo "hecho a mano" queda en los bordes (cabecera, citas, avisos), nunca en medio del párrafo.
2. **Oscuro con color vivo.** El fondo es casi negro con un leve matiz violeta; el color entra en bloques planos y acentos.
3. **Siempre ligero.** Todo en CSS y SVG. Sin fotos pesadas ni texturas bitmap. Cada decoración se pregunta: "¿pesa menos de 2 KB?".
4. **El color orienta.** Cada sección del sitio tiene su color (ver sección 3.3).
5. **Una cosa llamativa por pantalla.** Si todo grita, nada se lee.
6. **Decoración nunca carga información.** Si se quita, el contenido sigue completo.

## 3. Color

### 3.1 Paleta base (superficies y texto)

| Token | Hex | Uso |
|---|---|---|
| `--fondo` | `#0F0D14` | Fondo de página (casi negro con matiz violeta) |
| `--superficie` | `#1A1722` | Tarjetas oscuras, callouts, bloques de lectura |
| `--superficie-2` | `#26212F` | Elementos elevados, `code`, filas alternas |
| `--borde` | `#6B6280` | Líneas y bordes de componentes (cumple 3:1) |
| `--texto` | `#F2EEE6` | Texto principal (crema, no blanco puro) |
| `--texto-suave` | `#BFB8CC` | Texto secundario, metadatos |
| `--tinta` | `#0F0D14` | Texto sobre fondos de color |

> No se usa blanco puro (`#FFF`) ni negro puro (`#000`): el blanco puro sobre negro vibra y cansa en textos largos.

### 3.2 Colores vivos (acentos)

| Token | Hex | Nombre |
|---|---|---|
| `--celeste` | `#4CC9F0` | Celeste |
| `--lima` | `#B6F23A` | Lima |
| `--violeta` | `#B794F6` | Violeta |
| `--rosa` | `#FF7BC0` | Rosa |
| `--amarillo` | `#FFD93D` | Amarillo sol |

### 3.3 Color por sección y por función

| Color | Asignado a | Notas |
|---|---|---|
| **Celeste** | Blog | Tarjetas, cabecera de sección, chips |
| **Lima** | Guías | |
| **Violeta** | Textos comentados | |
| **Rosa** | Eventos (reservado, Fase calendario) | No usar todavía como color de sección |
| **Amarillo** | **Aporte voluntario** y acciones principales | Es el color "de acción". Se evita usarlo como decoración suelta para que conserve su peso |

### 3.4 Contraste verificado (WCAG)

Calculado con la fórmula de luminancia relativa de WCAG 2.x.

**Texto sobre superficies oscuras**

| Combinación | Ratio | Resultado |
|---|---|---|
| `--texto` sobre `--fondo` | 16,7 : 1 | AAA |
| `--texto` sobre `--superficie` | 15,3 : 1 | AAA |
| `--texto` sobre `--superficie-2` | 13,5 : 1 | AAA |
| `--texto-suave` sobre `--fondo` | 10,1 : 1 | AAA |
| `--texto-suave` sobre `--superficie` | 9,2 : 1 | AAA |
| `--texto-suave` sobre `--superficie-2` | 8,2 : 1 | AAA |
| `--borde` sobre `--fondo` | 3,4 : 1 | Cumple 3:1 para componentes |

**Colores vivos: como fondo con `--tinta` encima, y como texto sobre `--fondo`**

| Color | `--tinta` sobre el color | El color sobre `--fondo` | El color sobre `--superficie` |
|---|---|---|---|
| Celeste | 10,0 : 1 | 10,0 : 1 | 9,2 : 1 |
| Lima | 14,5 : 1 | 14,5 : 1 | 13,2 : 1 |
| Violeta | 7,9 : 1 | 7,9 : 1 | 7,2 : 1 |
| Rosa | 8,1 : 1 | 8,1 : 1 | 7,4 : 1 |
| Amarillo | 14,0 : 1 | 14,0 : 1 | 12,8 : 1 |

**Todas las combinaciones superan AAA (7:1).** Por eso los colores vivos pueden usarse tanto como bloque de color (texto oscuro encima) como texto o enlace sobre el fondo oscuro.

### 3.5 Reglas de uso

- **Texto sobre color vivo:** siempre `--tinta`. Nunca texto crema ni de otro acento.
- **Texto de color sobre fondo oscuro:** solo para enlaces, chips y titulares cortos. Los párrafos largos van en `--texto`.
- **Nunca dos acentos vivos pegados sin separación** (ej. rosa junto a lima sin borde ni espacio): vibran.
- **Máximo dos acentos distintos por pantalla**, más el amarillo de acción.
- El **color nunca es el único portador de significado**: acompañar con texto o icono.

### 3.6 Estados

| Estado | Color | Notas |
|---|---|---|
| Enlace | `--celeste`, **subrayado siempre** | En el cuerpo de lectura |
| Enlace en hover | `--amarillo` | Mantener subrayado |
| Foco | Contorno `--amarillo` 3 px, desplazado 3 px | Visible sobre fondo y sobre colores vivos |
| Error | `#FF8A80` (8,5 : 1 sobre `--fondo`) | Acompañar con icono y texto |
| Selección de texto | Fondo `--amarillo`, texto `--tinta` | |

## 4. Tipografía

### 4.1 Evaluación de las fuentes propuestas

Todas son de Google Fonts y encajan con el espíritu de Vibra Fest. El problema no es el estilo, sino **dónde** usarlas: una fuente decorativa sirve en titulares cortos y se vuelve cansadora en bloques largos.

| Fuente | Carácter | Veredicto |
|---|---|---|
| **Ranchers** | Gruesa, redondeada, juguetona, con presencia | ✅ **Titulares principales (H1, portada, tarjetas)**. Es la más cercana al estilo "Vibra" |
| **DynaPuff** | Redonda, inflada, amable; variable (varios pesos) | ✅ **Secundaria**: subtítulos dentro de artículos, botones, chips, navegación |
| **Lobster** | Script clásico | ⚠️ Muy usada, aporta un aire "retro de cafetería", y se lee peor en tamaños chicos. **No incluida** |
| **Peralta** | Ornamental, de contraste alto | ⚠️ Pierde legibilidad en pequeño y choca con el tono juguetón. **No incluida** |
| **Original Surfer** | Surf, con fuerte carácter | ⚠️ Compite con Ranchers (ambas son display potentes). **No incluida** |
| **Rampart One** | Decorativa, de líneas dobles | ⚠️ Solo funciona en tamaños muy grandes y su trazo lineal se pierde en móvil. **No incluida**; reservar para un uso puntual futuro (por ejemplo, un número gigante en la 404) |

**Regla:** una fuente display fuerte (Ranchers) + una redonda de apoyo (DynaPuff) + una de lectura. Más familias rompen la cohesión y el presupuesto de peso.

> Antes de fijarlas, mira cada una en vivo en fonts.google.com con textos reales del sitio (por ejemplo, "Dónde meditar en Santiago") y comprueba que se vean bien tildes, `ñ`, `¿` y `¡`. El subset `latin` cubre el español.

### 4.2 Sistema tipográfico

| Rol | Familia | Peso | Uso |
|---|---|---|---|
| **Display** | Ranchers | 400 (único) | H1, títulos de sección en portada y listados, títulos en tarjetas, logo |
| **Acento** | DynaPuff (variable) | 500–700 | H2–H4 dentro de artículos, botones, chips, navegación, etiquetas, metadatos destacados |
| **Texto** | Nunito Sans (variable) | 400–700 | Cuerpo, listas, citas, formularios, pie de página |

Nunito Sans se elige por ser redondeada y limpia, en armonía con las otras dos, y por su buena legibilidad en pantalla. Alternativa válida si pesa más de lo esperado: Atkinson Hyperlegible.

### 4.3 Escala (fluida, sin saltos bruscos)

| Token | Tamaño | Línea | Uso |
|---|---|---|---|
| `--t-hero` | `clamp(2.75rem, 1.5rem + 6vw, 5rem)` | 1,0 | Hero de portada |
| `--t-h1` | `clamp(2.25rem, 1.6rem + 3vw, 3.75rem)` | 1,05 | H1 de páginas |
| `--t-h2` | `clamp(1.5rem, 1.25rem + 1.2vw, 2.125rem)` | 1,2 | H2 en artículos |
| `--t-h3` | `clamp(1.25rem, 1.15rem + .5vw, 1.5rem)` | 1,3 | H3 |
| `--t-cuerpo` | `clamp(1.0625rem, 1rem + .3vw, 1.1875rem)` | 1,7 | Texto (17–19 px) |
| `--t-chico` | `0.9375rem` | 1,5 | Metadatos |
| `--t-micro` | `0.8125rem` | 1,4 | Etiquetas, pies de foto |

### 4.4 Reglas

- **Cuerpo mínimo 17 px.** Nada de párrafos en tamaños menores.
- **Ancho de línea 60–70 caracteres** (`max-width: 68ch`) en lectura.
- **Ranchers** solo en títulos de **hasta ~8 palabras**. Si un título SEO es largo, se compensa con tamaño menor, pero no se pasa a otra fuente.
- **No usar versalitas ni mayúsculas en párrafos.** Mayúsculas solo en etiquetas cortas (chips).
- **Sin cursiva en bloques largos**; para énfasis usar negrita moderada.
- `font-synthesis: none` para evitar negritas falsas sobre Ranchers.
- `font-display: swap` y `size-adjust` en los fallbacks para evitar saltos de diseño.

### 4.5 Carga

- Paquetes sugeridos: `@fontsource/ranchers`, `@fontsource-variable/dynapuff`, `@fontsource-variable/nunito-sans` (verifica nombres y archivos en npm al instalar).
- Solo subset `latin`, WOFF2.
- **Precargar** únicamente Ranchers y Nunito Sans (críticas para el primer pintado).
- Pilas de respaldo:

```css
--f-display: "Ranchers", "Arial Rounded MT Bold", system-ui, sans-serif;
--f-acento:  "DynaPuff", "Arial Rounded MT Bold", system-ui, sans-serif;
--f-texto:   "Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

## 5. Espaciado, bordes y sombras

### 5.1 Escala de espacio (base 4 px)

| Token | Valor | Uso típico |
|---|---|---|
| `--e-1` | 4 px | Separación mínima |
| `--e-2` | 8 px | Entre icono y texto |
| `--e-3` | 12 px | Relleno de chips |
| `--e-4` | 16 px | Relleno de botones |
| `--e-5` | 24 px | Relleno de tarjetas, separación entre párrafos |
| `--e-6` | 32 px | Entre bloques |
| `--e-7` | 48 px | Entre secciones en móvil |
| `--e-8` | 64 px | Entre secciones |
| `--e-9` | 96 px | Entre secciones grandes en escritorio |

### 5.2 Bordes y radios

| Token | Valor |
|---|---|
| `--radio-s` | 8 px |
| `--radio-m` | 16 px |
| `--radio-l` | 24 px |
| `--radio-pill` | 999 px |
| `--borde-grueso` | 3 px sólido `--tinta` |

### 5.3 Sombra dura (firma visual)

Estilo "recortable", sin desenfoque:

```css
--sombra-dura: 6px 6px 0 var(--texto);
--sombra-dura-hover: 8px 8px 0 var(--texto);
```

Como el fondo es oscuro, la sombra va en **crema**, no en negro (una sombra negra no se ve). Si al probarlo se siente muy fuerte, se puede cambiar a una versión con el acento de la sección.

### 5.4 Layout

| Elemento | Valor |
|---|---|
| Ancho máximo de contenido | 1120 px |
| Columna de lectura | 68 ch (aprox. 680–720 px) |
| Grilla de tarjetas | 1 columna en móvil, 2 en tablet, 3 en escritorio, `gap: var(--e-5)` |
| Margen lateral | 20 px móvil, 32 px escritorio |
| Puntos de quiebre | 640 px, 960 px, 1200 px |

## 6. Elementos "hechos a mano" (CSS y SVG)

### 6.1 Reglas

- **Rotación máxima ±2°** en tarjetas y avisos; ±3° en cinta y stickers. Nunca rotar el texto de lectura.
- Las rotaciones se **desactivan en el cuerpo del artículo** y con `prefers-reduced-motion` en hover.
- Todo elemento decorativo lleva `aria-hidden="true"` y `pointer-events: none`.
- Los stickers viven en **un sprite SVG** (`<symbol>`) reutilizado con `<use>`; el sprite total pesa menos de 20 KB.
- Cada SVG individual, menos de 2 KB, sin degradados complejos ni filtros pesados.

### 6.2 Cinta adhesiva

```css
.cinta {
  position: absolute;
  top: -12px;
  left: 50%;
  width: 88px;
  height: 26px;
  background: rgb(255 217 61 / 0.85); /* amarillo semitransparente */
  transform: translateX(-50%) rotate(-3deg);
  clip-path: polygon(2% 0, 98% 0, 100% 15%, 97% 30%, 100% 50%, 97% 70%, 100% 85%, 98% 100%, 2% 100%, 0 85%, 3% 70%, 0 50%, 3% 30%, 0 15%);
  pointer-events: none;
}
```

### 6.3 Borde de papel rasgado (divisor entre secciones)

```css
.borde-rasgado {
  clip-path: polygon(
    0 0, 100% 0, 100% calc(100% - 12px),
    96% 100%, 92% calc(100% - 9px), 87% 100%, 82% calc(100% - 11px),
    76% 100%, 71% calc(100% - 8px), 65% 100%, 59% calc(100% - 12px),
    53% 100%, 47% calc(100% - 9px), 41% 100%, 35% calc(100% - 11px),
    29% 100%, 23% calc(100% - 8px), 17% 100%, 11% calc(100% - 10px),
    5% 100%, 0 calc(100% - 7px)
  );
}
```

### 6.4 Tarjeta tipo nota pegada

```css
.tarjeta {
  --c: var(--celeste);            /* color de la sección */
  position: relative;
  background: var(--c);
  color: var(--tinta);
  border: var(--borde-grueso);
  border-radius: var(--radio-m);
  box-shadow: var(--sombra-dura);
  padding: var(--e-5);
  transform: rotate(var(--giro, 0deg));
  transition: transform .15s ease, box-shadow .15s ease;
}
.tarjeta:hover,
.tarjeta:focus-within {
  transform: translate(-2px, -2px) rotate(0deg);
  box-shadow: var(--sombra-dura-hover);
}
@media (prefers-reduced-motion: reduce) {
  .tarjeta { transition: none; }
}
```

Los giros se reparten por posición en la grilla (`-1.5deg`, `0deg`, `1deg`, `-0.5deg`…) para dar sensación de collage sin aleatoriedad (el build debe ser determinista).

### 6.5 Stickers sugeridos (en SVG propio)

Carita-sol, estrella, rayo, corazón, ojo, flecha doodle, subrayado ondulado, círculo de resaltado. Líneas gruesas, contorno `--tinta`, relleno en acentos, formas simples. Cuatro o cinco bastan para toda la fase 1.

## 7. Logo e iconografía

### 7.1 Logo (concepto)

- **Wordmark:** "pachamamicos" en **Ranchers**, minúsculas, letras en `--lima` o `--amarillo` con contorno `--tinta` y sombra dura crema, con una rotación de -2°.
- **Símbolo:** una **carita-sol** (círculo amarillo con dos ojos y sonrisa), que representa calidez, luz y comunidad. Funciona como favicon, avatar de Instagram y sticker recurrente.
- **Versiones:** horizontal (símbolo + wordmark), solo símbolo, y wordmark simple en crema para fondos de color.
- **Zona de respeto:** el alto de la "p" alrededor.
- **Tamaño mínimo:** símbolo 24 px, wordmark 96 px de ancho.
- **Entregables:** SVG; el favicon es un único SVG de menos de 1 KB.

Favicon de partida (editable):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="28" fill="#FFD93D" stroke="#0F0D14" stroke-width="4"/>
  <circle cx="23" cy="26" r="3.5" fill="#0F0D14"/>
  <circle cx="41" cy="26" r="3.5" fill="#0F0D14"/>
  <path d="M19 38c3 8 23 8 26 0" fill="none" stroke="#0F0D14" stroke-width="4" stroke-linecap="round"/>
</svg>
```

### 7.2 Iconos

- SVG en línea desde un sprite; cuadrícula de 24 px, trazo de 2 px, esquinas redondeadas, `currentColor`.
- Iconos mínimos: menú, cerrar, flecha, calendario (futuro), reloj, enlace externo, Instagram, café/taza (aporte), libro, información, advertencia.
- Todo icono con significado lleva texto visible al lado o `aria-label`.

## 8. Componentes

### 8.1 Botones

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| **Principal / Aporte** | `--amarillo` | `--tinta` | "Apoya pachamamicos", acciones clave |
| **Secundario** | Transparente, borde 3 px `--texto` | `--texto` | Acciones de apoyo |
| **De sección** | Color de la sección | `--tinta` | "Ver todas las guías" (lima), etc. |

- Fuente DynaPuff 600, relleno `12px 20px`, alto mínimo **44 px**, radio `--radio-pill`.
- Hover: se desplaza (`translate(-2px,-2px)`) y crece la sombra dura. Active: vuelve a su sitio y la sombra desaparece.
- Un solo botón principal por pantalla.

### 8.2 Chips (categorías y etiquetas)

Píldora con borde 2 px del color de la sección, texto en el mismo color, fondo `--superficie`, DynaPuff 500, tamaño `--t-micro`, mayúsculas permitidas.

### 8.3 Tarjeta de artículo

Estructura de arriba abajo:

1. Portada (imagen optimizada o portada CSS/SVG de la sección).
2. Chip de categoría.
3. Título (Ranchers, máximo 3 líneas).
4. Bajada (Nunito Sans, 2–3 líneas, recorte con `line-clamp`).
5. Meta: fecha · tiempo de lectura.

Fondo en el color de la sección, texto `--tinta`, sombra dura, giro leve, cinta opcional en la tarjeta destacada.

### 8.4 Encabezado y navegación

- Fondo `--fondo`, borde inferior de 1 px `--borde`.
- Izquierda: logo. Derecha: Blog · Guías · Textos · Quiénes somos · botón **Apoya** (amarillo).
- Móvil: botón "Menú" que abre un `<details>` a pantalla completa con enlaces grandes (mínimo 48 px de alto).
- Enlace de la sección activa con subrayado ondulado del color de la sección.

### 8.5 Pie de página

Tres columnas en escritorio, una en móvil: (1) logo y frase breve del proyecto; (2) secciones y páginas institucionales; (3) Instagram, RSS y botón de aporte. Línea final: © año Equipo Pachamamicos · "Este sitio no ofrece consejo médico ni terapéutico."

### 8.6 Callouts (avisos dentro de artículos)

| Tipo | Color | Icono | Uso |
|---|---|---|---|
| **Nota** | Celeste | información | Aclaraciones |
| **Práctica** | Lima | reloj o mano | Pasos o ejercicio breve |
| **Ojo** | Amarillo | advertencia | Precauciones |
| **Cita** | Violeta | comillas | Cita de un texto o persona |

Diseño: fondo `--superficie`, borde izquierdo de 6 px en el color del tipo, título en DynaPuff con icono, texto en `--texto`. Sin rotación (están dentro del registro de lectura).

### 8.7 Aviso de afiliados

Siempre **antes del primer enlace de afiliado** y al inicio del artículo:

> *Este artículo incluye enlaces de afiliados. Si compras por ellos, el proyecto recibe una pequeña comisión sin costo extra para ti. Lee cómo lo hacemos en [Política de afiliados].*

Estilo: callout con borde discontinuo `--borde`, fondo `--superficie`, texto `--texto-suave`. No se camufla ni se reduce de tamaño.

### 8.8 Bloque de aporte

Al final del artículo, antes de relacionados:

- Fondo `--superficie`, borde 3 px amarillo, cinta amarilla en una esquina, giro 0°.
- Título (DynaPuff): "¿Te sirvió este contenido?"
- Texto: "Pachamamicos se mantiene con aportes voluntarios. Con lo que juntamos pagamos el dominio y el tiempo de cubrir eventos."
- Botón principal amarillo: "Apoya pachamamicos".
- Enlace secundario: "En qué usamos los aportes".

Nunca bloquea ni condiciona el contenido.

### 8.9 Formularios (cuando existan)

Campo con fondo `--superficie`, borde 2 px `--borde`, radio `--radio-s`, etiqueta **siempre visible** (no solo placeholder), mensaje de error en texto con icono, foco amarillo.

## 9. Plantilla de artículo (registro de lectura)

### 9.1 Anatomía

```
┌─ Migas de pan (Inicio › Guías › …)
├─ Chip de categoría
├─ H1 (Ranchers)
├─ Bajada (texto grande, texto-suave)
├─ Meta: Equipo Pachamamicos · Publicado · Actualizado · N min de lectura
├─ Aviso de afiliados (si corresponde)
├─ Portada
├─ Índice (<details>) si supera ~1.200 palabras
├─ CUERPO (.prose, columna de 68 ch)
├─ Fuentes
├─ Bloque de aporte
├─ Relacionados (2–3 tarjetas)
└─ Navegación anterior / siguiente (en textos y series)
```

### 9.2 Reglas del cuerpo (`.prose`)

| Elemento | Regla |
|---|---|
| Fondo | `--fondo`, sin texturas ni cintas |
| Párrafo | `--t-cuerpo`, interlineado 1,7, separación `--e-5` |
| `h2` | DynaPuff 700, `--t-h2`, margen superior `--e-8`, subrayado ondulado corto del color de la sección |
| `h3` | DynaPuff 600, `--t-h3` |
| Enlaces | `--celeste`, subrayado, hover `--amarillo` |
| Listas | Viñeta circular del color de la sección, sangría cómoda, `--e-2` entre ítems |
| Citas (`blockquote`) | Borde izquierdo 6 px violeta, fondo `--superficie`, texto en cursiva suave **solo para citas cortas** |
| Imágenes | Ancho de columna, `border-radius: --radio-m`, pie de foto en `--t-micro` y `--texto-suave` |
| Tablas | Dentro de contenedor con `overflow-x: auto`, cabecera `--superficie-2` |
| Código | No se espera; si aparece, `--superficie-2`, monoespaciada |
| Separador `hr` | Línea punteada `--borde` |

### 9.3 Variaciones por sección

- **Blog:** tarjetas y chip en celeste. Fecha de publicación visible.
- **Guías:** lima. **Fecha de actualización destacada** ("Actualizado el 10 de noviembre de 2026") y nivel (principiante). Bloque "Qué vas a aprender" al inicio.
- **Textos:** violeta. Cabecera con obra y capítulo, rango de versículos, **tipo de traducción** ("Traducción propia" o "Dominio público: fuente"). Texto original y comentario se distinguen con tipografía y callout "Cita".

### 9.4 Portada del sitio (estructura sugerida)

1. **Hero** con fondo `--fondo`, titular Ranchers grande, frase de una línea, dos botones (explorar guías, apoyar), carita-sol y cintas.
2. **Empieza aquí:** 3 tarjetas grandes de colores (Blog, Guías, Textos), inspiradas en Lollapalooza.
3. **Lo último:** grilla de las 6 piezas más recientes.
4. **Guía destacada** en un bloque de color con borde rasgado.
5. **Próximamente: eventos** (sticker rosa, sin promesa de fecha).
6. **Apoya pachamamicos** (bloque de aporte).
7. **Pie de página.**

## 10. Movimiento

- **Poco y con propósito.** Solo transiciones de hover y foco (≤ 150 ms).
- Sin animaciones en bucle, sin parallax, sin autoplay.
- `prefers-reduced-motion: reduce` elimina transformaciones y transiciones.
- Sin JavaScript de animación.

## 11. Accesibilidad

Objetivo mínimo: **WCAG 2.2 AA**; la paleta ya cumple AAA en texto.

- [ ] Un solo `h1`, jerarquía de encabezados sin saltos.
- [ ] Enlace "Saltar al contenido" como primer elemento.
- [ ] Foco visible en todo (contorno amarillo 3 px, desplazado 3 px).
- [ ] Áreas táctiles de al menos 44×44 px.
- [ ] Enlaces distinguibles sin depender del color (subrayado).
- [ ] `alt` descriptivo en imágenes con contenido; `alt=""` en decorativas.
- [ ] Menú operable con teclado, sin trampa de foco.
- [ ] `lang="es-CL"` en `<html>`.
- [ ] `color-scheme: dark` declarado, para controles nativos coherentes.
- [ ] Zoom hasta 200 % sin pérdida de contenido; sin scroll horizontal.
- [ ] Respeto a `prefers-reduced-motion`.
- [ ] Nada de contenido solo en decoración.

## 12. Voz y reglas de redacción

### 12.1 Voz

**Cercana, clara y honesta.** Hablamos de tú, en español de Chile, como alguien que comparte lo que aprendió con quien está partiendo. Modismos con moderación: que se entienda en toda Latinoamérica y no cansen.

| Sí | No |
|---|---|
| "Parte con 5 minutos" | "Debes dedicar al menos una hora diaria" |
| "A muchas personas les ayuda a…" | "Esto te va a sanar" |
| "No sabemos con certeza; esto dicen las fuentes" | "Está comprobado que…" (sin fuente) |
| "Si estás pasando por un momento difícil, conversa con un profesional" | Prometer resultados o reemplazar ayuda profesional |

### 12.2 Lenguaje a evitar (política de contenido)

No usamos promesas ni lenguaje clínico:

**sanar, curar, tratar, terapia (como promesa), milagro, garantizado, transformación total, elimina el estrés/la ansiedad, energías que curan, secreto, el único método.**

Alternativas: "puede ayudarte a", "muchas personas reportan", "una práctica para…", "para explorar".

**Aviso estándar** (pie de página y guías sobre bienestar):
> *Pachamamicos comparte información y experiencias con fines informativos. No reemplaza la atención médica, psicológica ni psiquiátrica.*

### 12.3 Inclusión y registro

- Evitar el masculino genérico cuando sea simple: "quienes meditan", "las personas", "cada participante".
- Sin "todos y todas" repetido; preferir formas neutras.
- Respeto por las tradiciones espirituales y religiosas: describir sin ridiculizar ni proselitizar; nombrar la tradición de origen de cada práctica.
- Los guiños culturales (incluida la Pachamama) se tratan con respeto y contexto.

### 12.4 Estructura y SEO del texto

- Título claro y específico (es lo que se busca), 10–70 caracteres.
- El primer párrafo responde lo central.
- Párrafos de 2–4 líneas. Subtítulos descriptivos, no ocurrentes.
- Listas cuando hay pasos u opciones.
- Fechas en formato chileno: **"10 de noviembre de 2026"**; horarios en 24 h ("19:30 h"); precios "$12.000" (punto de miles).
- Citar fuentes siempre que se afirme algo sobre salud, historia o ciencia.
- Evitar relleno: cada párrafo aporta algo.

### 12.5 Microcopy

| Contexto | Texto sugerido |
|---|---|
| Botón de aporte | "Apoya pachamamicos" |
| Frase de aporte | "Este espacio se mantiene con aportes voluntarios" |
| Leer más | "Seguir leyendo" |
| Listado vacío | "Aún no hay nada por acá. Vuelve pronto." |
| 404 | "Esta página no existe (o se fue a meditar). Vuelve al inicio o mira las guías." |
| Eventos (futuro) | "Pronto: todos los eventos en un solo lugar" |
| Pie de página | "Hecho con cariño por el Equipo Pachamamicos" |

## 13. Tokens CSS (punto de partida)

Archivo `src/styles/tokens.css`:

```css
:root {
  color-scheme: dark;

  /* Superficies y texto */
  --fondo: #0F0D14;
  --superficie: #1A1722;
  --superficie-2: #26212F;
  --borde: #6B6280;
  --texto: #F2EEE6;
  --texto-suave: #BFB8CC;
  --tinta: #0F0D14;

  /* Acentos */
  --celeste: #4CC9F0;
  --lima: #B6F23A;
  --violeta: #B794F6;
  --rosa: #FF7BC0;
  --amarillo: #FFD93D;
  --error: #FF8A80;

  /* Color por sección (se sobrescribe en cada layout) */
  --c-seccion: var(--celeste);

  /* Tipografía */
  --f-display: "Ranchers", "Arial Rounded MT Bold", system-ui, sans-serif;
  --f-acento: "DynaPuff", "Arial Rounded MT Bold", system-ui, sans-serif;
  --f-texto: "Nunito Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --t-hero: clamp(2.75rem, 1.5rem + 6vw, 5rem);
  --t-h1: clamp(2.25rem, 1.6rem + 3vw, 3.75rem);
  --t-h2: clamp(1.5rem, 1.25rem + 1.2vw, 2.125rem);
  --t-h3: clamp(1.25rem, 1.15rem + .5vw, 1.5rem);
  --t-cuerpo: clamp(1.0625rem, 1rem + .3vw, 1.1875rem);
  --t-chico: .9375rem;
  --t-micro: .8125rem;

  /* Espacio */
  --e-1: 4px;  --e-2: 8px;  --e-3: 12px; --e-4: 16px; --e-5: 24px;
  --e-6: 32px; --e-7: 48px; --e-8: 64px; --e-9: 96px;

  /* Forma */
  --radio-s: 8px;
  --radio-m: 16px;
  --radio-l: 24px;
  --radio-pill: 999px;
  --borde-grueso: 3px solid var(--tinta);
  --sombra-dura: 6px 6px 0 var(--texto);
  --sombra-dura-hover: 8px 8px 0 var(--texto);

  /* Layout */
  --ancho-max: 1120px;
  --ancho-lectura: 68ch;
}

/* Colores de sección: se aplican en el layout correspondiente */
.seccion-blog   { --c-seccion: var(--celeste); }
.seccion-guias  { --c-seccion: var(--lima); }
.seccion-textos { --c-seccion: var(--violeta); }

html {
  background: var(--fondo);
  color: var(--texto);
  font-family: var(--f-texto);
  font-size: 100%;
  font-synthesis: none;
}
body { font-size: var(--t-cuerpo); line-height: 1.7; }

:focus-visible {
  outline: 3px solid var(--amarillo);
  outline-offset: 3px;
}
::selection { background: var(--amarillo); color: var(--tinta); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
```

## 14. Checklist de revisión visual

Antes de dar por terminada una página:

- [ ] ¿Se lee bien en un móvil pequeño (360 px)?
- [ ] ¿Hay como máximo una zona llamativa por pantalla?
- [ ] ¿El texto sobre color vivo es `--tinta`?
- [ ] ¿La decoración tiene `aria-hidden` y no carga información?
- [ ] ¿Las rotaciones son ≤ 2° y no afectan el texto de lectura?
- [ ] ¿Se ve el foco al navegar con teclado?
- [ ] ¿Los títulos largos siguen cómodos en Ranchers?
- [ ] ¿La página cumple el presupuesto de peso (ver arquitectura, sección 10)?
- [ ] ¿El tono evita promesas de sanación?
- [ ] ¿Hay aviso de afiliados si corresponde?

## 15. Decisiones pendientes de validar con prototipo

| Tema | Qué mirar |
|---|---|
| Sombra dura crema | Ver si se siente muy fuerte sobre fondo oscuro; alternativa: acento de la sección |
| Ranchers en títulos largos | Probar con 3 títulos reales y ajustar tamaño |
| Nunito Sans vs Atkinson Hyperlegible | Elegir según peso y lectura en móvil |
| Carita-sol como mascota | Validar que transmite calidez sin infantilizar |
| Mayúsculas en chips | Comprobar legibilidad en 13 px |

---

*Esta guía es un documento vivo. Cada cambio de color, tipografía o componente se registra aquí y, si afecta la estructura, en el registro de decisiones de `ARQUITECTURA.md`.*