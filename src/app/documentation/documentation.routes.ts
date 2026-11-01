import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { requireMember } from '../account';
import { ROUTE_DESCRIPTION } from '../shared/infrastructure/seo-title-strategy';
import { findTopicBySlug } from '../topics';
import { ReadArticle } from './application/read-documentation';
import { provideDocumentation } from './documentation.providers';
import { trackFromSegment } from './ui/doc-track';

const productName = (slug: string) => findTopicBySlug(slug)?.name ?? 'Producto';

const readArticle = (route: ActivatedRouteSnapshot) => {
  const track = trackFromSegment(route.paramMap.get('track') ?? '');
  return track
    ? inject(ReadArticle).execute(
        route.paramMap.get('product') ?? '',
        track,
        route.paramMap.get('article') ?? '',
      )
    : null;
};

const articleTitle: ResolveFn<string> = async (route) => {
  const result = await readArticle(route);
  return result?.ok
    ? `${result.value.article.title} · ${productName(result.value.productSlug)}`
    : 'Artículo no encontrado';
};

const articleDescription: ResolveFn<string | undefined> = async (route) => {
  const result = await readArticle(route);
  return result?.ok ? result.value.article.summary : undefined;
};

export const DOCUMENTATION_ROUTES: Routes = [
  {
    path: '',
    providers: [provideDocumentation()],
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Documentación',
        loadComponent: () =>
          import('./ui/documentation-index-page').then((m) => m.DocumentationIndexPage),
      },
      {
        path: ':product',
        canActivate: [requireMember],
        children: [
          {
            path: '',
            pathMatch: 'full',
            title: (route) =>
              `Documentación de ${productName(route.paramMap.get('product') ?? '')}`,
            loadComponent: () =>
              import('./ui/product-documentation-page').then((m) => m.ProductDocumentationPage),
          },
          {
            path: ':track/:article',
            title: articleTitle,
            resolve: { [ROUTE_DESCRIPTION]: articleDescription },
            loadComponent: () => import('./ui/article-page').then((m) => m.ArticlePage),
          },
          { path: '**', redirectTo: '' },
        ],
      },
    ],
  },
];
