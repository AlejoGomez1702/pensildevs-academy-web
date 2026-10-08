import type { RawContent } from './raw-content';

const PENSIL_POS_FIRST_VIDEO = 'https://www.youtube.com/watch?v=oFdO0jTK0n8';

/**
 * PROVISIONAL test content. The only real piece is the first Pensil.Pos video (its title, summary
 * and duration are still to be confirmed by Pensil.Devs). Everything without `youtubeUrl` is shown
 * as coming soon; guides carry sample text so the guide page can be reviewed.
 */
export const MOCK_CONTENT: readonly RawContent[] = [
  // Pensil.Pos
  {
    kind: 'video',
    slug: 'conoce-pensil-pos',
    title: 'Conoce Pensil.Pos',
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
      'De cero a tu primera venta: conoce el sistema, carga tu catálogo, cobra y cierra la caja del día.',
    topic: 'pensil-pos',
    publishedOn: '2026-10-08',
    featured: true,
    lessons: [
      {
        slug: 'conoce-pensil-pos',
        title: 'Conoce Pensil.Pos',
        youtubeUrl: PENSIL_POS_FIRST_VIDEO,
        durationSeconds: 300,
      },
      { slug: 'carga-tu-catalogo', title: 'Carga tu catálogo de productos', durationSeconds: 420 },
      { slug: 'tu-primera-venta', title: 'Tu primera venta', durationSeconds: 360 },
      { slug: 'abre-y-cierra-la-caja', title: 'Abre y cierra la caja', durationSeconds: 300 },
      { slug: 'reportes-del-dia', title: 'Los reportes del día', durationSeconds: 240 },
    ],
  },
  {
    kind: 'guide',
    slug: 'corte-de-caja',
    title: 'Cómo hacer el corte de caja',
    summary:
      'Cierra el turno sabiendo exactamente cuánto entró, por forma de pago, y qué hacer si no cuadra.',
    topic: 'pensil-pos',
    publishedOn: '2026-10-07',
    readingMinutes: 4,
    sections: [
      {
        id: 'antes-de-empezar',
        title: 'Antes de empezar',
        intro: 'Haz el corte al final de cada turno, con el cajón frente a ti.',
        steps: [
          'Termina o cancela las ventas que hayan quedado abiertas.',
          'Ten a la mano los comprobantes de pagos con tarjeta y transferencia.',
        ],
      },
      {
        id: 'hacer-el-corte',
        title: 'Hacer el corte',
        steps: [
          'Entra a Caja y elige Cerrar turno.',
          'Cuenta el efectivo del cajón y escribe el total.',
          'Revisa el resumen por forma de pago y confirma el cierre.',
        ],
      },
      {
        id: 'si-no-cuadra',
        title: 'Si el corte no cuadra',
        intro: 'Una diferencia casi siempre tiene una explicación sencilla.',
        steps: [
          'Busca ventas cobradas con una forma de pago distinta a la real.',
          'Revisa si hubo retiros o devoluciones sin registrar.',
          'Anota la diferencia en el comentario del cierre para revisarla después.',
        ],
      },
    ],
  },
  {
    kind: 'video',
    slug: 'vende-con-lector-de-codigos',
    title: 'Vende más rápido con el lector de códigos',
    summary: 'Configura tu lector y cobra escaneando, sin buscar productos a mano.',
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
