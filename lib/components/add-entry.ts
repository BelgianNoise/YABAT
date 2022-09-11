import { html, css, CSSResult, TemplateResult, unsafeCSS, query, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Entry } from '../util/models/entry';
import { Category, convertCategoryToString, mainCategories } from '../util/models/category';
import { define, hydrate } from '../util/components';
import { CustomSelectComponent } from './custom-select';
import { CustomSelectMultipleComponent } from './custom-select-multiple';
import { Month } from '../util/models/month';
import { onEnter } from '../util/on-enter';

export class AddEntryComponent extends RxLitElement {
  
  @state() mainCatValue: string = Category.EXPENSE;
  @state() extraCats: Category[] = [];
  @query('#amountField') amountField: HTMLInputElement;
  @query('#descriptionField') descriptionField: HTMLTextAreaElement;

  constructor() {
    super();
    define('custom-select', hydrate(CustomSelectComponent)());
    define('custom-select-multiple', hydrate(CustomSelectMultipleComponent)());
  }

  firstUpdated() {
    onEnter(this.amountField, () => this.clickedAdd());
  }

  clickedAdd() {
    const amount = Number(this.amountField.value);
    if (this.mainCatValue && amount) {
      const entry: Entry = {
        categories: [ this.mainCatValue, ...this.extraCats ],
        amount,
        description: this.descriptionField?.value,
        year: 0, month: Month.JANUARY, id: 'filler', // Filler values
      };
      this.dispatchEvent(new CustomEvent<Entry>('clicked-add', { detail: entry }));
      this.amountField.value = '';
      this.descriptionField.value = '';
      (this.shadowRoot.querySelector("custom-select-multiple") as CustomSelectMultipleComponent)?.reset();
    }
  }

  render(): TemplateResult {

    return html`
      <div class="title">
        <h2>Add Income/Expense</h2>
        <button class="primary" @click="${() => this.clickedAdd()}">
          ${unsafeSVG(Plus)}
          <p>Add</p>
        </button>
      </div>

      <div class="inputs">
        <p>Main category:</p>
        <custom-select
          @selected="${(ev: CustomEvent<string>) => this.mainCatValue = ev.detail}"
          .options="${{
            [Category.EXPENSE]: convertCategoryToString(Category.EXPENSE),
            [Category.INCOME]: convertCategoryToString(Category.INCOME),
            [Category.SAVINGS]: convertCategoryToString(Category.SAVINGS),
          }}"
        >
        </custom-select>
        <p>Extra categories:</p>
        <custom-select-multiple
          @selected="${(ev: CustomEvent<Category[]>) => this.extraCats = ev.detail}"
          .options="${Object.keys(Category).reduce((prev, curr) => ({
            ...prev,
            ... (!mainCategories.includes(Category[curr]) && { [curr]: convertCategoryToString(curr) }),
          }), {})}"
        >
        </custom-select-multiple>
        <p>Amount:</p>
        <input id="amountField">
        <p>Description:</p>
        <textarea id="descriptionField"></textarea>
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
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
        .inputs {
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-column-gap: var(--gap-large);
          grid-row-gap: var(--gap-normal);
        }
      `,
    ];

  }

}
