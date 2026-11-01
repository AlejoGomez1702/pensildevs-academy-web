import { SessionStore } from '../application/ports';
import type { AcademySession, MemberRole } from '../domain/member';

export const SESSION_STORAGE_KEY = 'pensildevs-academy.session';

const ROLES: readonly MemberRole[] = ['owner', 'employee', 'pensil-devs'];

/**
 * The session in `localStorage`, like pensilpos.com keeps its own (see docs/adr/0003). Storage may
 * be unavailable (private mode, blocked site data): then the person signs in on every visit.
 */
export class LocalSessionStore extends SessionStore {
  constructor(private readonly storage: Storage) {
    super();
  }

  load(): AcademySession | null {
    try {
      const stored: unknown = JSON.parse(this.storage.getItem(SESSION_STORAGE_KEY) ?? 'null');
      return isSession(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  save(session: AcademySession): void {
    try {
      this.storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Nothing to do: the session lives only until the page closes.
    }
  }

  clear(): void {
    try {
      this.storage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Nothing was stored.
    }
  }
}

function isSession(value: unknown): value is AcademySession {
  const session = value as Partial<AcademySession> | null;
  const member = session?.member;
  return (
    typeof session?.accessToken === 'string' &&
    typeof session.refreshToken === 'string' &&
    (session.expiresAt === null || typeof session.expiresAt === 'string') &&
    typeof member?.name === 'string' &&
    typeof member.username === 'string' &&
    ROLES.includes(member.role) &&
    (member.businessName === null || typeof member.businessName === 'string')
  );
}
