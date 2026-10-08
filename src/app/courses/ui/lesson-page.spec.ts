import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLibrary } from '../../library';
import { LessonPage } from './lesson-page';

const COURSE = 'primeros-pasos-con-pensil-pos';

describe('Lesson page', () => {
  let fixture: ComponentFixture<LessonPage>;
  let page: HTMLElement;

  const visit = async (slug: string, lesson: string) => {
    fixture.componentRef.setInput('slug', slug);
    fixture.componentRef.setInput('lesson', lesson);
    await fixture.whenStable();
  };
  const text = () => page.textContent?.replace(/\s+/g, ' ') ?? '';
  const lessonList = () => page.querySelector<HTMLElement>('nav[aria-label="Lecciones del curso"]');

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideLibrary()] });
    fixture = TestBed.createComponent(LessonPage);
    page = fixture.nativeElement;
  });

  it('plays the lesson and says where it sits in the course', async () => {
    await visit(COURSE, 'conoce-pensil-pos');

    expect(page.querySelector('h1')?.textContent?.trim()).toBe('Conoce Pensil.Pos');
    expect(text()).toContain('Lección 1 de 5');
    expect(page.querySelector('app-video-player')).not.toBeNull();
    expect(page.querySelector(`a[href="/cursos/${COURSE}"]`)?.textContent).toContain(
      'Primeros pasos con Pensil.Pos',
    );
  });

  it('lists every lesson, marking the current one and leaving the ones coming soon unlinked', async () => {
    await visit(COURSE, 'conoce-pensil-pos');

    const items = lessonList()?.querySelectorAll('li') ?? [];
    expect(items).toHaveLength(5);
    expect(lessonList()?.querySelector('a[aria-current="page"]')?.getAttribute('href')).toBe(
      `/cursos/${COURSE}/conoce-pensil-pos`,
    );
    expect(items[1]?.querySelector('a')).toBeNull();
    expect(items[1]?.textContent).toContain('Próximamente');
  });

  it('has no previous lesson on the first one and returns to the course after the last published one', async () => {
    await visit(COURSE, 'conoce-pensil-pos');

    const pager = page.querySelector<HTMLElement>('nav[aria-label="Navegación entre lecciones"]');
    expect(pager?.textContent).not.toContain('Anterior');
    expect(pager?.querySelector(`a[href="/cursos/${COURSE}"]`)?.textContent).toContain(
      'Volver al curso',
    );
  });

  it.each(['no-existe', 'carga-tu-catalogo'])(
    'explains that lesson "%s" is not available and links to the course',
    async (lesson) => {
      await visit(COURSE, lesson);

      expect(page.querySelector('h1')?.textContent?.trim()).toBe('Esta lección no está disponible');
      expect(page.querySelector(`a[href="/cursos/${COURSE}"]`)).not.toBeNull();
      expect(page.querySelector('app-video-player')).toBeNull();
    },
  );

  it('explains when the course does not exist', async () => {
    await visit('no-existe', 'uno');

    expect(page.querySelector('h1')?.textContent?.trim()).toBe('No encontramos ese curso');
  });
});
