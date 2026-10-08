import { inject, type Provider } from '@angular/core';
import { BrowseLibrary } from './application/browse-library';
import { ExploreTopic } from './application/explore-topic';
import { Library } from './application/library';
import { OpenContent } from './application/open-content';
import { WatchLesson } from './application/watch-lesson';
import { MOCK_CONTENT } from './infrastructure/mock-content';
import { MockLibrary } from './infrastructure/mock-library';

/** Connects the library port to its adapter and exposes its use cases. Register it on each page route. */
export function provideLibrary(): Provider[] {
  return [
    { provide: Library, useFactory: () => new MockLibrary(MOCK_CONTENT) },
    { provide: BrowseLibrary, useFactory: () => new BrowseLibrary(inject(Library)) },
    { provide: ExploreTopic, useFactory: () => new ExploreTopic(inject(Library)) },
    { provide: OpenContent, useFactory: () => new OpenContent(inject(Library)) },
    { provide: WatchLesson, useFactory: () => new WatchLesson(inject(Library)) },
  ];
}
