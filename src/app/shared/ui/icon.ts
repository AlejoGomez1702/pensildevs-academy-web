import { Component, computed, input } from '@angular/core';

/** Stroke icons drawn on a 24×24 grid. Decorative: the surrounding text carries the meaning. */
const ICON_PATHS = {
  'arrow-right': ['M5 12h14', 'm13 6 6 6-6 6'],
  'chevron-down': ['m6 9 6 6 6-6'],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  chat: [
    'M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z',
    'M8.5 10.5h7',
    'M8.5 13.5h4.5',
  ],
  mail: ['M4 6h16v12H4z', 'm4 7 8 6 8-6'],
  code: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm13.5 5-3 14'],
  store: [
    'M4 9.5 5.5 4h13L20 9.5',
    'M4 9.5h16v1a3 3 0 0 1-5.3 2 3 3 0 0 1-4.4 0A3 3 0 0 1 4 10.5z',
    'M5.5 13.5V20h13v-6.5',
    'M10 20v-4h4v4',
  ],
  automation: [
    'M4 7h9',
    'M17 7h3',
    'M15 5v4',
    'M4 17h3',
    'M11 17h9',
    'M9 15v4',
    'M4 12h14',
    'm16 10 2 2-2 2',
  ],
  mobile: ['M7 3h10v18H7z', 'M11 18h2', 'M10 6h4'],
  compass: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'm15.5 8.5-2 5-5 2 2-5z'],
  receipt: ['M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z', 'M9 8h6', 'M9 12h6', 'M9 16h3'],
  boxes: ['M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z', 'm4 8.5 8 4.5 8-4.5', 'M12 13v7'],
  chart: ['M4 20h16', 'M7 16v-4', 'M12 16V8', 'M17 16v-7'],
  users: [
    'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M3 20a6 6 0 0 1 12 0',
    'M16 4.5a3.5 3.5 0 0 1 0 6.5',
    'M18 14a6 6 0 0 1 3 6',
  ],
  scan: [
    'M4 8V5h3',
    'M17 5h3v3',
    'M20 16v3h-3',
    'M7 19H4v-3',
    'M8 9v6',
    'M11 9v6',
    'M14 9v6',
    'M17 9v6',
  ],
  cash: ['M3 7h18v10H3z', 'M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M6 10v4', 'M18 10v4'],
  sparkle: [
    'M12 3v4',
    'M12 17v4',
    'M3 12h4',
    'M17 12h4',
    'm6 6 2.5 2.5',
    'm15.5 15.5 2.5 2.5',
    'm18 6-2.5 2.5',
    'm8.5 15.5-2.5 2.5',
  ],
  pencil: ['M4 20l1.2-4.6L16.3 4.3a2.1 2.1 0 0 1 3 3L8.2 18.4z', 'm14.5 6 3.5 3.5'],
  handshake: [
    'M3 11l4-4 3 1 2-1.5 3 .5 6 4',
    'm7 7-4 4 5.5 5.5a1.5 1.5 0 0 0 2.1 0',
    'M10.5 14.5 13 17a1.5 1.5 0 0 0 2.1-2.1',
    'M13 12l3.1 3.1a1.5 1.5 0 0 0 2.1-2.1L15 10',
  ],
  rocket: [
    'M12 15.5 8.5 12C10 7 13.5 4 20 4c0 6.5-3 10-8 11.5Z',
    'M8.5 12H5l2.5-3.5H11',
    'M12 15.5V19l3.5-2.5V13',
    'M6 18c-1 .5-1.5 1.5-2 3 1.5-.5 2.5-1 3-2',
  ],
  shield: ['M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6z', 'm9 12 2 2 4-4'],
  // Academy
  'arrow-left': ['M19 12H5', 'm11 6-6 6 6 6'],
  play: ['M8 5.5v13l10.5-6.5z'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 7.5V12l3 2'],
  video: ['M3 6h18v12H3z', 'm10 9.5 5 2.5-5 2.5z'],
  course: ['m12 4 9 4.5-9 4.5-9-4.5z', 'm3 12.5 9 4.5 9-4.5', 'm3 16.5 9 4.5 9-4.5'],
  guide: [
    'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v14H6.5A1.5 1.5 0 0 0 5 18.5z',
    'M5 18.5A1.5 1.5 0 0 0 6.5 20H19v-3',
    'M9 7h6',
    'M9 10.5h4',
  ],
  external: ['M14 4h6v6', 'm20 4-9 9', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'],
} as const;

export type IconName = keyof typeof ICON_PATHS;

@Component({
  selector: 'app-icon',
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-full"
    >
      @for (path of paths(); track $index) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();

  protected readonly paths = computed(() => ICON_PATHS[this.name()]);
}
