import type { RawProductDocumentation } from '../raw-documentation';
import { PENSIL_POS_FUNCTIONAL } from './pensil-pos-functional';
import { PENSIL_POS_TECHNICAL } from './pensil-pos-technical';

/** Every product of Pensil.Devs has its functional and its technical documentation. */
export const DOCUMENTATION_CONTENT: readonly RawProductDocumentation[] = [
  { product: 'pensil-pos', functional: PENSIL_POS_FUNCTIONAL, technical: PENSIL_POS_TECHNICAL },
];
