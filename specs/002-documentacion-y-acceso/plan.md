# 002 — Plan

## Módulos tocados

| Módulo                  | Capas                                           | Cambio                                                                                                                                           |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `account` (nuevo)       | `domain`, `application`, `infrastructure`, `ui` | Ingresar con la cuenta de Pensil.Pos, revisar y renovar la sesión, salir. Página `/ingresar`, guard `requireMember`, control del encabezado      |
| `documentation` (nuevo) | `domain`, `application`, `infrastructure`, `ui` | Documentación funcional y técnica por producto; páginas `/documentacion`, `/documentacion/:producto`, `/documentacion/:producto/:tipo/:articulo` |
| `library`               | `domain`, `infrastructure`, `ui`                | `HostedVideo` y `VideoSource`; reproductor nativo con subtítulos y transcripción; contenido de Pensil.Pos corregido y video introductorio        |
| `topics`                | `ui`                                            | Acceso a la documentación desde la página de cada producto                                                                                       |
| `layout`                | —                                               | "Documentación" en la navegación y el pie; "Ingresar" / "Salir" en el encabezado (escritorio desde `lg`)                                         |
| `shared`                | `infrastructure`, `ui`                          | `academy-environment` (URL de la API de Pensil.Pos); íconos nuevos                                                                               |

Dependencias: `documentation` → `account`, `topics`, `library` (por su `index.ts`); `layout` → `account`, `documentation`. `account` no depende de ningún módulo.

## Dominio

- `account/domain`: `Credentials` (usuario recortado ≥ 3, contraseña exacta ≥ 8), `Member` y `AcademySession` (`isExpired`, `firstName`, `memberRoleOf`), `returnPathAfterSignIn` (solo rutas del academy).
- `documentation/domain`: `createDocumentation` valida (los dos tipos con artículos, slugs y secciones únicos, tablas parejas) y calcula el tiempo de lectura (200 palabras/min, mínimo 1); `articleInTrack` ubica un artículo con su anterior y siguiente.
- `library/domain`: `HostedVideo.create` (ver ADR 0004).

## Puertos y adaptadores

| Puerto               | Adaptador                  | Notas                                                                                                                                   |
| -------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `PensilPosAccounts`  | `PensilPosAccountsHttp`    | `/api/auth/*`; 4xx = rechazo (con el `message` de Pensil.Pos), sin respuesta o 5xx = no disponible; lee `exp` del token sin verificarlo |
| `SessionStore`       | `LocalSessionStore`        | `localStorage`, valida la forma al leer, tolera almacenamiento bloqueado                                                                |
| `Clock`              | `SystemClock`              |                                                                                                                                         |
| `DocumentationShelf` | `StaticDocumentationShelf` | Contenido en `documentation/infrastructure/content/`; descarta con `console.error` la documentación inválida                            |

Casos de uso: `SignIn`, `CheckAccess` (una consulta por visita, renovación de a una), `SignOut`, `BrowseDocumentation`, `ReadArticle`.

## Riesgos

- CORS: sin el origen del academy en `FRONT_URLS` de Pensil.Pos no se puede ingresar en producción (operación, ver spec).
- El texto de la documentación viaja en la aplicación (ADR 0003): no debe tener nada reservado.
- La documentación se desactualiza: cada artículo lleva su fecha de revisión y la spec de cada cambio de Pensil.Pos debe decir qué artículo toca.

## Estrategia de pruebas

- Unitarias sin Angular: `credentials`, `member`, `return-path`, `documentation`, `hosted-video`, casos de uso con fakes escritos a mano (`account.fakes.ts`).
- Integración: `PensilPosAccountsHttp` contra `HttpTestingController`, `LocalSessionStore` contra `localStorage`, `MockLibrary` con el video alojado, y `app.integration.spec.ts` con rutas reales: público, redirección a ingresar, sesión confirmada, artículo, inexistentes y "cada producto tiene documentación".
- Componentes: página de ingreso (validación, foco, rechazo, sin conexión, `?volver=` externo), control de cuenta, reproductor alojado.
