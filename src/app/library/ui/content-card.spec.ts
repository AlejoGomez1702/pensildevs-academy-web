import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Duration } from '../../shared/kernel/duration';
import type { LearningContent } from '../domain/learning-content';
import { aCourse, aGuide, aLesson, aVideo } from '../domain/learning-content.fixtures';
import { ContentCard } from './content-card';

describe('Content card', () => {
  let fixture: ComponentFixture<ContentCard>;
  let card: HTMLElement;

  const show = async (content: LearningContent, topicName?: string) => {
    fixture.componentRef.setInput('content', content);
    fixture.componentRef.setInput('topicName', topicName);
    await fixture.whenStable();
  };
  const text = () => card.textContent?.replace(/\s+/g, ' ') ?? '';

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(ContentCard);
    card = fixture.nativeElement;
  });

  it.each([
    [aVideo({ slug: 'cobrar', duration: Duration.ofMinutes(8) }), '/videos/cobrar', 'Video', '8 min'],
    [aCourse({ slug: 'inicio', lessons: [aLesson({ duration: Duration.ofMinutes(12) })] }), '/cursos/inicio', 'Curso', '12 min'],
    [aGuide({ slug: 'corte', readingTime: Duration.ofMinutes(4) }), '/guias/corte', 'Guía', '4 min de lectura'],
  ])('links available content to its page with its kind and length', async (content, path, kind, length) => {
    await show(content);

    expect(card.querySelector(`a[href="${path}"]`)?.textContent?.trim()).toBe(content.title);
    expect(text()).toContain(kind);
    expect(text()).toContain(length);
    expect(text()).not.toContain('Próximamente');
  });

  it('counts the lessons of a course', async () => {
    await show(aCourse({ lessons: [aLesson({ slug: 'a' }), aLesson({ slug: 'b', video: null })] }));

    expect(text()).toContain('2 lecciones');
  });

  it('marks content that is coming soon, without a link', async () => {
    await show(aVideo({ video: null }));

    expect(card.querySelector('a')).toBeNull();
    expect(text()).toContain('Próximamente');
  });

  it('names the topic when asked to', async () => {
    await show(aVideo(), 'Pensil.Pos');

    expect(text()).toContain('Pensil.Pos');
  });
});
