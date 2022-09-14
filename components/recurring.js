var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { ArrowLeft, Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Category, convertCategoryToString } from '../util/models/category';
import { parseToOutput } from '../util/helper';
export class RecurringComponent extends RxLitElement {
    clickedBack() {
        this.dispatchEvent(new CustomEvent('go-back'));
    }
    clickedAdd(entry) {
        this.dispatchEvent(new CustomEvent('clicked-add', { detail: entry }));
    }
    render() {
        var _a;
        return html `
      <div class="title">
        <button class="secondary" @click="${() => this.clickedBack()}">
          ${unsafeSVG(ArrowLeft)}
          <p>Back</p>
        </button>
        <h2>Add Recurring Expenses</h2>
      </div>

      ${((_a = this.entries) === null || _a === void 0 ? void 0 : _a.length) ? html `
        <div class="list">
          ${this.entries.sort((a, b) => b.amount - a.amount).map((e) => html `
            <div class="entry">
              <p>${parseToOutput(e.amount)}</p>
              <p>
                ${e.categories
            .filter(c => ![Category.RECURRING, Category.EXPENSE].includes(c))
            .map(c => convertCategoryToString(c))
            .join(', ')}
              </p>
              <button class="secondary" @click="${() => this.clickedAdd(e)}">
                ${unsafeSVG(Plus)}
              </button>
            </div>
          `)}
        </div>
      ` : html `
        <p class="empty-text">
          All recurring payments have been added to this
          month already, you can crete a new one in the "Add Income/Expense"
          form by adding the category "Recurring".
        </p>
      `}
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
        :host {
          display: flex;
          flex-direction: column;
          gap: var(--gap-normal);
          max-height: 100%;
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .list {
          overflow: scroll;
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
        }
        .entry {
          display: grid;
          grid-template-columns: 1fr 3fr 35px;
          grid-column-gap: var(--gap-small);
        }
        .entry p {
          background-color: var(--colors-grey-light);
          padding: var(--gap-small) var(--gap-normal);
          border-radius: var(--gap-small);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: default;
        }
        .entry > button svg {
          height: 15px;
        }
        .entry > button {
          padding: var(--gap-small);
          cursor: pointer;
        }
        .empty-text {
          color: var(--colors-grey-lighter);
          padding: var(--gap-large) var(--gap-huge);
          text-align: center;
        }
      `,
        ];
    }
}
__decorate([
    state()
], RecurringComponent.prototype, "entries", void 0);
