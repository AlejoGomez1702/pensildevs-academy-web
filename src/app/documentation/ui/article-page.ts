import { Component, computed, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentNotice } from '../../library';
import { Icon } from '../../shared/ui/icon';
import { findTopicBySlug } from '../../topics';
import { ReadArticle } from '../application/read-documentation';
import type { DocArticle, DocTrack } from '../domain/documentation';
import { DocBlocks } from './doc-blocks';
import {
  articlePath,
  DOC_TRACK,
  DOCUMENTATION_PATH,
  productDocumentationPath,
  reviewDate,
  trackFromSegment,
} from './doc-track';

const OTHER_TRACK: Readonly<Record<DocTrack, DocTrack>> = {
  functional: 'technical',
  technical: 'functional',
};

@Component({
  selector: 'app-article-page',
  imports: [ContentNotice, DocBlocks, Icon, RouterLink],
  templateUrl: './article-page.html',
})
export class ArticlePage {
  private readonly readArticle = inject(ReadArticle);

  readonly product = input.required<string>();
  /** `funcional` or `tecnica`. */
  readonly track = input.required<string>();
  readonly article = input.required<string>();

  protected readonly trackInfo = DOC_TRACK;
  protected readonly documentationPath = DOCUMENTATION_PATH;
  protected readonly productPath = computed(() => productDocumentationPath(this.product()));
  protected readonly productName = computed(
    () => findTopicBySlug(this.product())?.name ?? this.product(),
  );

  protected readonly result = resource({
    params: () => {
      const track = trackFromSegment(this.track());
      return track ? { product: this.product(), track, slug: this.article() } : undefined;
    },
    loader: ({ params }) => this.readArticle.execute(params.product, params.track, params.slug),
  });
  /** `null` while loading; an unknown track is a missing article. */
  protected readonly state = computed(() => {
    if (trackFromSegment(this.track()) === null) {
      return { ok: false, error: 'article-not-found' } as const;
    }
    return this.result.hasValue() ? this.result.value() : null;
  });

  protected pathOf(article: DocArticle): string {
    return articlePath(this.product(), article.track, article.slug);
  }

  protected otherTrackOf(track: DocTrack): DocTrack {
    return OTHER_TRACK[track];
  }

  protected reviewedOn(article: DocArticle): string {
    return reviewDate(article.updatedOn);
  }
}
