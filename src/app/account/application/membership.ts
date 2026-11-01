import { err, ok, type Result } from '../../shared/kernel/result';
import { Credentials, type CredentialsProblem } from '../domain/credentials';
import { isExpired, type AcademySession, type Member } from '../domain/member';
import type { Clock, PensilPosAccounts, SessionStore, SignInFailure } from './ports';

export type SignInError =
  { readonly reason: 'invalid'; readonly problems: readonly CredentialsProblem[] } | SignInFailure;

/** Opens a session with the same account the person uses on pensilpos.com. */
export class SignIn {
  constructor(
    private readonly accounts: PensilPosAccounts,
    private readonly store: SessionStore,
  ) {}

  async execute(identifier: string, password: string): Promise<Result<Member, SignInError>> {
    const credentials = Credentials.create(identifier, password);
    if (!credentials.ok) {
      return err({ reason: 'invalid', problems: credentials.error });
    }
    const session = await this.accounts.signIn(credentials.value);
    if (!session.ok) {
      return session;
    }
    this.store.save(session.value);
    return ok(session.value.member);
  }
}

/**
 * Decides whether the person may read the documentation. The stored session is confirmed with
 * Pensil.Pos once per visit; an expired or rejected one is renewed; while Pensil.Pos cannot be
 * reached, a session that has not expired is trusted so reading never depends on the server.
 */
export class CheckAccess {
  private verifiedToken: string | null = null;
  private inFlight: Promise<Result<Member, 'signed-out'>> | null = null;

  constructor(
    private readonly accounts: PensilPosAccounts,
    private readonly store: SessionStore,
    private readonly clock: Clock,
  ) {}

  /** The member of the session stored on this device, without asking Pensil.Pos. */
  known(): Member | null {
    return this.store.load()?.member ?? null;
  }

  execute(): Promise<Result<Member, 'signed-out'>> {
    // Renewing rotates the refresh token: two renewals at once would sign the person out.
    this.inFlight ??= this.check().finally(() => (this.inFlight = null));
    return this.inFlight;
  }

  private async check(): Promise<Result<Member, 'signed-out'>> {
    const session = this.store.load();
    if (!session) {
      return err('signed-out');
    }
    if (session.accessToken === this.verifiedToken) {
      return ok(session.member);
    }
    if (!isExpired(session, this.clock.now())) {
      const status = await this.accounts.check(session);
      if (status === 'active') {
        return this.trust(session);
      }
      if (status === 'unreachable') {
        return ok(session.member);
      }
    }
    return this.renew(session);
  }

  private async renew(session: AcademySession): Promise<Result<Member, 'signed-out'>> {
    const renewed = await this.accounts.renew(session);
    if (renewed.ok) {
      this.store.save(renewed.value);
      return this.trust(renewed.value);
    }
    if (renewed.error === 'rejected') {
      this.store.clear();
    }
    return err('signed-out');
  }

  private trust(session: AcademySession): Result<Member, never> {
    this.verifiedToken = session.accessToken;
    return ok(session.member);
  }
}

/** Leaves the academy: this device forgets the session and Pensil.Pos closes it. */
export class SignOut {
  constructor(
    private readonly accounts: PensilPosAccounts,
    private readonly store: SessionStore,
  ) {}

  async execute(): Promise<void> {
    const session = this.store.load();
    if (!session) {
      return;
    }
    this.store.clear();
    // Best effort: without a connection the session simply expires in Pensil.Pos.
    await this.accounts.signOut(session).catch(() => undefined);
  }
}
