import type { ProductDocumentation } from '../domain/documentation';

/** Where the documentation comes from: written in the code today, a CMS or an API later. */
export abstract class DocumentationShelf {
  /** Every documented product, in the order the academy presents them. */
  abstract all(): Promise<readonly ProductDocumentation[]>;
}
