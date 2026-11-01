import type { IconName } from '../../shared/ui/icon';
import type { DocTrack } from '../domain/documentation';

interface DocTrackPresentation {
  readonly label: string;
  readonly short: string;
  /** URL segment: `/documentacion/:product/<segment>/:article`. */
  readonly segment: string;
  readonly icon: IconName;
  readonly audience: string;
}

export const DOC_TRACK: Readonly<Record<DocTrack, DocTrackPresentation>> = {
  functional: {
    label: 'Documentación funcional',
    short: 'Funcional',
    segment: 'funcional',
    icon: 'book',
    audience: 'Cómo usar cada pantalla: para dueños, encargados, cajeros y meseros.',
  },
  technical: {
    label: 'Documentación técnica',
    short: 'Técnica',
    segment: 'tecnica',
    icon: 'gear',
    audience: 'Cómo está construido, qué equipos necesita y cómo darle soporte.',
  },
};

export const DOCUMENTATION_PATH = '/documentacion';

export function trackFromSegment(segment: string): DocTrack | null {
  return (
    (Object.keys(DOC_TRACK) as DocTrack[]).find((track) => DOC_TRACK[track].segment === segment) ??
    null
  );
}

export function productDocumentationPath(productSlug: string): string {
  return `${DOCUMENTATION_PATH}/${productSlug}`;
}

export function articlePath(productSlug: string, track: DocTrack, slug: string): string {
  return `${productDocumentationPath(productSlug)}/${DOC_TRACK[track].segment}/${slug}`;
}

const REVIEWED_ON = new Intl.DateTimeFormat('es-CO', { dateStyle: 'long', timeZone: 'UTC' });

/** "1 de noviembre de 2026". */
export function reviewDate(isoDate: string): string {
  return REVIEWED_ON.format(new Date(`${isoDate}T00:00:00Z`));
}
