var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, query, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { ArrowLeft, Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Category, convertCategoryToString, ExpenseCategory, IncomeCategory, MainCategory, SavingsCategory } from '../util/models/category';
import { define, hydrate } from '../util/components';
import { CustomSelectComponent } from './custom-select';
import { CustomSelectMultipleComponent } from './custom-select-multiple';
import { Month } from '../util/models/month';
import { onEnter } from '../util/on-enter';
export class AddEntryComponent extends RxLitElement {
    constructor() {
        super();
        this.mainCatValue = Category.INCOME;
        this.extraCats = [];
        define('custom-select', hydrate(CustomSelectComponent)());
        define('custom-select-multiple', hydrate(CustomSelectMultipleComponent)());
    }
    firstUpdated() {
        onEnter(this.amountField, () => this.clickedAdd());
    }
    clickedAdd() {
        var _a, _b;
        const amount = Number(this.amountField.value);
        if (this.mainCatValue && amount) {
            const entry = {
                categories: [this.mainCatValue, ...this.extraCats],
                amount,
                description: (_a = this.descriptionField) === null || _a === void 0 ? void 0 : _a.value,
                year: 0, month: Month.JANUARY, id: 'filler', // Filler values
            };
            this.dispatchEvent(new CustomEvent('clicked-add', { detail: entry }));
            this.amountField.value = '';
            this.descriptionField.value = '';
            (_b = this.shadowRoot.querySelector("custom-select-multiple")) === null || _b === void 0 ? void 0 : _b.reset();
        }
    }
    clickedMore() {
        this.dispatchEvent(new CustomEvent('show-recurring'));
    }
    render() {
        return html `
      <div class="title">
        <h2>Add Income/Expense</h2>
        <div class="buttons">
          <button class="primary" @click="${() => this.clickedAdd()}">
            ${unsafeSVG(Plus)}
            <p>Add</p>
          </button>
          <button class="secondary rotate" @click="${() => this.clickedMore()}">
            <p>More</p>
            ${unsafeSVG(ArrowLeft)}
          </button>
        </div>
      </div>

      <div class="inputs">
        <p>Main category:</p>
        <custom-select
          @selected="${(ev) => this.mainCatValue = ev.detail}"
          .options="${Object.keys(MainCategory).reduce((acc, val) => (Object.assign(Object.assign({}, acc), { [val]: convertCategoryToString(val) })), {})}"
        >
        </custom-select>
        <p>Extra categories:</p>
        <custom-select-multiple
          @selected="${(ev) => this.extraCats = ev.detail}"
          .options="${Object.keys(this.mainCatValue === Category.INCOME
            ? IncomeCategory
            : this.mainCatValue === Category.EXPENSE
                ? ExpenseCategory
                : SavingsCategory).reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr]: convertCategoryToString(curr) })), {})}"
        >
        </custom-select-multiple>
        <p>Amount:</p>
        <input id="amountField">
        <p>Description:</p>
        <textarea id="descriptionField"></textarea>
      </div>
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
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title .buttons {
          display: flex;
          gap: var(--gap-small);
        }
        .inputs {
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-column-gap: var(--gap-large);
          grid-row-gap: var(--gap-normal);
        }
        .secondary.rotate svg {
          transform: rotate(180deg);
        }
      `,
        ];
    }
}
__decorate([
    state()
], AddEntryComponent.prototype, "mainCatValue", void 0);
__decorate([
    state()
], AddEntryComponent.prototype, "extraCats", void 0);
__decorate([
    query('#amountField')
], AddEntryComponent.prototype, "amountField", void 0);
__decorate([
    query('#descriptionField')
], AddEntryComponent.prototype, "descriptionField", void 0);
