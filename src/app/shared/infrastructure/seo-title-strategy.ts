import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  TitleStrategy,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
} from '@angular/router';

export const SITE_NAME = 'Pensil.Devs Academy';
const DEFAULT_TITLE = `${SITE_NAME} · Aprende a sacarle provecho a tu software`;
const DEFAULT_DESCRIPTION =
  'Cursos, videos y guías de Pensil.Devs para dominar Pensil.Pos y aprovechar al máximo tu tienda en línea, tus sistemas y tus automatizaciones.';

/** Route data key holding the page's meta description. */
export const ROUTE_DESCRIPTION = 'description';

/** Sets `<title>` and the meta description from each route's `title` and `data.description`. */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const fullTitle = pageTitle ? `${pageTitle} · ${SITE_NAME}` : DEFAULT_TITLE;
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ property: 'og:title', content: fullTitle });

    const description = this.deepestDescription(snapshot) ?? DEFAULT_DESCRIPTION;
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private deepestDescription(snapshot: RouterStateSnapshot): string | undefined {
    let description: unknown;
    for (
      let route: ActivatedRouteSnapshot | null = snapshot.root;
      route;
      route = route.firstChild
    ) {
      description = route.data[ROUTE_DESCRIPTION] ?? description;
    }
    return typeof description === 'string' ? description : undefined;
  }
}
