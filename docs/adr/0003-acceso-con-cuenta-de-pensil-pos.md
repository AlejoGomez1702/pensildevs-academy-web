# 0003 — Acceso a la documentación con la cuenta de Pensil.Pos

- **Estado:** propuesta (spec 002)
- **Fecha:** 2026-11-01

## Contexto

La documentación de cada producto es para sus clientes. Los clientes de Pensil.Pos ya tienen una cuenta (usuario o correo y contraseña) en pensilpos.com, y no queremos que creen otra ni mantener un sistema de cuentas propio. El academy es una aplicación estática (sin servidor propio) y su contenido viaja dentro del código de la aplicación.

## Decisión

- El academy **no tiene cuentas**: el módulo `account` abre una sesión de Pensil.Pos con su API pública de autenticación (`POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/refresh-token`, `POST /api/auth/logout`), la misma que usan pensilpos.com y la app. El academy nunca guarda la contraseña; guarda el nombre, el usuario, el rol, el nombre del negocio y los dos tokens.
- La sesión se guarda en `localStorage` (clave `pensildevs-academy.session`), igual que pensilpos.com guarda la suya. Es una sesión propia del academy en Pensil.Pos ("Salir" cierra solo esa).
- La sesión se confirma con Pensil.Pos **una vez por visita** (`/auth/me`). Si venció o Pensil.Pos la rechaza, se renueva una sola vez a la vez (el refresh token rota). Si Pensil.Pos no responde y la sesión no ha vencido, se deja leer.
- Las rutas `/documentacion/:producto/**` las protege el guard funcional `requireMember`. `/documentacion` (qué hay) e `/ingresar` son públicas.
- `provideAccount()` se registra en `app.config.ts`, no en una ruta: el encabezado muestra quién ingresó en todas las páginas. Es la única excepción a "los providers de un módulo viajan con su ruta".
- La URL de la API sale de `shared/infrastructure/academy-environment.ts` (producción) y su reemplazo `academy-environment.development.ts` (Pensil.Pos local en `:9000`) por `fileReplacements`.

## Consecuencias

- **El ingreso controla quién ve la documentación en el sitio, no quién puede leer el código descargado:** el texto va dentro del paquete de la aplicación. Por eso la documentación no puede llevar secretos, datos de clientes ni procedimientos internos de Pensil.Devs. Si algún día lo necesita, la documentación se sirve desde una API que exija la sesión (cambia solo el adaptador `DocumentationShelf`, spec 002 criterio 24).
- Pensil.Pos debe aceptar el origen del academy en `FRONT_URLS` (al final de la lista). Sin eso, ingresar falla como "no pudimos conectarnos".
- Un ataque XSS en el academy podría leer el token, como en pensilpos.com: Angular escapa todo lo que se pinta y el único `bypassSecurityTrust*` es el del ADR 0002.
- Quien se registró en Pensil.Pos con Google no tiene contraseña: se le ofrece crearla desde "¿Olvidaste tu contraseña?" de pensilpos.com. Ingresar con Google queda para después (requiere autorizar el dominio en Firebase).
- Otro producto con sus propias cuentas tendría su propio adaptador de `PensilPosAccounts` (o un puerto más general cuando exista ese segundo caso).
