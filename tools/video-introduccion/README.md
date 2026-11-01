# Video "Conoce Pensil.Pos en 2 minutos"

Fuente del video introductorio de Pensil.Pos (`public/media/pensil-pos/introduccion.*`, spec 002, [ADR 0004](../../docs/adr/0004-videos-alojados-con-subtitulos.md)). El video se arma con escenas HTML y las capturas reales de Pensil.Pos que usa pensilpos.com, cuadro por cuadro, sin edición manual: cambiar un texto es cambiar `scenes.js` y volver a renderizar.

- `scenes.js`: guion. Cada escena tiene su tiempo, sus textos y el subtítulo (`caption`). El mismo texto alimenta los subtítulos (`vtt.js`) y la transcripción del academy (`PENSIL_POS_INTRODUCTION` en `src/app/library/infrastructure/mock-content.ts`): si cambias un `caption`, cámbialo también allí.
- `index.html`: cómo se ve cada escena; `window.renderAt(segundos)` dibuja un instante.
- `render.js`: copia las capturas de `../pensilpos-frontend/src/assets/images` y genera el MP4 (1920×1080, 30 cps), el póster y los subtítulos.

## Requisitos

Node, `ffmpeg` y Playwright con Chromium (`npm i -g playwright && npx playwright install chromium`, fuera de este proyecto: no es una dependencia del academy), y `pensilpos-frontend` clonado al lado de este repositorio.

```bash
node tools/video-introduccion/render.js 4 27 62   # vista previa de esos segundos
node tools/video-introduccion/render.js           # video completo (unos 10 minutos)
```

## Narración

El video no tiene voz: se entiende con los textos en pantalla, los subtítulos y la transcripción. Para grabar una narración, el guion son los `caption` de `scenes.js`, en orden; cada escena dura lo que indica su `start`/`end`.
