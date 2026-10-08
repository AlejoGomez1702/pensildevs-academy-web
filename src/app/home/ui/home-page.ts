import { Component, computed, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrowseLibrary, ContentCard, type LearningContent } from '../../library';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { findTopicBySlug, TOPIC_GROUP_LABEL, TopicCard, topicsOf } from '../../topics';

const FLAGSHIP_TOPIC_PATH = '/productos/pensil-pos';

@Component({
  selector: 'app-home-page',
  imports: [ContentCard, Icon, RouterLink, SectionHeading, TopicCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  private readonly browseLibrary = inject(BrowseLibrary);

  protected readonly flagshipPath = FLAGSHIP_TOPIC_PATH;
  protected readonly groups = [
    { id: 'products', label: TOPIC_GROUP_LABEL.product, topics: topicsOf('product') },
    { id: 'services', label: TOPIC_GROUP_LABEL.service, topics: topicsOf('service') },
  ];

  protected readonly overview = resource({ loader: () => this.browseLibrary.execute() });
  protected readonly featured = computed(() =>
    this.overview.hasValue() ? this.overview.value().featured : [],
  );
  protected readonly latest = computed(() =>
    this.overview.hasValue() ? this.overview.value().latest : [],
  );

  protected availableOf(topicSlug: string): number {
    return this.overview.hasValue()
      ? (this.overview.value().availableByTopic.get(topicSlug) ?? 0)
      : 0;
  }

  protected topicNameOf(content: LearningContent): string | undefined {
    return findTopicBySlug(content.topicSlug)?.name;
  }
}
