import { Component } from '@angular/core';

/**
 * Pensil.Devs logo. The mark is the arriero mule from Pensilvania, Caldas (local roots), with a
 * one-eyed alien riding behind its head, its antennae ending in signal nodes (innovation).
 * This is the compact version, drawn with bold shapes for small sizes; it is also
 * public/favicon.svg. Fixed brand colors in both themes. In the academy the wordmark is followed by
 * an "Academy" tag (small green piece, as the brand rules allow).
 */
@Component({
  selector: 'app-logo',
  host: { class: 'inline-flex items-center gap-2.5' },
  template: `
    <svg viewBox="0 0 64 64" class="size-10 shrink-0" aria-hidden="true">
      <rect width="64" height="64" rx="18" class="fill-mark" />
      <path
        d="M27.5 14Q24 9.5 20 6M36.5 14Q40 9.5 44 6"
        fill="none"
        class="stroke-on-mark"
        stroke-width="3.6"
        stroke-linecap="round"
      />
      <circle cx="20" cy="6" r="4.2" class="fill-mark-accent" />
      <circle cx="44" cy="6" r="4.2" class="fill-mark-accent" />
      <circle cx="32" cy="20" r="10" class="fill-on-mark" />
      <circle cx="32" cy="19" r="4.4" class="fill-mark" />
      <circle cx="33.6" cy="17.6" r="1.4" class="fill-on-mark" />
      <g
        class="fill-on-mark stroke-mark"
        stroke-width="3"
        paint-order="stroke"
        stroke-linejoin="round"
      >
        <path d="M22.5 33C15 28 11 19 11 11C18.5 14.5 25.5 22.5 27.5 30.5Z" />
        <path d="M41.5 33C49 28 53 19 53 11C45.5 14.5 38.5 22.5 36.5 30.5Z" />
        <path
          d="M20.5 35Q20.5 29 26.5 29H37.5Q43.5 29 43.5 35L41.6 53Q40.6 61 32 61Q23.4 61 22.4 53Z"
        />
      </g>
      <circle cx="27" cy="39" r="2.6" class="fill-mark" />
      <circle cx="37" cy="39" r="2.6" class="fill-mark" />
      <path d="M23.6 50H40.4" class="stroke-mark" stroke-width="2.6" />
    </svg>
    <span class="font-display text-xl font-extrabold tracking-tight">
      Pensil<span class="text-pencil-text">.Devs</span>
    </span>
    <span class="rounded-full bg-leaf-soft px-2.5 py-0.5 text-sm font-semibold text-leaf-text"
      >Academy</span
    >
  `,
})
export class Logo {}
