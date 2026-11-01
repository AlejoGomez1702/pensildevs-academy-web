# 002 — Documentación por producto, acceso con la cuenta de Pensil.Pos y video introductorio

- **Estado:** en revisión (pedida por Alejandro Gómez el 2026-11-01; se aprueba al revisar el pull request)
- **Ticket / épica:** por crear
- **Depende de:** [001 — Pensil.Devs Academy](../001-academy/spec.md)

## Problema

El academy tiene videos, cursos y guías cortas, pero no tiene la documentación completa de cada producto. Quien usa Pensil.Pos todos los días necesita un manual de cada pantalla (documentación funcional) y quien lo instala o le da soporte en el negocio necesita saber cómo está construido, qué equipos usa y cómo resolver problemas (documentación técnica). Esa documentación es para clientes: debe pedir que la persona ingrese, y debe hacerlo con la misma cuenta con la que entra a pensilpos.com, sin crear otra.

Además, quien llega por primera vez no tiene un video corto que le muestre qué es Pensil.Pos de punta a punta.

## Público

- **Dueño o encargado** de un negocio que usa Pensil.Pos (rol administrador): lee la documentación funcional para configurar su negocio y la técnica para preparar sus equipos.
- **Empleado** (cajero, mesero, domiciliario): lee la documentación funcional de lo que hace en su turno.
- **Soporte** (la persona de sistemas del negocio o de Pensil.Devs): lee la documentación técnica.
- **Prospecto**: ve el video introductorio sin ingresar.

## Historias de usuario

1. Como usuario de Pensil.Pos, quiero ingresar al academy con mi usuario o correo y mi contraseña de pensilpos.com, para no crear ni recordar otra cuenta.
2. Como usuario, quiero leer la documentación funcional de Pensil.Pos organizada por tareas, para resolver lo que necesito en mi turno.
3. Como persona de soporte, quiero leer la documentación técnica de Pensil.Pos, para instalar la impresora, la báscula y resolver problemas.
4. Como usuario, quiero que el academy me recuerde mientras mi sesión siga vigente, y poder salir cuando quiera.
5. Como prospecto o usuario nuevo, quiero ver un video corto que me presente Pensil.Pos, para entender qué hace antes de empezar.
6. Como persona que usa lector de pantalla o no puede escuchar, quiero que el video tenga subtítulos y que el ingreso y la documentación se puedan recorrer con teclado.

## Conceptos

- **Documentación de un producto:** cada producto del academy (hoy Pensil.Pos) tiene dos tipos de documentación, y siempre los dos:
  - **Funcional:** cómo usar el producto, por tareas, con los nombres que ve la persona en pantalla.
  - **Técnica:** cómo está construido el producto, qué necesita, cómo se configura y cómo se diagnostica.
- **Artículo:** una página de documentación con título, resumen, fecha de la última revisión, tiempo de lectura y secciones. Una sección tiene párrafos, pasos numerados, listas, notas (consejo o advertencia) y tablas.
- **Miembro:** persona con una cuenta de Pensil.Pos que ingresó al academy. El academy conoce su nombre, su usuario, su rol (dueño, empleado o Pensil.Devs) y el nombre de su negocio; nunca guarda su contraseña.
- **Video alojado:** un video servido por el propio academy (no por YouTube), siempre con subtítulos en español.

## Mapa del sitio (lo nuevo)

| Ruta                                       | Página                                                                                    | Acceso            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------- |
| `/documentacion`                           | Productos con documentación y qué contiene cada tipo                                      | Pública           |
| `/documentacion/:producto`                 | Inicio de la documentación del producto: los dos tipos con sus artículos                  | Requiere ingresar |
| `/documentacion/:producto/:tipo/:articulo` | Artículo (`:tipo` es `funcional` o `tecnica`)                                             | Requiere ingresar |
| `/ingresar`                                | Ingresar con la cuenta de Pensil.Pos (`?volver=` con la página a la que se quería llegar) | Pública           |

Navegación principal: se agrega **Documentación** y, a la derecha, **Ingresar** (o el nombre del miembro con la opción **Salir**).

## Criterios de aceptación

### Ingresar

1. **Dado** `/ingresar`, **cuando** lo visito, **entonces** veo un formulario con "Usuario o correo" y "Contraseña" (con opción de mostrarla), un botón "Ingresar", y enlaces a "¿Olvidaste tu contraseña?" y "Crear cuenta" en pensilpos.com.
2. **Dado** el formulario vacío o con datos que no cumplen (usuario de menos de 3 caracteres, contraseña de menos de 8), **cuando** lo envío, **entonces** no se envía nada, cada campo muestra su error asociado y el foco va al primer campo con error.
3. **Dado** credenciales correctas de Pensil.Pos, **cuando** ingreso, **entonces** llego a la página que estaba pidiendo (o a `/documentacion` si no pedía ninguna) y el encabezado muestra mi nombre.
4. **Dado** credenciales incorrectas, una cuenta cuyo negocio fue eliminado o cualquier rechazo del servidor, **cuando** ingreso, **entonces** veo el mensaje del servidor en un aviso que se anuncia al lector de pantalla, y el formulario conserva mi usuario.
5. **Dado** que el servidor de Pensil.Pos no responde, **cuando** ingreso, **entonces** veo "No pudimos conectarnos con Pensil.Pos. Revisa tu conexión e inténtalo de nuevo."
6. **Dado** un `?volver=` que no es una ruta del academy (otra página web, `//…`), **cuando** ingreso, **entonces** voy a `/documentacion`.
7. **Dado** que ya ingresé, **cuando** visito `/ingresar`, **entonces** voy directo a `/documentacion`.

### Sesión

8. **Dado** que ingresé, **cuando** recargo o vuelvo otro día, **entonces** sigo dentro mientras la sesión de Pensil.Pos siga vigente.
9. **Dado** que entro a la documentación con una sesión guardada, **cuando** el academy la revisa con Pensil.Pos (una vez por visita), **entonces**: si sigue viva, entro; si venció, el academy la renueva sin pedirme nada; si fue cerrada (cerré sesión total, cambié la contraseña, el negocio se eliminó) o no se puede renovar, me pide ingresar de nuevo.
10. **Dado** que Pensil.Pos no responde al revisar la sesión, **cuando** la sesión guardada aún no vence, **entonces** puedo leer la documentación (sin conexión al servidor no se bloquea la lectura).
11. **Dado** que ingresé, **cuando** elijo "Salir", **entonces** se cierra esa sesión en Pensil.Pos, se borra del navegador y vuelvo al inicio; las demás sesiones (pensilpos.com, la app) siguen abiertas.

### Documentación

12. **Dado** `/documentacion`, **cuando** lo visito, **entonces** veo los productos que tienen documentación, qué cubre la funcional y la técnica, y una acción para entrar (o para ingresar si no he ingresado).
13. **Dado** que no he ingresado, **cuando** visito cualquier página bajo `/documentacion/:producto`, **entonces** voy a `/ingresar?volver=<esa página>`.
14. **Dado** `/documentacion/pensil-pos` y que ingresé, **cuando** lo visito, **entonces** veo un saludo con mi nombre y negocio, y los dos tipos de documentación con la lista de sus artículos (título, resumen y tiempo de lectura), en orden.
15. **Dado** un artículo, **cuando** lo visito, **entonces** veo su tipo, título, resumen, tiempo de lectura, fecha de revisión, un índice con enlace a cada sección, las secciones con su contenido, y enlaces al artículo anterior y siguiente del mismo tipo.
16. **Dado** un artículo, **cuando** veo la barra lateral, **entonces** están todos los artículos de su tipo con el actual marcado con `aria-current="page"`, y un enlace para cambiar al otro tipo de documentación.
17. **Dado** un producto sin documentación, un tipo distinto de `funcional`/`tecnica` o un artículo inexistente, **cuando** lo visito, **entonces** veo un aviso de que no existe con un enlace a la documentación.
18. **Dado** la página de un producto con documentación, **cuando** la visito, **entonces** veo un acceso a su documentación funcional y técnica.
19. Cada producto que tiene documentación tiene al menos un artículo funcional y uno técnico; una documentación con slugs repetidos, secciones repetidas o tablas con filas de distinto largo no se carga (se descarta con un error en consola, como el contenido con enlaces de YouTube inválidos).

### Video introductorio

20. **Dado** el video "Conoce Pensil.Pos en 2 minutos", **cuando** lo visito en `/videos/introduccion-a-pensil-pos`, **entonces** veo un reproductor del propio academy con subtítulos en español activados por defecto, que no descarga el video hasta que presiono reproducir.
21. **Dado** el inicio y la página de Pensil.Pos, **cuando** los visito, **entonces** el video introductorio aparece como destacado y como primera lección del curso "Primeros pasos con Pensil.Pos".

### Contenido de Pensil.Pos

22. Las guías, cursos y videos de Pensil.Pos describen lo que el producto hace hoy (ventas, mesas, domicilios, inventario por lotes, compras, caja, cartera, empleados y permisos, venta por peso). Nada describe pantallas que no existen.

### Calidad

23. AXE y WCAG AA en las páginas nuevas; desde 320 px sin scroll horizontal; `prefers-reduced-motion` y `prefers-color-scheme` respetados.
24. Pasar de la documentación escrita en el código a un CMS o API, o cambiar cómo se valida la cuenta, no toca las páginas.

## Casos borde

- El usuario se puede escribir con mayúsculas, espacios alrededor o como correo: se envía tal cual (sin los espacios de los extremos) y Pensil.Pos lo normaliza. La contraseña se envía exacta.
- Quien se registró en pensilpos.com con Google no tiene contraseña: el aviso de credenciales incorrectas ofrece "¿Olvidaste tu contraseña?" para crear una desde pensilpos.com.
- Una cuenta de Pensil.Devs (super administrador) también puede ingresar; no tiene negocio y el saludo lo omite.
- Una cuenta sin negocio registrado (no terminó el registro) puede ingresar y leer la documentación (le sirve para terminar de configurar).
- Dos pestañas abiertas: salir en una deja la otra sin sesión en su próxima revisión.
- Renovar la sesión rota el token de renovación: nunca se pide dos veces a la vez.

## Fuera de alcance

- Ingresar con Google (requiere configurar el proyecto de Firebase de Pensil.Pos para el dominio del academy).
- Que el servidor sirva la documentación solo a quien ingresó: hoy el texto viaja dentro de la aplicación y el ingreso controla quién la ve en el sitio, no quién puede descargar el código. Ver [ADR 0003](../../docs/adr/0003-acceso-con-cuenta-de-pensil-pos.md).
- Documentación por rol (que un empleado vea solo lo suyo), buscador, progreso, comentarios.
- Documentación de los servicios (tiendas en línea, desarrollo a la medida…): llega cuando cada servicio tenga producto propio que documentar.
- Narración en voz del video: se entrega el guion para grabarla.

## Requisitos de operación

- El servidor de Pensil.Pos debe aceptar el dominio del academy: agregar su origen **al final** de `FRONT_URLS` en Railway (el primero sigue siendo pensilpos.com, que arma los enlaces de los correos). Sin eso, ingresar falla como "No pudimos conectarnos con Pensil.Pos".
