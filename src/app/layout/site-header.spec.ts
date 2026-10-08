import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SiteHeader } from './site-header';

@Component({ template: '' })
class BlankPage {}

describe('Site header', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let header: HTMLElement;

  const menuButton = () =>
    header.querySelector<HTMLButtonElement>(
      'button[aria-controls="mobile-menu"]',
    ) as HTMLButtonElement;
  const mobileMenu = () => header.querySelector<HTMLElement>('#mobile-menu');
  const mainNavigation = () =>
    header.querySelector<HTMLElement>('nav[aria-label="Principal"]') as HTMLElement;
  const trigger = (label: string) => {
    const button = Array.from(mainNavigation().querySelectorAll('button')).find(
      (element) => element.textContent?.trim() === label,
    );
    if (!button) {
      throw new Error(`No submenu trigger labelled "${label}"`);
    }
    return button;
  };
  const submenuOf = (label: string) => {
    const id = trigger(label).getAttribute('aria-controls');
    return id ? header.querySelector<HTMLElement>(`#${id}`) : null;
  };
  const settle = () => fixture.whenStable();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: BlankPage }])],
    });
    fixture = TestBed.createComponent(SiteHeader);
    header = fixture.nativeElement;
    document.body.append(header);
    await settle();
  });

  afterEach(() => header.remove());

  it('links the academy logo to the home page with an accessible name', () => {
    const home = header.querySelector('a[href="/"]');
    expect(home?.getAttribute('aria-label')).toBe('Pensil.Devs Academy, ir al inicio');
  });

  it('links to pensildevs.com', () => {
    const site = header.querySelector<HTMLAnchorElement>('a[href="https://pensildevs.com"]');
    expect(site?.textContent).toContain('Ir a Pensil.Devs');
  });

  describe('desktop navigation', () => {
    it('offers Productos and Servicios as closed submenus', () => {
      const triggers = Array.from(mainNavigation().querySelectorAll(':scope > ul > li > button'));

      expect(triggers.map((item) => item.textContent?.trim())).toEqual(['Productos', 'Servicios']);
      expect(trigger('Productos').getAttribute('aria-expanded')).toBe('false');
      expect(submenuOf('Productos')).toBeNull();
    });

    it('opens the products submenu with the academy page of each product', async () => {
      trigger('Productos').click();
      await settle();

      expect(trigger('Productos').getAttribute('aria-expanded')).toBe('true');
      expect(
        submenuOf('Productos')?.querySelector('a[href="/productos/pensil-pos"]')?.textContent,
      ).toContain('Pensil.Pos');
    });

    it('opens the services submenu with the academy page of each service', async () => {
      trigger('Servicios').click();
      await settle();

      expect(submenuOf('Servicios')?.querySelectorAll('a[href^="/servicios/"]')).toHaveLength(4);
    });

    it('keeps only one submenu open at a time', async () => {
      trigger('Productos').click();
      await settle();
      trigger('Servicios').click();
      await settle();

      expect(submenuOf('Productos')).toBeNull();
      expect(submenuOf('Servicios')).not.toBeNull();
    });

    it('closes the submenu with Escape and returns focus to its trigger', async () => {
      trigger('Servicios').click();
      await settle();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await settle();

      expect(submenuOf('Servicios')).toBeNull();
      expect(document.activeElement).toBe(trigger('Servicios'));
    });

    it('closes the submenu when clicking outside or when focus leaves the navigation', async () => {
      trigger('Productos').click();
      await settle();
      document.body.click();
      await settle();
      expect(submenuOf('Productos')).toBeNull();

      trigger('Productos').click();
      await settle();
      const outside = header.querySelector('a[href="/"]') as HTMLElement;
      trigger('Productos').dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: outside }),
      );
      await settle();
      expect(submenuOf('Productos')).toBeNull();
    });

    it('keeps the submenu open while focus moves inside it', async () => {
      trigger('Productos').click();
      await settle();

      const inside = submenuOf('Productos')?.querySelector('a') as HTMLElement;
      trigger('Productos').dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: inside }),
      );
      await settle();

      expect(submenuOf('Productos')).not.toBeNull();
    });

    it('closes the submenu after choosing a topic', async () => {
      trigger('Servicios').click();
      await settle();

      submenuOf('Servicios')
        ?.querySelector<HTMLAnchorElement>('a[href="/servicios/automatizacion"]')
        ?.click();
      await settle();

      expect(TestBed.inject(Router).url).toBe('/servicios/automatizacion');
      expect(submenuOf('Servicios')).toBeNull();
    });

    it('marks the group of the current page and the current topic inside its submenu', async () => {
      await TestBed.inject(Router).navigateByUrl('/productos/pensil-pos');
      await settle();

      expect(trigger('Productos').getAttribute('aria-current')).toBe('true');
      expect(trigger('Servicios').hasAttribute('aria-current')).toBe(false);

      trigger('Productos').click();
      await settle();
      expect(
        submenuOf('Productos')?.querySelector('a[aria-current="page"]')?.getAttribute('href'),
      ).toBe('/productos/pensil-pos');
    });
  });

  describe('mobile menu', () => {
    it('opens and closes, announcing its state', async () => {
      expect(menuButton().getAttribute('aria-expanded')).toBe('false');

      menuButton().click();
      await settle();
      expect(menuButton().getAttribute('aria-expanded')).toBe('true');

      menuButton().click();
      await settle();
      expect(mobileMenu()).toBeNull();
    });

    it('shows the products and services groups with their topics visible', async () => {
      menuButton().click();
      await settle();

      const groups = Array.from(mobileMenu()?.querySelectorAll('h2') ?? []).map((title) =>
        title.textContent?.trim(),
      );
      expect(groups).toEqual(['Productos', 'Servicios']);
      expect(mobileMenu()?.querySelector('a[href="/productos/pensil-pos"]')).not.toBeNull();
      expect(mobileMenu()?.querySelectorAll('a[href^="/servicios/"]')).toHaveLength(4);
      expect(mobileMenu()?.querySelector('a[href="https://pensildevs.com"]')).not.toBeNull();
    });

    it('closes with Escape and returns focus to the button', async () => {
      menuButton().click();
      await settle();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await settle();

      expect(mobileMenu()).toBeNull();
      expect(document.activeElement).toBe(menuButton());
    });

    it('closes after choosing a topic', async () => {
      menuButton().click();
      await settle();

      mobileMenu()?.querySelector<HTMLAnchorElement>('a[href="/productos/pensil-pos"]')?.click();
      await settle();

      expect(mobileMenu()).toBeNull();
    });
  });
});
