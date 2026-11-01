import { describe, expect, it } from 'vitest';
import { Credentials } from './credentials';

describe('Pensil.Pos credentials', () => {
  it('keeps the identifier without surrounding spaces and the password exactly as typed', () => {
    const result = Credentials.create('  Ana.Lopez@Example.com ', ' secreta 123 ');

    expect(result.ok && result.value.identifier).toBe('Ana.Lopez@Example.com');
    expect(result.ok && result.value.password).toBe(' secreta 123 ');
  });

  it('asks for an identifier of at least 3 characters and a password of at least 8', () => {
    expect(Credentials.create(' ab ', '1234567')).toEqual({
      ok: false,
      error: ['identifier-too-short', 'password-too-short'],
    });
    expect(Credentials.create('ana', '12345678').ok).toBe(true);
  });
});
