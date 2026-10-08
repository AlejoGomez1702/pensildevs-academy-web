# 001 — Pensil.Devs Academy

- **Estado:** aprobada (alcance confirmado por Alejandro Gómez, 2026-10-08)
- **Ticket / épica:** por crear

## Problema

Los clientes de Pensil.Devs aprenden a usar Pensil.Pos y lo que les construimos preguntando por WhatsApp, una y otra vez, lo mismo. Cada capacitación se da en vivo y se pierde. No hay un lugar donde un cajero nuevo aprenda a cobrar, o un dueño revise cómo sacar un reporte, a la hora que lo necesite. Pensil.Devs quiere publicar cursos, videos y documentación que se puedan consultar solos y que reduzcan el soporte repetitivo.

## Público

- **Usuario de Pensil.Pos** (cajero, encargado, dueño). Llega desde el celular o desde la computadora del mostrador, busca resolver una tarea concreta ("¿cómo hago un corte de caja?") y quiere el video corto, no un curso completo.
- **Cliente de un servicio** (tienda en línea, sistema a la medida, automatización, app). Necesita entender cómo operar lo que se le entregó.
- **Prospecto** que llega desde pensildevs.com y quiere ver qué tan fácil es usar lo que vendemos.

## Historias de usuario

1. Como usuario de Pensil.Pos, quiero ver todo el material de Pensil.Pos en un solo lugar, para no buscar entre contenido que no me sirve.
2. Como usuario, quiero ver un video sin salir del academy, para aprender sin distracciones.
3. Como persona nueva en un negocio, quiero seguir un curso lección por lección, para aprender en orden y saber qué me falta.
4. Como usuario que busca algo puntual, quiero leer una guía paso a paso, para resolverlo sin ver un video completo.
5. Como cliente de un servicio, quiero encontrar el material del servicio que contraté, para operar lo que me entregaron.
6. Como prospecto, quiero llegar al sitio de Pensil.Devs desde el academy, para pedir una demo o cotizar.
7. Como persona que navega con teclado o lector de pantalla, quiero recorrer el academy y reproducir los videos sin barreras.

## Conceptos

- **Tema:** aquello sobre lo que se aprende. Hay dos grupos: **productos** (hoy Pensil.Pos) y **servicios** (tiendas en línea, desarrollo web a la medida, automatización e integraciones, consultoría y apps móviles). Mismos nombres y `slug` que en pensildevs.com.
- **Contenido:** pertenece a un solo tema y es de uno de tres tipos:
  - **Video:** un video de YouTube con título, resumen y duración.
  - **Curso:** una secuencia ordenada de lecciones; cada lección es un video. Su duración es la suma de sus lecciones.
  - **Guía:** documentación escrita, dividida en secciones con pasos.
- **Próximamente:** contenido anunciado que aún no tiene video o texto publicado. Se muestra para que se vea el plan, pero no se puede abrir.

## Mapa del sitio

| Ruta | Página | Objetivo |
| --- | --- | --- |
| `/` | Inicio | Qué es el academy, temas por grupo (productos y servicios), contenido destacado y lo más reciente |
| `/productos/:slug` | Tema de producto | Todo el contenido del producto, filtrable por tipo |
| `/servicios/:slug` | Tema de servicio | Igual, para un servicio |
| `/videos/:slug` | Video | Reproductor, resumen, tema y más contenido del mismo tema |
| `/cursos/:slug` | Curso | Presentación del curso, lecciones con duración, empezar |
| `/cursos/:slug/:lesson` | Lección | Reproductor, lista de lecciones con la actual marcada, anterior y siguiente |
| `/guias/:slug` | Guía | Índice de secciones y contenido |
| `**` | No encontrada | Regresar a un camino útil |

Navegación principal: **Productos** y **Servicios** (submenús con sus temas, como en pensildevs.com) y un enlace "Ir a Pensil.Devs".

## Criterios de aceptación

### Layout y navegación
1. **Dado** cualquier página, **cuando** se carga, **entonces** muestra encabezado con el logo de Pensil.Devs Academy enlazado al inicio, navegación principal (Productos, Servicios, Ir a Pensil.Devs) y pie con los temas y un enlace a pensildevs.com.
2. **Dado** el menú de escritorio, **cuando** abro Productos o Servicios, **entonces** veo sus temas con enlace a la página de cada uno; se comporta igual que el menú de pensildevs.com (teclado, Escape, clic fuera, uno abierto a la vez).
3. **Dado** un viewport móvil, **cuando** abro el menú, **entonces** veo los grupos Productos y Servicios con sus temas visibles y el menú se cierra al elegir.
4. **Dado** que cambio de página, **cuando** termina la navegación, **entonces** el título del documento describe la página, el foco va al contenido principal y el scroll vuelve arriba.

### Inicio
5. **Dado** el inicio, **cuando** lo visito, **entonces** veo la propuesta del academy, los temas agrupados en Productos y Servicios con cuántos contenidos tiene cada uno, el contenido destacado y lo más reciente.

### Tema
6. **Dado** `/productos/:slug` o `/servicios/:slug` de un tema existente, **cuando** lo visito, **entonces** veo su nombre, su descripción y todo su contenido, con el tipo, la duración (videos y cursos) y el estado de cada uno.
7. **Dado** la página de un tema, **cuando** elijo un tipo (Todos, Cursos, Videos, Guías), **entonces** solo veo ese tipo, el filtro elegido queda marcado y se anuncia cuántos resultados hay.
8. **Dado** un tema sin contenido del tipo elegido, **cuando** filtro, **entonces** veo un mensaje que lo dice y una acción para ver todo.
9. **Dado** un `slug` de tema inexistente, o un producto pedido bajo `/servicios` (o al revés), **cuando** lo visito, **entonces** veo "No encontramos ese tema" con enlace al inicio.

### Video
10. **Dado** `/videos/:slug` de un video publicado, **cuando** lo visito, **entonces** veo el título, el tema enlazado, la duración, el resumen y un reproductor que no carga nada de YouTube hasta que presiono reproducir.
11. **Dado** el reproductor, **cuando** presiono reproducir (clic, Enter o Espacio), **entonces** se carga el video de YouTube en modo de privacidad mejorada y empieza a reproducirse; el reproductor tiene un nombre accesible con el título del video.
12. **Dado** el reproductor, **cuando** lo veo, **entonces** hay un enlace "Ver en YouTube" que abre el video en una pestaña nueva, por si la inserción falla.
13. **Dado** la página de un video, **cuando** llego al final, **entonces** veo más contenido del mismo tema (sin repetir el actual).

### Curso
14. **Dado** `/cursos/:slug`, **cuando** lo visito, **entonces** veo título, tema, resumen, número de lecciones, duración total y la lista de lecciones en orden, cada una con su duración, y una acción "Empezar el curso" que lleva a la primera lección.
15. **Dado** `/cursos/:slug/:lesson`, **cuando** la visito, **entonces** veo el reproductor de esa lección, su posición ("Lección 2 de 5") y la lista de lecciones con la actual marcada con `aria-current`.
16. **Dado** una lección, **cuando** existen lección anterior o siguiente, **entonces** veo enlaces a ellas con su título; en la primera no hay "anterior" y en la última "siguiente" se reemplaza por volver al curso.
17. **Dado** una lección inexistente de un curso existente, **cuando** la visito, **entonces** veo un aviso con enlace al curso.

### Guía
18. **Dado** `/guias/:slug`, **cuando** la visito, **entonces** veo el título, el tema, el tiempo de lectura, un índice con enlace a cada sección y las secciones con sus pasos numerados.

### Próximamente
19. **Dado** contenido en estado próximamente, **cuando** aparece en un listado, **entonces** se marca como "Próximamente", no es un enlace y no cuenta como contenido disponible del tema.
20. **Dado** la URL de un contenido próximamente, **cuando** la visito, **entonces** veo que aún no está disponible, con enlace a su tema.

### Conversión
21. **Dado** la página de un tema, **cuando** llego al final, **entonces** veo un llamado para conocer ese producto o servicio en pensildevs.com (misma ruta y `slug`), que abre en la misma pestaña.

### Calidad
22. Todas las páginas pasan AXE y WCAG AA (contraste, foco visible, landmarks, un solo `h1`, encabezados en orden) y funcionan desde 320 px sin scroll horizontal.
23. Se respeta `prefers-reduced-motion` y `prefers-color-scheme`.
24. El contenido se obtiene a través de una fuente intercambiable: pasar de datos de prueba a un CMS o API no toca las páginas.

## Casos borde

- Un enlace de YouTube en cualquiera de sus formatos (`watch?v=`, `youtu.be/`, `embed/`, `shorts/`, con parámetros extra) se reduce al mismo identificador; uno inválido se rechaza al cargar el contenido.
- Duraciones: se muestran como "8 min" o "1 h 05 min"; menos de un minuto se muestra como "1 min".
- Un curso sin lecciones publicadas se trata como próximamente.
- Una lección sin video se lista como próximamente y no es enlace; anterior y siguiente saltan a la lección publicada más cercana, y la duración del curso suma solo las lecciones publicadas.
- El reproductor no usa la miniatura de YouTube: muestra una portada propia con el título, para no pedir nada a YouTube antes de reproducir.
- Un tema sin ningún contenido se muestra con su descripción y el mensaje "Pronto habrá contenido aquí".

## Fuera de alcance

- Cuentas de usuario, progreso guardado, certificados y evaluaciones.
- Buscador de texto.
- Subir o editar contenido desde el academy (se cargará desde un CMS o API en una spec posterior).
- Comentarios y valoraciones.
- Videos alojados fuera de YouTube.
- Dominio, despliegue y configuración de git (los hará Pensil.Devs).

## Contenido inicial

- **Real:** el primer video de Pensil.Pos, https://www.youtube.com/watch?v=oFdO0jTK0n8, publicado como video y como primera lección del curso de inicio de Pensil.Pos. Título, resumen y duración provisionales hasta que Pensil.Devs los confirme.
- **De prueba (mock):** para cada tema, contenido de ejemplo de los tres tipos, marcado como próximamente cuando no tiene video o texto real. Todo el contenido vive en un único archivo por fuente de datos para reemplazarlo sin tocar componentes.
