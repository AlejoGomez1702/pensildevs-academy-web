import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.routes').then((m) => m.HOME_ROUTES) },
  {
    path: 'productos',
    loadChildren: () => import('./topics/topics.routes').then((m) => m.topicRoutes('product')),
  },
  {
    path: 'servicios',
    loadChildren: () => import('./topics/topics.routes').then((m) => m.topicRoutes('service')),
  },
  { path: 'videos', loadChildren: () => import('./videos/videos.routes').then((m) => m.VIDEOS_ROUTES) },
  { path: 'cursos', loadChildren: () => import('./courses/courses.routes').then((m) => m.COURSES_ROUTES) },
  { path: 'guias', loadChildren: () => import('./guides/guides.routes').then((m) => m.GUIDES_ROUTES) },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./layout/not-found-page').then((m) => m.NotFoundPage),
  },
];
