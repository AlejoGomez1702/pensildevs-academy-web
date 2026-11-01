/** Pages of pensilpos.com the academy sends people to: accounts are managed there. */
const PENSIL_POS_WEB = 'https://pensilpos.com';

export const PENSIL_POS_LINKS = {
  web: PENSIL_POS_WEB,
  forgotPassword: `${PENSIL_POS_WEB}/auth/forgot-password`,
  register: `${PENSIL_POS_WEB}/auth/register`,
} as const;
