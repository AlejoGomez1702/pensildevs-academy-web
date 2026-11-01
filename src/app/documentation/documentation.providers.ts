import { inject, type Provider } from '@angular/core';
import { DocumentationShelf } from './application/documentation-shelf';
import { BrowseDocumentation, ReadArticle } from './application/read-documentation';
import { DOCUMENTATION_CONTENT } from './infrastructure/content/documentation-content';
import { StaticDocumentationShelf } from './infrastructure/static-documentation-shelf';

/** Connects the documentation port to its adapter and exposes its use cases. */
export function provideDocumentation(): Provider[] {
  return [
    {
      provide: DocumentationShelf,
      useFactory: () => new StaticDocumentationShelf(DOCUMENTATION_CONTENT),
    },
    {
      provide: BrowseDocumentation,
      useFactory: () => new BrowseDocumentation(inject(DocumentationShelf)),
    },
    { provide: ReadArticle, useFactory: () => new ReadArticle(inject(DocumentationShelf)) },
  ];
}
