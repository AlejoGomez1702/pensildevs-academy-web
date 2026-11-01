import { describe, expect, it } from 'vitest';
import { returnPathAfterSignIn } from './return-path';

describe('Where to go after signing in', () => {
  it.each([
    ['/documentacion/pensil-pos', '/documentacion/pensil-pos'],
    [
      '/documentacion/pensil-pos/tecnica/arquitectura#piezas',
      '/documentacion/pensil-pos/tecnica/arquitectura#piezas',
    ],
  ])('goes back to the academy page "%s"', (requested, expected) => {
    expect(returnPathAfterSignIn(requested)).toBe(expected);
  });

  it.each([
    undefined,
    '',
    'documentacion',
    'https://example.com',
    '//example.com',
    '/\\example.com',
    '/ingresar',
    '/ingresar?volver=/x',
  ])('falls back to the documentation for "%s"', (requested) => {
    expect(returnPathAfterSignIn(requested)).toBe('/documentacion');
  });
});
