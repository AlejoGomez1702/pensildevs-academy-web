import { Component, DOCUMENT, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteFooter, SiteHeader],
  host: { class: 'flex min-h-dvh flex-col' },
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly navigation = toSignal(
    inject(Router).events.pipe(filter((event) => event instanceof NavigationEnd)),
  );
  private isFirstNavigation = true;

  constructor() {
    // Screen readers do not notice client-side navigation: move focus to the new page.
    effect(() => {
      if (!this.navigation()) {
        return;
      }
      if (this.isFirstNavigation) {
        this.isFirstNavigation = false;
        return;
      }
      this.focusMainContent();
    });
  }

  private focusMainContent(): void {
    const main = this.document.getElementById('main-content');
    const fragment = this.document.location.hash;
    if (main && !fragment) {
      main.focus({ preventScroll: true });
    }
  }
}
