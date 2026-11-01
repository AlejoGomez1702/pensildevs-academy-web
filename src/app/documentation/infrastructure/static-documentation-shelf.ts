import { DocumentationShelf } from '../application/documentation-shelf';
import { createDocumentation, type ProductDocumentation } from '../domain/documentation';
import type { RawProductDocumentation } from './raw-documentation';

/** Serves the documentation written in `content/` until the academy has a CMS or an API. */
export class StaticDocumentationShelf extends DocumentationShelf {
  private readonly documentation: readonly ProductDocumentation[];

  constructor(raw: readonly RawProductDocumentation[]) {
    super();
    this.documentation = raw.flatMap((item) => {
      const documentation = createDocumentation({
        productSlug: item.product,
        functional: item.functional,
        technical: item.technical,
      });
      if (!documentation.ok) {
        // A broken documentation must not take the academy down: skip it and tell whoever wrote it.
        console.error(`Documentation of "${item.product}" was skipped: ${documentation.error}`);
        return [];
      }
      return [documentation.value];
    });
  }

  all(): Promise<readonly ProductDocumentation[]> {
    return Promise.resolve(this.documentation);
  }
}
