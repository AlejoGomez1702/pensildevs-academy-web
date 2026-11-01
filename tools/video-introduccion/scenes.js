// Timeline of "Conoce Pensil.Pos en 2 minutos". Shared by the page (render) and the captions (VTT).
const SCENES = [
  {
    id: 'intro',
    start: 0,
    end: 7,
    kind: 'intro',
    title: 'Pensil.Pos',
    subtitle: 'El punto de venta que le soluciona la vida a tu negocio.',
    caption: 'Bienvenido a Pensil.Pos, el punto de venta que le soluciona la vida a tu negocio.',
  },
  {
    id: 'overview',
    start: 7,
    end: 17,
    kind: 'chips',
    eyebrow: '¿Qué es Pensil.Pos?',
    title: 'Todo tu negocio en un solo lugar',
    subtitle: 'En el navegador y en la app Android. Todos los equipos ven lo mismo, en vivo.',
    chips: [
      'Ventas',
      'Mesas y billares',
      'Domicilios',
      'Inventario',
      'Compras',
      'Caja',
      'Clientes y cartera',
      'Empleados y permisos',
      'Reportes',
    ],
    caption:
      'Ventas, mesas, domicilios, inventario, compras, caja, clientes y empleados: todo en un solo lugar, en el navegador y en la app Android, y todos los equipos ven lo mismo en vivo.',
  },
  {
    id: 'quick-sale',
    start: 17,
    end: 31,
    kind: 'feature',
    eyebrow: 'Venta Rápida',
    title: 'Cobra en segundos',
    image: 'quick-sale-checkout',
    focus: [52, 42],
    zoom: 1.12,
    points: [
      'Efectivo, Nequi, Daviplata, Davivienda o Bancolombia',
      'Te dice la devuelta de cada billete',
      'Divide la cuenta entre varios medios de pago',
      'O véndele a crédito a tu cliente',
    ],
    caption:
      'En Venta Rápida cobras en segundos: en efectivo, Nequi, Daviplata, Davivienda o Bancolombia. Pensil.Pos te dice la devuelta, te deja dividir la cuenta o venderle a crédito a tu cliente.',
  },
  {
    id: 'tables',
    start: 31,
    end: 43,
    kind: 'feature',
    eyebrow: 'Mesas y billares',
    title: 'Cada mesa con su cuenta',
    image: 'billiard-tables',
    focus: [30, 40],
    zoom: 1.18,
    points: [
      'Abre una mesa y agrega productos desde cualquier equipo',
      'El billar cobra el tiempo por minuto',
      'Agrega notas a cada mesa',
    ],
    caption:
      'Si tu negocio tiene mesas, cada una lleva su propia cuenta y los meseros agregan productos desde cualquier equipo. En las mesas de billar, el tiempo se cobra por minuto.',
  },
  {
    id: 'deliveries',
    start: 43,
    end: 54,
    kind: 'feature',
    eyebrow: 'Domicilios',
    title: 'Pedidos a domicilio bajo control',
    image: 'deliveries',
    focus: [50, 30],
    zoom: 1.14,
    points: [
      'Cliente, dirección y costo de envío',
      'Pendiente, en preparación, en camino',
      'Asigna el domiciliario y cobra al entregar',
    ],
    caption:
      'Los domicilios llevan el cliente, la dirección y el costo de envío. Sigue cada pedido de pendiente a en camino, asigna el domiciliario y cóbralo al entregar.',
  },
  {
    id: 'inventory',
    start: 54,
    end: 67,
    kind: 'feature',
    eyebrow: 'Inventario y compras',
    title: 'Tu inventario, al día y sin cuentas a mano',
    image: 'inventory',
    focus: [55, 40],
    zoom: 1.12,
    points: [
      'Cada venta descuenta las existencias sola',
      'Las compras a tus proveedores las suman',
      'Tu utilidad se calcula con el costo real de lo vendido',
    ],
    caption:
      'Cada venta descuenta las existencias y cada compra a tus proveedores las suma. Pensil.Pos calcula tu utilidad con el costo real de lo que vendiste.',
  },
  {
    id: 'weighed',
    start: 67,
    end: 77,
    kind: 'feature',
    eyebrow: 'Venta por peso',
    title: '¿Vendes por kilo? Conecta tu báscula',
    image: 'fruver-scale',
    focus: [80, 30],
    zoom: 1.2,
    points: ['Precios por kilo', 'El peso llega directo de la báscula', 'O escríbelo a mano'],
    caption:
      'Para fruver y negocios que venden por kilo, conecta tu báscula: el peso llega directo a la venta, o lo puedes escribir a mano.',
  },
  {
    id: 'control',
    start: 77,
    end: 89,
    kind: 'cards',
    eyebrow: 'Administra tu negocio',
    title: 'Todo bajo control, desde donde estés',
    cards: [
      ['Caja', 'Registra los ingresos y egresos de dinero y mira el saldo.'],
      ['Clientes y cartera', 'Fiados, abonos y cuánto te debe cada cliente.'],
      ['Empleados y permisos', 'Cada empleado con su usuario y solo lo que le permitas.'],
      ['Reportes', 'Ventas del día, por medio de pago, comisiones y más vendidos.'],
    ],
    caption:
      'Lleva la caja, la cartera de tus clientes y tus reportes de ventas. Crea un usuario para cada empleado y decide qué puede hacer.',
  },
  {
    id: 'start',
    start: 89,
    end: 103,
    kind: 'steps',
    eyebrow: 'Empieza hoy',
    title: 'Tu primera venta en cuatro pasos',
    steps: [
      ['Crea tu cuenta', 'en pensilpos.com'],
      ['Registra tu negocio', 'nombre y tipo de negocio'],
      ['Carga tus productos', 'precios y existencias'],
      ['Haz tu primera venta', 'desde Registrar venta'],
    ],
    caption:
      'Empezar es fácil: crea tu cuenta en pensilpos.com, registra tu negocio, carga tus productos y haz tu primera venta.',
  },
  {
    id: 'outro',
    start: 103,
    end: 112,
    kind: 'outro',
    title: 'Aprende más en Pensil.Devs Academy',
    subtitle: 'Cursos, videos y la documentación funcional y técnica de Pensil.Pos.',
    caption:
      'Aprende más en Pensil.Devs Academy: cursos, videos y la documentación funcional y técnica de Pensil.Pos.',
  },
];

const DURATION = SCENES[SCENES.length - 1].end;

if (typeof module !== 'undefined') {
  module.exports = { SCENES, DURATION };
}
