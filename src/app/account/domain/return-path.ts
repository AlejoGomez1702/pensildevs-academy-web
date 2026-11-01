export const SIGN_IN_PATH = '/ingresar';
export const DEFAULT_RETURN_PATH = '/documentacion';

/**
 * The academy page to open after signing in. Anything that is not a path of this site (another
 * origin, a protocol-relative `//host`, the sign-in page itself) goes to the documentation.
 */
export function returnPathAfterSignIn(requested: string | undefined): string {
  if (
    !requested?.startsWith('/') ||
    requested.startsWith('//') ||
    requested.startsWith('/\\') ||
    requested === SIGN_IN_PATH ||
    requested.startsWith(`${SIGN_IN_PATH}?`) ||
    requested.startsWith(`${SIGN_IN_PATH}#`)
  ) {
    return DEFAULT_RETURN_PATH;
  }
  return requested;
}
