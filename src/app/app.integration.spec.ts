import { DOCUMENT } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App } from './app';
import { appConfig } from './app.config';

describe('Academy navigation (real routes and providers)', () => {
  let fixture: ComponentFixture<App>;
  let document: Document;

  const visit = async (url: string) => {
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
  };
  const shell = () => fixture.nativeElement as HTMLElement;
  const heading = () => shell().querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim();
  const pageTitle = () => TestBed.inject(Title).getTitle();
  const description = () => TestBed.inject(Meta).getTag('name="description"')?.content;
  const text = () => shell().querySelector('main')?.textContent?.replace(/\s+/g, ' ') ?? '';

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [App], providers: appConfig.providers });
    document = TestBed.inject(DOCUMENT);
    vi.spyOn(document.defaultView as Window, 'scrollTo').mockImplementation(() => undefined);
    fixture = TestBed.createComponent(App);
    await visit('/');
  });

  it('presents the academy with its topics grouped by products and services, and featured content', () => {
    expect(heading()).toBe('Aprende a sacarle provecho a tu software');
    expect(shell().querySelectorAll('main h1')).toHaveLength(1);
    expect(pageTitle()).toBe('Pensil.Devs Academy · Aprende a sacarle provecho a tu software');
    expect(shell().querySelectorAll('app-topic-card')).toHaveLength(5);
    expect(text()).toContain('Productos');
    expect(text()).toContain('Servicios');
    expect(shell().querySelector('main a[href="/videos/conoce-pensil-pos"]')).not.toBeNull();
  });

  it('opens a topic with its own title and description', async () => {
    await visit('/productos/pensil-pos');

    expect(heading()).toBe('Pensil.Pos');
    expect(pageTitle()).toBe('Pensil.Pos · Pensil.Devs Academy');
    expect(description()).toContain('punto de venta');
  });

  it('filters a topic from the query string', async () => {
    await visit('/productos/pensil-pos?tipo=guias');

    expect(shell().querySelectorAll('app-content-card')).toHaveLength(1);
    expect(text()).toContain('Cómo hacer el corte de caja');
  });

  it('refuses a product asked for as a service', async () => {
    await visit('/servicios/pensil-pos');

    expect(heading()).toBe('No encontramos ese tema');
    expect(pageTitle()).toBe('Tema no encontrado · Pensil.Devs Academy');
  });

  it('plays the first Pensil.Pos video', async () => {
    await visit('/videos/conoce-pensil-pos');

    expect(heading()).toBe('Conoce Pensil.Pos');
    expect(pageTitle()).toBe('Conoce Pensil.Pos · Pensil.Devs Academy');
    expect(shell().querySelector('app-video-player button')?.textContent).toContain(
      'Reproducir video',
    );
    expect(shell().querySelector('main a[href="/productos/pensil-pos"]')).not.toBeNull();
    expect(text()).toContain('Sigue aprendiendo');
  });

  it('explains when a video is coming soon', async () => {
    await visit('/videos/vende-con-lector-de-codigos');

    expect(heading()).toBe('Este video estará disponible pronto');
    expect(shell().querySelector('main a[href="/productos/pensil-pos"]')).not.toBeNull();
  });

  it('takes a course from its overview to its first lesson', async () => {
    await visit('/cursos/primeros-pasos-con-pensil-pos');

    expect(heading()).toBe('Primeros pasos con Pensil.Pos');
    expect(text()).toContain('5 lecciones');
    const start = Array.from(shell().querySelectorAll<HTMLAnchorElement>('main a')).find((link) =>
      link.textContent?.includes('Empezar el curso'),
    );
    expect(start?.getAttribute('href')).toBe(
      '/cursos/primeros-pasos-con-pensil-pos/conoce-pensil-pos',
    );

    await visit('/cursos/primeros-pasos-con-pensil-pos/conoce-pensil-pos');

    expect(heading()).toBe('Conoce Pensil.Pos');
    expect(pageTitle()).toBe(
      'Conoce Pensil.Pos · Primeros pasos con Pensil.Pos · Pensil.Devs Academy',
    );
    expect(text()).toContain('Lección 1 de 5');
  });

  it('reads a guide with its table of contents', async () => {
    await visit('/guias/corte-de-caja');

    expect(heading()).toBe('Cómo hacer el corte de caja');
    expect(shell().querySelector('main a[href="#si-no-cuadra"]')).not.toBeNull();
    expect(shell().querySelector('main section#si-no-cuadra h2')?.textContent).toContain(
      'Si el corte no cuadra',
    );
  });

  it.each([
    ['/videos/no-existe', 'No encontramos ese video'],
    ['/cursos/no-existe', 'No encontramos ese curso'],
    ['/guias/no-existe', 'No encontramos esa guía'],
  ])('explains that %s does not exist', async (url, title) => {
    await visit(url);

    expect(heading()).toBe(title);
  });

  it('shows a helpful page for unknown addresses', async () => {
    await visit('/esto-no-existe');

    expect(heading()).toContain('boceto');
    expect(pageTitle()).toBe('Página no encontrada · Pensil.Devs Academy');
  });

  it('moves focus to the main content after navigating, for screen reader users', async () => {
    await visit('/productos/pensil-pos');

    expect(document.activeElement?.id).toBe('main-content');
  });
});
