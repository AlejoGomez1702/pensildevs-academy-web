import type { Routes } from '@angular/router';
import { provideLibrary } from '../library';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    providers: [provideLibrary()],
    loadComponent: () => import('./ui/home-page').then((m) => m.HomePage),
  },
];
