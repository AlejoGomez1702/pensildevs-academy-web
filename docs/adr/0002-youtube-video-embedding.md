# 0002 — Videos de YouTube con portada propia y modo de privacidad mejorada

- **Estado:** aceptada
- **Fecha:** 2026-10-08

## Contexto

El academy publica sus videos en YouTube y los muestra dentro de sus páginas. Insertar el reproductor de YouTube directamente carga cerca de 1 MB de scripts, instala cookies de seguimiento y pide la miniatura a YouTube aunque la persona nunca reproduzca el video. Además, Angular bloquea por seguridad cualquier URL dinámica en el `src` de un `iframe` hasta que el código la marca como confiable, y el lint (`sonarjs/no-angular-bypass-sanitization`) señala ese punto como sensible.

## Decisión

- El reproductor (`library/ui/video-player.ts`) muestra una portada propia del design system (grafito, título y botón amarillo). Nada se pide a YouTube hasta que la persona presiona reproducir: ni scripts, ni miniatura, ni cookies.
- Al reproducir, se inserta un `iframe` de `www.youtube-nocookie.com` (modo de privacidad mejorada) con `autoplay=1` y `rel=0`, y el foco pasa al reproductor.
- La URL del `iframe` solo la construye `YouTubeVideoId` (dominio): valida un id de exactamente 11 caracteres (`[A-Za-z0-9_-]`) y lo coloca en una plantilla fija. Ningún texto escrito por un visitante llega a esa URL; los enlaces de YouTube vienen de la fuente de contenido y se validan al cargarla.
- Por eso, y solo en esa línea, se permite `bypassSecurityTrustResourceUrl`, con un `eslint-disable-next-line` que cita este ADR. Cualquier otro uso de los métodos `bypassSecurityTrust*` sigue prohibido.
- Siempre hay un enlace "Ver en YouTube" por si el video tiene la inserción desactivada o es privado.

## Consecuencias

- Las páginas de video cargan rápido y no dejan cookies de terceros a quien solo lee.
- Se necesita un clic más que con el reproductor nativo, que además no muestra la miniatura real del video.
- Si la fuente de contenido cambia (CMS o API), la validación sigue en `YouTubeVideoId`: el adaptador no puede saltársela.
- Un video privado o con la inserción desactivada en YouTube no se reproduce en el academy; el enlace a YouTube es la salida.
