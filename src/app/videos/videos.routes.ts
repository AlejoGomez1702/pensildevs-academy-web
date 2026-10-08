import type { Routes } from '@angular/router';
import { contentDescription, contentTitle, provideLibrary } from '../library';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';

export const VIDEOS_ROUTES: Routes = [
  {
    path: '',
    providers: [provideLibrary()],
    children: [
      {
        path: ':slug',
        title: contentTitle('video', 'Video no encontrado'),
        resolve: { [ROUTE_DESCRIPTION]: contentDescription('video') },
        loadComponent: () => import('./ui/video-page').then((m) => m.VideoPage),
      },
      { path: '', pathMatch: 'full', redirectTo: '/' },
    ],
  },
];
