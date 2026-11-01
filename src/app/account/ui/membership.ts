import { inject, Service, signal } from '@angular/core';
import type { Result } from '../../shared/kernel/result';
import { CheckAccess, SignIn, SignOut, type SignInError } from '../application/membership';
import type { Member } from '../domain/member';

/** Who is signed in, for every page: the use cases plus a signal the templates read. */
@Service()
export class Membership {
  private readonly signInUseCase = inject(SignIn);
  private readonly checkAccessUseCase = inject(CheckAccess);
  private readonly signOutUseCase = inject(SignOut);
  private readonly current = signal<Member | null>(this.checkAccessUseCase.known());

  readonly member = this.current.asReadonly();

  async signIn(identifier: string, password: string): Promise<Result<Member, SignInError>> {
    const result = await this.signInUseCase.execute(identifier, password);
    if (result.ok) {
      this.current.set(result.value);
    }
    return result;
  }

  /** Whether the person may read the documentation now (asks Pensil.Pos once per visit). */
  async checkAccess(): Promise<boolean> {
    const result = await this.checkAccessUseCase.execute();
    this.current.set(result.ok ? result.value : null);
    return result.ok;
  }

  async signOut(): Promise<void> {
    await this.signOutUseCase.execute();
    this.current.set(null);
  }
}
