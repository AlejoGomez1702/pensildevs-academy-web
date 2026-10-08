import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../shared/ui/logo';
import { PENSIL_DEVS_URL } from '../topics';
import { NAVIGATION_MENUS } from './navigation-links';

@Component({
  selector: 'app-site-footer',
  imports: [Logo, RouterLink],
  host: {
    class: 'block bg-graphite text-on-graphite [--focus:var(--pencil)]',
    role: 'contentinfo',
  },
  template: `
    <div class="container-page grid gap-12 py-16 md:grid-cols-12">
      <div class="md:col-span-4">
        <a
          routerLink="/"
          aria-label="Pensil.Devs Academy, ir al inicio"
          class="inline-block rounded-lg"
        >
          <app-logo class="[&_.text-pencil-text]:text-pencil" />
        </a>
        <p class="mt-4 max-w-sm text-on-graphite/75">
          Cursos, videos y guías para sacarle provecho a los productos y servicios de Pensil.Devs.
        </p>
      </div>

      @for (menu of menus; track menu.id) {
        <nav [attr.aria-labelledby]="'footer-' + menu.id" class="md:col-span-3">
          <h2 [id]="'footer-' + menu.id" class="font-sans text-base font-semibold text-leaf-bright">
            {{ menu.label }}
          </h2>
          <ul class="mt-4 grid gap-2">
            @for (link of menu.links; track link.path) {
              <li>
                <a [routerLink]="link.path" class="text-on-graphite/80 hover:text-on-graphite">{{
                  link.label
                }}</a>
              </li>
            }
          </ul>
        </nav>
      }

      <nav aria-labelledby="footer-company" class="md:col-span-2">
        <h2 id="footer-company" class="font-sans text-base font-semibold text-leaf-bright">
          Pensil.Devs
        </h2>
        <ul class="mt-4 grid gap-2">
          <li>
            <a [href]="siteUrl" class="text-on-graphite/80 hover:text-on-graphite">Sitio web</a>
          </li>
          <li>
            <a [href]="siteUrl + '/contacto'" class="text-on-graphite/80 hover:text-on-graphite"
              >Contacto</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-white/10">
      <p class="container-page py-6 text-sm text-on-graphite/60">
        © {{ year }} Pensil.Devs. Todos los derechos reservados.
      </p>
    </div>
  `,
})
export class SiteFooter {
  protected readonly menus = NAVIGATION_MENUS;
  protected readonly siteUrl = PENSIL_DEVS_URL;
  protected readonly year = new Date().getFullYear();
}
