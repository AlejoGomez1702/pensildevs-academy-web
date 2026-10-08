/** Products and services are taught apart: the academy is organized by these two groups. */
export type TopicGroup = 'product' | 'service';

/** A product or service of Pensil.Devs that the academy teaches about. */
export interface Topic {
  /** Same slug as on pensildevs.com, so both sites link to each other without translating URLs. */
  readonly slug: string;
  readonly name: string;
  readonly group: TopicGroup;
  readonly summary: string;
}

/** URL segment of each group, the same on pensildevs.com. */
export const TOPIC_GROUP_PATH: Readonly<Record<TopicGroup, string>> = {
  product: 'productos',
  service: 'servicios',
};
