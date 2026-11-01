/** What the person is in Pensil.Pos. */
export type MemberRole = 'owner' | 'employee' | 'pensil-devs';

/** A person with a Pensil.Pos account who signed in to the academy. Never holds the password. */
export interface Member {
  readonly name: string;
  readonly username: string;
  readonly role: MemberRole;
  /** `null` for Pensil.Devs staff and for accounts that have not registered their business yet. */
  readonly businessName: string | null;
}

/** A Pensil.Pos session opened from the academy. */
export interface AcademySession {
  readonly member: Member;
  readonly accessToken: string;
  /** Pensil.Pos rotates it on every renewal. */
  readonly refreshToken: string;
  /** ISO instant the access token stops working; `null` when Pensil.Pos does not say. */
  readonly expiresAt: string | null;
}

const ROLES: Readonly<Record<string, MemberRole>> = {
  ADMIN_ROLE: 'owner',
  USER_ROLE: 'employee',
  SUPER_ADMIN_ROLE: 'pensil-devs',
};

/** Unknown roles get the least privileged reading. */
export function memberRoleOf(pensilPosRole: string): MemberRole {
  return ROLES[pensilPosRole] ?? 'employee';
}

export function firstName(member: Member): string {
  return member.name.trim().split(/\s+/)[0] || member.username;
}

export function isExpired(session: AcademySession, now: Date): boolean {
  return session.expiresAt !== null && Date.parse(session.expiresAt) <= now.getTime();
}
