import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';
import { define, hydrate } from '../util/components';
import { IncomeChartComponent } from '../components/home/income-chart';
import { ExpensesChartComponent } from '../components/home/expenses-chart';
import { SavingsChartComponent } from '../components/home/savings-chart';
import { parseToOutput, totalExpenses, totalIncome, totalSavings } from '../util/helper';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Help } from '../styles/svgs';
import { DistributionChartComponent } from '../components/home/distribution-chart';
import { NettoChartComponent } from '../components/home/netto-chart';
import { CustomSelectComponent } from '../components/custom-select';

export class HomePageComponent extends RxLitElement {

  @state() selectedYear: number;
  @state() entries: Entry[];
  @query('#yearSelection') yearInput: CustomSelectComponent;

  private tooltipText = unsafeHTML('Charts on this page are not comparable in terms of scale, to compare charts please look at the Y axis too!<br/><br/>The expenses and savings may not add up to the total income listed on this page, a portion of the income may not be allocated to an expense nor a saving. You can find further details on the "Monthly Overview" page for that month.');

  constructor() {
    super();
    define('income-chart', hydrate(IncomeChartComponent)());
    define('expenses-chart', hydrate(ExpensesChartComponent)());
    define('savings-chart', hydrate(SavingsChartComponent)());
    define('distribution-chart', hydrate(DistributionChartComponent)());
    define('netto-chart', hydrate(NettoChartComponent)());
    define('custom-select', hydrate(CustomSelectComponent)());
  }

  changeSelectedYear(year: number) {
    if (this.yearInput) {
      this.yearInput.selected(year.toString());
    } else {
      // stupid hacky solution
      setTimeout(() => this.changeSelectedYear(year), 100);
    }
  }

  render(): TemplateResult {

    const availableYears = [ ... new Set([ ... this.entries?.map(e => e.year), new Date().getUTCFullYear() ]) ];
    if (!this.selectedYear) this.changeSelectedYear(Math.max(... availableYears));

    const filtered = this.entries?.filter(e => this.selectedYear === e.year);

    return html`
      <div class="filter-container">
        <p>Show overview of year:</p>
        <custom-select id="yearSelection"
          @selected="${(ev: CustomEvent<string>) => this.selectedYear = +ev.detail}"
          .options="${availableYears.reduce((acc, curr) => ({ ... acc, [curr]: curr }), {})}"
        >
        </custom-select>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Income</h2>
          <div>
            <h2 class="positive">${parseToOutput(totalIncome(filtered))}</h2>
            <div class="tooltip-container">
              ${unsafeSVG(Help)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <income-chart .entries="${filtered}"></income-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Expenses</h2>
          <div>
            <h2 class="negative">${parseToOutput(totalExpenses(filtered))}</h2>
            <div class="tooltip-container">
              ${unsafeSVG(Help)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <expenses-chart .entries="${filtered}"></expenses-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Savings</h2>
          <div>
            <h2 class="neutral">${parseToOutput(totalSavings(filtered))}</h2>
            <div class="tooltip-container">
              ${unsafeSVG(Help)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <savings-chart .entries="${filtered}"></savings-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Netto</h2>
          <div>
            <h2>${parseToOutput(totalIncome(filtered) - totalExpenses(filtered) - totalSavings(filtered))}</h2>
            <div class="tooltip-container">
              ${unsafeSVG(Help)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <netto-chart .entries="${filtered}"></netto-chart>
      </div>

      <div class="pane distribution">
        <div class="title">
          <h2>Expenses Distribution</h2>
        </div>
        <distribution-chart .entries="${filtered}"></distribution-chart>
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: var(--gap-large);
          grid-row-gap: var(--gap-large);
          grid-auto-rows: 1fr;
        }

        .filter-container {
          grid-column: 1 / 3;
          display: flex;
          justify-content: start;
          align-items: center;
          gap: var(--gap-normal);
        }

        .distribution {
          grid-column: 1 / 3;
          max-height: 500px !important;
        }

        @media only screen and (max-width: 1100px) {
          :host {
            grid-template-columns: 1fr;
          }
          .distribution {
            grid-column: 1 / 2;
          }
        }

        .pane {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
        }
        
        .pane > *:last-child {
          flex: 1 1;
          max-height: calc(100% - var(--gap-normal) - var(--gap-small));
        }

        .pane .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pane .title > div {
          display: flex;
          gap: var(--gap-normal);
        }

        .tooltip-container svg {
          fill: var(--colors-grey-lighter);
          width: var(--gap-normal);
        }
        .tooltip-container {
          cursor: help;
          display: flex;
          align-items: center;
          position: relative;
        }
        .tooltip {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          color: var(--colors-grey-lighter);
          background-color: var(--colors-black);
          border: 1px solid var(--colors-grey-lighter);
          padding: var(--gap-small);
          border-radius: var(--gap-small);
          width: 300px;
          text-align: center;
        }
        .tooltip-container:hover .tooltip {
          display: inline-block;
        }
      `,
    ];

  }

}
