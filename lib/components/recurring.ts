import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { ArrowLeft, Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { Entry } from '../util/models/entry';
import { Category, convertCategoryToString } from '../util/models/category';
import { parseToOutput } from '../util/helper';

export class RecurringComponent extends RxLitElement {

  @state() entries: Entry[];

  clickedBack() {
    this.dispatchEvent(new CustomEvent('go-back'));
  }
  clickedAdd(entry: Entry) {
    this.dispatchEvent(new CustomEvent<Entry>('clicked-add', { detail: entry }));
  }

  render(): TemplateResult {

    return html`
      <div class="title">
        <button class="secondary" @click="${() => this.clickedBack()}">
          ${unsafeSVG(ArrowLeft)}
          <p>Back</p>
        </button>
        <h2>Add Recurring Expenses</h2>
      </div>

      ${this.entries?.length ? html`
        <div class="list">
          ${this.entries.sort((a,b) => b.amount - a.amount).map((e) => html`
            <div class="entry">
              <p>${parseToOutput(e.amount)}</p>
              <p>
                ${e.categories
                  .filter(c => ![Category.RECURRING, Category.EXPENSE].includes(c))
                  .map(c => convertCategoryToString(c))
                  .join(', ')
                }
              </p>
              <button class="secondary" @click="${() => this.clickedAdd(e)}">
                ${unsafeSVG(Plus)}
              </button>
            </div>
          `)}
        </div>
      ` : html`
        <p class="empty-text">
          All recurring payments have been added to this
          month already, you can crete a new one in the "Add Income/Expense"
          form by adding the category "Recurring".
        </p>
      `}
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
