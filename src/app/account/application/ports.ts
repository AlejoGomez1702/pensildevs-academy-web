import type { Result } from '../../shared/kernel/result';
import type { Credentials } from '../domain/credentials';
import type { AcademySession } from '../domain/member';

/** Why Pensil.Pos did not open a session. `message` is Pensil.Pos's own text for the person. */
export type SignInFailure =
  { readonly reason: 'rejected'; readonly message: string } | { readonly reason: 'unreachable' };

/** What Pensil.Pos says about a session it issued. */
export type SessionStatus = 'active' | 'rejected' | 'unreachable';

/** The Pensil.Pos accounts the academy trusts: the same ones people use on pensilpos.com. */
export abstract class PensilPosAccounts {
  abstract signIn(credentials: Credentials): Promise<Result<AcademySession, SignInFailure>>;
  abstract check(session: AcademySession): Promise<SessionStatus>;
  /** New tokens for the same session; the previous refresh token stops working. */
  abstract renew(
    session: AcademySession,
  ): Promise<Result<AcademySession, 'rejected' | 'unreachable'>>;
  /** Closes this session in Pensil.Pos; other devices stay signed in. */
  abstract signOut(session: AcademySession): Promise<void>;
}

/** Keeps the session on this device between visits. */
export abstract class SessionStore {
  abstract load(): AcademySession | null;
  abstract save(session: AcademySession): void;
  abstract clear(): void;
}

export abstract class Clock {
  abstract now(): Date;
}
