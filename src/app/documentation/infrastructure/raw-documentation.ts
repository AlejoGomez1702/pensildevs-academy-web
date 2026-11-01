/**
 * Documentation as an editor writes it (and as a CMS or API would send it). The adapter checks it
 * and turns it into domain objects.
 */
export type RawDocBlock =
  | { readonly kind: 'paragraph'; readonly text: string }
  /** Numbered steps, in the order the person does them. */
  | { readonly kind: 'steps'; readonly items: readonly string[] }
  /** Bullets without order. */
  | { readonly kind: 'list'; readonly items: readonly string[] }
  /** A highlighted remark: `tip` helps, `warning` prevents a mistake. */
  | { readonly kind: 'note'; readonly tone: 'tip' | 'warning'; readonly text: string }
  | {
      readonly kind: 'table';
      /** Says what the table shows, for screen readers. */
      readonly caption: string;
      readonly columns: readonly string[];
      readonly rows: readonly (readonly string[])[];
    };

export interface RawDocSection {
  /** Anchor of the section inside the article: kebab-case, unique in the article. */
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly RawDocBlock[];
}

export interface RawDocArticle {
  /** kebab-case, unique in its track. */
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** ISO date (YYYY-MM-DD) of the last review against the product. */
  readonly updatedOn: string;
  readonly sections: readonly RawDocSection[];
}

/** The two kinds of documentation every product has. */
export interface RawProductDocumentation {
  /** Slug of the product, the same one the academy and pensildevs.com use. */
  readonly product: string;
  /** How to use the product: written for owners, managers and cashiers. */
  readonly functional: readonly RawDocArticle[];
  /** How the product works and how to set it up: written for whoever installs and supports it. */
  readonly technical: readonly RawDocArticle[];
}
