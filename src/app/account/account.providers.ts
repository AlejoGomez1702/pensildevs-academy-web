import { DOCUMENT, inject, type Provider } from '@angular/core';
import { ACADEMY_ENVIRONMENT } from '../shared/infrastructure/academy-environment';
import { CheckAccess, SignIn, SignOut } from './application/membership';
import { Clock, PensilPosAccounts, SessionStore } from './application/ports';
import { browserStorage } from './infrastructure/browser-storage';
import { LocalSessionStore } from './infrastructure/local-session-store';
import {
  PENSIL_POS_API_URL,
  PensilPosAccountsHttp,
} from './infrastructure/pensil-pos-accounts-http';
import { SystemClock } from './infrastructure/system-clock';

/**
 * Connects the account ports to Pensil.Pos and the browser. Registered once in `app.config.ts`:
 * the header shows who is signed in on every page (docs/adr/0003).
 */
export function provideAccount(): Provider[] {
  return [
    { provide: PENSIL_POS_API_URL, useValue: ACADEMY_ENVIRONMENT.pensilPosApiUrl },
    { provide: PensilPosAccounts, useClass: PensilPosAccountsHttp },
    {
      provide: SessionStore,
      useFactory: () => new LocalSessionStore(browserStorage(inject(DOCUMENT).defaultView)),
    },
    { provide: Clock, useClass: SystemClock },
    {
      provide: SignIn,
      useFactory: () => new SignIn(inject(PensilPosAccounts), inject(SessionStore)),
    },
    {
      provide: CheckAccess,
      useFactory: () =>
        new CheckAccess(inject(PensilPosAccounts), inject(SessionStore), inject(Clock)),
    },
    {
      provide: SignOut,
      useFactory: () => new SignOut(inject(PensilPosAccounts), inject(SessionStore)),
    },
  ];
}
