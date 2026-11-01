import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { returnPathAfterSignIn, SIGN_IN_PATH } from '../domain/return-path';
import { Membership } from './membership';

/** Pages only Pensil.Pos members may read: anyone else signs in first and comes back. */
export const requireMember: CanActivateFn = async (_route, state) => {
  const router = inject(Router);
  return (await inject(Membership).checkAccess())
    ? true
    : router.createUrlTree([SIGN_IN_PATH], { queryParams: { volver: state.url } });
};

/** The sign-in page is pointless once signed in: go where the person was heading. */
export const skipSignInForMembers: CanActivateFn = async (route) => {
  const router = inject(Router);
  return (await inject(Membership).checkAccess())
    ? router.parseUrl(returnPathAfterSignIn(route.queryParamMap.get('volver') ?? undefined))
    : true;
};
