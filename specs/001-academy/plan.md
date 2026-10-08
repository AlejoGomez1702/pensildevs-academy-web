# 001 — Plan

## Módulos tocados

Dependencias en un solo sentido: `library` ← `topics` ← `home`, `videos`, `courses`, `guides`; `layout` usa `topics`.

| Módulo | Capas | Responsabilidad |
| --- | --- | --- |
| `library` | `domain`, `application`, `infrastructure`, `ui` | Contenido del academy (videos, cursos, guías): reglas, puerto de la fuente de contenido, adaptador de prueba y componentes compartidos (tarjeta de contenido, reproductor) |
| `topics` | `domain`, `ui` | Productos y servicios sobre los que se aprende: catálogo fijo (espejo de pensildevs.com), tarjeta de tema y página de tema con filtro |
| `home` | `ui` | Inicio |
| `videos` | `ui` | Página de video |
| `courses` | `ui` | Páginas de curso y de lección |
| `guides` | `ui` | Página de guía |
| `layout` | — | Header con submenús, pie y página no encontrada |
| `shared` | `kernel`, `ui`, `infrastructure` | `Duration` (kernel), íconos nuevos, logo con "Academy" |

`library` no conoce `topics`: el contenido guarda el `slug` del tema y quien muestra el nombre del tema lo resuelve con `topics`. Así no hay ciclos.

## Dominio

`shared/kernel/duration.ts`
- `Duration`: value object en segundos; `sum`, `format()` → "8 min", "1 h 05 min", mínimo "1 min".

`library/domain/`
- `youtube-video-id.ts`: `YouTubeVideoId.parse(text)` acepta id de 11 caracteres o enlaces `watch?v=`, `youtu.be/`, `embed/`, `shorts/` (con parámetros extra) y devuelve `Result<YouTubeVideoId, 'invalid-youtube-video'>`. Expone `embedUrl` (youtube-nocookie, `autoplay=1`, `rel=0`) y `watchUrl`.
- `learning-content.ts`: `LearningContent = Video | Course | Guide` con `kind`, `slug`, `title`, `summary`, `topicSlug`, `publishedOn`, `featured`.
  - `Video.video: YouTubeVideoId | null`, `Video.duration`.
  - `Course.lessons: Lesson[]`; `Lesson` con `slug`, `title`, `video | null`, `duration`.
  - `Guide.readingTime: Duration`, `Guide.sections` (`id`, `title`, `intro?`, `steps`).
  - Reglas: `isAvailable` (video con video, curso con al menos una lección publicada, guía con secciones) y `contentDuration` (curso = suma de lecciones publicadas).
- `content-shelf.ts`: `byKind`, `availableCount`, `newestFirst` (disponibles primero), `relatedTo` (mismo tema, disponible, sin el actual, límite).
- `lesson-navigation.ts`: `navigateLesson(course, lessonSlug)` → `Result<LessonNavigation, 'lesson-not-found' | 'lesson-coming-soon'>` con posición, total y anterior/siguiente publicadas más cercanas.

`topics/domain/topic.ts`: `Topic` (`slug`, `name`, `group: 'product' | 'service'`, `summary`, `icon`, `siteUrl`) y `TOPIC_GROUP_PATH` (`product` → `productos`, `service` → `servicios`).

## Puertos y adaptadores

| Puerto (`application/`) | Adaptador (`infrastructure/`) | Notas |
| --- | --- | --- |
| `Library.allContent(): Promise<readonly LearningContent[]>` | `MockLibrary` sobre `mock-content.ts` | Los datos crudos usan enlaces de YouTube y segundos; el adaptador los convierte al dominio y descarta (con `console.error`) un enlace inválido. Un CMS o API futuro solo cambia el adaptador (criterio 24) |

Casos de uso (`library/application/`), clases puras con el puerto por constructor:

| Caso de uso | Devuelve | Criterios |
| --- | --- | --- |
| `BrowseLibrary` | destacados, recientes y contenido disponible por tema | 5 |
| `ExploreTopic(topicSlug)` | contenido del tema ordenado y conteo por tipo | 6, 7, 8, 19 |
| `OpenContent(kind, slug)` | `Result<{ content, related }, 'not-found' \| 'coming-soon'>` | 10, 13, 14, 18, 20 |
| `WatchLesson(courseSlug, lessonSlug)` | `Result<{ course, navigation }, 'course-not-found' \| 'course-coming-soon' \| 'lesson-not-found' \| 'lesson-coming-soon'>` | 15, 16, 17 |

`library.providers.ts` → `provideLibrary()` registra `{ provide: Library, useClass: MockLibrary }` y los casos de uso con `useFactory`. Se registra en las rutas de cada módulo de páginas.

## Rutas y UI

- `app.routes.ts`: `''` → `home`; `productos` y `servicios` → `topics` (la ruta lleva el grupo en `data`); `videos`, `cursos`, `guias` → sus módulos; `**` → no encontrada. Todo lazy.
- Parámetros de ruta y `?tipo=` como `input()` (`withComponentInputBinding()`); datos con `resource()` cuyo `loader` llama al caso de uso.
- `library/ui/video-player.ts`: portada propia (grafito, título, botón de reproducir amarillo). Al presionar, reemplaza la portada por el `iframe` de youtube-nocookie con `title` y mueve el foco al iframe. URL marcada como confiable con `DomSanitizer` solo para el dominio de YouTube construido por `YouTubeVideoId`. Enlace "Ver en YouTube" siempre visible.
- `library/ui/content-card.ts`: tipo, título, resumen, duración y tema opcional; enlace a la ruta según el tipo, o etiqueta "Próximamente" sin enlace.
- `topics/ui/topic-page.ts`: filtro como enlaces con `queryParams` (`aria-current="true"` en el elegido) y región `aria-live` con el número de resultados.
- `layout/`: header y pie adaptados de pensildevs-web; los submenús salen de `TOPICS`.
- SEO: cada ruta define `title`; las páginas con datos (tema, video, curso, guía) lo resuelven con `ResolveFn` que lee el catálogo de temas o el caso de uso.

## Riesgos

- El video real no responde al oEmbed público de YouTube (403): si es privado o tiene la inserción desactivada, el `iframe` no reproducirá. Mitigación: enlace "Ver en YouTube" y aviso a Pensil.Devs.
- `resource()` y el título por `ResolveFn` consultan la fuente dos veces por página; aceptable con datos en memoria, a revisar con un CMS real.

## Estrategia de pruebas

- `domain/` y `application/`: unitarias sin Angular (TDD obligatorio), con un `Library` falso en memoria.
- `infrastructure/`: `mock-library.integration.spec.ts` carga los datos reales de prueba y verifica que todos se conviertan.
- `ui/`: pruebas de componente para el reproductor, la tarjeta, el filtro del tema y la navegación de lecciones.
- `app.integration.spec.ts`: rutas y providers reales recorriendo inicio, tema, video, curso, lección, guía y no encontrados.
- Criterio 22 (AXE, 320 px) y 23: revisión manual; el lint de accesibilidad de plantillas es bloqueante.
