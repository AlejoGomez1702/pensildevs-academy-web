import type { Routes } from '@angular/router';
import { skipSignInForMembers } from './ui/access-guards';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    title: 'Ingresar',
    canActivate: [skipSignInForMembers],
    loadComponent: () => import('./ui/sign-in-page').then((m) => m.SignInPage),
  },
];
