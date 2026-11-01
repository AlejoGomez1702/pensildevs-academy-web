import type { RawDocArticle } from '../raw-documentation';

/** Functional documentation of Pensil.Pos: how owners, managers and employees use it. */
export const PENSIL_POS_FUNCTIONAL: readonly RawDocArticle[] = [
  {
    slug: 'primeros-pasos',
    title: 'Primeros pasos',
    summary:
      'Qué es Pensil.Pos, cómo crear tu cuenta, registrar tu negocio y moverte por el menú, en la web y en la app Android.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'que-es-pensil-pos',
        title: 'Qué es Pensil.Pos',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pensil.Pos es el sistema de punto de venta e inventario de Pensil.Devs para negocios pequeños: tiendas, licorerías, bares, restaurantes, billares y fruvers. Con él vendes, controlas tus existencias, registras compras, llevas la cartera de tus clientes y ves cómo va tu negocio.',
          },
          {
            kind: 'list',
            items: [
              'La web (pensilpos.com) tiene todas las funciones: ventas, inventario, compras, clientes, caja, empleados y reportes.',
              'La app Android está pensada para los empleados en el piso: Venta rápida, Mesas, Domicilios y, si tienen permiso, Compras.',
              'Todo lo que haces en un equipo se ve al instante en los demás: el carrito, las cuentas de las mesas y los domicilios son compartidos.',
            ],
          },
        ],
      },
      {
        id: 'crear-cuenta',
        title: 'Crear tu cuenta',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a pensilpos.com y elige “Crea una gratis”.',
              'Escribe tu nombre completo, tu correo, tu nombre de usuario, tu celular y una contraseña, y toca “Crear cuenta”. También puedes usar “Registrarte con Google”.',
              'Al terminar entras directo a registrar tu negocio.',
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Quien crea la cuenta queda como dueño (administrador) del negocio. Los empleados no se registran solos: el dueño los crea desde Empleados.',
          },
        ],
      },
      {
        id: 'registrar-negocio',
        title: 'Registrar tu negocio',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Elige el “Tipo de negocio”.',
              'Escribe el “Nombre del negocio”. El NIT, el celular y el correo son opcionales.',
              'Marca “¿Es nocturno?” si tu negocio opera pasada la medianoche.',
              'Acepta los términos y toca “Terminar registro”.',
            ],
          },
          {
            kind: 'table',
            caption: 'Tipos de negocio y lo que habilita cada uno',
            columns: ['Tipo de negocio', 'Mesas', 'Mesas de billar', 'Venta por peso'],
            rows: [
              ['Licorería, estanquillo, bar, cantina', 'Sí', 'No', 'No'],
              ['Restaurante', 'Sí', 'No', 'No'],
              ['Fábrica de arepas', 'No', 'No', 'No'],
              ['Tienda naturista', 'No', 'No', 'No'],
              ['Billares', 'Sí', 'Sí', 'No'],
              ['Fruver (frutas y verduras)', 'No', 'No', 'Sí'],
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'El tipo de negocio y el horario nocturno no se cambian desde tu cuenta. Elígelos bien; si necesitas cambiarlos, pídelo a Pensil.Devs. El tipo también decide qué categorías de productos tienes disponibles.',
          },
        ],
      },
      {
        id: 'ingresar',
        title: 'Ingresar a Pensil.Pos',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En la web, escribe tu usuario o tu correo y tu contraseña, y toca “Iniciar sesión”. Si creaste la cuenta con Google, usa “Continuar con Google”.',
              'En la app Android, escribe tu “Usuario o correo” y tu “Contraseña”.',
            ],
          },
          {
            kind: 'list',
            items: [
              'En la app, “Recordar usuario” guarda tu usuario y mantiene la sesión abierta. Si lo desmarcas, la sesión se cierra cuando cierres la app.',
              'En la web la sesión dura lo mismo con o sin “Recordar sesión”: sigue abierta hasta que la cierres.',
              'El dueño y los empleados con establecimiento entran al panel del negocio. Quien todavía no registró su negocio va primero a registrarlo.',
            ],
          },
        ],
      },
      {
        id: 'recorrido-del-menu',
        title: 'Recorrido del menú',
        blocks: [
          {
            kind: 'paragraph',
            text: 'El menú lateral de la web muestra solo lo que tu usuario tiene permiso de ver. Arriba están los accesos rápidos “Registrar Venta” y “Registrar Compra”.',
          },
          {
            kind: 'table',
            caption: 'Opciones del menú de la web',
            columns: ['Opción', 'Para qué sirve'],
            rows: [
              ['Dashboard', 'Tarjetas de acceso rápido a cada sección.'],
              [
                'Inventario',
                'Ver Inventario, Comparar Precios, Hacer Inventario y Menudear (cigarrillos).',
              ],
              ['Ventas', 'Ver Todas (historial y reportes) y Registrar Nueva.'],
              ['Compras', 'Ver Todas y Registrar Nueva.'],
              ['Proveedores', 'Tus proveedores.'],
              ['Clientes', 'Tus clientes y su cartera (fiados y abonos).'],
              ['Empleados', 'Crear empleados y darles permisos.'],
              ['Caja', 'Ingresos y egresos de dinero. Solo el dueño.'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'En la app Android las pestañas de abajo son Venta rápida, Mesas (si tu negocio tiene mesas), Domicilios y Compras (si tienes permiso para crear compras).',
          },
        ],
      },
      {
        id: 'tema-claro-oscuro',
        title: 'Tema claro, oscuro o del sistema',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Puedes ver Pensil.Pos en tema “Claro”, “Oscuro” o “Sistema” (sigue la configuración de tu equipo). En la web está en el botón de tema de la barra superior; en la app, en el menú de tu cuenta, opción “Tema”. La preferencia se guarda en cada equipo.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ventas',
    title: 'Ventas',
    summary:
      'Cómo vender con Venta Rápida, cobrar en efectivo o con varios medios de pago, fiar a un cliente, imprimir el ticket y revisar el historial.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'venta-rapida',
        title: 'Venta Rápida: un carrito compartido',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Entra a “Registrar Venta”. La primera pestaña es “Venta Rápida”. Tu negocio tiene un solo carrito de venta rápida, compartido por todos los equipos: si un empleado agrega un producto desde la app, lo ves en la web al instante, y al revés.',
          },
          {
            kind: 'list',
            items: [
              'Arriba verás “En vivo” cuando el equipo está conectado. Con “Conectando…” o “Sin conexión” no puedes editar: espera a que vuelva la conexión.',
              'Mientras alguien está cobrando, el carrito queda bloqueado para los demás hasta que termine o cancele el cobro.',
            ],
          },
        ],
      },
      {
        id: 'agregar-productos',
        title: 'Agregar productos y cantidades',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Busca el producto por nombre, código interno o código de barras (sirve un lector de códigos) y elígelo.',
              'Si lo eliges otra vez, suma una unidad. Usa “Sumar” y “Restar” o escribe la cantidad.',
              'Para quitar una línea usa “Eliminar”.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Precio para llevar: si el producto tiene un segundo precio, indica en “Llevar” cuántas unidades van a ese precio.',
              'Precio personalizado: cobra algunas unidades a otro precio. Necesitas el permiso “Modificar precio en venta”, que por defecto solo tiene el dueño.',
              'Mesero: elige quién atendió. Si no existe, puedes crearlo ahí mismo escribiendo su nombre; queda creado como empleado.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Un producto que controla existencias no se puede vender si no hay suficiente. Pensil.Pos te dice cuánto hay disponible, no registra la venta y envía un correo de alerta al negocio.',
          },
        ],
      },
      {
        id: 'cobrar',
        title: 'Cobrar',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Toca “Terminar venta”.',
              'Elige “Contado” o “A Crédito”.',
              'Elige el medio de pago: Efectivo, Nequi, Daviplata, Davivienda o Bancolombia.',
              'En efectivo, responde “¿Con cuánto paga el cliente?”: toca el billete que te entregan o el pago exacto, y Pensil.Pos te muestra la devuelta.',
              'Si pagan con dos medios, usa “Dividir cuenta”: el total se reparte en partes iguales y puedes ajustar cada valor. La suma debe dar el total exacto.',
              'Confirma el cobro.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Al cobrar, el carrito queda vacío y sin mesero, listo para la siguiente venta.',
              'La venta queda a nombre del mesero si elegiste uno; si no, a nombre de quien cobró.',
              'En la app el cobro se hace con un solo medio de pago.',
            ],
          },
        ],
      },
      {
        id: 'venta-a-credito',
        title: 'Venta a crédito (fiado)',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En el cobro elige “A Crédito”.',
              'Busca el cliente por nombre o cédula, o toca “+ Agregar cliente” para crearlo.',
              'Si el cliente deja algo, usa “+ Agregar abono y medio de pago”. Si no, queda “Sin abono inicial”.',
              'Revisa el “Valor a crédito” y confirma.',
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Si el abono cubre todo el total, la venta se registra como de contado. Lo que el cliente queda debiendo aparece en su cartera (Clientes → Ver Cartera).',
          },
        ],
      },
      {
        id: 'reglas-de-la-venta',
        title: 'Reglas que debes conocer',
        blocks: [
          {
            kind: 'list',
            items: [
              'Una venta no puede quedar por debajo del costo. Si los precios que pusiste hacen que pierdas plata, verás “La venta no puede quedar por debajo del costo.”',
              'La comisión del mesero solo se cuenta en las unidades vendidas a precio normal y solo si la venta tiene mesero.',
              'Si dos personas cobran a la vez y el carrito cambió, verás que el carrito cambió: revísalo y cobra de nuevo.',
            ],
          },
        ],
      },
      {
        id: 'imprimir-ticket',
        title: 'Imprimir el ticket',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Después de cobrar aparece un aviso con el botón “Imprimir”. También puedes imprimir cualquier venta desde el historial con “Imprimir Ticket”. Según cómo esté configurado tu negocio, se abre el diálogo de impresión del navegador o el ticket sale directo por la impresora térmica del local.',
          },
        ],
      },
      {
        id: 'historial-de-ventas',
        title: 'Historial de ventas',
        blocks: [
          {
            kind: 'paragraph',
            text: 'En Ventas → Ver Todas eliges el rango de fechas (“Hoy”, “Este Mes” o las fechas que quieras) y ves estas pestañas:',
          },
          {
            kind: 'table',
            caption: 'Pestañas del historial de ventas',
            columns: ['Pestaña', 'Qué muestra'],
            rows: [
              ['Resumen', 'Gráficas de ventas, productos más vendidos y ventas por medio de pago.'],
              [
                'Billares',
                'El tiempo cobrado en las mesas de billar (solo en billares con datos).',
              ],
              ['Comisiones', 'Las comisiones de cada mesero (aparece cuando hay comisiones).'],
              ['Ventas', 'La lista de ventas con “Ver Detalle”, “Imprimir Ticket” y “Eliminar”.'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Un empleado solo ve sus propias ventas.',
              'Eliminar una venta es solo para el dueño. Las existencias vuelven a los mismos lotes de donde salieron y la venta queda marcada como “Venta eliminada”.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'mesas-y-billares',
    title: 'Mesas y billares',
    summary:
      'Crea mesas normales y de billar, abre su cuenta compartida, toma notas, cobra y maneja el tiempo de billar.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'quien-tiene-mesas',
        title: 'Qué negocios tienen mesas',
        blocks: [
          {
            kind: 'paragraph',
            text: 'La pestaña “Mesas” de Registrar Venta aparece en licorerías y bares, restaurantes y billares. Las mesas de billar solo aparecen en los billares.',
          },
        ],
      },
      {
        id: 'crear-mesas',
        title: 'Crear y editar mesas',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En la pestaña Mesas toca “Agregar mesa” (o “Crear mesa de billar” en la sección “Mesas de billar”).',
              'Escribe el nombre. En una mesa normal puedes indicar la “Cantidad de puestos”.',
              'En una mesa de billar indica el “Precio por hora” y el “Tipo de mesa de billar”: Pool, Libre o 3 Bandas.',
              'Para editar o eliminar, usa el menú de tres puntos de la mesa: “Editar” o “Eliminar”.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'No puedes eliminar ni cambiar de tipo una mesa que tiene productos en su cuenta o un billar con el tiempo corriendo. Cóbrala o vacíala primero.',
          },
        ],
      },
      {
        id: 'cuenta-de-la-mesa',
        title: 'Abrir la mesa y su cuenta compartida',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Toca “Abrir mesa”. Se abre la cuenta de esa mesa en su propia página.',
              'Agrega productos igual que en Venta Rápida, con precio para llevar, precio personalizado y mesero.',
              'Vuelve a la lista con la flecha de regreso. La cuenta queda guardada.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Cada mesa tiene una sola cuenta, compartida entre la web y la app: el mesero agrega desde el celular y la caja cobra desde el computador.',
              'Notas: escribe en “Notas de la mesa” lo que necesites recordar (hasta 10 notas de 60 caracteres, sin repetir).',
              'Para dejar la mesa sin productos sin cobrar, usa “Vaciar mesa”.',
            ],
          },
        ],
      },
      {
        id: 'cobrar-una-mesa',
        title: 'Cobrar una mesa',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Toca “Terminar venta” y cobra igual que en Venta Rápida. La venta lleva la nota “Mesa” con el nombre de la mesa. Después del cobro la cuenta queda vacía, sin notas ni mesero.',
          },
        ],
      },
      {
        id: 'tiempo-de-billar',
        title: 'El tiempo de billar',
        blocks: [
          {
            kind: 'list',
            items: [
              'Al abrir una mesa de billar empieza a correr su tiempo. Si ya corría, no se reinicia.',
              'En la cuenta ves el “Tiempo en curso” y el “Cobro estimado tiempo”.',
              'El tiempo solo se detiene al cobrar. Si la mesa no tiene productos, el botón dice “Cobrar tiempo”.',
              'Se cobran los minutos jugados redondeados hacia arriba, con mínimo 1 minuto, según el precio por hora de la mesa.',
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Ejemplo: una mesa de $12.000 la hora usada 30 minutos y 10 segundos se cobra como 31 minutos: $6.200.',
          },
        ],
      },
    ],
  },
  {
    slug: 'domicilios',
    title: 'Domicilios',
    summary:
      'Registra pedidos a domicilio, sigue su estado, asigna el domiciliario, cóbralos o cancélalos.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'crear-domicilio',
        title: 'Crear un domicilio',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En Registrar Venta abre la pestaña “Domicilios” y toca “Agregar domicilio”.',
              'Busca o crea el cliente. Todo domicilio necesita un cliente.',
              'Revisa el teléfono y la dirección. Si los dejas vacíos, se usan los del cliente.',
              'Escribe el “Costo del domicilio” (puede ser $0).',
              'Agrega los productos del pedido.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Los domicilios son compartidos: se crean y se editan igual desde la app Android.',
          },
        ],
      },
      {
        id: 'estados',
        title: 'Estados del pedido',
        blocks: [
          {
            kind: 'table',
            caption: 'Estados de un domicilio',
            columns: ['Estado', 'Qué significa', 'Botón para avanzar'],
            rows: [
              ['Pendiente', 'El pedido está creado.', '“En preparación”'],
              ['En preparación', 'Lo están alistando.', '“Despachar”'],
              ['En camino', 'Salió con el domiciliario.', '“Cobrar”'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Un pedido cobrado o cancelado sale de la lista y ya no se puede modificar.',
          },
        ],
      },
      {
        id: 'domiciliario',
        title: 'Asignar el domiciliario',
        blocks: [
          {
            kind: 'paragraph',
            text: 'En el pedido elige el “Domiciliario” entre tus empleados. Al cobrar, cuenta como el mesero de la venta.',
          },
        ],
      },
      {
        id: 'cobrar-o-cancelar',
        title: 'Cobrar o cancelar',
        blocks: [
          {
            kind: 'list',
            items: [
              'Cobrar: el cliente del pedido queda fijo en la venta y el costo del domicilio se suma al total.',
              'Cancelar: usa “Cancelar pedido” y confirma. Queda registrado quién lo canceló, cuándo y qué productos tenía.',
              'Los domicilios no se borran: un pedido que ya no va se cancela.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'No puedes cancelar un pedido mientras otra persona lo está cobrando.',
          },
        ],
      },
    ],
  },
  {
    slug: 'inventario',
    title: 'Inventario',
    summary:
      'Crea productos, controla existencias, haz inventario, entiende los lotes, menudea cajetillas y saca el reporte general.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'crear-productos',
        title: 'Crear y editar productos',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Inventario → Ver Inventario y toca “Agregar Producto”.',
              'Escribe el “Nombre del producto” y elige la “Categoría”.',
              'Si quieres, agrega el código y el código de barras.',
              'Escribe el precio de venta, el precio de compra y, si aplica, el “Precio para llevar” y la “Comisión del mesero”.',
              'Si quieres, toca la foto para elegir una imagen.',
              'Decide si el producto controla existencias (ver abajo) y guarda.',
            ],
          },
          {
            kind: 'list',
            items: [
              'El nombre y el código no se pueden repetir dentro de tu negocio.',
              'El precio de venta y el precio para llevar no pueden ser menores que el precio de compra.',
              'La comisión no puede superar la ganancia del producto (precio de venta menos precio de compra).',
              'Las categorías vienen definidas por Pensil.Devs según tu tipo de negocio.',
              'La imagen puede ser PNG, JPG o WebP. Pensil.Pos la reduce sola; el resultado no puede pasar de 300 KB.',
              'Eliminar un producto es solo para el dueño.',
            ],
          },
        ],
      },
      {
        id: 'controlar-existencias',
        title: 'Productos que controlan existencias y los que no',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Con “Controlar existencias” activado, Pensil.Pos descuenta cada venta y suma cada compra, y no deja vender más de lo que hay. Desactívalo en productos que no cuentas (por ejemplo, un servicio o algo que preparas al momento): esos se venden sin límite y no mueven inventario.',
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Un producto nuevo empieza sin control de existencias: actívalo y escribe la existencia actual si quieres contarlo. Después puedes prenderlo o apagarlo desde el mismo formulario o desde Hacer Inventario. Al apagarlo, las unidades que quedaban se dan de baja.',
          },
        ],
      },
      {
        id: 'hacer-inventario',
        title: 'Hacer Inventario',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Inventario → Hacer Inventario y busca el producto.',
              'Escribe la cantidad física que contaste. Se guarda sola en un momento, o al salir del campo.',
              'Con el interruptor “Maneja inventario” activas o desactivas el control de existencias de cada producto.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Al desactivar el control, Pensil.Pos te pide confirmar y da de baja las unidades que quedaban.',
              'Al activarlo, la cantidad que escribas es el conteo inicial.',
              'Si otra persona cambió el inventario de ese producto mientras tenías la pantalla abierta, te avisa para que actualices el valor y lo intentes de nuevo.',
            ],
          },
        ],
      },
      {
        id: 'lotes-y-costo-real',
        title: 'Lotes y costo real',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Cada compra entra como un lote con su propio precio de compra. Cuando vendes, Pensil.Pos saca primero de lo más viejo. Así la ganancia de cada venta se calcula con lo que de verdad te costó esa mercancía, aunque el precio del proveedor haya cambiado.',
          },
          {
            kind: 'paragraph',
            text: 'En “Ver detalle” de un producto (con el permiso “Ver lotes”) ves sus “Lotes de inventario” y el “Historial de cambios”: ventas, compras, ajustes y ediciones.',
          },
        ],
      },
      {
        id: 'menudear-cajetillas',
        title: 'Menudear cajetillas',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Si vendes cigarrillos sueltos, enlaza la cajetilla con su producto suelto: en el formulario de la cajetilla activa “¿Se puede menudear?”, elige el “Producto suelto” y las “Unidades por cajetilla”. El producto suelto debe controlar existencias.',
          },
          {
            kind: 'steps',
            items: [
              'Entra a Inventario → Menudear (o usa “Menudear” en la fila del producto).',
              'Busca la cajetilla y responde “¿Cuántas cajetillas vas a abrir?”.',
              'Confirma. Las cajetillas bajan y los sueltos suben, con el costo real repartido por unidad.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Puedes deshacer un menudeo una sola vez y solo durante 5 minutos, siempre que no se haya vendido ningún suelto de ese menudeo. Después corrige las existencias desde Hacer Inventario.',
          },
        ],
      },
      {
        id: 'reporte-general',
        title: 'Reporte general y comparar precios',
        blocks: [
          {
            kind: 'list',
            items: [
              'En Ver Inventario, la pestaña “Reporte” muestra la existencia, el costo promedio, el valor a costo, el valor a venta y la utilidad de cada producto. Necesitas el permiso “Generar reporte”.',
              'Desde el reporte puedes descargar un archivo de Excel con el resumen, las categorías y los productos.',
              'Inventario → Comparar Precios te muestra el precio de compra y el de venta de cada producto, y marca con “Revisar precio” los que deberías ajustar.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'compras-y-proveedores',
    title: 'Compras y proveedores',
    summary:
      'Registra tus proveedores y las compras que hacen crecer tu inventario, y entiende cuándo se puede eliminar una compra.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'proveedores',
        title: 'Proveedores',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Proveedores y toca “Agregar Proveedor”.',
              'Escribe el nombre, la cédula o NIT y los datos de contacto, y guarda.',
            ],
          },
          {
            kind: 'list',
            items: [
              'No puede haber dos proveedores con el mismo nombre y la misma cédula o NIT.',
              'El nombre se guarda con cada palabra en mayúscula inicial.',
              'Eliminar un proveedor es solo para el dueño.',
            ],
          },
        ],
      },
      {
        id: 'registrar-compra',
        title: 'Registrar una compra',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a “Registrar Compra”.',
              'En “Buscar producto” elige cada producto y ajusta la cantidad con “Sumar” y “Restar”.',
              'Si el precio de compra cambió, usa “Modificar precio” en la línea.',
              'Toca “Terminar compra”.',
              'En “Finalizar Compra” elige el “Proveedor” (o créalo ahí), indica con cuánto se paga y toca “Finalizar”.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Cada línea entra como un lote nuevo con el precio de compra de esa compra; el precio de compra guardado en el producto no cambia.',
              'Solo suman existencias los productos que controlan existencias.',
              'Una compra a medias queda guardada en ese navegador aunque recargues la página.',
              'Desde la app Android también puedes registrar compras si tienes el permiso “Crear compras”.',
            ],
          },
        ],
      },
      {
        id: 'ver-y-eliminar-compras',
        title: 'Ver y eliminar compras',
        blocks: [
          {
            kind: 'paragraph',
            text: 'En Compras → Ver Todas eliges el rango de fechas; sin rango ves las del mes en curso. Cada compra tiene “Ver Detalle” y “Eliminar”. Las compras no se editan: si te equivocaste, el dueño la elimina y se registra de nuevo.',
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'No se puede eliminar una compra con productos que ya fueron vendidos. Al eliminarla, sus unidades salen del inventario.',
          },
        ],
      },
    ],
  },
  {
    slug: 'clientes-y-cartera',
    title: 'Clientes y cartera',
    summary: 'Registra tus clientes, revisa lo que te deben y recibe abonos a sus fiados.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'clientes',
        title: 'Clientes',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Clientes y toca “Agregar Cliente”.',
              'Escribe el nombre completo, la cédula o NIT, el celular, el correo y la dirección, y guarda.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'No puede haber dos clientes con el mismo nombre y la misma cédula o NIT. La columna “Deuda” muestra lo que te debe cada uno. Eliminar un cliente es solo para el dueño.',
          },
        ],
      },
      {
        id: 'cartera',
        title: 'La cartera de un cliente',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Con el permiso “Gestionar cartera y abonos”, toca “Ver Cartera” en la fila del cliente. Ves su “Deuda total” y cada venta pendiente con su total, lo abonado y el saldo.',
          },
        ],
      },
      {
        id: 'abonos',
        title: 'Recibir un abono',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En la cartera toca “Registrar Abono”.',
              'Escribe el “Monto a abonar” y, si quieres, una nota.',
              'Confirma.',
            ],
          },
          {
            kind: 'list',
            items: [
              'El abono se aplica primero a la deuda más antigua y sigue con las más nuevas.',
              'No puedes abonar más de lo que el cliente debe.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Un abono registrado no se puede borrar. Revisa bien el monto antes de confirmar.',
          },
        ],
      },
    ],
  },
  {
    slug: 'caja',
    title: 'Caja',
    summary: 'Registra las entradas y salidas de dinero que no son ventas ni compras.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'que-es-la-caja',
        title: 'Para qué sirve la Caja',
        blocks: [
          {
            kind: 'paragraph',
            text: 'En Caja anotas el dinero que entra o sale por otros motivos: la base del día, un pago de servicios, un retiro del dueño. Solo el dueño ve y usa esta sección.',
          },
        ],
      },
      {
        id: 'registrar-movimientos',
        title: 'Registrar ingresos y egresos',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Caja.',
              'Toca “Registrar Ingreso” o “Registrar Egreso”.',
              'Escribe la descripción y el monto (mayor que cero) y guarda.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Verás el “Historial de Ingresos” y el “Historial de Egresos”, cada uno con su total. Cada movimiento se puede “Editar” o “Eliminar”.',
          },
        ],
      },
      {
        id: 'cuadrar-el-dia',
        title: 'Cuadrar el día',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pensil.Pos no tiene apertura ni cierre de turno, ni corte de caja. Para cuadrar el día haz esto:',
          },
          {
            kind: 'steps',
            items: [
              'Entra a Ventas → Ver Todas, elige “Hoy” y revisa en Resumen las ventas por medio de pago.',
              'Revisa en Caja los ingresos y egresos del día.',
              'Compara el efectivo esperado (ventas en efectivo + ingresos − egresos) con el que hay en el cajón.',
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Si no cuadra, busca ventas cobradas con un medio de pago distinto al real o movimientos de caja sin registrar. La Caja no filtra por fecha: mira la columna “Fecha Creación”.',
          },
        ],
      },
    ],
  },
  {
    slug: 'empleados-y-permisos',
    title: 'Empleados y permisos',
    summary: 'Crea las cuentas de tus empleados y decide qué puede hacer cada uno.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'crear-empleado',
        title: 'Crear un empleado',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Entra a Empleados y toca “Agregar Empleado”.',
              'Escribe el nombre completo, el nombre de usuario, el celular, el correo y una contraseña de al menos 8 caracteres.',
              'Guarda y entrégale su usuario y contraseña.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'El nombre de usuario es único en todo Pensil.Pos y no se puede reutilizar, ni siquiera después de eliminar al empleado. El correo tampoco puede estar en uso por otra cuenta activa.',
          },
        ],
      },
      {
        id: 'permisos',
        title: 'Dar permisos',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En la fila del empleado toca “Permisos”.',
              'Activa o desactiva cada permiso, o usa “Activar todo” y “Quitar todo” en un grupo.',
              'Toca “Guardar” para aplicar los cambios, o “Cancelar” para descartarlos.',
            ],
          },
          {
            kind: 'list',
            items: [
              'Los cambios quedan en borrador hasta que guardes. Si intentas salir con cambios sin guardar, Pensil.Pos te avisa.',
              'Activar un permiso de un grupo enciende también el de ver ese grupo. Apagar el de ver apaga todo el grupo.',
              '“Menudear cigarrillos” es independiente: permite abrir cajetillas sin tocar nada más del inventario.',
            ],
          },
        ],
      },
      {
        id: 'que-ve-un-empleado',
        title: 'Lo que ve un empleado',
        blocks: [
          {
            kind: 'list',
            items: [
              'Solo las secciones para las que tiene permiso.',
              'En el historial, solo sus propias ventas.',
              'Nunca la Caja, la configuración de su negocio ni la gestión de empleados.',
              'No puede eliminar ventas, productos, compras, clientes ni proveedores: eso es solo del dueño, aunque el permiso aparezca activo.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'venta-por-peso',
    title: 'Venta por peso (fruver)',
    summary:
      'Cómo vender frutas, verduras y otros productos por kilo con la báscula o con pesos manuales.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'productos-por-kilo',
        title: 'Productos por kilo',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Solo los negocios tipo Fruver pueden crear productos por peso. En el formulario del producto, en “Se vende por”, elige “Peso (kg)”. Los precios y la existencia se escriben por kilo.',
          },
          {
            kind: 'list',
            items: [
              'La forma de venta (unidad o peso) no se puede cambiar después de crear el producto.',
              'Un producto por peso no tiene precio para llevar, comisión ni menudeo.',
              'Como todo producto nuevo, empieza sin control de existencias; actívalo si quieres llevar los kilos.',
            ],
          },
        ],
      },
      {
        id: 'vender-con-bascula',
        title: 'Vender con la báscula',
        blocks: [
          {
            kind: 'steps',
            items: [
              'En Venta Rápida verás el catálogo en tarjetas y el panel “Báscula”.',
              'La primera vez toca “Conectar báscula” y elige la báscula en la lista del navegador. Después se conecta sola.',
              'Toca el producto y pon la mercancía en el plato.',
              'Cuando el peso está “Estable”, la línea se agrega sola a la cuenta. También puedes presionar Enter.',
            ],
          },
          {
            kind: 'note',
            tone: 'warning',
            text: 'Si la báscula cambia de unidad, verás “La báscula cambió de unidad. Ponla en kg.” Ponla en kilos, deja el plato vacío y confirma con “Está en kg”.',
          },
        ],
      },
      {
        id: 'peso-manual',
        title: 'Pesos manuales',
        blocks: [
          {
            kind: 'list',
            items: [
              'Sin báscula, escribe el peso en “Peso manual” (por ejemplo 1,25) y toca “Usar”.',
              'Para corregir una línea usa “Cambiar peso”.',
              'En las mesas el peso siempre se escribe a mano.',
            ],
          },
        ],
      },
      {
        id: 'redondeo',
        title: 'Cómo se cobra cada línea',
        blocks: [
          {
            kind: 'paragraph',
            text: 'El valor de cada línea por peso se redondea al múltiplo de $50 más cercano. Por ejemplo, 1,250 kg a $9.800 el kilo da $12.250. Si el peso es tan bajo que la línea da $0, no se puede cobrar.',
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'La app Android no pesa, pero muestra las líneas por peso agregadas desde la web. Para cambiar un peso, hazlo desde la caja en la web.',
          },
        ],
      },
    ],
  },
  {
    slug: 'reportes-y-dia-operativo',
    title: 'Reportes y día operativo',
    summary:
      'Dónde ver cómo va tu negocio y cómo cuenta Pensil.Pos el día si cierras pasada la medianoche.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'donde-estan-los-reportes',
        title: 'Dónde están los reportes',
        blocks: [
          {
            kind: 'table',
            caption: 'Reportes disponibles y dónde encontrarlos',
            columns: ['Reporte', 'Dónde', 'Permiso'],
            rows: [
              [
                'Ventas, productos más vendidos y medios de pago',
                'Ventas → Ver Todas, pestaña Resumen',
                'Ver ventas',
              ],
              ['Comisiones de meseros', 'Ventas → Ver Todas, pestaña Comisiones', 'Ver ventas'],
              ['Tiempo de billar', 'Ventas → Ver Todas, pestaña Billares', 'Ver ventas'],
              [
                'Valor del inventario',
                'Inventario → Ver Inventario, pestaña Reporte',
                'Generar reporte',
              ],
            ],
          },
        ],
      },
      {
        id: 'rangos-de-fechas',
        title: 'Rangos de fechas',
        blocks: [
          {
            kind: 'list',
            items: [
              'Elige “Fecha inicial” y “Fecha final”, o los atajos “Hoy” y “Este Mes”.',
              'Si no eliges fechas, ves el mes en curso.',
              'El rango que elegiste se recuerda en ese equipo.',
            ],
          },
        ],
      },
      {
        id: 'dia-operativo',
        title: 'Día normal y día nocturno',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Si al registrar tu negocio marcaste “¿Es nocturno?”, tu día va de 6:00 a.m. a 6:00 a.m. del día siguiente. Así, una venta a las 2:00 a.m. del sábado cuenta en el viernes, que es la noche en que se hizo.',
          },
          {
            kind: 'table',
            caption: 'Qué horas cuenta cada día',
            columns: ['Modo', 'El día va de', 'Una venta a las 2:00 a.m. del sábado cuenta en'],
            rows: [
              ['Normal', '12:00 a.m. a 11:59 p.m.', 'Sábado'],
              ['Nocturno', '6:00 a.m. a 5:59 a.m. del día siguiente', 'Viernes'],
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Todas las horas son las de Colombia. Si necesitas cambiar el modo de tu negocio, pídelo a Pensil.Devs.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mi-cuenta-y-seguridad',
    title: 'Mi cuenta y seguridad',
    summary:
      'Tu perfil, los datos de tu negocio, contraseñas, cierre de sesión, el estado de pago y preguntas frecuentes.',
    updatedOn: '2026-11-01',
    sections: [
      {
        id: 'perfil-y-negocio',
        title: 'Tu perfil y tu negocio',
        blocks: [
          {
            kind: 'list',
            items: [
              'En el menú de usuario (arriba a la derecha), “Ver perfil” te deja cambiar tu nombre, tu usuario y tus datos de contacto.',
              '“Mi negocio” (solo el dueño) te deja cambiar el nombre, el correo, el teléfono, el NIT y la dirección del negocio. Estos datos salen en el ticket.',
            ],
          },
        ],
      },
      {
        id: 'contrasenas',
        title: 'Cambiar o recuperar la contraseña',
        blocks: [
          {
            kind: 'steps',
            items: [
              'Para cambiarla: menú de usuario → “Cambiar contraseña”. Escribe la actual y la nueva.',
              'Si la olvidaste: en el ingreso toca “¿Olvidaste tu contraseña?”, escribe tu usuario o correo y toca “Enviar enlace de recuperación”.',
              'Abre el correo y crea la nueva contraseña con “Cambiar contraseña”.',
            ],
          },
          {
            kind: 'list',
            items: [
              'El enlace de recuperación vence en 30 minutos y sirve una sola vez.',
              'Al cambiar la contraseña se cierran tus sesiones en los otros equipos.',
              'Al recuperarla se cierran todas tus sesiones.',
            ],
          },
        ],
      },
      {
        id: 'cerrar-sesion',
        title: 'Cerrar sesión',
        blocks: [
          {
            kind: 'table',
            caption: 'Opciones para salir en la web',
            columns: ['Opción', 'Qué hace'],
            rows: [
              [
                'Cerrar sesión',
                'Cierra tu sesión en este equipo. Los demás equipos siguen abiertos.',
              ],
              [
                'Cerrar sesión total',
                'Además borra todo lo guardado en este navegador: caché, borradores de compras, preferencias como el tema y la configuración de la báscula.',
              ],
            ],
          },
          {
            kind: 'note',
            tone: 'tip',
            text: 'Usa “Cerrar sesión total” en un equipo prestado o si algo se ve raro. En la app Android, “Cerrar sesión” está en el menú de tu cuenta.',
          },
        ],
      },
      {
        id: 'estado-de-pago',
        title: 'Estado de pago del servicio',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Si pasan 35 días o más desde el último pago del servicio, tu negocio queda en mora y verás el aviso “Tu establecimiento está en mora.”',
          },
          {
            kind: 'list',
            items: [
              'Solo puedes usar Venta Rápida, con un máximo de 1 producto por venta.',
              'Las pestañas Mesas y Domicilios quedan bloqueadas.',
              'Cuando pagues, comunícate con Pensil.Devs para recuperar el acceso completo.',
            ],
          },
        ],
      },
      {
        id: 'preguntas-frecuentes',
        title: 'Preguntas frecuentes',
        blocks: [
          {
            kind: 'table',
            caption: 'Preguntas frecuentes',
            columns: ['Pregunta', 'Respuesta'],
            rows: [
              [
                '¿Puedo usar mi usuario en varios equipos a la vez?',
                'Sí. Cada equipo tiene su propia sesión y todos ven el mismo carrito, mesas y domicilios.',
              ],
              [
                '¿Qué pasa si se va el internet?',
                'Verás “Sin conexión” y no podrás editar hasta que vuelva. Lo que ya estaba en el carrito no se pierde: está guardado en el servidor.',
              ],
              [
                '¿Puedo cobrar con tarjeta?',
                'Los medios de pago son Efectivo, Nequi, Daviplata, Davivienda y Bancolombia.',
              ],
              [
                '¿Puedo crear mis propias categorías?',
                'No. Las categorías dependen de tu tipo de negocio y las define Pensil.Devs.',
              ],
              [
                'Me sale “Usuario o contraseña incorrectos”.',
                'Revisa el usuario o correo y la contraseña. Si no la recuerdas, usa “¿Olvidaste tu contraseña?”.',
              ],
            ],
          },
        ],
      },
    ],
  },
];
