import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { err, ok, type Result } from '../../shared/kernel/result';
import { PensilPosAccounts, type SessionStatus, type SignInFailure } from '../application/ports';
import type { Credentials } from '../domain/credentials';
import { memberRoleOf, type AcademySession, type Member } from '../domain/member';

/** Base URL of the Pensil.Pos REST API (ends in `/api`). */
export const PENSIL_POS_API_URL = new InjectionToken<string>('PENSIL_POS_API_URL');

const FALLBACK_REJECTION = 'No pudimos iniciar tu sesión. Inténtalo de nuevo.';
const SERVER_ERROR = 500;

/** Pensil.Pos answers `{ status, message, data }`; errors carry `message` for the person. */
interface Envelope<T> {
  readonly message?: string;
  readonly data?: T;
}

interface PensilPosUser {
  readonly name?: string;
  readonly username?: string;
  readonly rol?: string;
  readonly establishment?: { readonly name?: string } | null;
}

interface SessionData {
  readonly user?: PensilPosUser | null;
  readonly token?: string;
  readonly refreshToken?: string;
}

interface TokensData {
  readonly token?: string;
  readonly refreshToken?: string;
}

/** Pensil.Pos's `/api/auth` endpoints; its DTOs never leave this file. */
@Injectable()
export class PensilPosAccountsHttp extends PensilPosAccounts {
  private readonly http = inject(HttpClient);
  private readonly api = inject(PENSIL_POS_API_URL);

  async signIn(credentials: Credentials): Promise<Result<AcademySession, SignInFailure>> {
    try {
      const response = await firstValueFrom(
        this.http.post<Envelope<SessionData>>(`${this.api}/auth/login`, {
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      );
      const session = toSession(response.data);
      return session ? ok(session) : err({ reason: 'unreachable' });
    } catch (error) {
      return err(signInFailureOf(error));
    }
  }

  async check(session: AcademySession): Promise<SessionStatus> {
    try {
      await firstValueFrom(this.http.get(`${this.api}/auth/me`, { headers: withToken(session) }));
      return 'active';
    } catch (error) {
      return isRejection(error) ? 'rejected' : 'unreachable';
    }
  }

  async renew(
    session: AcademySession,
  ): Promise<Result<AcademySession, 'rejected' | 'unreachable'>> {
    try {
      const response = await firstValueFrom(
        this.http.post<Envelope<TokensData>>(`${this.api}/auth/refresh-token`, {
          refreshToken: session.refreshToken,
        }),
      );
      const { token, refreshToken } = response.data ?? {};
      return token && refreshToken
        ? ok({
            member: session.member,
            accessToken: token,
            refreshToken,
            expiresAt: expiryOf(token),
          })
        : err('unreachable');
    } catch (error) {
      return err(isRejection(error) ? 'rejected' : 'unreachable');
    }
  }

  async signOut(session: AcademySession): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${this.api}/auth/logout`,
        { refreshToken: session.refreshToken },
        { headers: withToken(session) },
      ),
    );
  }
}

function withToken(session: AcademySession): HttpHeaders {
  return new HttpHeaders({ 'x-token': session.accessToken });
}

function toSession(data: SessionData | undefined): AcademySession | null {
  const user = data?.user;
  if (!user || !data.token || !data.refreshToken) {
    return null;
  }
  const member: Member = {
    name: user.name ?? '',
    username: user.username ?? '',
    role: memberRoleOf(user.rol ?? ''),
    businessName: user.establishment?.name ?? null,
  };
  return {
    member,
    accessToken: data.token,
    refreshToken: data.refreshToken,
    expiresAt: expiryOf(data.token),
  };
}

/** Reads the `exp` claim; the academy never verifies the signature, Pensil.Pos does. */
function expiryOf(token: string): string | null {
  try {
    const payload: unknown = JSON.parse(atob(token.split('.')[1] ?? ''));
    const exp = (payload as { exp?: unknown } | null)?.exp;
    return typeof exp === 'number' ? new Date(exp * 1000).toISOString() : null;
  } catch {
    return null;
  }
}

/** A 4xx is Pensil.Pos saying no; no answer or a 5xx means it could not be asked. */
function isRejection(error: unknown): boolean {
  return error instanceof HttpErrorResponse && error.status > 0 && error.status < SERVER_ERROR;
}

function signInFailureOf(error: unknown): SignInFailure {
  if (!(error instanceof HttpErrorResponse) || !isRejection(error)) {
    return { reason: 'unreachable' };
  }
  const message = (error.error as Envelope<unknown> | null)?.message;
  return {
    reason: 'rejected',
    message: typeof message === 'string' && message.trim() ? message : FALLBACK_REJECTION,
  };
}
