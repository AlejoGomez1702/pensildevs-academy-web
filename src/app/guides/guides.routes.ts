import type { Routes } from '@angular/router';
import { contentDescription, contentTitle, provideLibrary } from '../library';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';

export const GUIDES_ROUTES: Routes = [
  {
    path: '',
    providers: [provideLibrary()],
    children: [
      {
        path: ':slug',
        title: contentTitle('guide', 'Guía no encontrada'),
        resolve: { [ROUTE_DESCRIPTION]: contentDescription('guide') },
        loadComponent: () => import('./ui/guide-page').then((m) => m.GuidePage),
      },
      { path: '', pathMatch: 'full', redirectTo: '/' },
    ],
  },
];
