import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { err, ok } from '../../shared/kernel/result';
import {
  FakePensilPosAccounts,
  FixedClock,
  InMemorySessionStore,
} from '../application/account.fakes';
import { CheckAccess, SignIn, SignOut } from '../application/membership';
import { aSession } from '../domain/member.fixtures';
import { SignInPage } from './sign-in-page';

describe('Sign-in page', () => {
  let fixture: ComponentFixture<SignInPage>;
  let accounts: FakePensilPosAccounts;
  let store: InMemorySessionStore;

  const page = () => fixture.nativeElement as HTMLElement;
  const input = (label: string) => {
    const id = [...page().querySelectorAll('label')]
      .find((candidate) => candidate.textContent?.includes(label))
      ?.getAttribute('for');
    return page().querySelector<HTMLInputElement>(`#${id}`);
  };
  const type = (label: string, value: string) => {
    const field = input(label);
    if (!field) {
      throw new Error(`No field ${label}`);
    }
    field.value = value;
    field.dispatchEvent(new Event('input'));
  };
  const submit = async () => {
    page().querySelector<HTMLButtonElement>('button[type="submit"]')?.click();
    await fixture.whenStable();
    // The submit action awaits Pensil.Pos; let its promise settle.
    await new Promise((resolve) => setTimeout(resolve));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    accounts = new FakePensilPosAccounts();
    store = new InMemorySessionStore();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', children: [] }]),
        { provide: SignIn, useValue: new SignIn(accounts, store) },
        { provide: CheckAccess, useValue: new CheckAccess(accounts, store, new FixedClock()) },
        { provide: SignOut, useValue: new SignOut(accounts, store) },
      ],
    });
    fixture = TestBed.createComponent(SignInPage);
    fixture.componentRef.setInput('volver', '/documentacion/pensil-pos/tecnica/arquitectura');
    await fixture.whenStable();
  });

  it('asks for the Pensil.Pos username or email and password, with links to pensilpos.com', () => {
    expect(page().querySelector('h1')?.textContent).toContain(
      'Ingresa con tu cuenta de Pensil.Pos',
    );
    expect(input('Usuario o correo')?.autocomplete).toBe('username');
    expect(input('Contraseña')?.type).toBe('password');
    expect(
      page().querySelector('a[href="https://pensilpos.com/auth/forgot-password"]'),
    ).not.toBeNull();
    expect(page().querySelector('a[href="https://pensilpos.com/auth/register"]')).not.toBeNull();
  });

  it('shows and hides the password', async () => {
    const toggle = page().querySelector<HTMLButtonElement>('button[aria-pressed]');

    toggle?.click();
    await fixture.whenStable();

    expect(input('Contraseña')?.type).toBe('text');
    expect(toggle?.getAttribute('aria-pressed')).toBe('true');
  });

  it('points out each invalid field and sends nothing', async () => {
    type('Usuario o correo', 'a');

    await submit();

    const identifier = input('Usuario o correo');
    expect(identifier?.getAttribute('aria-invalid')).toBe('true');
    const errorId = identifier?.getAttribute('aria-describedby') ?? '';
    expect(page().querySelector(`#${errorId}`)?.textContent).toContain('al menos 3 caracteres');
    expect(page().textContent).toContain('Escribe tu contraseña');
    expect(document.activeElement).toBe(identifier);
    expect(accounts.signedIn).toEqual([]);
  });

  it('goes back to the page that was asked for once Pensil.Pos accepts the account', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    type('Usuario o correo', 'ana');
    type('Contraseña', 'secreta123');

    await submit();

    expect(store.session).toEqual(aSession());
    expect(navigate).toHaveBeenCalledWith('/documentacion/pensil-pos/tecnica/arquitectura');
  });

  it('shows what Pensil.Pos answered and keeps the username', async () => {
    accounts.signInResult = err({
      reason: 'rejected',
      message: 'Usuario o contraseña incorrectos',
    });
    type('Usuario o correo', 'ana');
    type('Contraseña', 'equivocada');

    await submit();

    const alert = page().querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Usuario o contraseña incorrectos');
    expect(alert?.textContent).toContain('¿Te registraste con Google?');
    expect(input('Usuario o correo')?.value).toBe('ana');
  });

  it('explains when Pensil.Pos cannot be reached', async () => {
    accounts.signInResult = err({ reason: 'unreachable' });
    type('Usuario o correo', 'ana');
    type('Contraseña', 'secreta123');

    await submit();

    expect(page().querySelector('[role="alert"]')?.textContent).toContain(
      'No pudimos conectarnos con Pensil.Pos',
    );
  });

  it('ignores a return address outside the academy', async () => {
    fixture.componentRef.setInput('volver', 'https://example.com');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    accounts.signInResult = ok(aSession());
    type('Usuario o correo', 'ana');
    type('Contraseña', 'secreta123');

    await submit();

    expect(navigate).toHaveBeenCalledWith('/documentacion');
  });
});
