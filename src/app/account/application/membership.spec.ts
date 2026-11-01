import { describe, expect, it } from 'vitest';
import { ok } from '../../shared/kernel/result';
import { aMember, aSession } from '../domain/member.fixtures';
import { FakePensilPosAccounts, FixedClock, InMemorySessionStore } from './account.fakes';
import { CheckAccess, SignIn, SignOut } from './membership';

const EXPIRED = '2026-10-01T00:00:00.000Z';

function setUp(session = aSession()) {
  const accounts = new FakePensilPosAccounts();
  const store = new InMemorySessionStore(session);
  const clock = new FixedClock();
  return { accounts, store, clock, check: new CheckAccess(accounts, store, clock) };
}

describe('Sign in', () => {
  it('opens a Pensil.Pos session and keeps it on this device', async () => {
    const accounts = new FakePensilPosAccounts();
    const store = new InMemorySessionStore();

    const result = await new SignIn(accounts, store).execute(' ana ', 'secreta123');

    expect(result).toEqual(ok(aSession().member));
    expect(accounts.signedIn[0]?.identifier).toBe('ana');
    expect(store.session).toEqual(aSession());
  });

  it('sends nothing when the credentials cannot be valid', async () => {
    const accounts = new FakePensilPosAccounts();

    const result = await new SignIn(accounts, new InMemorySessionStore()).execute('a', 'b');

    expect(result).toEqual({
      ok: false,
      error: { reason: 'invalid', problems: ['identifier-too-short', 'password-too-short'] },
    });
    expect(accounts.signedIn).toEqual([]);
  });

  it('reports what Pensil.Pos answered and keeps nothing', async () => {
    const accounts = new FakePensilPosAccounts();
    accounts.signInResult = { ok: false, error: { reason: 'rejected', message: 'No' } };
    const store = new InMemorySessionStore();

    const result = await new SignIn(accounts, store).execute('ana', 'secreta123');

    expect(result).toEqual({ ok: false, error: { reason: 'rejected', message: 'No' } });
    expect(store.session).toBeNull();
  });
});

describe('Check access', () => {
  it('lets nobody in without a session', async () => {
    const check = new CheckAccess(
      new FakePensilPosAccounts(),
      new InMemorySessionStore(),
      new FixedClock(),
    );

    expect(await check.execute()).toEqual({ ok: false, error: 'signed-out' });
    expect(check.known()).toBeNull();
  });

  it('knows who is signed in on this device before asking Pensil.Pos', () => {
    const { check, accounts } = setUp();

    expect(check.known()).toEqual(aMember());
    expect(accounts.checked).toEqual([]);
  });

  it('asks Pensil.Pos once per visit while the session is active', async () => {
    const { check, accounts } = setUp();

    expect(await check.execute()).toEqual(ok(aMember()));
    expect(await check.execute()).toEqual(ok(aMember()));
    expect(accounts.checked).toHaveLength(1);
  });

  it('renews an expired session without asking anything and keeps the new tokens', async () => {
    const { check, accounts, store } = setUp(aSession({ expiresAt: EXPIRED }));
    const renewed = aSession({ accessToken: 'new', refreshToken: 'new-refresh' });
    accounts.renewResult = ok(renewed);

    expect(await check.execute()).toEqual(ok(renewed.member));
    expect(accounts.checked).toEqual([]);
    expect(store.session).toEqual(renewed);
  });

  it('renews a session Pensil.Pos rejects, and signs out when that fails too', async () => {
    const { check, accounts, store } = setUp();
    accounts.status = 'rejected';

    expect(await check.execute()).toEqual({ ok: false, error: 'signed-out' });
    expect(accounts.renewed).toHaveLength(1);
    expect(store.session).toBeNull();
    expect(check.known()).toBeNull();
  });

  it('lets people read while Pensil.Pos is unreachable and the session has not expired', async () => {
    const { check, accounts } = setUp();
    accounts.status = 'unreachable';

    expect(await check.execute()).toEqual(ok(aMember()));
    expect(await check.execute()).toEqual(ok(aMember()));
    // Not verified yet: it asks again on the next check.
    expect(accounts.checked).toHaveLength(2);
  });

  it('keeps an expired session it could not renew offline, but does not let it in', async () => {
    const { check, accounts, store } = setUp(aSession({ expiresAt: EXPIRED }));
    accounts.renewResult = { ok: false, error: 'unreachable' };

    expect(await check.execute()).toEqual({ ok: false, error: 'signed-out' });
    expect(store.session).not.toBeNull();
  });

  it('never renews twice at the same time', async () => {
    const { check, accounts } = setUp(aSession({ expiresAt: EXPIRED }));
    accounts.renewResult = ok(aSession());

    await Promise.all([check.execute(), check.execute()]);

    expect(accounts.renewed).toHaveLength(1);
  });

  it('checks again a session signed in after a previous check', async () => {
    const { check, accounts, store } = setUp();
    await check.execute();

    store.save(aSession({ accessToken: 'another' }));
    await check.execute();

    expect(accounts.checked).toHaveLength(2);
  });
});

describe('Sign out', () => {
  it('forgets the session on this device and closes it in Pensil.Pos', async () => {
    const { accounts, store } = setUp();

    await new SignOut(accounts, store).execute();

    expect(store.session).toBeNull();
    expect(accounts.signedOut).toEqual([aSession()]);
  });

  it('signs out of the academy even when Pensil.Pos is unreachable', async () => {
    const { accounts, store } = setUp();
    accounts.failSignOut = true;

    await new SignOut(accounts, store).execute();

    expect(store.session).toBeNull();
  });

  it('does nothing without a session', async () => {
    const accounts = new FakePensilPosAccounts();

    await new SignOut(accounts, new InMemorySessionStore()).execute();

    expect(accounts.signedOut).toEqual([]);
  });
});
