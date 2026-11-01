import { describe, expect, it } from 'vitest';
import { articleInTrack, createDocumentation, readingTimeOf } from './documentation';
import { aDocArticle, aDocumentationInput } from './documentation.fixtures';

describe('Product documentation', () => {
  describe('creation', () => {
    it('keeps the articles of each track in the order they were written', () => {
      const result = createDocumentation(
        aDocumentationInput({
          functional: [aDocArticle({ slug: 'b' }), aDocArticle({ slug: 'a' })],
          technical: [aDocArticle({ slug: 'c' })],
        }),
      );

      expect(result.ok && result.value.articles.functional.map((article) => article.slug)).toEqual([
        'b',
        'a',
      ]);
      expect(result.ok && result.value.articles.technical[0]?.track).toBe('technical');
    });

    it('requires both a functional and a technical article', () => {
      expect(createDocumentation(aDocumentationInput({ technical: [] }))).toEqual({
        ok: false,
        error: 'the technical documentation has no articles',
      });
      expect(createDocumentation(aDocumentationInput({ functional: [] }))).toEqual({
        ok: false,
        error: 'the functional documentation has no articles',
      });
    });

    it('refuses two articles with the same slug in one track', () => {
      const result = createDocumentation(
        aDocumentationInput({
          functional: [aDocArticle({ slug: 'x' }), aDocArticle({ slug: 'x' })],
        }),
      );

      expect(result).toEqual({ ok: false, error: 'the functional article "x" is repeated' });
    });

    it('accepts the same slug in different tracks', () => {
      const result = createDocumentation(
        aDocumentationInput({
          functional: [aDocArticle({ slug: 'x' })],
          technical: [aDocArticle({ slug: 'x' })],
        }),
      );

      expect(result.ok).toBe(true);
    });

    it('refuses an article without sections and repeated section anchors', () => {
      expect(
        createDocumentation(
          aDocumentationInput({ functional: [aDocArticle({ slug: 'empty', sections: [] })] }),
        ),
      ).toEqual({ ok: false, error: 'the article "empty" has no sections' });

      const section = {
        id: 'same',
        title: 'Same',
        blocks: [{ kind: 'paragraph', text: 'Hi' }],
      } as const;
      expect(
        createDocumentation(
          aDocumentationInput({
            functional: [aDocArticle({ slug: 'twice', sections: [section, section] })],
          }),
        ),
      ).toEqual({ ok: false, error: 'the article "twice" repeats the section "same"' });
    });

    it('refuses a table whose rows do not match its columns', () => {
      const result = createDocumentation(
        aDocumentationInput({
          technical: [
            aDocArticle({
              slug: 'table',
              sections: [
                {
                  id: 'codes',
                  title: 'Codes',
                  blocks: [
                    {
                      kind: 'table',
                      caption: 'Codes',
                      columns: ['A', 'B'],
                      rows: [['1', '2'], ['3']],
                    },
                  ],
                },
              ],
            }),
          ],
        }),
      );

      expect(result).toEqual({
        ok: false,
        error: 'the article "table" has a table in "codes" whose rows do not have 2 cells',
      });
    });
  });

  describe('reading time', () => {
    it('counts every word of the article at 200 words per minute, rounded up', () => {
      const words = (count: number) => Array.from({ length: count }, () => 'palabra').join(' ');
      const time = readingTimeOf([
        {
          id: 'one',
          title: 'Uno',
          blocks: [
            { kind: 'paragraph', text: words(150) },
            { kind: 'steps', items: [words(30)] },
            { kind: 'list', items: [words(10)] },
            { kind: 'note', tone: 'tip', text: words(9) },
            { kind: 'table', caption: 'Tabla', columns: ['Col'], rows: [[words(1)]] },
          ],
        },
      ]);

      // 1 (title) + 150 + 30 + 10 + 9 + 1 (caption) + 1 (column) + 1 = 203 words.
      expect(time.seconds).toBe(120);
    });

    it('never reads as less than one minute', () => {
      expect(
        readingTimeOf([{ id: 'a', title: 'A', blocks: [{ kind: 'paragraph', text: 'Hola' }] }])
          .seconds,
      ).toBe(60);
    });
  });

  describe('article in its track', () => {
    const result = createDocumentation(
      aDocumentationInput({
        functional: [
          aDocArticle({ slug: 'one' }),
          aDocArticle({ slug: 'two' }),
          aDocArticle({ slug: 'three' }),
        ],
      }),
    );
    if (!result.ok) {
      throw new Error(result.error);
    }
    const documentation = result.value;

    it('places the article with the ones around it', () => {
      const found = articleInTrack(documentation, 'functional', 'two');

      expect(found.ok && found.value.article.slug).toBe('two');
      expect(found.ok && found.value.position).toBe(2);
      expect(found.ok && found.value.total).toBe(3);
      expect(found.ok && found.value.previous?.slug).toBe('one');
      expect(found.ok && found.value.next?.slug).toBe('three');
    });

    it('has nothing before the first article nor after the last one', () => {
      const first = articleInTrack(documentation, 'functional', 'one');
      const last = articleInTrack(documentation, 'functional', 'three');

      expect(first.ok && first.value.previous).toBeUndefined();
      expect(last.ok && last.value.next).toBeUndefined();
    });

    it('does not find an article of the other track', () => {
      expect(articleInTrack(documentation, 'technical', 'two')).toEqual({
        ok: false,
        error: 'article-not-found',
      });
    });
  });
});
