import { Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import { firstName } from '../domain/member';
import { SIGN_IN_PATH } from '../domain/return-path';
import { Membership } from './membership';

/** "Ingresar", or who is signed in with "Salir". Shown in the header on every page. */
@Component({
  selector: 'app-account-control',
  imports: [Icon, RouterLink],
  host: { class: 'contents' },
  template: `
    @if (member(); as member) {
      <div class="flex items-center gap-2" [class.justify-between]="layout() === 'stacked'">
        <span class="flex min-w-0 items-center gap-2 font-medium">
          <span
            class="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-soft font-bold text-leaf-text"
            aria-hidden="true"
            >{{ initial() }}</span
          >
          <span class="truncate"
            ><span class="sr-only">Ingresaste como </span>{{ greeting() }}</span
          >
        </span>
        <button type="button" class="btn-secondary min-h-11 px-4" (click)="signOut()">
          <app-icon name="sign-out" class="size-5" />
          Salir
        </button>
      </div>
    } @else {
      <a [routerLink]="signInPath" class="btn-secondary" (click)="navigated.emit()">
        <app-icon name="lock" class="size-5" />
        Ingresar
      </a>
    }
  `,
})
export class AccountControl {
  private readonly membership = inject(Membership);
  private readonly router = inject(Router);

  /** `inline` in the desktop header, `stacked` in the mobile menu. */
  readonly layout = input<'inline' | 'stacked'>('inline');
  /** The person used the control: the mobile menu closes. */
  readonly navigated = output();

  protected readonly signInPath = SIGN_IN_PATH;
  protected readonly member = this.membership.member;
  protected readonly greeting = computed(() => {
    const member = this.member();
    return member ? firstName(member) : '';
  });
  protected readonly initial = computed(() => this.greeting().charAt(0).toUpperCase());

  protected async signOut(): Promise<void> {
    await this.membership.signOut();
    this.navigated.emit();
    await this.router.navigateByUrl('/');
  }
}
