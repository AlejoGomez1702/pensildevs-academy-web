// Test data builders for the documentation. Only imported from specs.
import type { DocArticleInput, DocumentationInput } from './documentation';

export function aDocArticle(overrides: Partial<DocArticleInput> = {}): DocArticleInput {
  return {
    slug: 'an-article',
    title: 'An article',
    summary: 'What the article explains.',
    updatedOn: '2026-11-01',
    sections: [
      { id: 'first', title: 'First', blocks: [{ kind: 'paragraph', text: 'Something useful.' }] },
    ],
    ...overrides,
  };
}

export function aDocumentationInput(
  overrides: Partial<DocumentationInput> = {},
): DocumentationInput {
  return {
    productSlug: 'pensil-pos',
    functional: [aDocArticle({ slug: 'how-to-sell' })],
    technical: [aDocArticle({ slug: 'architecture' })],
    ...overrides,
  };
}
