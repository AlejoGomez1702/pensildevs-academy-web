import { describe, expect, it } from 'vitest';
import { Duration } from './duration';

describe('Duration', () => {
  it.each([
    [0, '1 min'],
    [45, '1 min'],
    [60, '1 min'],
    [90, '2 min'],
    [8 * 60, '8 min'],
    [59 * 60 + 29, '59 min'],
    [60 * 60, '1 h'],
    [65 * 60, '1 h 05 min'],
    [2 * 3600 + 30 * 60, '2 h 30 min'],
  ])('formats %i seconds as "%s"', (seconds, text) => {
    expect(Duration.ofSeconds(seconds).format()).toBe(text);
  });

  it('builds from minutes', () => {
    expect(Duration.ofMinutes(12).seconds).toBe(720);
  });

  it('adds durations', () => {
    expect(Duration.sum([Duration.ofMinutes(5), Duration.ofSeconds(30)]).seconds).toBe(330);
    expect(Duration.sum([]).seconds).toBe(0);
  });

  it('rejects negative or non-finite amounts', () => {
    expect(() => Duration.ofSeconds(-1)).toThrow(RangeError);
    expect(() => Duration.ofSeconds(Number.NaN)).toThrow(RangeError);
  });
});
