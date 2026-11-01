import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Credentials } from '../domain/credentials';
import { aSession } from '../domain/member.fixtures';
import { PENSIL_POS_API_URL, PensilPosAccountsHttp } from './pensil-pos-accounts-http';

const API = 'https://pos.test/api';
// Header and signature are irrelevant to the academy: it only reads `exp` (2026-12-01T00:00:00Z).
const ACCESS_TOKEN = `x.${btoa(JSON.stringify({ id: 'u1', exp: 1796083200 }))}.y`;

const credentials = () => {
  const result = Credentials.create('ana', 'secreta123');
  if (!result.ok) {
    throw new Error('invalid test credentials');
  }
  return result.value;
};

describe('Pensil.Pos accounts over HTTP', () => {
  let accounts: PensilPosAccountsHttp;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PENSIL_POS_API_URL, useValue: API },
        PensilPosAccountsHttp,
      ],
    });
    accounts = TestBed.inject(PensilPosAccountsHttp);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('sign in', () => {
    it('logs in with the identifier and password and reads who the person is', async () => {
      const pending = accounts.signIn(credentials());

      const request = http.expectOne(`${API}/auth/login`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ identifier: 'ana', password: 'secreta123' });
      request.flush({
        status: 200,
        message: 'Login exitoso',
        data: {
          user: {
            id: 'u1',
            name: 'Ana López',
            username: 'ana',
            rol: 'ADMIN_ROLE',
            permissions: ['sales.canRead'],
            establishment: { id: 'e1', name: 'Licorera La 70', type: 'SPIRIT_TYPE' },
          },
          token: ACCESS_TOKEN,
          refreshToken: 'refresh-1',
        },
      });

      expect(await pending).toEqual({
        ok: true,
        value: {
          member: {
            name: 'Ana López',
            username: 'ana',
            role: 'owner',
            businessName: 'Licorera La 70',
          },
          accessToken: ACCESS_TOKEN,
          refreshToken: 'refresh-1',
          expiresAt: '2026-12-01T00:00:00.000Z',
        },
      });
    });

    it('accepts an account without a business and a token it cannot read', async () => {
      const pending = accounts.signIn(credentials());

      http.expectOne(`${API}/auth/login`).flush({
        status: 200,
        data: {
          user: { name: 'Soporte', username: 'soporte', rol: 'SUPER_ADMIN_ROLE' },
          token: 'opaque',
          refreshToken: 'r',
        },
      });

      const result = await pending;
      expect(result.ok && result.value.member).toEqual({
        name: 'Soporte',
        username: 'soporte',
        role: 'pensil-devs',
        businessName: null,
      });
      expect(result.ok && result.value.expiresAt).toBeNull();
    });

    it('passes on the message Pensil.Pos shows for a rejection', async () => {
      const pending = accounts.signIn(credentials());

      http
        .expectOne(`${API}/auth/login`)
        .flush(
          { status: 401, message: 'Usuario o contraseña incorrectos' },
          { status: 401, statusText: 'Unauthorized' },
        );

      expect(await pending).toEqual({
        ok: false,
        error: { reason: 'rejected', message: 'Usuario o contraseña incorrectos' },
      });
    });

    it('uses its own message when the rejection has none', async () => {
      const pending = accounts.signIn(credentials());

      http.expectOne(`${API}/auth/login`).flush('', { status: 400, statusText: 'Bad Request' });

      expect(await pending).toEqual({
        ok: false,
        error: { reason: 'rejected', message: 'No pudimos iniciar tu sesión. Inténtalo de nuevo.' },
      });
    });

    it('tells when Pensil.Pos cannot be reached or fails', async () => {
      const offline = accounts.signIn(credentials());
      http.expectOne(`${API}/auth/login`).error(new ProgressEvent('error'));
      expect(await offline).toEqual({ ok: false, error: { reason: 'unreachable' } });

      const failing = accounts.signIn(credentials());
      http.expectOne(`${API}/auth/login`).flush({}, { status: 503, statusText: 'Unavailable' });
      expect(await failing).toEqual({ ok: false, error: { reason: 'unreachable' } });
    });

    it('treats an answer without a session as a failure to reach Pensil.Pos', async () => {
      const pending = accounts.signIn(credentials());

      http.expectOne(`${API}/auth/login`).flush({ status: 200, data: { user: null } });

      expect(await pending).toEqual({ ok: false, error: { reason: 'unreachable' } });
    });
  });

  describe('check', () => {
    it('asks who is signed in with the access token', async () => {
      const pending = accounts.check(aSession());

      const request = http.expectOne(`${API}/auth/me`);
      expect(request.request.headers.get('x-token')).toBe('access-token');
      request.flush({ status: 200, data: {} });

      expect(await pending).toBe('active');
    });

    it.each([
      [401, 'rejected'],
      [403, 'rejected'],
      [500, 'unreachable'],
    ] as const)('reads a %s answer as %s', async (status, expected) => {
      const pending = accounts.check(aSession());

      http.expectOne(`${API}/auth/me`).flush({}, { status, statusText: 'x' });

      expect(await pending).toBe(expected);
    });
  });

  describe('renew', () => {
    it('trades the refresh token for new tokens of the same member', async () => {
      const session = aSession();
      const pending = accounts.renew(session);

      const request = http.expectOne(`${API}/auth/refresh-token`);
      expect(request.request.body).toEqual({ refreshToken: 'refresh-token' });
      request.flush({ status: 200, data: { token: ACCESS_TOKEN, refreshToken: 'refresh-2' } });

      expect(await pending).toEqual({
        ok: true,
        value: {
          member: session.member,
          accessToken: ACCESS_TOKEN,
          refreshToken: 'refresh-2',
          expiresAt: '2026-12-01T00:00:00.000Z',
        },
      });
    });

    it('is rejected when Pensil.Pos refuses it and unreachable when it does not answer', async () => {
      const refused = accounts.renew(aSession());
      http.expectOne(`${API}/auth/refresh-token`).flush({}, { status: 401, statusText: 'x' });
      expect(await refused).toEqual({ ok: false, error: 'rejected' });

      const offline = accounts.renew(aSession());
      http.expectOne(`${API}/auth/refresh-token`).error(new ProgressEvent('error'));
      expect(await offline).toEqual({ ok: false, error: 'unreachable' });
    });
  });

  describe('sign out', () => {
    it('closes the session of its refresh token', async () => {
      const pending = accounts.signOut(aSession());

      const request = http.expectOne(`${API}/auth/logout`);
      expect(request.request.headers.get('x-token')).toBe('access-token');
      expect(request.request.body).toEqual({ refreshToken: 'refresh-token' });
      request.flush({ status: 200 });

      await expect(pending).resolves.toBeUndefined();
    });
  });
});
