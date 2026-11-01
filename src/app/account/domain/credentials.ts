import { err, ok, type Result } from '../../shared/kernel/result';

const MIN_IDENTIFIER_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

export type CredentialsProblem = 'identifier-too-short' | 'password-too-short';

/**
 * Username or email and password of a Pensil.Pos account, as Pensil.Pos accepts them: the
 * identifier is normalized by Pensil.Pos itself, the password is compared exactly.
 */
export class Credentials {
  private constructor(
    readonly identifier: string,
    readonly password: string,
  ) {}

  static create(
    identifier: string,
    password: string,
  ): Result<Credentials, readonly CredentialsProblem[]> {
    const trimmed = identifier.trim();
    const problems: CredentialsProblem[] = [];
    if (trimmed.length < MIN_IDENTIFIER_LENGTH) {
      problems.push('identifier-too-short');
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      problems.push('password-too-short');
    }
    return problems.length > 0 ? err(problems) : ok(new Credentials(trimmed, password));
  }
}

export const CREDENTIALS_LIMITS = {
  identifier: MIN_IDENTIFIER_LENGTH,
  password: MIN_PASSWORD_LENGTH,
} as const;
