import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] });
  });

  it('offers a skip link as the first focusable element, pointing to the main content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const shell = fixture.nativeElement as HTMLElement;

    const firstLink = shell.querySelector('a');
    expect(firstLink?.textContent?.trim()).toBe('Saltar al contenido');
    expect(firstLink?.getAttribute('href')).toBe('#main-content');
    expect(shell.querySelector('main#main-content')?.getAttribute('tabindex')).toBe('-1');
  });

  it('frames every page with the site header and footer landmarks', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const shell = fixture.nativeElement as HTMLElement;

    expect(shell.querySelector('app-site-header nav[aria-label="Principal"]')).not.toBeNull();
    expect(shell.querySelector('app-site-footer a[href="/"]')?.getAttribute('aria-label')).toBe(
      'Pensil.Devs Academy, ir al inicio',
    );
  });
});
