var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Category, convertCategoryToString } from '../util/models/category';
import { defaultCSS } from '../styles/default';
import { parseToOutput } from '../util/helper';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Bin, Edit } from '../styles/svgs';
export class SingleEntryComponent extends RxLitElement {
    clickedDelete() {
        this.dispatchEvent(new CustomEvent('clicked-delete', { detail: this.entry.id }));
    }
    render() {
        return html `
      <p>${parseToOutput(this.entry.amount)}</p>
      <p>${this.entry.categories
            .filter(c => ![Category.INCOME, Category.EXPENSE, Category.SAVINGS].includes(c))
            .map(c => convertCategoryToString(c))
            .join(', ')}</p>
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
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
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
__decorate([
    state()
], SingleEntryComponent.prototype, "entry", void 0);
