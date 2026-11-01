import { err, ok, type Result } from '../../shared/kernel/result';
import {
  articleInTrack,
  type ArticleInTrack,
  type DocTrack,
  type ProductDocumentation,
} from '../domain/documentation';
import type { DocumentationShelf } from './documentation-shelf';

export interface DocumentedProduct {
  readonly productSlug: string;
  readonly functional: number;
  readonly technical: number;
}

/** The documented products, and the documentation of one of them. */
export class BrowseDocumentation {
  constructor(private readonly shelf: DocumentationShelf) {}

  async products(): Promise<readonly DocumentedProduct[]> {
    return (await this.shelf.all()).map(({ productSlug, articles }) => ({
      productSlug,
      functional: articles.functional.length,
      technical: articles.technical.length,
    }));
  }

  async execute(productSlug: string): Promise<Result<ProductDocumentation, 'product-not-found'>> {
    const documentation = (await this.shelf.all()).find(
      (candidate) => candidate.productSlug === productSlug,
    );
    return documentation ? ok(documentation) : err('product-not-found');
  }
}

export interface ArticleReading extends ArticleInTrack {
  readonly productSlug: string;
}

export type ReadArticleError = 'product-not-found' | 'article-not-found';

/** One article of a product's documentation, placed in its track. */
export class ReadArticle {
  constructor(private readonly shelf: DocumentationShelf) {}

  async execute(
    productSlug: string,
    track: DocTrack,
    slug: string,
  ): Promise<Result<ArticleReading, ReadArticleError>> {
    const documentation = await new BrowseDocumentation(this.shelf).execute(productSlug);
    if (!documentation.ok) {
      return documentation;
    }
    const found = articleInTrack(documentation.value, track, slug);
    return found.ok ? ok({ ...found.value, productSlug }) : found;
  }
}
