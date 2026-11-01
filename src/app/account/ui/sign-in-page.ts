import { Component, computed, inject, input, signal } from '@angular/core';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import type { SignInError } from '../application/membership';
import { CREDENTIALS_LIMITS } from '../domain/credentials';
import { returnPathAfterSignIn } from '../domain/return-path';
import { Membership } from './membership';
import { PENSIL_POS_LINKS } from './pensil-pos-links';

const UNREACHABLE =
  'No pudimos conectarnos con Pensil.Pos. Revisa tu conexión e inténtalo de nuevo.';

interface SignInModel {
  identifier: string;
  password: string;
}

@Component({
  selector: 'app-sign-in-page',
  imports: [FormField, Icon],
  templateUrl: './sign-in-page.html',
})
export class SignInPage {
  private readonly membership = inject(Membership);
  private readonly router = inject(Router);

  /** `?volver=`: the academy page the person wanted to read. */
  readonly volver = input<string>();

  protected readonly links = PENSIL_POS_LINKS;
  protected readonly limits = CREDENTIALS_LIMITS;
  protected readonly showPassword = signal(false);
  protected readonly failure = signal<string | null>(null);
  protected readonly credentialsRejected = signal(false);
  private readonly model = signal<SignInModel>({ identifier: '', password: '' });

  protected readonly signInForm = form(this.model, (path) => {
    required(path.identifier, { message: 'Escribe tu usuario o tu correo.' });
    minLength(path.identifier, CREDENTIALS_LIMITS.identifier, {
      message: `Tu usuario tiene al menos ${CREDENTIALS_LIMITS.identifier} caracteres.`,
    });
    required(path.password, { message: 'Escribe tu contraseña.' });
    minLength(path.password, CREDENTIALS_LIMITS.password, {
      message: `Tu contraseña tiene al menos ${CREDENTIALS_LIMITS.password} caracteres.`,
    });
  });

  protected readonly submitting = computed(() => this.signInForm().submitting());

  protected togglePassword(): void {
    this.showPassword.update((shown) => !shown);
  }

  protected async signIn(event: Event): Promise<void> {
    event.preventDefault();
    this.failure.set(null);
    await submit(this.signInForm, {
      action: async () => {
        const { identifier, password } = this.model();
        const result = await this.membership.signIn(identifier, password);
        if (result.ok) {
          await this.router.navigateByUrl(returnPathAfterSignIn(this.volver()));
        } else {
          this.showFailure(result.error);
        }
        return undefined;
      },
      onInvalid: () => this.focusFirstInvalidField(),
    });
  }

  private showFailure(error: SignInError): void {
    this.credentialsRejected.set(error.reason === 'rejected');
    this.failure.set(failureMessage(error));
  }

  private focusFirstInvalidField(): void {
    const first = [this.signInForm.identifier, this.signInForm.password].find((field) =>
      field().invalid(),
    );
    first?.().focusBoundControl();
  }
}

function failureMessage(error: SignInError): string {
  switch (error.reason) {
    case 'rejected':
      return error.message;
    case 'unreachable':
      return UNREACHABLE;
    case 'invalid':
      return 'Revisa los datos marcados.';
  }
}
