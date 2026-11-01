import { Duration } from '../../shared/kernel/duration';
import { err, ok, type Result } from '../../shared/kernel/result';

/** The two kinds of documentation every product has. */
export type DocTrack = 'functional' | 'technical';

export const DOC_TRACKS: readonly DocTrack[] = ['functional', 'technical'];

export type DocBlock =
  | { readonly kind: 'paragraph'; readonly text: string }
  | { readonly kind: 'steps'; readonly items: readonly string[] }
  | { readonly kind: 'list'; readonly items: readonly string[] }
  | { readonly kind: 'note'; readonly tone: 'tip' | 'warning'; readonly text: string }
  | {
      readonly kind: 'table';
      readonly caption: string;
      readonly columns: readonly string[];
      readonly rows: readonly (readonly string[])[];
    };

export interface DocSection {
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly DocBlock[];
}

export interface DocArticleInput {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** ISO date (YYYY-MM-DD) of the last review against the product. */
  readonly updatedOn: string;
  readonly sections: readonly DocSection[];
}

export interface DocArticle extends DocArticleInput {
  readonly track: DocTrack;
  readonly readingTime: Duration;
}

export interface DocumentationInput {
  readonly productSlug: string;
  readonly functional: readonly DocArticleInput[];
  readonly technical: readonly DocArticleInput[];
}

export interface ProductDocumentation {
  readonly productSlug: string;
  readonly articles: Readonly<Record<DocTrack, readonly DocArticle[]>>;
}

const WORDS_PER_MINUTE = 200;

/**
 * Checks the documentation of a product and computes what readers see (reading times). The error
 * says, for whoever writes the documentation, why it cannot be published.
 */
export function createDocumentation(
  input: DocumentationInput,
): Result<ProductDocumentation, string> {
  const articles = { functional: [] as DocArticle[], technical: [] as DocArticle[] };
  for (const track of DOC_TRACKS) {
    const problem = problemOfTrack(track, input[track]);
    if (problem) {
      return err(problem);
    }
    articles[track] = input[track].map((article) => ({
      ...article,
      track,
      readingTime: readingTimeOf(article.sections),
    }));
  }
  return ok({ productSlug: input.productSlug, articles });
}

function problemOfTrack(track: DocTrack, articles: readonly DocArticleInput[]): string | null {
  if (articles.length === 0) {
    return `the ${track} documentation has no articles`;
  }
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug)) {
      return `the ${track} article "${article.slug}" is repeated`;
    }
    slugs.add(article.slug);
    const problem = problemOfArticle(article);
    if (problem) {
      return problem;
    }
  }
  return null;
}

function problemOfArticle(article: DocArticleInput): string | null {
  if (article.sections.length === 0) {
    return `the article "${article.slug}" has no sections`;
  }
  const ids = new Set<string>();
  for (const section of article.sections) {
    if (ids.has(section.id)) {
      return `the article "${article.slug}" repeats the section "${section.id}"`;
    }
    ids.add(section.id);
    const uneven = section.blocks.find(
      (block) =>
        block.kind === 'table' && block.rows.some((row) => row.length !== block.columns.length),
    );
    if (uneven?.kind === 'table') {
      return `the article "${article.slug}" has a table in "${section.id}" whose rows do not have ${uneven.columns.length} cells`;
    }
  }
  return null;
}

/** Minutes it takes to read the sections, rounded up; never less than one. */
export function readingTimeOf(sections: readonly DocSection[]): Duration {
  const words = sections.reduce(
    (total, section) =>
      total +
      wordsIn(section.title) +
      section.blocks.reduce((sum, block) => sum + wordsOf(block), 0),
    0,
  );
  return Duration.ofMinutes(Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)));
}

function wordsOf(block: DocBlock): number {
  switch (block.kind) {
    case 'paragraph':
    case 'note':
      return wordsIn(block.text);
    case 'steps':
    case 'list':
      return wordsInAll(block.items);
    case 'table':
      return wordsIn(block.caption) + wordsInAll(block.columns) + wordsInAll(block.rows.flat());
  }
}

function wordsInAll(texts: readonly string[]): number {
  return texts.reduce((total, text) => total + wordsIn(text), 0);
}

function wordsIn(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export interface ArticleInTrack {
  readonly article: DocArticle;
  /** Every article of the same track, in reading order. */
  readonly track: readonly DocArticle[];
  /** 1-based. */
  readonly position: number;
  readonly total: number;
  readonly previous?: DocArticle;
  readonly next?: DocArticle;
}

export function articleInTrack(
  documentation: ProductDocumentation,
  track: DocTrack,
  slug: string,
): Result<ArticleInTrack, 'article-not-found'> {
  const articles = documentation.articles[track];
  const index = articles.findIndex((article) => article.slug === slug);
  const article = articles[index];
  if (!article) {
    return err('article-not-found');
  }
  return ok({
    article,
    track: articles,
    position: index + 1,
    total: articles.length,
    previous: articles[index - 1],
    next: articles[index + 1],
  });
}
