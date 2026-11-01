import { describe, expect, it } from 'vitest';
import { firstName, isExpired, memberRoleOf } from './member';
import { aMember, aSession } from './member.fixtures';

describe('Academy member', () => {
  it('reads the Pensil.Pos role', () => {
    expect(memberRoleOf('ADMIN_ROLE')).toBe('owner');
    expect(memberRoleOf('USER_ROLE')).toBe('employee');
    expect(memberRoleOf('SUPER_ADMIN_ROLE')).toBe('pensil-devs');
    expect(memberRoleOf('SOMETHING_NEW')).toBe('employee');
  });

  it('greets by the first name', () => {
    expect(firstName(aMember({ name: '  ana maría  lópez ' }))).toBe('ana');
    expect(firstName(aMember({ name: '', username: 'caja1' }))).toBe('caja1');
  });

  it('expires when its access token does', () => {
    const session = aSession({ expiresAt: '2026-11-01T12:00:00.000Z' });

    expect(isExpired(session, new Date('2026-11-01T11:59:59.000Z'))).toBe(false);
    expect(isExpired(session, new Date('2026-11-01T12:00:00.000Z'))).toBe(true);
    expect(isExpired(aSession({ expiresAt: null }), new Date('2100-01-01'))).toBe(false);
  });
});
