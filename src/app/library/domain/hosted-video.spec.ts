import { describe, expect, it } from 'vitest';
import { HostedVideo } from './hosted-video';

const VALID = {
  file: '/media/introduccion.mp4',
  captions: '/media/introduccion.es.vtt',
  poster: '/media/introduccion.jpg',
  transcript: ['Bienvenido.', 'Así se vende.'],
};

describe('Hosted video', () => {
  it('is served by the academy itself, with Spanish captions and a transcript', () => {
    const result = HostedVideo.create(VALID);

    expect(result.ok && result.value.fileUrl).toBe('/media/introduccion.mp4');
    expect(result.ok && result.value.captionsUrl).toBe('/media/introduccion.es.vtt');
    expect(result.ok && result.value.posterUrl).toBe('/media/introduccion.jpg');
    expect(result.ok && result.value.transcript).toEqual(['Bienvenido.', 'Así se vende.']);
  });

  it.each([
    { file: 'https://example.com/a.mp4' },
    { file: '//example.com/a.mp4' },
    { file: '/media/../secret.mp4' },
    { file: '/media/a.avi' },
    { captions: '/media/a.srt' },
    { captions: '' },
    { poster: 'javascript:alert(1)' },
    { transcript: [] },
  ])('refuses %o', (override) => {
    expect(HostedVideo.create({ ...VALID, ...override })).toEqual({
      ok: false,
      error: 'invalid-hosted-video',
    });
  });

  it('accepts a webm file', () => {
    expect(HostedVideo.create({ ...VALID, file: '/media/a.webm' }).ok).toBe(true);
  });
});
