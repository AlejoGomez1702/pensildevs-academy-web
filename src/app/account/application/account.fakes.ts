// Hand-written fakes of the account ports. Only imported from specs.
import { err, ok, type Result } from '../../shared/kernel/result';
import type { Credentials } from '../domain/credentials';
import type { AcademySession } from '../domain/member';
import { aSession } from '../domain/member.fixtures';
import {
  Clock,
  PensilPosAccounts,
  SessionStore,
  type SessionStatus,
  type SignInFailure,
} from './ports';

export class FakePensilPosAccounts extends PensilPosAccounts {
  signInResult: Result<AcademySession, SignInFailure> = ok(aSession());
  status: SessionStatus = 'active';
  renewResult: Result<AcademySession, 'rejected' | 'unreachable'> = err('rejected');
  readonly signedIn: Credentials[] = [];
  readonly checked: AcademySession[] = [];
  readonly renewed: AcademySession[] = [];
  readonly signedOut: AcademySession[] = [];
  failSignOut = false;

  signIn(credentials: Credentials) {
    this.signedIn.push(credentials);
    return Promise.resolve(this.signInResult);
  }

  check(session: AcademySession) {
    this.checked.push(session);
    return Promise.resolve(this.status);
  }

  renew(session: AcademySession) {
    this.renewed.push(session);
    return Promise.resolve(this.renewResult);
  }

  signOut(session: AcademySession) {
    this.signedOut.push(session);
    return this.failSignOut ? Promise.reject(new Error('offline')) : Promise.resolve();
  }
}

export class InMemorySessionStore extends SessionStore {
  constructor(public session: AcademySession | null = null) {
    super();
  }

  load() {
    return this.session;
  }

  save(session: AcademySession) {
    this.session = session;
  }

  clear() {
    this.session = null;
  }
}

export class FixedClock extends Clock {
  constructor(public instant = new Date('2026-11-01T12:00:00.000Z')) {
    super();
  }

  now() {
    return this.instant;
  }
}
