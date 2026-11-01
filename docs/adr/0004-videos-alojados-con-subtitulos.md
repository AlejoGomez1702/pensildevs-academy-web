# 0004 — Videos alojados por el academy, siempre con subtítulos y transcripción

- **Estado:** propuesta (spec 002)
- **Fecha:** 2026-11-01

## Contexto

El ADR 0002 deja todos los videos en YouTube. El video introductorio de Pensil.Pos lo genera Pensil.Devs (escenas HTML con capturas reales, `tools/video-introduccion/`) y debe poder publicarse hoy, antes de subirlo al canal. Además no tiene narración: sin texto, una persona que no ve la pantalla no recibe nada.

## Decisión

- Un video puede ser de YouTube o **alojado** por el academy (`VideoSource = YouTubeVideoId | HostedVideo`). Nunca los dos a la vez.
- `HostedVideo` solo acepta archivos bajo `/media/` del propio sitio (MP4 o WebM), sin `..` ni otros orígenes, y exige subtítulos (`.vtt`), póster y transcripción. El contenido que no cumple se descarta al cargarlo, como un enlace de YouTube inválido.
- El reproductor usa `<video controls preload="none">` con el póster propio: no se descarga el video hasta reproducirlo. Los subtítulos en español van activados por defecto y debajo hay "Leer lo que muestra el video" con la transcripción.
- Los archivos viven en `public/media/<producto>/`. Un video alojado pesa: se mantienen por debajo de ~10 MB (1080p, H.264 CRF 27).

## Consecuencias

- No hace falta `bypassSecurityTrust*` para los videos alojados: son rutas del mismo sitio.
- Los videos alojados aumentan el tamaño del repositorio. Cuando el video introductorio esté en YouTube, basta con cambiar `hostedVideo` por `youtubeUrl` en el contenido; el resto no cambia.
- Todo video nuevo sin voz trae su transcripción; uno con voz trae subtítulos de lo que se dice.
