import type { RawContent } from './raw-content';

const PENSIL_POS_FIRST_VIDEO = 'https://www.youtube.com/watch?v=oFdO0jTK0n8';

/** Rendered from the real Pensil.Pos screens; captions and transcript repeat what it shows. */
const PENSIL_POS_INTRODUCTION = {
  file: '/media/pensil-pos/introduccion.mp4',
  captions: '/media/pensil-pos/introduccion.es.vtt',
  poster: '/media/pensil-pos/introduccion.jpg',
  transcript: [
    'Bienvenido a Pensil.Pos, el punto de venta que le soluciona la vida a tu negocio.',
    'Ventas, mesas, domicilios, inventario, compras, caja, clientes y empleados: todo en un solo lugar, en el navegador y en la app Android, y todos los equipos ven lo mismo en vivo.',
    'En Venta Rápida cobras en segundos: en efectivo, Nequi, Daviplata, Davivienda o Bancolombia. Pensil.Pos te dice la devuelta, te deja dividir la cuenta o venderle a crédito a tu cliente.',
    'Si tu negocio tiene mesas, cada una lleva su propia cuenta y los meseros agregan productos desde cualquier equipo. En las mesas de billar, el tiempo se cobra por minuto.',
    'Los domicilios llevan el cliente, la dirección y el costo de envío. Sigue cada pedido de pendiente a en camino, asigna el domiciliario y cóbralo al entregar.',
    'Cada venta descuenta las existencias y cada compra a tus proveedores las suma. Pensil.Pos calcula tu utilidad con el costo real de lo que vendiste.',
    'Para fruver y negocios que venden por kilo, conecta tu báscula: el peso llega directo a la venta, o lo puedes escribir a mano.',
    'Lleva la caja, la cartera de tus clientes y tus reportes de ventas. Crea un usuario para cada empleado y decide qué puede hacer.',
    'Empezar es fácil: crea tu cuenta en pensilpos.com, registra tu negocio, carga tus productos y haz tu primera venta.',
    'Aprende más en Pensil.Devs Academy: cursos, videos y la documentación funcional y técnica de Pensil.Pos.',
  ],
} as const;

/**
 * PROVISIONAL test content. Real pieces: the introduction to Pensil.Pos (hosted by the academy) and
 * the first Pensil.Pos video on YouTube (its title, summary and duration are still to be confirmed by
 * Pensil.Devs). Pensil.Pos content was checked against the product on 2026-11-01. Everything
 * without a video is shown as coming soon; guides of the services carry sample text.
 */
export const MOCK_CONTENT: readonly RawContent[] = [
  // Pensil.Pos
  {
    kind: 'video',
    slug: 'introduccion-a-pensil-pos',
    title: 'Conoce Pensil.Pos en 2 minutos',
    summary:
      'Qué hace Pensil.Pos de punta a punta: ventas, mesas, domicilios, inventario, venta por peso y cómo empezar hoy.',
    topic: 'pensil-pos',
    publishedOn: '2026-11-01',
    featured: true,
    hostedVideo: PENSIL_POS_INTRODUCTION,
    durationSeconds: 112,
  },
  {
    kind: 'video',
    slug: 'conoce-pensil-pos',
    title: 'Recorrido por Pensil.Pos',
    summary:
      'Un recorrido por Pensil.Pos: cómo se ve, qué puedes hacer desde el mostrador y por dónde empezar.',
    topic: 'pensil-pos',
    publishedOn: '2026-10-08',
    featured: true,
    youtubeUrl: PENSIL_POS_FIRST_VIDEO,
    durationSeconds: 300,
  },
  {
    kind: 'course',
    slug: 'primeros-pasos-con-pensil-pos',
    title: 'Primeros pasos con Pensil.Pos',
    summary:
      'De cero a tu primera venta: conoce el sistema, carga tu catálogo, cobra y cuadra la caja del día.',
    topic: 'pensil-pos',
    publishedOn: '2026-11-01',
    featured: true,
    lessons: [
      {
        slug: 'conoce-pensil-pos-en-2-minutos',
        title: 'Conoce Pensil.Pos en 2 minutos',
        hostedVideo: PENSIL_POS_INTRODUCTION,
        durationSeconds: 112,
      },
      {
        slug: 'recorrido-por-pensil-pos',
        title: 'Recorrido por Pensil.Pos',
        youtubeUrl: PENSIL_POS_FIRST_VIDEO,
        durationSeconds: 300,
      },
      {
        slug: 'registra-tu-negocio',
        title: 'Crea tu cuenta y registra tu negocio',
        durationSeconds: 240,
      },
      { slug: 'carga-tu-catalogo', title: 'Carga tu catálogo de productos', durationSeconds: 420 },
      { slug: 'tu-primera-venta', title: 'Tu primera venta en Venta Rápida', durationSeconds: 360 },
      { slug: 'cuadra-la-caja', title: 'Cuadra la caja del día', durationSeconds: 300 },
      { slug: 'reportes-del-dia', title: 'Los reportes de ventas', durationSeconds: 240 },
    ],
  },
  {
    kind: 'guide',
    slug: 'cuadra-la-caja-del-dia',
    title: 'Cómo cuadrar la caja del día',
    summary:
      'Compara lo que vendiste en efectivo y lo que entró y salió de la caja con el dinero del cajón.',
    topic: 'pensil-pos',
    publishedOn: '2026-11-01',
    readingMinutes: 3,
    sections: [
      {
        id: 'antes-de-empezar',
        title: 'Antes de empezar',
        intro:
          'Pensil.Pos no abre ni cierra turnos: el día se cuadra con el resumen de ventas y los movimientos de caja. Los movimientos de caja solo los ve el dueño del negocio.',
        steps: [
          'Termina o vacía las cuentas que hayan quedado abiertas en Venta Rápida, Mesas y Domicilios.',
          'Ten a la mano los comprobantes de Nequi, Daviplata y transferencias del día.',
        ],
      },
      {
        id: 'cuadrar',
        title: 'Cuadrar',
        steps: [
          'Entra a Ventas, elige el día de hoy y revisa en Resumen cuánto se vendió por cada medio de pago.',
          'Entra a Caja y suma los ingresos y egresos de dinero que registraste hoy.',
          'El efectivo esperado es: ventas en efectivo + ingresos − egresos. Compáralo con el dinero del cajón.',
          'Compara los otros medios de pago con los comprobantes de cada uno.',
        ],
      },
      {
        id: 'si-no-cuadra',
        title: 'Si no cuadra',
        intro: 'Una diferencia casi siempre tiene una explicación sencilla.',
        steps: [
          'Busca ventas cobradas con un medio de pago distinto al real.',
          'Revisa si hubo salidas o entradas de dinero sin registrar en Caja.',
          'Si tu negocio trabaja de noche, recuerda que el día va de 6:00 a. m. a 6:00 a. m. del día siguiente.',
        ],
      },
    ],
  },
  {
    kind: 'video',
    slug: 'vende-con-lector-de-codigos',
    title: 'Vende más rápido con el lector de códigos',
    summary:
      'Ponle código a tus productos y búscalos escaneando en Venta Rápida, sin escribir su nombre.',
    topic: 'pensil-pos',
    publishedOn: '2026-10-15',
    durationSeconds: 240,
  },

  // Tiendas en línea
  {
    kind: 'guide',
    slug: 'publica-tu-primer-producto',
    title: 'Publica tu primer producto',
    summary:
      'Sube un producto con fotos, precio y existencias para que tus clientes lo compren hoy mismo.',
    topic: 'tiendas-en-linea',
    publishedOn: '2026-10-06',
    readingMinutes: 3,
    sections: [
      {
        id: 'datos-del-producto',
        title: 'Datos del producto',
        steps: [
          'Entra al panel de tu tienda y elige Productos, luego Nuevo producto.',
          'Escribe un nombre que tu cliente buscaría y una descripción corta.',
          'Pon el precio y cuántas piezas tienes.',
        ],
      },
      {
        id: 'fotos',
        title: 'Fotos que venden',
        intro: 'Las fotos son lo primero que ve tu cliente.',
        steps: [
          'Usa luz natural y fondo liso.',
          'Sube al menos tres fotos: de frente, de lado y un detalle.',
        ],
      },
      {
        id: 'publicar',
        title: 'Publicar',
        steps: ['Revisa la vista previa.', 'Activa Publicado y guarda.'],
      },
    ],
  },
  {
    kind: 'video',
    slug: 'gestiona-tus-pedidos',
    title: 'Gestiona tus pedidos del día',
    summary: 'Confirma, prepara y envía pedidos sin perder ninguno.',
    topic: 'tiendas-en-linea',
    publishedOn: '2026-10-20',
    durationSeconds: 360,
  },
  {
    kind: 'course',
    slug: 'vende-en-linea',
    title: 'Vende en línea paso a paso',
    summary: 'Todo lo que necesitas para operar tu tienda: catálogo, pedidos, pagos y cupones.',
    topic: 'tiendas-en-linea',
    publishedOn: '2026-10-25',
    lessons: [
      { slug: 'tu-catalogo', title: 'Tu catálogo', durationSeconds: 420 },
      { slug: 'pedidos-y-envios', title: 'Pedidos y envíos', durationSeconds: 480 },
      { slug: 'pagos-y-cupones', title: 'Pagos y cupones', durationSeconds: 360 },
    ],
  },

  // Desarrollo web a la medida
  {
    kind: 'guide',
    slug: 'roles-y-permisos',
    title: 'Da acceso a tu equipo con roles y permisos',
    summary: 'Invita a tu equipo y decide qué puede ver y hacer cada persona en tu sistema.',
    topic: 'desarrollo-web',
    publishedOn: '2026-10-05',
    readingMinutes: 3,
    sections: [
      {
        id: 'invitar',
        title: 'Invitar a una persona',
        steps: [
          'Entra a Administración y elige Usuarios.',
          'Escribe su correo y envía la invitación.',
        ],
      },
      {
        id: 'elegir-rol',
        title: 'Elegir su rol',
        intro: 'El rol decide qué partes del sistema ve.',
        steps: [
          'Elige el rol que más se parece a su trabajo.',
          'Ajusta los permisos sueltos solo si hace falta.',
        ],
      },
    ],
  },
  {
    kind: 'video',
    slug: 'tu-panel-de-administracion',
    title: 'Tu panel de administración',
    summary: 'Recorre el panel de tu sistema y encuentra lo que usas todos los días.',
    topic: 'desarrollo-web',
    publishedOn: '2026-10-22',
    durationSeconds: 420,
  },

  // Automatización e integraciones
  {
    kind: 'guide',
    slug: 'avisos-automaticos-por-whatsapp',
    title: 'Revisa tus avisos automáticos por WhatsApp',
    summary: 'Confirma qué mensajes se envían solos a tus clientes y qué hacer si uno no llega.',
    topic: 'automatizacion',
    publishedOn: '2026-10-04',
    readingMinutes: 2,
    sections: [
      {
        id: 'ver-avisos',
        title: 'Ver los avisos enviados',
        steps: ['Abre el historial de mensajes.', 'Filtra por fecha o por cliente.'],
      },
      {
        id: 'si-no-llega',
        title: 'Si un aviso no llega',
        steps: [
          'Verifica que el número del cliente tenga lada y 10 dígitos.',
          'Reenvía el aviso desde el historial.',
          'Si vuelve a fallar, escríbenos con el número y la hora del envío.',
        ],
      },
    ],
  },
  {
    kind: 'video',
    slug: 'tus-reportes-automaticos',
    title: 'Tus reportes automáticos',
    summary: 'Cómo leer el reporte que te llega cada semana y a quién más enviárselo.',
    topic: 'automatizacion',
    publishedOn: '2026-10-18',
    durationSeconds: 300,
  },

  // Consultoría y apps móviles
  {
    kind: 'guide',
    slug: 'prepara-tu-proyecto',
    title: 'Prepara tu proyecto antes de la primera reunión',
    summary:
      'Lo que conviene tener claro para que la primera conversación rinda y la cotización sea precisa.',
    topic: 'consultoria-y-apps-moviles',
    publishedOn: '2026-10-03',
    readingMinutes: 3,
    sections: [
      {
        id: 'el-problema',
        title: 'El problema',
        steps: [
          'Escribe en dos líneas qué te duele hoy.',
          'Anota quién lo sufre y cada cuánto pasa.',
        ],
      },
      {
        id: 'lo-que-ya-tienes',
        title: 'Lo que ya tienes',
        steps: [
          'Lista los sistemas, hojas de cálculo y apps que usas.',
          'Junta ejemplos reales: una factura, un pedido, un reporte.',
        ],
      },
    ],
  },
  {
    kind: 'course',
    slug: 'tu-app-movil',
    title: 'Opera tu app móvil',
    summary: 'Publica novedades, responde a tus usuarios y lee las estadísticas de tu app.',
    topic: 'consultoria-y-apps-moviles',
    publishedOn: '2026-10-28',
    lessons: [
      { slug: 'novedades', title: 'Publica novedades', durationSeconds: 300 },
      { slug: 'estadisticas', title: 'Lee tus estadísticas', durationSeconds: 360 },
    ],
  },
];
