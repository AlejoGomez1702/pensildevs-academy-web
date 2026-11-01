import { describe, expect, it } from 'vitest';
import { createDocumentation, type ProductDocumentation } from '../domain/documentation';
import { aDocArticle, aDocumentationInput } from '../domain/documentation.fixtures';
import { DocumentationShelf } from './documentation-shelf';
import { BrowseDocumentation, ReadArticle } from './read-documentation';

class InMemoryShelf extends DocumentationShelf {
  constructor(private readonly documentation: readonly ProductDocumentation[]) {
    super();
  }

  all(): Promise<readonly ProductDocumentation[]> {
    return Promise.resolve(this.documentation);
  }
}

function documentationOf(productSlug: string): ProductDocumentation {
  const result = createDocumentation(
    aDocumentationInput({
      productSlug,
      functional: [aDocArticle({ slug: 'sell' }), aDocArticle({ slug: 'stock' })],
      technical: [aDocArticle({ slug: 'architecture' })],
    }),
  );
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result.value;
}

const shelf = new InMemoryShelf([documentationOf('pensil-pos'), documentationOf('other')]);

describe('Browse documentation', () => {
  it('lists every documented product with how many articles each track has', async () => {
    const products = await new BrowseDocumentation(shelf).products();

    expect(products).toEqual([
      { productSlug: 'pensil-pos', functional: 2, technical: 1 },
      { productSlug: 'other', functional: 2, technical: 1 },
    ]);
  });

  it('opens the documentation of a product', async () => {
    const result = await new BrowseDocumentation(shelf).execute('pensil-pos');

    expect(result.ok && result.value.articles.functional.map((article) => article.slug)).toEqual([
      'sell',
      'stock',
    ]);
  });

  it('tells when a product has no documentation', async () => {
    expect(await new BrowseDocumentation(shelf).execute('nope')).toEqual({
      ok: false,
      error: 'product-not-found',
    });
  });
});

describe('Read an article', () => {
  it('opens the article with its neighbours in the track', async () => {
    const result = await new ReadArticle(shelf).execute('pensil-pos', 'functional', 'stock');

    expect(result.ok && result.value.article.slug).toBe('stock');
    expect(result.ok && result.value.previous?.slug).toBe('sell');
    expect(result.ok && result.value.productSlug).toBe('pensil-pos');
  });

  it('tells apart an unknown product from an unknown article', async () => {
    const read = new ReadArticle(shelf);

    expect(await read.execute('nope', 'functional', 'sell')).toEqual({
      ok: false,
      error: 'product-not-found',
    });
    expect(await read.execute('pensil-pos', 'technical', 'sell')).toEqual({
      ok: false,
      error: 'article-not-found',
    });
  });
});
