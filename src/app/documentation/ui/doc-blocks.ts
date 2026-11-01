import { Component, input } from '@angular/core';
import { Icon } from '../../shared/ui/icon';
import type { DocBlock } from '../domain/documentation';

/** The content of one section of an article. */
@Component({
  selector: 'app-doc-blocks',
  imports: [Icon],
  host: { class: 'grid gap-5' },
  template: `
    @for (block of blocks(); track $index) {
      @switch (block.kind) {
        @case ('paragraph') {
          <p class="text-lg/relaxed">{{ block.text }}</p>
        }
        @case ('steps') {
          <ol class="grid gap-4">
            @for (step of block.items; track $index) {
              <li class="flex gap-4">
                <span class="step-dot mt-0.5">{{ $index + 1 }}</span>
                <span class="text-lg">{{ step }}</span>
              </li>
            }
          </ol>
        }
        @case ('list') {
          <ul class="grid list-disc gap-2 pl-6 text-lg marker:text-leaf-text">
            @for (item of block.items; track $index) {
              <li>{{ item }}</li>
            }
          </ul>
        }
        @case ('note') {
          <aside
            class="flex gap-3 rounded-xl border p-4"
            [class]="
              block.tone === 'warning'
                ? 'border-pencil-strong/60 bg-pencil/10'
                : 'border-leaf/30 bg-leaf-soft'
            "
            [attr.aria-label]="block.tone === 'warning' ? 'Advertencia' : 'Consejo'"
          >
            <app-icon
              [name]="block.tone === 'warning' ? 'alert' : 'info'"
              class="mt-0.5 size-5"
              [class]="block.tone === 'warning' ? 'text-pencil-text' : 'text-leaf-text'"
            />
            <p>
              <strong class="font-semibold">{{
                block.tone === 'warning' ? 'Importante:' : 'Consejo:'
              }}</strong>
              {{ block.text }}
            </p>
          </aside>
        }
        @case ('table') {
          <div class="-mx-4 overflow-x-auto px-4" tabindex="0" [attr.aria-label]="block.caption">
            <table class="w-full min-w-120 border-collapse text-left">
              <caption class="mb-2 text-left text-sm font-medium text-ink-muted">
                {{
                  block.caption
                }}
              </caption>
              <thead>
                <tr class="border-b-2 border-line">
                  @for (column of block.columns; track $index) {
                    <th scope="col" class="px-3 py-2 font-semibold">{{ column }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of block.rows; track $index) {
                  <tr class="border-b border-line align-top">
                    @for (cell of row; track $index) {
                      <td class="px-3 py-2">{{ cell }}</td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      }
    }
  `,
})
export class DocBlocks {
  readonly blocks = input.required<readonly DocBlock[]>();
}
