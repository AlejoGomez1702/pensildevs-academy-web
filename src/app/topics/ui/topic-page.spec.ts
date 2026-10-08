import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLibrary } from '../../library';
import type { TopicGroup } from '../domain/topic';
import { TopicPage } from './topic-page';

describe('Topic page', () => {
  let fixture: ComponentFixture<TopicPage>;
  let page: HTMLElement;

  const visit = async (group: TopicGroup, slug: string, tipo?: string) => {
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('slug', slug);
    fixture.componentRef.setInput('tipo', tipo);
    await fixture.whenStable();
  };
  const filter = (label: string) =>
    Array.from(
      page.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Filtrar por tipo"] a'),
    ).find((link) => link.textContent?.trim().startsWith(label));
  const cards = () => page.querySelectorAll('app-content-card');
  const text = () => page.textContent?.replace(/\s+/g, ' ') ?? '';

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideLibrary()] });
    fixture = TestBed.createComponent(TopicPage);
    page = fixture.nativeElement;
  });

  it('presents the topic with all of its content', async () => {
    await visit('product', 'pensil-pos');

    expect(page.querySelector('h1')?.textContent?.trim()).toBe('Pensil.Pos');
    expect(cards()).toHaveLength(4);
    expect(text()).toContain('Próximamente');
  });

  it('labels each filter with the available content of that kind and marks the chosen one', async () => {
    await visit('product', 'pensil-pos');

    expect(filter('Todos')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Todos 3');
    expect(filter('Cursos')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Cursos 1');
    expect(filter('Todos')?.getAttribute('aria-current')).toBe('true');
    expect(filter('Videos')?.hasAttribute('aria-current')).toBe(false);
    expect(filter('Videos')?.getAttribute('href')).toBe('/?tipo=videos');
  });

  it('shows only the chosen kind and announces how many there are', async () => {
    await visit('product', 'pensil-pos', 'videos');

    expect(cards()).toHaveLength(2);
    expect(filter('Videos')?.getAttribute('aria-current')).toBe('true');
    expect(page.querySelector('[aria-live="polite"]')?.textContent?.trim()).toBe('2 videos');
  });

  it('says when the topic has nothing of the chosen kind and offers to see everything', async () => {
    await visit('service', 'desarrollo-web', 'cursos');

    expect(cards()).toHaveLength(0);
    expect(text()).toContain('Todavía no hay cursos de Desarrollo web a la medida');
    const seeAll = Array.from(page.querySelectorAll('a')).find((link) =>
      link.textContent?.includes('Ver todo'),
    );
    expect(seeAll?.getAttribute('href')).toBe('/');
  });

  it('invites to discover the topic on pensildevs.com', async () => {
    await visit('service', 'tiendas-en-linea');

    const link = page.querySelector<HTMLAnchorElement>(
      'a[href="https://pensildevs.com/servicios/tiendas-en-linea"]',
    );
    expect(link).not.toBeNull();
    expect(link?.hasAttribute('target')).toBe(false);
  });

  it.each([
    ['product', 'nope'],
    ['service', 'pensil-pos'],
  ] as const)('explains that %s "%s" is not a topic', async (group, slug) => {
    await visit(group, slug);

    expect(page.querySelector('h1')?.textContent?.trim()).toBe('No encontramos ese tema');
    expect(page.querySelector('a[href="/"]')).not.toBeNull();
  });
});
