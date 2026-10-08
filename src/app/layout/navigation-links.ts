import { TOPIC_GROUP_LABEL, topicPath, topicsOf, type TopicGroup } from '../topics';

export interface NavigationMenuLink {
  readonly label: string;
  readonly description: string;
  readonly path: string;
}

/** A group of topics whose pages open from a submenu. */
export interface NavigationMenu {
  readonly id: TopicGroup;
  readonly label: string;
  /** Every page of the group starts with this path. */
  readonly path: string;
  readonly links: readonly NavigationMenuLink[];
}

const menuOf = (group: TopicGroup, path: string): NavigationMenu => ({
  id: group,
  label: TOPIC_GROUP_LABEL[group],
  path,
  links: topicsOf(group).map((topic) => ({ label: topic.name, description: topic.summary, path: topicPath(topic) })),
});

export const NAVIGATION_MENUS: readonly NavigationMenu[] = [menuOf('product', '/productos'), menuOf('service', '/servicios')];
