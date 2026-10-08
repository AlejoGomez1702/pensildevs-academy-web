import type { IconName } from '../../shared/ui/icon';
import { TOPIC_GROUP_PATH, type Topic, type TopicGroup } from '../domain/topic';

export interface CatalogTopic extends Topic {
  readonly icon: IconName;
}

export const PENSIL_DEVS_URL = 'https://pensildevs.com';

/**
 * Mirrors the products and services of pensildevs.com (same names and slugs).
 * PROVISIONAL summaries: review with Pensil.Devs before launch.
 */
export const TOPICS: readonly CatalogTopic[] = [
  {
    slug: 'pensil-pos',
    name: 'Pensil.Pos',
    group: 'product',
    icon: 'receipt',
    summary:
      'Aprende a vender, controlar tu inventario y cerrar la caja con el punto de venta de Pensil.Devs.',
  },
  {
    slug: 'tiendas-en-linea',
    name: 'Tiendas en línea',
    group: 'service',
    icon: 'store',
    summary: 'Publica productos, atiende pedidos y cobra en línea desde el panel de tu tienda.',
  },
  {
    slug: 'desarrollo-web',
    name: 'Desarrollo web a la medida',
    group: 'service',
    icon: 'code',
    summary: 'Saca provecho del sistema que construimos para tu negocio, desde el primer día.',
  },
  {
    slug: 'automatizacion',
    name: 'Automatización e integraciones',
    group: 'service',
    icon: 'automation',
    summary: 'Revisa y ajusta los avisos, reportes e integraciones que trabajan solos para ti.',
  },
  {
    slug: 'consultoria-y-apps-moviles',
    name: 'Consultoría y apps móviles',
    group: 'service',
    icon: 'mobile',
    summary: 'Prepara tus proyectos y opera la app móvil de tu negocio.',
  },
];

export const TOPIC_GROUP_LABEL: Readonly<Record<TopicGroup, string>> = {
  product: 'Productos',
  service: 'Servicios',
};

export function topicsOf(group: TopicGroup): readonly CatalogTopic[] {
  return TOPICS.filter((topic) => topic.group === group);
}

export function findTopic(group: TopicGroup, slug: string): CatalogTopic | undefined {
  return TOPICS.find((topic) => topic.group === group && topic.slug === slug);
}

export function findTopicBySlug(slug: string): CatalogTopic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function topicPath(topic: Topic): string {
  return `/${TOPIC_GROUP_PATH[topic.group]}/${topic.slug}`;
}

/** The same product or service on pensildevs.com. */
export function topicSiteUrl(topic: Topic): string {
  return `${PENSIL_DEVS_URL}${topicPath(topic)}`;
}

export interface TopicLink {
  readonly name: string;
  readonly path: string;
}

/** Name and academy page of the topic a content belongs to; the home page if it is unknown. */
export function topicLink(slug: string): TopicLink {
  const topic = findTopicBySlug(slug);
  return topic
    ? { name: topic.name, path: topicPath(topic) }
    : { name: 'Pensil.Devs Academy', path: '/' };
}
