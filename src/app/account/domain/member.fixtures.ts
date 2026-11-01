// Test data builders for academy members. Only imported from specs.
import type { AcademySession, Member } from './member';

export function aMember(overrides: Partial<Member> = {}): Member {
  return {
    name: 'Ana López',
    username: 'ana',
    role: 'owner',
    businessName: 'Licorera La 70',
    ...overrides,
  };
}

export function aSession(overrides: Partial<AcademySession> = {}): AcademySession {
  return {
    member: aMember(),
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    expiresAt: '2026-12-01T00:00:00.000Z',
    ...overrides,
  };
}
