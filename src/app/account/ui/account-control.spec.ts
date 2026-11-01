import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  FakePensilPosAccounts,
  FixedClock,
  InMemorySessionStore,
} from '../application/account.fakes';
import { CheckAccess, SignIn, SignOut } from '../application/membership';
import { aMember, aSession } from '../domain/member.fixtures';
import { AccountControl } from './account-control';

describe('Account control', () => {
  let fixture: ComponentFixture<AccountControl>;
  let accounts: FakePensilPosAccounts;
  let store: InMemorySessionStore;

  const render = async (session: ReturnType<typeof aSession> | null) => {
    accounts = new FakePensilPosAccounts();
    store = new InMemorySessionStore(session);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', children: [] }]),
        { provide: SignIn, useValue: new SignIn(accounts, store) },
        { provide: CheckAccess, useValue: new CheckAccess(accounts, store, new FixedClock()) },
        { provide: SignOut, useValue: new SignOut(accounts, store) },
      ],
    });
    fixture = TestBed.createComponent(AccountControl);
    await fixture.whenStable();
  };
  const element = () => fixture.nativeElement as HTMLElement;

  it('invites to sign in when nobody is signed in', async () => {
    await render(null);

    expect(element().querySelector('a[href="/ingresar"]')?.textContent).toContain('Ingresar');
  });

  it('greets the member by first name and signs out', async () => {
    await render(aSession({ member: aMember({ name: 'Ana López' }) }));
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');

    expect(element().textContent).toContain('Ingresaste como Ana');
    element().querySelector('button')?.click();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    await fixture.whenStable();

    expect(store.session).toBeNull();
    expect(accounts.signedOut).toHaveLength(1);
    expect(navigate).toHaveBeenCalledWith('/');
    expect(element().querySelector('a[href="/ingresar"]')).not.toBeNull();
  });
});
