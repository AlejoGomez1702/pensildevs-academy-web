import { Component, computed, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CONTENT_KIND,
  CONTENT_KINDS,
  ContentCard,
  ExploreTopic,
  kindFilterFromSegment,
  type ContentKindFilter,
} from '../../library';
import { Icon } from '../../shared/ui/icon';
import type { TopicGroup } from '../domain/topic';
import { findTopic, topicSiteUrl } from './topic-catalog';

const GROUP_EYEBROW: Readonly<Record<TopicGroup, string>> = { product: 'Producto', service: 'Servicio' };
const ALL = { label: 'Todos', singular: 'contenido', plural: 'contenidos' };

interface FilterOption {
  readonly kind: ContentKindFilter;
  readonly label: string;
  /** `?tipo=` value; null clears the filter. */
  readonly segment: string | null;
}

const FILTERS: readonly FilterOption[] = [
  { kind: 'all', label: ALL.label, segment: null },
  ...CONTENT_KINDS.map((kind) => ({ kind, label: CONTENT_KIND[kind].plural, segment: CONTENT_KIND[kind].segment })),
];

@Component({
  selector: 'app-topic-page',
  imports: [ContentCard, Icon, RouterLink],
  templateUrl: './topic-page.html',
})
export class TopicPage {
  private readonly exploreTopic = inject(ExploreTopic);

  readonly group = input.required<TopicGroup>();
  readonly slug = input.required<string>();
  /** `?tipo=` query parameter. */
  readonly tipo = input<string>();

  protected readonly filters = FILTERS;
  protected readonly topic = computed(() => findTopic(this.group(), this.slug()));
  protected readonly eyebrow = computed(() => GROUP_EYEBROW[this.group()]);
  protected readonly siteUrl = computed(() => {
    const topic = this.topic();
    return topic ? topicSiteUrl(topic) : null;
  });
  protected readonly kind = computed(() => kindFilterFromSegment(this.tipo()));

  protected readonly shelf = resource({
    params: () => {
      const topic = this.topic();
      return topic ? { topicSlug: topic.slug, kind: this.kind() } : undefined;
    },
    loader: ({ params }) => this.exploreTopic.execute(params.topicSlug, params.kind),
  });

  protected readonly contents = computed(() => (this.shelf.hasValue() ? this.shelf.value().contents : []));
  protected readonly resultsLabel = computed(() => {
    const count = this.contents().length;
    const kind = this.kind();
    const words = kind === 'all' ? ALL : { singular: CONTENT_KIND[kind].label, plural: CONTENT_KIND[kind].plural };
    return `${count} ${(count === 1 ? words.singular : words.plural).toLowerCase()}`;
  });
  protected readonly emptyLabel = computed(() => {
    const kind = this.kind();
    const name = this.topic()?.name ?? '';
    return kind === 'all'
      ? `Pronto habrá contenido de ${name} aquí.`
      : `Todavía no hay ${CONTENT_KIND[kind].plural.toLowerCase()} de ${name}.`;
  });

  protected availableOf(kind: ContentKindFilter): number | null {
    return this.shelf.hasValue() ? this.shelf.value().availableByKind[kind] : null;
  }
}
