import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { Icon } from '../shared/ui/icon';
import { Logo } from '../shared/ui/logo';
import { PENSIL_DEVS_URL } from '../topics';
import { NAVIGATION_MENUS } from './navigation-links';

const isWithinSection = (url: string, sectionPath: string) =>
  url === sectionPath || url.startsWith(`${sectionPath}/`) || url.startsWith(`${sectionPath}?`);

@Component({
  selector: 'app-site-header',
  imports: [Icon, Logo, RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  host: {
    class: 'sticky top-0 z-40 block border-b border-line/70 bg-paper/85 backdrop-blur-md',
    role: 'banner',
    '(document:keydown.escape)': 'closeFromKeyboard()',
    '(document:click)': 'closeSubmenuOnOutsideClick($event)',
  },
})
export class SiteHeader {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);
  private readonly mainNavigation = viewChild.required<ElementRef<HTMLElement>>('mainNavigation');
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly menus = NAVIGATION_MENUS;
  protected readonly siteUrl = PENSIL_DEVS_URL;
  protected readonly menuOpen = signal(false);
  protected readonly openSubmenu = signal<string | null>(null);
  protected readonly activeSection = computed(
    () => NAVIGATION_MENUS.find((menu) => isWithinSection(this.currentUrl(), menu.path))?.id ?? null,
  );

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleSubmenu(id: string): void {
    this.openSubmenu.update((open) => (open === id ? null : id));
  }

  protected closeSubmenu(): void {
    this.openSubmenu.set(null);
  }

  protected closeSubmenuOnOutsideClick(event: MouseEvent): void {
    if (!this.mainNavigation().nativeElement.contains(event.target as Node | null)) {
      this.closeSubmenu();
    }
  }

  protected closeSubmenuWhenFocusLeaves(event: FocusEvent): void {
    // Without a target, focus left the page or landed on blank space (Safari does this when clicking
    // a button); the outside-click handler covers the latter, so only a real element outside closes it.
    const next = event.relatedTarget as Node | null;
    if (next && !this.mainNavigation().nativeElement.contains(next)) {
      this.closeSubmenu();
    }
  }

  protected closeFromKeyboard(): void {
    const submenu = this.openSubmenu();
    if (submenu) {
      this.closeSubmenu();
      this.host.nativeElement.querySelector<HTMLElement>(`#submenu-trigger-${submenu}`)?.focus();
      return;
    }
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuButton().nativeElement.focus();
    }
  }
}
