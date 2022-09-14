var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { Month } from '../util/models/month';
import { groupForPieChart, hasCategories, parseToOutput, totalExpenses, totalIncome, totalSavings, totalNetto } from '../util/helper';
import { Chart } from 'chart.js';
import { colorsgreylight, colorsprimarylight, colorsreddark, colorsrednormal, colorssecondary, colorswhite } from '../styles/colors';
import { Category, convertCategoryToString } from '../util/models/category';
import { Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { define, hydrate } from '../util/components';
import { AddEntryComponent } from '../components/add-entry';
import { SingleEntryComponent } from '../components/single-entry';
import { RecurringComponent } from '../components/recurring';
export class MonthlyPageComponent extends RxLitElement {
    constructor() {
        super();
        this.selectedMonth = new Date().getMonth();
        this.selectedYear = new Date().getFullYear();
        this.filtered = [];
        this.totalIncome = 0;
        this.totalExpenses = 0;
        this.totalSavings = 0;
        this.totalNetto = 0;
        define('add-entry', hydrate(AddEntryComponent)());
        define('single-entry', hydrate(SingleEntryComponent)());
        define('recurring-component', hydrate(RecurringComponent)());
    }
    firstUpdated() {
        var _a;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
            const split = this.input.value.split('-');
            this.selectedYear = Number(split[0]);
            this.selectedMonth = Number(split[1]) - 1;
        });
    }
    updated() {
        this.handleBarChart();
        this.handlePieChart();
    }
    handlePieChart() {
        var _a;
        if (!this.pieChart)
            return;
        const helpData = groupForPieChart(this.filtered);
        const data = {
            labels: [...Object.keys(helpData).map((k) => convertCategoryToString(k))],
            datasets: [{
                    data: [...Object.values(helpData).map(o => o.amount)],
                    backgroundColor: [...Object.values(helpData).map(o => o.color)],
                    borderColor: colorsgreylight,
                    borderWidth: 1,
                }],
        };
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                color: colorswhite,
                responsive: true,
                maintainAspectRatio: false,
                layout: {},
                plugins: {
                    legend: {
                        display: true,
                        position: 'left',
                        align: 'end',
                    },
                    title: {
                        display: true,
                        text: 'Expenses Distribution',
                        color: colorswhite,
                        font: { size: 20 },
                        align: 'start',
                        padding: 0,
                    },
                },
            },
        };
        (_a = this.pieChartInstance) === null || _a === void 0 ? void 0 : _a.destroy();
        this.pieChartInstance = new Chart(this.pieChart, config);
    }
    handleBarChart() {
        var _a;
        if (!this.barChart)
            return;
        const datasetoptions = {
            borderColor: colorsgreylight,
            borderWidth: 1,
            barPercentage: 0.9,
            categoryPercentage: 0.9,
        };
        const data = {
            labels: [''],
            datasets: [
                Object.assign({ data: [this.totalIncome], label: 'Income', backgroundColor: colorsprimarylight, hoverBackgroundColor: '#0A0', stack: '0' }, datasetoptions),
                Object.assign({ data: [this.totalExpenses], label: 'Expenses', backgroundColor: colorsrednormal, hoverBackgroundColor: colorsreddark, stack: '1' }, datasetoptions),
                Object.assign({ data: [this.totalSavings], label: 'Savings', backgroundColor: colorssecondary, hoverBackgroundColor: colorssecondary, stack: '1' }, datasetoptions),
                Object.assign({ data: [this.totalNetto > 0 ? this.totalNetto : 0], label: 'Netto', backgroundColor: '#666', hoverBackgroundColor: colorswhite, stack: '1' }, datasetoptions),
            ],
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                color: colorswhite,
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 0,
                },
                plugins: {
                    legend: { display: false },
                },
            },
        };
        (_a = this.barChartInstance) === null || _a === void 0 ? void 0 : _a.destroy();
        this.barChartInstance = new Chart(this.barChart, config);
    }
    scrollToAdd() {
        var _a;
        (_a = this.addPane) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    clickedAdd(ev) {
        this.dispatchEvent(new CustomEvent('clicked-add', { detail: Object.assign(Object.assign({}, ev.detail), { year: this.selectedYear, month: Object.keys(Month)[this.selectedMonth] }) }));
    }
    clickedDelete(ev) {
        this.dispatchEvent(new CustomEvent('clicked-delete', { detail: ev.detail }));
    }
    showRecurring() {
        this.addContainer.style.transform = 'translate(calc(-50% - var(--gap-huge)), 0)';
    }
    showAdd() {
        this.addContainer.style.transform = 'translate(0, 0)';
    }
    render() {
        const monthForInputField = `${this.selectedMonth < 9 ? '0' : ''}${this.selectedMonth + 1}`;
        this.filtered = this.entries.filter((e) => e.year === this.selectedYear && e.month === Object.keys(Month)[this.selectedMonth])
            .sort((e1, e2) => e1.categories.toString().localeCompare(e2.categories.toString()));
        this.totalIncome = totalIncome(this.filtered);
        this.totalExpenses = totalExpenses(this.filtered);
        this.totalSavings = totalSavings(this.filtered);
        this.totalNetto = totalNetto(this.filtered);
        return html `
      <div class="filter-container">
        <div>
          <p>Select month:</p>
          <input type="month" id="dateInput"
            value="${this.selectedYear}-${monthForInputField}"
          >
        </div>
        <div>
          <button class="secondary" @click="${() => this.scrollToAdd()}">
            ${unsafeSVG(Plus)}
            <p>Add Income/Expense</p>
          </button>
        </div>
      </div>

      <div class="pane overview">
        <p>Income</p>
        <p class="positive large">${parseToOutput(this.totalIncome)}</p>
        <p>Expenses</p>
        <p class="negative large">${parseToOutput(this.totalExpenses)}</p>
        <p>Savings</p>
        <p class="neutral large">${parseToOutput(this.totalSavings)}</p>
        <p>Netto</p>
        <p class="large">${parseToOutput(this.totalNetto)}</p>
      </div>

      ${this.totalExpenses || this.totalIncome ? html `
        <div class="charts">
          ${this.totalIncome || this.totalExpenses ? html `
            <div class="pane bar-chart-container">
              <div>
                <canvas id="bar-chart"></canvas>
              </div>
            </div>
          ` : html ``}
    
          ${this.totalExpenses ? html `
            <div class="pane pie-chart-container">
              <div>
                <canvas id="pie-chart"></canvas>
              </div>
            </div>
          ` : ``}
        </div>
      ` : html ``}

      <div class="addContainer">
        <div id="addPane" class="pane">
          <add-entry
            @clicked-add="${(ev) => this.clickedAdd(ev)}"
            @show-recurring="${() => this.showRecurring()}"
          ></add-entry>
        </div>
        <div class="pane">
          <recurring-component
            @go-back="${() => this.showAdd()}"
            @clicked-add="${(ev) => this.clickedAdd(ev)}"
            .entries="${this.entries
            .filter(e => e.categories.includes(Category.RECURRING)) // Recurring only
            .filter((val, _, self) => self
            .filter(e => hasCategories(e, val.categories))
            .every(e => { console.log('====', e); return Date.parse(`1 ${val.month} ${val.year}`) >= Date.parse(`1 ${e.month} ${e.year}`); })) // Take latest entry only
            .filter(val => !(this.filtered.find(e => e.categories.every(c => val.categories.includes(c))))) // Filter out entries already present for selected month
        }"
          ></recurring-component>
        </div>
      </div>

      <div class="pane">
        <h2>Overview</h2>

        <div class="overview-section income">
          <h3>Income</h3>
          <div class="list">
            ${this.filtered.filter((e) => e.categories.includes(Category.INCOME)).sort((a, b) => b.amount - a.amount).map((e) => html `
              <single-entry
                .entry="${e}"
                @clicked-delete="${(ev) => this.clickedDelete(ev)}"
              ></single-entry>
            `)}
          </div>
        </div>

        <div class="overview-section savings">
          <h3>Savings</h3>
          <div class="list">
            ${this.filtered.filter((e) => e.categories.includes(Category.SAVINGS)).sort((a, b) => b.amount - a.amount).map((e) => html `
              <single-entry
                .entry="${e}"
                @clicked-delete="${(ev) => this.clickedDelete(ev)}"
              ></single-entry>
            `)}
          </div>
        </div>

        <div class="overview-section expenses">
          <h3>Expenses</h3>
          <div class="list">
            ${this.filtered.filter((e) => e.categories.includes(Category.EXPENSE)).map((e) => html `
              <single-entry
                .entry="${e}"
                @clicked-delete="${(ev) => this.clickedDelete(ev)}"
              ></single-entry>
            `)}
          </div>
        </div>

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
          gap: var(--gap-large);
        }
        .filter-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap-normal);
        }
        .filter-container > div {
          display: flex;
          align-items: center;
          gap: var(--gap-normal);
        }
        .large {
          font-size: var(--gap-large);
          text-overflow: '';
          overflow: hidden;
          white-space: nowrap;
        }
        .pane.overview {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr 2fr;
          grid-row-gap: var(--gap-normal);
          grid-column-gap: var(--gap-normal);
        }
        .pane.overview p {
          line-height: var(--gap-large);
        }
        .charts {
          display: flex;
          gap: var(--gap-large);
          max-width: 100%;
        }
        .pie-chart-container {
          flex: 1 1;
        }
        .bar-chart-container {
          flex: 0 0;
          min-width: 150px !important;
        }
        .bar-chart-container > div {
          height: 100%;
        }
        .overview-section {
          border-left: 2px solid white;
          padding-left: var(--gap-normal);
        }
        .overview-section .list {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
        }
        .income {
          border-color: var(--colors-primary-light);
        }
        .savings {
          border-color: var(--colors-secondary);
        }
        .expenses {
          border-color: var(--colors-red-normal);
        }
        .addContainer {
          width: calc(200% + var(--gap-huge) + 2*var(--gap-large)); 
          display: flex;
          gap: calc(var(--gap-huge) + 2*var(--gap-large));
          transition: transform 0.5s ease-in-out;
          max-height: 346px
        }
        .addContainer > div {
          flex: 1 1;
        }
      `,
        ];
    }
}
__decorate([
    query('#dateInput')
], MonthlyPageComponent.prototype, "input", void 0);
__decorate([
    query('#addPane')
], MonthlyPageComponent.prototype, "addPane", void 0);
__decorate([
    query('#bar-chart')
], MonthlyPageComponent.prototype, "barChart", void 0);
__decorate([
    query('#pie-chart')
], MonthlyPageComponent.prototype, "pieChart", void 0);
__decorate([
    query('.addContainer')
], MonthlyPageComponent.prototype, "addContainer", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "entries", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "selectedMonth", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "selectedYear", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "filtered", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "totalIncome", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "totalExpenses", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "totalSavings", void 0);
__decorate([
    state()
], MonthlyPageComponent.prototype, "totalNetto", void 0);
