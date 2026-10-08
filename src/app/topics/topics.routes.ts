import type { ResolveFn, Routes } from '@angular/router';
import { provideLibrary } from '../library';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';
import type { TopicGroup } from './domain/topic';
import { findTopic } from './ui/topic-catalog';

/** Pages of one group of topics: mounted at /productos and at /servicios. */
export function topicRoutes(group: TopicGroup): Routes {
  const topicFor = (route: Parameters<ResolveFn<unknown>>[0]) => findTopic(group, route.paramMap.get('slug') ?? '');
  const topicTitle: ResolveFn<string> = (route) => topicFor(route)?.name ?? 'Tema no encontrado';
  const topicDescription: ResolveFn<string | undefined> = (route) => topicFor(route)?.summary;

  return [
    {
      path: ':slug',
      title: topicTitle,
      data: { group },
      resolve: { [ROUTE_DESCRIPTION]: topicDescription },
      providers: [provideLibrary()],
      loadComponent: () => import('./ui/topic-page').then((m) => m.TopicPage),
    },
    // Groups have no page of their own: the home page lists their topics.
    { path: '', pathMatch: 'full', redirectTo: '/' },
  ];
}
