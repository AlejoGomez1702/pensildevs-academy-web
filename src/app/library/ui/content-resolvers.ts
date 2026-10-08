import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { OpenContent } from '../application/open-content';
import type { ContentKind, LearningContent } from '../domain/learning-content';

async function findContent(
  route: ActivatedRouteSnapshot,
  kind: ContentKind,
): Promise<LearningContent | null> {
  const result = await inject(OpenContent).execute(kind, route.paramMap.get('slug') ?? '');
  if (result.ok) {
    return result.value.content;
  }
  return result.error.reason === 'coming-soon' ? result.error.content : null;
}

/** Page title of a content route: the content title, or `notFound` when the slug is unknown. */
export function contentTitle(kind: ContentKind, notFound: string): ResolveFn<string> {
  return async (route) => (await findContent(route, kind))?.title ?? notFound;
}

/** Meta description of a content route: its summary. */
export function contentDescription(kind: ContentKind): ResolveFn<string | undefined> {
  return async (route) => (await findContent(route, kind))?.summary;
}
