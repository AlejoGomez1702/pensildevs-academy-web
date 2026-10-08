import { describe, expect, it } from 'vitest';
import { err, ok } from './result';

describe('Result', () => {
  it('wraps a successful value', () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
  });

  it('wraps an expected failure', () => {
    expect(err('not-found')).toEqual({ ok: false, error: 'not-found' });
  });
});
