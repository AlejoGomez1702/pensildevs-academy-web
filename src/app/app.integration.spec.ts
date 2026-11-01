import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [...appConfig.providers, provideHttpClientTesting()],
    });
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
    expect(
      shell().querySelector('main a[href="/videos/introduccion-a-pensil-pos"]'),
    ).not.toBeNull();
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
    expect(text()).toContain('Cómo cuadrar la caja del día');
  });

  it('refuses a product asked for as a service', async () => {
    await visit('/servicios/pensil-pos');

    expect(heading()).toBe('No encontramos ese tema');
    expect(pageTitle()).toBe('Tema no encontrado · Pensil.Devs Academy');
  });

  it('plays the first Pensil.Pos video', async () => {
    await visit('/videos/conoce-pensil-pos');

    expect(heading()).toBe('Recorrido por Pensil.Pos');
    expect(pageTitle()).toBe('Recorrido por Pensil.Pos · Pensil.Devs Academy');
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
    expect(text()).toContain('7 lecciones');
    const start = Array.from(shell().querySelectorAll<HTMLAnchorElement>('main a')).find((link) =>
      link.textContent?.includes('Empezar el curso'),
    );
    expect(start?.getAttribute('href')).toBe(
      '/cursos/primeros-pasos-con-pensil-pos/conoce-pensil-pos-en-2-minutos',
    );

    await visit('/cursos/primeros-pasos-con-pensil-pos/conoce-pensil-pos-en-2-minutos');

    expect(heading()).toBe('Conoce Pensil.Pos en 2 minutos');
    expect(pageTitle()).toBe(
      'Conoce Pensil.Pos en 2 minutos · Primeros pasos con Pensil.Pos · Pensil.Devs Academy',
    );
    expect(text()).toContain('Lección 1 de 7');
    expect(shell().querySelector('app-video-player video track[kind="captions"]')).not.toBeNull();
  });

  it('reads a guide with its table of contents', async () => {
    await visit('/guias/cuadra-la-caja-del-dia');

    expect(heading()).toBe('Cómo cuadrar la caja del día');
    expect(shell().querySelector('main a[href="#si-no-cuadra"]')).not.toBeNull();
    expect(shell().querySelector('main section#si-no-cuadra h2')?.textContent).toContain(
      'Si no cuadra',
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

  it('plays the introduction to Pensil.Pos from the academy, with captions and a transcript', async () => {
    await visit('/videos/introduccion-a-pensil-pos');

    expect(heading()).toBe('Conoce Pensil.Pos en 2 minutos');
    const video = shell().querySelector('app-video-player video');
    expect(video?.querySelector('source')?.getAttribute('src')).toBe(
      '/media/pensil-pos/introduccion.mp4',
    );
    expect(video?.querySelector('track')?.getAttribute('src')).toBe(
      '/media/pensil-pos/introduccion.es.vtt',
    );
    expect(text()).toContain('Leer lo que muestra el video');
  });

  describe('documentation', () => {
    const signedIn = () =>
      localStorage.setItem(
        'pensildevs-academy.session',
        JSON.stringify({
          member: { name: 'Ana López', username: 'ana', role: 'owner', businessName: 'La 70' },
          accessToken: 'access',
          refreshToken: 'refresh',
          expiresAt: '2100-01-01T00:00:00.000Z',
        }),
      );
    /** Navigates while Pensil.Pos confirms the stored session. */
    const visitSignedIn = async (url: string) => {
      let done = false;
      const navigation = TestBed.inject(Router)
        .navigateByUrl(url)
        .finally(() => (done = true));
      // Lazy routes load first; answer Pensil.Pos's session check whenever it is asked.
      while (!done) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        for (const request of TestBed.inject(HttpTestingController).match((request) =>
          request.url.endsWith('/auth/me'),
        )) {
          request.flush({ status: 200, data: {} });
        }
      }
      await navigation;
      await fixture.whenStable();
    };

    it('presents what each product documents and asks to sign in to read it', async () => {
      await visit('/documentacion');

      expect(heading()).toBe('El manual completo de tus productos');
      expect(pageTitle()).toBe('Documentación · Pensil.Devs Academy');
      expect(text()).toContain('Documentación funcional');
      expect(text()).toContain('Documentación técnica');
      const signIn = shell().querySelector<HTMLAnchorElement>('main a[href^="/ingresar"]');
      expect(signIn?.getAttribute('href')).toBe('/ingresar?volver=%2Fdocumentacion%2Fpensil-pos');
    });

    it('sends whoever is not signed in to sign in, and back afterwards', async () => {
      await visit('/documentacion/pensil-pos/tecnica/arquitectura');

      expect(TestBed.inject(Router).url).toBe(
        '/ingresar?volver=%2Fdocumentacion%2Fpensil-pos%2Ftecnica%2Farquitectura',
      );
      expect(heading()).toBe('Ingresa con tu cuenta de Pensil.Pos');
      expect(pageTitle()).toBe('Ingresar · Pensil.Devs Academy');
    });

    it('greets the member and lists both kinds of documentation', async () => {
      signedIn();

      await visitSignedIn('/documentacion/pensil-pos');

      expect(heading()).toBe('Documentación de Pensil.Pos');
      expect(text()).toContain('Hola, Ana · La 70');
      expect(
        shell().querySelector('main a[href="/documentacion/pensil-pos/funcional/primeros-pasos"]'),
      ).not.toBeNull();
      expect(
        shell().querySelector('main a[href="/documentacion/pensil-pos/tecnica/arquitectura"]'),
      ).not.toBeNull();
      expect(shell().querySelector('app-site-header')?.textContent).toContain(
        'Ingresaste como Ana',
      );
    });

    it('reads an article with its index, its track and the next article', async () => {
      signedIn();

      await visitSignedIn('/documentacion/pensil-pos/funcional/primeros-pasos');

      expect(shell().querySelectorAll('main h1')).toHaveLength(1);
      expect(pageTitle()).toContain('Pensil.Pos · Pensil.Devs Academy');
      expect(text()).toContain('Documentación funcional · 1 de');
      expect(shell().querySelector('main a[aria-current="page"]')?.getAttribute('href')).toBe(
        '/documentacion/pensil-pos/funcional/primeros-pasos',
      );
      expect(shell().querySelector('nav[aria-label="Más artículos"]')?.textContent).toContain(
        'Siguiente',
      );
      expect(text()).toContain('Revisado el 1 de noviembre de 2026');
    });

    it.each([
      '/documentacion/pensil-pos/funcional/no-existe',
      '/documentacion/pensil-pos/otra/primeros-pasos',
    ])('explains that %s does not exist', async (url) => {
      signedIn();

      await visitSignedIn(url);

      expect(heading()).toBe('No encontramos ese artículo');
    });

    it('documents every product of the academy', async () => {
      signedIn();

      await visit('/');
      const products = Array.from(
        shell().querySelectorAll<HTMLAnchorElement>('app-site-footer a[href^="/productos/"]'),
      );
      expect(products.length).toBeGreaterThan(0);
      for (const product of products) {
        const slug = product.getAttribute('href')?.replace('/productos/', '') ?? '';
        await visitSignedIn(`/documentacion/${slug}`);
        expect(heading()).toBe(`Documentación de ${product.textContent?.trim()}`);
      }
    });
  });
});
