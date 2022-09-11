import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Category, convertCategoryToString } from '../util/models/category';
import { defaultCSS } from '../styles/default';
import { Entry } from '../util/models/entry';
import { parseToOutput } from '../util/helper';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Bin, Edit } from '../styles/svgs';

export class SingleEntryComponent extends RxLitElement {
  
  @state() entry: Entry;

  clickedDelete(): void {
    this.dispatchEvent(new CustomEvent('clicked-delete', { detail: this.entry.id }));
  }

  render(): TemplateResult {

    return html`
      <p>${parseToOutput(this.entry.amount)}</p>
      <p>${this.entry.categories
        .filter(c => ![Category.INCOME, Category.EXPENSE, Category.SAVINGS].includes(c as Category))
        .map(c => convertCategoryToString(c))
        .join(', ')
      }</p>
      <p>${this.entry.description}</p>
      <p
        class="action-icon"
        @click="${() => console.log('edit')}"
      >${unsafeSVG(Edit)}</p>
      <p
        class="action-icon delete"
        @click="${() => this.clickedDelete()}"
      >${unsafeSVG(Bin)}</p>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          display: flex;
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 35px 35px;
          grid-column-gap: var(--gap-small);
        }
        p {
          background-color: var(--colors-grey-light);
          padding: var(--gap-small) var(--gap-normal);
          border-radius: var(--gap-small);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: default;
        }
        p svg {
          height: 15px;
          fill: var(--colors-white);
        }
        .action-icon {
          padding: var(--gap-small);
          cursor: pointer;
        }
        .action-icon:hover {
          background-color: var(--colors-grey-lighter);
        }
        .action-icon.delete:hover {
          background-color: var(--colors-red-normal);
        }
      `,
    ];

  }

}
