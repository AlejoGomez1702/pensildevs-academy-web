import type { RawDocArticle } from '../raw-documentation';

/** Technical documentation of Pensil.Pos: for whoever installs, configures and supports it. */
export const PENSIL_POS_TECHNICAL: readonly RawDocArticle[] = [
  {
    slug: 'arquitectura',
    title: 'Arquitectura',
    summary:
      'Las piezas de Pensil.Pos, cómo se comunican y cómo se separan los datos de cada negocio.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'piezas',
        title: 'Las piezas del sistema',
        blocks: [
          {
            kind: 'table',
            caption: 'Componentes de Pensil.Pos',
            columns: ['Pieza', 'Qué es', 'Dónde corre'],
            rows: [
              [
                'Aplicación web',
                'Aplicación Angular que se puede instalar como app (PWA). Tiene todas las funciones.',
                'En el navegador de cada equipo del negocio.',
              ],
              [
                'App Android',
                'App nativa para empleados: venta rápida, mesas, domicilios y compras.',
                'En celulares y tabletas Android.',
              ],
              [
                'Servidor (API)',
                'API REST en Node.js que aplica todas las reglas de negocio: precios, existencias, permisos y pagos.',
                'En la nube, administrado por Pensil.Devs.',
              ],
              [
                'Tiempo real',
                'Conexión Socket.IO (WebSocket) para el carrito, las mesas y los domicilios compartidos.',
                'En la nube, junto al servidor.',
              ],
              [
                'Base de datos',
                'MongoDB, con transacciones para que una venta o una compra se guarde completa o no se guarde.',
                'En la nube.',
              ],
              ['Imágenes de productos', 'Almacenamiento de archivos Cloudflare R2.', 'En la nube.'],
              [
                'Servicio de impresión',
                'Servicio local que imprime tickets en impresoras térmicas ESC/POS.',
                'En el PC Windows del negocio, solo si se usa.',
              ],
            ],
          },
          {
            kind: 'paragraph',
            text: 'La web y la app no guardan ventas en el equipo: el carrito, las cuentas de mesa y los domicilios viven en el servidor. Por eso un navegador que se borra o un celular que se cambia no pierde ventas en curso.',
          },
        ],
      },
      {
        id: 'multi-negocio',
        title: 'Cada negocio, aislado',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pensil.Pos atiende a muchos negocios en el mismo servidor. Cada producto, venta, cliente o movimiento pertenece a un negocio, y el servidor filtra siempre por el negocio de quien hace la petición. Un registro de otro negocio se responde como si no existiera, para no revelar ni siquiera que existe.',
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Un usuario pertenece a un solo negocio. El dueño tiene un único negocio por cuenta.',
          },
        ],
      },
      {
        id: 'disponibilidad',
        title: 'Disponibilidad y varias réplicas',
        blocks: [
          {
            kind: 'list',
            items: [
              'El servidor corre en Railway con dos o más réplicas a la vez; si una falla, las otras siguen atendiendo.',
              'Redis coordina las réplicas: un cambio en el carrito hecho en una llega a los equipos conectados a las otras.',
              'Ningún estado de las ventas en curso vive en la memoria de una réplica: todo se guarda en la base de datos.',
              'Las actualizaciones se publican sin cortar el servicio: el tráfico pasa a la versión nueva solo cuando está lista.',
            ],
          },
        ],
      },
      {
        id: 'servicios-externos',
        title: 'Servicios externos',
        blocks: [
          {
            kind: 'list',
            items: [
              'Correo transaccional: enlaces de recuperación de contraseña y alertas de inventario insuficiente.',
              'Google (Firebase) para el ingreso con cuenta de Google en la web.',
              'Cloudflare R2 para las imágenes de productos.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'requisitos-e-instalacion',
    title: 'Requisitos e instalación',
    summary:
      'Navegadores, dispositivos, conexión e instalación de la web como app y de la app Android.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'navegadores',
        title: 'Navegadores',
        blocks: [
          {
            kind: 'list',
            items: [
              'La web funciona en las versiones recientes de Chrome, Edge, Firefox y Safari.',
              'Para leer una báscula se necesita Chrome o Edge en computador (usan Web Serial). En otros navegadores el panel de la báscula solo ofrece el peso manual.',
              'Mantén el navegador actualizado; las versiones viejas pueden no cargar la aplicación.',
            ],
          },
        ],
      },
      {
        id: 'instalar-como-app',
        title: 'Instalar la web como app',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Abre pensilpos.com en Chrome o Edge e ingresa.',
              'En el menú del navegador elige la opción de instalar la aplicación.',
              'Queda un acceso directo que abre Pensil.Pos en su propia ventana.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'La app instalada se actualiza sola: cuando hay una versión nueva, se descarga en segundo plano, se activa y la página se recarga. No hay que reinstalar nada.',
          },
        ],
      },
      {
        id: 'app-android',
        title: 'App Android',
        blocks: [
          {
            kind: 'list',
            items: [
              'Requiere Android 7.0 o superior.',
              'Ingresa con el mismo usuario y contraseña de la web.',
              'El administrador del negocio no necesita la app: todo lo de administración está en la web.',
              'Si no sabes cómo obtenerla, pide el enlace a Pensil.Devs.',
            ],
          },
        ],
      },
      {
        id: 'conexion',
        title: 'Conexión a internet',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pensil.Pos necesita internet para vender: el servidor es quien valida cada venta y descuenta las existencias. No hay modo sin conexión. Con una conexión inestable verás “Conectando…” o “Sin conexión” y los cambios no se envían hasta que vuelva.',
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Si el internet del local falla seguido, ten un plan de respaldo, por ejemplo compartir datos desde un celular.',
          },
        ],
      },
      {
        id: 'dispositivos-recomendados',
        title: 'Dispositivos recomendados',
        blocks: [
          {
            kind: 'table',
            caption: 'Dispositivos recomendados por puesto de trabajo',
            columns: ['Puesto', 'Dispositivo', 'Accesorios'],
            rows: [
              [
                'Caja',
                'PC o portátil con Windows y Chrome o Edge.',
                'Impresora térmica de 80 mm y, si vendes por peso, báscula serial/USB compatible.',
              ],
              ['Meseros y domiciliarios', 'Celular Android con la app.', 'Ninguno.'],
              ['Dueño', 'Cualquier computador, tableta o celular con navegador.', 'Ninguno.'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'El buscador de productos acepta lectores de código de barras que escriben como un teclado.',
          },
        ],
      },
    ],
  },
  {
    slug: 'impresion-de-tickets',
    title: 'Impresión de tickets',
    summary:
      'Las dos formas de imprimir, el servicio local de impresión, sus requisitos y cómo resolver fallas.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'dos-formas',
        title: 'Dos formas de imprimir',
        blocks: [
          {
            kind: 'table',
            caption: 'Métodos de impresión',
            columns: ['Método', 'Cómo funciona', 'Cuándo conviene'],
            rows: [
              [
                'Navegador',
                'Se abre el diálogo de impresión del navegador con un ticket de 80 mm.',
                'Para empezar, o si imprimes poco. Es el método por defecto.',
              ],
              [
                'Servicio local',
                'El ticket sale directo por la impresora térmica, sin diálogo.',
                'En cajas con mucho movimiento.',
              ],
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'El método lo configura Pensil.Devs para cada negocio; el dueño no lo puede cambiar. Con el servicio local, si falla la impresión no se abre el diálogo del navegador como respaldo: se muestra el error.',
          },
        ],
      },
      {
        id: 'servicio-local',
        title: 'El servicio local de impresión',
        blocks: [
          {
            kind: 'list',
            items: [
              'Es un programa que corre en el PC de la caja como servicio de Windows, con el nombre “Pensilpos Ticket Service”. Arranca solo con el equipo y se reinicia si falla.',
              'Atiende en el puerto 3000 del mismo PC. El navegador de ese PC le envía cada ticket.',
              'Imprime en impresoras térmicas compatibles con ESC/POS, una impresión a la vez, en orden.',
              'Hoy imprime tickets de venta. La impresión de comandas de cocina no está en uso.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Solo se imprime desde el navegador del PC donde está instalado el servicio. Un celular o un segundo computador no imprimen en esa impresora.',
          },
        ],
      },
      {
        id: 'requisitos',
        title: 'Requisitos',
        blocks: [
          {
            kind: 'list',
            items: [
              'PC con Windows.',
              'La impresora instalada en Windows con el nombre configurado en el servicio (por defecto, “Pensilpos”). El nombre debe coincidir exactamente.',
              'Papel de 80 mm, que es el tamaño soportado hoy.',
              'El puerto 3000 libre en ese PC.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'La instalación la hace el soporte de Pensil.Devs, o tú siguiendo sus instrucciones.',
          },
        ],
      },
      {
        id: 'contenido-del-ticket',
        title: 'Qué lleva el ticket',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Nombre, NIT, teléfono, correo y dirección del negocio (los de “Mi negocio”), el mesero, los productos con cantidad, precio unitario y total, y el total de la venta. En una línea por peso se imprime el total y debajo el detalle, por ejemplo “1,250 kg x $9.800/kg”.',
          },
        ],
      },
      {
        id: 'solucionar-problemas',
        title: 'Verificar y solucionar problemas',
        blocks: [
          {
            kind: 'table',
            caption: 'Mensajes de impresión y qué hacer',
            columns: ['Mensaje o síntoma', 'Causa probable', 'Qué hacer'],
            rows: [
              [
                '“No se pudo conectar con el servicio de impresión. Verifica que esté encendido en este equipo.”',
                'El servicio no está corriendo, o estás imprimiendo desde otro equipo.',
                'Abre Servicios de Windows, busca “Pensilpos Ticket Service” y verifica que esté en ejecución; si no, inícialo. Confirma que imprimes desde el PC de la caja.',
              ],
              [
                'Impresora “…” no configurada',
                'Windows no tiene una impresora con el nombre esperado.',
                'Renombra la impresora en Windows con el nombre configurado (por defecto “Pensilpos”) o pide a soporte que ajuste el servicio.',
              ],
              [
                '“Error al imprimir el ticket”',
                'La impresora rechazó el trabajo.',
                'Revisa el cable, el papel y que la impresora esté encendida; vuelve a imprimir desde el historial con “Imprimir Ticket”.',
              ],
              [
                'No sale nada y no hay error',
                'El servicio no detecta si la impresora está apagada y da el ticket por enviado.',
                'Enciende la impresora, revisa el papel y reimprime desde el historial.',
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'bascula',
    title: 'Báscula',
    summary:
      'Cómo se conecta la báscula para vender por peso, qué modelo se soporta y cómo se decide que un peso es estable.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'como-se-conecta',
        title: 'Cómo se conecta',
        blocks: [
          {
            kind: 'paragraph',
            text: 'La web lee la báscula directamente con Web Serial, sin instalar programas. La báscula se conecta por USB o serial al computador de la caja. El servidor no sabe de la báscula: solo recibe los gramos de cada línea.',
          },
          {
            kind: 'list',
            items: [
              'Solo para negocios tipo Fruver (venta por peso).',
              'Requiere Chrome o Edge en computador. Si el navegador no puede, verás “Este navegador no puede leer la báscula. Usa Chrome o Edge.”',
              'La app Android no lee básculas.',
            ],
          },
        ],
      },
      {
        id: 'modelos',
        title: 'Modelos soportados',
        blocks: [
          {
            kind: 'table',
            caption: 'Modelos de báscula soportados',
            columns: ['Modelo', 'Conexión', 'Unidad'],
            rows: [['ROCHI RC-A02 (continuo)', '9600 baudios, 8N1, envío continuo', 'kg']],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Si tienes otra báscula, consulta a Pensil.Devs: cada modelo nuevo necesita que se agregue su protocolo.',
          },
        ],
      },
      {
        id: 'configuracion',
        title: 'Configuración en el equipo',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En Registrar Venta, en el panel “Báscula”, toca el engranaje “Configurar báscula”.',
              'Elige el “Modelo”.',
              'Toca “Conectar báscula” y elige el puerto en la ventana del navegador.',
              'Verifica la lectura en vivo. Para quitarla, usa “Olvidar báscula”.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'La configuración se guarda en ese navegador, no en el negocio: cada caja configura su báscula. Después de autorizarla, se reconecta sola al abrir la pantalla. “Cerrar sesión total” borra esta configuración.',
          },
        ],
      },
      {
        id: 'estabilidad',
        title: 'Estabilidad del peso',
        blocks: [
          {
            kind: 'list',
            items: [
              'El peso se marca “Estable” cuando tres lecturas seguidas difieren en una división o menos; se usa la lectura del medio.',
              'Si pasan 3 segundos sin datos, el panel muestra “Sin lectura de la báscula”.',
              'Si el peso salta exactamente al doble o a la mitad, Pensil.Pos sospecha que la báscula cambió de kg a libras y bloquea “Agregar” hasta que confirmes “Está en kg” con el plato vacío.',
              'Un peso manual cuenta como estable.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'sesiones-y-seguridad',
    title: 'Sesiones y seguridad',
    summary:
      'Cuánto dura una sesión, cuándo se cierra, cómo se protegen las contraseñas y qué valida el servidor.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'sesiones',
        title: 'Sesiones',
        blocks: [
          {
            kind: 'list',
            items: [
              'Cada ingreso crea una sesión propia de ese equipo. Un mismo usuario puede tener sesiones abiertas en varios equipos.',
              'La credencial de acceso dura 30 días y se renueva sola con una credencial de renovación que dura 60 días. Cada renovación cambia la credencial; si alguien intenta usar una ya reemplazada, se rechaza.',
              'La opción “Recordar sesión” de la web no cambia esa duración. En la app, “Recordar usuario” desmarcado cierra la sesión al cerrar la app.',
            ],
          },
          {
            kind: 'table',
            caption: 'Qué cierra cada sesión',
            columns: ['Acción', 'Sesiones que se cierran'],
            rows: [
              ['Cerrar sesión', 'La de ese equipo.'],
              ['Cambiar la contraseña', 'Todas las demás; la del equipo donde la cambiaste sigue.'],
              ['Recuperar la contraseña por correo', 'Todas.'],
              ['El negocio se elimina', 'Todas las del negocio, en la siguiente petición.'],
            ],
          },
        ],
      },
      {
        id: 'validacion-en-cada-peticion',
        title: 'Validación en cada petición',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Cada petición verifica que la sesión siga viva, que la cuenta exista y que el negocio siga disponible. La web relee los datos del usuario cada hora y la app al volver a primer plano, así los cambios de permisos o de capacidades del negocio llegan sin cerrar sesión.',
          },
        ],
      },
      {
        id: 'contrasenas',
        title: 'Contraseñas e ingreso',
        blocks: [
          {
            kind: 'list',
            items: [
              'Las contraseñas se guardan cifradas con bcrypt; nadie, ni Pensil.Devs, puede leerlas.',
              'El ingreso acepta usuario o correo, escrito como sea (mayúsculas, puntos de Gmail). La contraseña debe ser exacta.',
              'Un usuario inexistente y una contraseña errada dan el mismo mensaje, para no revelar qué cuentas existen. La recuperación responde igual exista o no la cuenta.',
              'El enlace de recuperación vence en 30 minutos, sirve una vez y se guarda cifrado.',
            ],
          },
        ],
      },
      {
        id: 'roles',
        title: 'Roles',
        blocks: [
          {
            kind: 'table',
            caption: 'Roles de Pensil.Pos',
            columns: ['Rol', 'Quién es', 'Qué puede hacer'],
            rows: [
              [
                'Administrador',
                'El dueño del negocio.',
                'Todo en su negocio: caja, empleados, permisos, eliminar ventas y productos.',
              ],
              [
                'Empleado',
                'Cajeros, meseros, domiciliarios.',
                'Lo que le den sus permisos. Solo ve sus propias ventas.',
              ],
              [
                'Super administrador',
                'El equipo de Pensil.Devs.',
                'Administra los negocios, las categorías, el método de impresión, el estado de pago y da soporte.',
              ],
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Para dar soporte, Pensil.Devs puede entrar a Pensil.Pos como un usuario de tu negocio (“Ver como”). Esa sesión es independiente y se cierra al terminar.',
          },
        ],
      },
      {
        id: 'que-protege-el-servidor',
        title: 'Qué protege el servidor y qué solo la pantalla',
        blocks: [
          {
            kind: 'list',
            items: [
              'El servidor siempre exige el rol de dueño para: la caja; eliminar ventas, productos, compras, clientes y proveedores; crear o editar empleados y cambiar permisos.',
              'El servidor exige permiso para: el reporte general de inventario (“Generar reporte”), menudear y deshacer menudeos (“Menudear cigarrillos”) y cobrar a otro precio (“Modificar precio en venta”).',
              'Los demás permisos ocultan o muestran secciones en la web y la app.',
              'Precios, existencias, totales y pagos siempre los calcula y valida el servidor: lo que muestra la pantalla es una vista previa.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Si un empleado no debe tener acceso a información sensible, quítale también el permiso de ver esa sección, no solo los de crear o editar.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tiempo-real-y-sincronizacion',
    title: 'Tiempo real y sincronización',
    summary:
      'Cómo se comparten el carrito, las mesas y los domicilios entre equipos, y qué pasa cuando se cae la conexión.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'que-se-comparte',
        title: 'Qué se comparte',
        blocks: [
          {
            kind: 'list',
            items: [
              'Un carrito de Venta Rápida por negocio.',
              'Una cuenta por cada mesa, con sus notas y su mesero.',
              'Los domicilios activos, con su estado y su domiciliario.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Cada equipo abre una conexión WebSocket al servidor. Cada cambio se guarda en el servidor y se avisa a todos los equipos del mismo negocio, sin importar a qué réplica estén conectados.',
          },
        ],
      },
      {
        id: 'versiones-y-conflictos',
        title: 'Versiones y conflictos',
        blocks: [
          {
            kind: 'list',
            items: [
              'Cada carrito tiene una versión que sube con cada cambio. Si dos equipos cambian a la vez, uno gana y el otro recibe el aviso de que se está modificando desde otro dispositivo para que lo intente de nuevo.',
              'La pantalla muestra el cambio de inmediato y, si el servidor lo rechaza, lo revierte y muestra el motivo.',
              'Al cobrar se envía la versión que el cajero vio. Si el carrito cambió, el cobro se rechaza para que lo revise.',
            ],
          },
        ],
      },
      {
        id: 'bloqueo-de-cobro',
        title: 'Bloqueo de cobro',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Quien empieza a cobrar bloquea el carrito: los demás no pueden editarlo y solo quien bloqueó puede liberarlo. Si el equipo que cobraba se apaga o pierde la conexión, el bloqueo vence solo a los 4 minutos.',
          },
        ],
      },
      {
        id: 'estado-de-la-conexion',
        title: 'Estado de la conexión',
        blocks: [
          {
            kind: 'table',
            caption: 'Estados de la conexión en tiempo real',
            columns: ['Indicador', 'Significa', 'Se puede editar'],
            rows: [
              ['En vivo', 'Conectado y recibiendo cambios.', 'Sí'],
              ['Conectando…', 'Estableciendo o recuperando la conexión.', 'No'],
              ['Sin conexión', 'No hay conexión con el servidor.', 'No'],
            ],
          },
        ],
      },
      {
        id: 'si-se-cae-internet',
        title: 'Si se cae internet',
        blocks: [
          {
            kind: 'list',
            items: [
              'Nada se envía mientras no hay conexión: no hay una cola de cambios pendientes.',
              'Lo que ya estaba en el carrito, en las mesas y en los domicilios no se pierde, porque está en el servidor.',
              'Al volver la conexión, cada pantalla vuelve a leer el estado actual del servidor.',
              'En la app, una acción que no recibe respuesta en 10 segundos se da por fallida y no se reintenta sola.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'reglas-de-datos',
    title: 'Reglas de datos',
    summary:
      'Cómo se calculan existencias, costos, días y redondeos, y qué pasa con lo que se elimina.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'lotes-fifo',
        title: 'Inventario por lotes (primero en entrar, primero en salir)',
        blocks: [
          {
            kind: 'list',
            items: [
              'Cada compra crea un lote por línea con su precio de compra. Crear un producto con existencia crea su lote inicial.',
              'Las ventas consumen los lotes del más antiguo al más nuevo, y la venta guarda cuánto tomó de cada lote.',
              'Al eliminar una venta, las unidades vuelven exactamente a los lotes de donde salieron.',
              'Las existencias solo bajan si alcanzan: dos ventas simultáneas de la última unidad nunca venden de más.',
              'Los productos que no controlan existencias no tienen lotes.',
            ],
          },
        ],
      },
      {
        id: 'costo-real',
        title: 'Costo real y utilidad',
        blocks: [
          {
            kind: 'paragraph',
            text: 'La inversión de una venta se calcula con el costo de los lotes consumidos, no con el precio de compra actual del producto. Utilidad = total − inversión − comisión del mesero. Si da negativa, la venta se rechaza; se verifica con el costo estimado y otra vez con el costo real.',
          },
        ],
      },
      {
        id: 'dia-operativo',
        title: 'Día operativo',
        blocks: [
          {
            kind: 'table',
            caption: 'Modos del día operativo',
            columns: ['Modo', 'Duración del día', 'Zona horaria'],
            rows: [
              ['Normal', 'Día calendario, de 00:00 a 23:59.', 'Colombia (America/Bogota)'],
              ['Nocturno', 'De 06:00 a 06:00 del día siguiente.', 'Colombia (America/Bogota)'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Los reportes de ventas, comisiones y billar usan el día operativo. Sin fechas, se toma el mes en curso. La caja sin fechas muestra todo su historial.',
          },
        ],
      },
      {
        id: 'borrado-logico',
        title: 'Borrado lógico e historial',
        blocks: [
          {
            kind: 'list',
            items: [
              'Lo que se elimina (ventas, productos, clientes, empleados…) no se borra físicamente: se marca como eliminado, con quién y cuándo, y deja de aparecer.',
              'Una venta eliminada se puede consultar en su detalle.',
              'Un nombre de usuario sigue reservado aunque el empleado se elimine.',
              'Los abonos de clientes no se eliminan. Los domicilios no se eliminan: se cancelan y queda el registro.',
              'El historial de cada producto guarda creaciones, ediciones, ajustes, compras y menudeos; las entradas de ventas se conservan 30 días.',
            ],
          },
        ],
      },
      {
        id: 'cantidades-y-redondeos',
        title: 'Cantidades y redondeos',
        blocks: [
          {
            kind: 'table',
            caption: 'Reglas de cálculo',
            columns: ['Dato', 'Regla'],
            rows: [
              ['Cantidades por unidad', 'Números enteros mayores que cero.'],
              ['Cantidades por peso', 'Gramos enteros; los precios son por kilo.'],
              [
                'Cobro de una línea por peso',
                'Se redondea al múltiplo de $50 más cercano; la mitad sube. Una línea que da $0 se rechaza.',
              ],
              [
                'Tiempo de billar',
                'Minutos redondeados hacia arriba (mínimo 1) por la tarifa por hora; el valor también se redondea hacia arriba.',
              ],
              [
                'Costo de un suelto al menudear',
                'Costo real de la cajetilla dividido entre sus unidades, con 2 decimales.',
              ],
              ['Abonos', 'Se aplican a las ventas fiadas de la más antigua a la más nueva.'],
              [
                'Medios de pago',
                'Deben sumar exactamente el total (o el abono, en una venta a crédito).',
              ],
            ],
          },
        ],
      },
      {
        id: 'imagenes',
        title: 'Imágenes de productos',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Se aceptan PNG, JPG o WebP de hasta 300 KB; el tipo se comprueba por el contenido del archivo, no por su nombre. La web reduce la imagen a 512 píxeles por lado antes de subirla. Al cambiar una imagen, la anterior se borra.',
          },
        ],
      },
    ],
  },
  {
    slug: 'roles-y-permisos',
    title: 'Catálogo de permisos',
    summary: 'Todos los permisos que el dueño puede dar a sus empleados, agrupados como en la web.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'como-funcionan',
        title: 'Cómo funcionan',
        blocks: [
          {
            kind: 'list',
            items: [
              'Los permisos se asignan por empleado en Empleados → Permisos y se aplican al guardar.',
              'Activar cualquier permiso de un grupo activa también el de ver ese grupo; apagar el de ver apaga el grupo, salvo “Menudear cigarrillos”, que es independiente.',
              'Algunos permisos no se pueden dar a un empleado: quedan reservados al dueño.',
            ],
          },
        ],
      },
      {
        id: 'inventario-y-ventas',
        title: 'Inventario y ventas',
        blocks: [
          {
            kind: 'table',
            caption: 'Permisos de inventario y ventas',
            columns: ['Grupo', 'Permiso', 'Qué permite', 'Para empleados'],
            rows: [
              ['Inventario', 'Ver inventario', 'Entrar a Inventario y sus pantallas.', 'Sí'],
              ['Inventario', 'Crear productos', 'Agregar productos.', 'Sí'],
              ['Inventario', 'Editar productos', 'Cambiar datos y precios.', 'Sí'],
              [
                'Inventario',
                'Eliminar productos',
                'Mostrar la opción de eliminar.',
                'Solo en pantalla: eliminar es del dueño',
              ],
              ['Inventario', 'Generar reporte', 'Ver y descargar el reporte general.', 'Sí'],
              ['Inventario', 'Ver lotes', 'Ver lotes e historial de un producto.', 'Sí'],
              [
                'Inventario',
                'Menudear cigarrillos',
                'Abrir cajetillas para vender sueltos, sin más acceso al inventario.',
                'Sí',
              ],
              ['Ventas', 'Ver ventas', 'Entrar a Registrar Venta y al historial.', 'Sí'],
              ['Ventas', 'Crear ventas', 'Registrar ventas.', 'Sí'],
              ['Ventas', 'Editar ventas', 'Hoy no habilita ninguna pantalla.', 'Sí'],
              ['Ventas', 'Eliminar ventas', 'Eliminar una venta.', 'No'],
              ['Ventas', 'Ver ganancias', 'Ver la utilidad de las ventas.', 'Sí'],
              [
                'Ventas',
                'Ver estadísticas de ventas',
                'Ver las gráficas de la pestaña Resumen.',
                'Sí',
              ],
              ['Ventas', 'Ver total de ventas', 'Ver los totales vendidos en el historial.', 'Sí'],
              [
                'Ventas',
                'Modificar precio en venta',
                'Cobrar un producto a otro precio. Por defecto, solo el dueño.',
                'Sí',
              ],
            ],
          },
        ],
      },
      {
        id: 'compras-y-contactos',
        title: 'Compras, proveedores, clientes y empleados',
        blocks: [
          {
            kind: 'table',
            caption: 'Permisos de compras, proveedores, clientes y empleados',
            columns: ['Grupo', 'Permiso', 'Qué permite', 'Para empleados'],
            rows: [
              ['Compras', 'Ver compras', 'Ver la lista de compras.', 'Sí'],
              [
                'Compras',
                'Crear compras',
                'Registrar compras en la app Android. En la web, terminar una compra pide además “Crear ventas”.',
                'Sí',
              ],
              [
                'Compras',
                'Editar compras',
                'Hoy no habilita nada: las compras no se editan.',
                'Sí',
              ],
              [
                'Compras',
                'Eliminar compras',
                'Mostrar la opción de eliminar.',
                'Solo en pantalla: eliminar es del dueño',
              ],
              ['Compras', 'Ver detalle de compra', 'Abrir el detalle de una compra.', 'Sí'],
              ['Proveedores', 'Ver proveedores', 'Ver la lista.', 'Sí'],
              ['Proveedores', 'Crear proveedores', 'Agregar proveedores.', 'Sí'],
              ['Proveedores', 'Editar proveedores', 'Cambiar sus datos.', 'Sí'],
              [
                'Proveedores',
                'Eliminar proveedores',
                'Mostrar la opción de eliminar.',
                'Solo en pantalla: eliminar es del dueño',
              ],
              ['Clientes', 'Ver clientes', 'Ver la lista.', 'Sí'],
              ['Clientes', 'Crear clientes', 'Agregar clientes.', 'Sí'],
              ['Clientes', 'Editar clientes', 'Cambiar sus datos.', 'Sí'],
              [
                'Clientes',
                'Eliminar clientes',
                'Mostrar la opción de eliminar.',
                'Solo en pantalla: eliminar es del dueño',
              ],
              [
                'Clientes',
                'Gestionar cartera y abonos',
                'Ver la cartera y registrar abonos.',
                'Sí',
              ],
              ['Empleados', 'Ver empleados', 'Ver la lista de empleados.', 'No'],
              ['Empleados', 'Crear empleados', 'Agregar empleados.', 'No'],
              ['Empleados', 'Editar empleados', 'Cambiar sus datos.', 'No'],
              ['Empleados', 'Eliminar empleados', 'Eliminarlos.', 'No'],
              [
                'Empleados',
                'Actualizar permisos de empleados',
                'Cambiar los permisos de otros.',
                'No',
              ],
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'La Caja no tiene permiso propio: siempre es solo del dueño.',
          },
        ],
      },
    ],
  },
  {
    slug: 'solucion-de-problemas',
    title: 'Solución de problemas',
    summary: 'Los mensajes más comunes de Pensil.Pos, qué significan y qué hacer.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'ingreso-y-sesion',
        title: 'Ingreso y sesión',
        blocks: [
          {
            kind: 'table',
            caption: 'Mensajes de ingreso y sesión',
            columns: ['Mensaje', 'Qué significa', 'Qué hacer'],
            rows: [
              [
                'Usuario o contraseña incorrectos',
                'El usuario no existe, está eliminado o la contraseña no coincide.',
                'Revisa los datos o usa “¿Olvidaste tu contraseña?”.',
              ],
              [
                'Primero debes registrar tu establecimiento.',
                'La cuenta aún no tiene negocio.',
                'Completa el registro del negocio.',
              ],
              [
                'La sesión ha expirado. Por favor inicia sesión nuevamente.',
                'La sesión venció o se cerró desde otro lado.',
                'Ingresa de nuevo.',
              ],
              [
                'El negocio no está disponible, por favor contacte al administrador',
                'El negocio fue desactivado.',
                'Contacta a Pensil.Devs.',
              ],
              [
                'El enlace de recuperación ha expirado. Solicita uno nuevo.',
                'Pasaron más de 30 minutos.',
                'Pide un enlace nuevo.',
              ],
              [
                'La contraseña actual es incorrecta.',
                'Al cambiar la contraseña, la actual no coincide.',
                'Escríbela de nuevo; si no la recuerdas, recupérala por correo.',
              ],
              [
                'No tienes permiso para realizar esta acción',
                'Tu rol o tus permisos no lo permiten.',
                'Pide al dueño el permiso.',
              ],
            ],
          },
        ],
      },
      {
        id: 'ventas-y-carritos',
        title: 'Ventas y carritos',
        blocks: [
          {
            kind: 'table',
            caption: 'Mensajes de ventas y carritos',
            columns: ['Mensaje', 'Qué significa', 'Qué hacer'],
            rows: [
              [
                'El producto … no tiene suficiente existencia. Disponible: …, requerido: …',
                'No hay unidades suficientes.',
                'Baja la cantidad, registra la compra o corrige el conteo en Hacer Inventario.',
              ],
              [
                'La venta no puede quedar por debajo del costo.',
                'Con los precios elegidos la venta da pérdida.',
                'Revisa el precio personalizado o los precios del producto.',
              ],
              [
                'El carrito cambió. Revísalo e intenta cobrar de nuevo.',
                'Otro equipo cambió el carrito mientras cobrabas.',
                'Revisa el carrito y cobra otra vez.',
              ],
              [
                'El carrito se está cobrando en este momento.',
                'Otro equipo está cobrando.',
                'Espera a que termine; el bloqueo vence solo a los 4 minutos.',
              ],
              [
                'El carrito se está modificando desde otro dispositivo. Intenta de nuevo.',
                'Dos cambios llegaron a la vez.',
                'Repite la acción.',
              ],
              [
                'Faltan $… para completar el pago',
                'Los medios de pago no suman el total.',
                'Ajusta los valores de cada medio.',
              ],
              [
                'El establecimiento está en mora: solo se permite 1 producto por venta.',
                'El servicio tiene 35 días o más sin pago.',
                'Paga y contacta a Pensil.Devs.',
              ],
              [
                'La mesa de billar no tiene una sesión activa. Inicie el tiempo antes de confirmar la venta.',
                'El tiempo del billar no está corriendo.',
                'Abre la mesa desde la lista para iniciar el tiempo.',
              ],
            ],
          },
        ],
      },
      {
        id: 'inventario-y-compras',
        title: 'Inventario y compras',
        blocks: [
          {
            kind: 'table',
            caption: 'Mensajes de inventario y compras',
            columns: ['Mensaje', 'Qué significa', 'Qué hacer'],
            rows: [
              [
                'Ya existe un producto con ese nombre',
                'El nombre está repetido en tu negocio.',
                'Usa otro nombre o edita el existente.',
              ],
              [
                'El precio de venta debe ser mayor o igual al precio de compra',
                'El producto quedaría con pérdida.',
                'Corrige los precios.',
              ],
              [
                'El inventario de este producto cambió desde que se cargó la pantalla…',
                'Otra persona ajustó el mismo producto.',
                'Actualiza el valor e intenta de nuevo.',
              ],
              [
                'No se puede eliminar una compra con productos que ya fueron vendidos.',
                'Parte de esa mercancía ya se vendió.',
                'Corrige con Hacer Inventario en lugar de eliminar la compra.',
              ],
              [
                'Ya pasó el tiempo para deshacer este menudeo…',
                'Pasaron más de 5 minutos.',
                'Corrige las existencias desde Hacer Inventario.',
              ],
              [
                'La imagen no puede pesar más de 300 KB',
                'La imagen es muy pesada.',
                'Usa una imagen más pequeña o en WebP.',
              ],
              [
                'Tu tipo de negocio no tiene este módulo',
                'La función no está habilitada para tu tipo de negocio (por ejemplo, productos por peso).',
                'Si tu tipo de negocio está mal, pide el cambio a Pensil.Devs.',
              ],
            ],
          },
        ],
      },
      {
        id: 'conexion-e-impresion',
        title: 'Conexión e impresión',
        blocks: [
          {
            kind: 'list',
            items: [
              '“Sin conexión. Espera a que vuelva la conexión.”: revisa el internet del equipo; al volver, la pantalla se actualiza sola.',
              'Si la pantalla se ve desactualizada o algo falla de forma rara, recarga la página; si sigue, usa “Cerrar sesión total” y vuelve a ingresar.',
              'Para los errores de la impresora, mira el artículo Impresión de tickets.',
            ],
          },
        ],
      },
      {
        id: 'soporte',
        title: 'Contactar al soporte',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Las alertas de error de la web incluyen un enlace de WhatsApp al soporte técnico de Pensil.Pos. También puedes escribir a Pensil.Devs desde pensildevs.com.',
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Para que te ayuden más rápido, cuenta el mensaje exacto, qué estabas haciendo, desde qué equipo (web o app) y a qué hora pasó. Nunca compartas tu contraseña.',
          },
        ],
      },
    ],
  },
  {
    slug: 'integraciones',
    title: 'Integraciones y exportación de datos',
    summary: 'Qué datos puedes sacar de Pensil.Pos y cómo pedir una integración.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'api',
        title: 'No hay API pública',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pensil.Pos no ofrece una API pública para terceros. El servidor solo atiende a la web, a la app Android y al servicio local de impresión de Pensil.Pos.',
          },
        ],
      },
      {
        id: 'exportar',
        title: 'Datos que puedes exportar',
        blocks: [
          {
            kind: 'list',
            items: [
              'El reporte general de inventario se descarga en Excel con tres hojas: resumen, categorías y productos (requiere el permiso “Generar reporte”).',
              'Los tickets de cada venta se pueden reimprimir desde el historial.',
            ],
          },
        ],
      },
      {
        id: 'pedir-una-integracion',
        title: 'Pedir una integración',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Si necesitas conectar Pensil.Pos con tu contabilidad, facturación electrónica, otra báscula u otro sistema, contáctalo con Pensil.Devs en pensildevs.com. Cada integración se acuerda y se desarrolla con su equipo.',
          },
        ],
      },
    ],
  },
];
