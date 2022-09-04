import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';
import { monthNames } from '../util/models/month';
import { groupForPieChart, parseToOutput, totalExpenses, totalIncome, totalSavings, totalUnspent } from '../util/helper';
import { Chart, ChartConfiguration } from 'chart.js';
import { colorsgreylight, colorsprimarylight, colorsreddark, colorsrednormal, colorssecondary, colorswhite } from '../styles/colors';
import { convertCategoryToString } from '../util/models/category';
import { Plus } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';

export class MonthlyPageComponent extends RxLitElement {

  @query('#dateInput') input: HTMLInputElement;
  @query('#bar-chart') barChart: HTMLCanvasElement;
  @query('#pie-chart') pieChart: HTMLCanvasElement;
  @state() entries: Entry[];
  @state() selectedMonth: number = new Date().getMonth();
  @state() selectedYear: number = new Date().getFullYear();

  @state() filtered: Entry[] = [];
  @state() totalIncome: number = 0;
  @state() totalExpenses: number = 0;
  @state() totalSavings: number = 0;
  @state() totalUnspent: number = 0;
  private barChartInstance: Chart;
  private pieChartInstance: Chart;

  firstUpdated(): void {
    this.input?.addEventListener('change', (e) => {
      const split = this.input.value.split('-');
      this.selectedYear = Number(split[0]);
      this.selectedMonth = Number(split[1]) - 1;
    });
  }

  updated(): void {
    this.handleBarChart();
    this.handlePieChart();
  }

  handlePieChart() {
    if (!this.pieChart) return;
    const helpData = groupForPieChart(this.filtered);
    const data = {
      labels: [ ...Object.keys(helpData).map((k) => convertCategoryToString(k)) ],
      datasets: [{ 
        data: [ ...Object.values(helpData).map(o => o.amount) ],
        backgroundColor: [ ...Object.values(helpData).map(o => o.color) ],
        borderColor: colorsgreylight,
        borderWidth: 1,
      }],
    };
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
      options: {
        color: colorswhite,
        responsive: true,
        maintainAspectRatio: false,
        layout: {
        },
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

    this.pieChartInstance?.destroy();
    this.pieChartInstance = new Chart(this.pieChart, config);
  }

  handleBarChart() {
    if (!this.barChart) return;
    const datasetoptions = {
      borderColor: colorsgreylight,
      borderWidth: 1,
      barPercentage: 1,
      categoryPercentage: 0.9,
    };
    const data = {
      labels: [ '' ],
      datasets: [
        { 
          data: [ this.totalIncome ],
          label: 'Income',
          backgroundColor: colorsprimarylight,
          hoverBackgroundColor: '#0A0',
          stack: '0',
          ...datasetoptions,
        },
        {
          data: [ this.totalExpenses ],
          label: 'Expenses',
          backgroundColor: colorsrednormal,
          hoverBackgroundColor: colorsreddark,
          stack: '1',
          ...datasetoptions,
        },
        {
          data: [ this.totalSavings ],
          label: 'Savings',
          backgroundColor: colorssecondary,
          hoverBackgroundColor: colorssecondary,
          stack: '1',
          ...datasetoptions,
        },
        {
          data: [ this.totalUnspent ],
          label: 'Unspent',
          backgroundColor: '#666',
          hoverBackgroundColor: colorswhite,
          stack: '1',
          ...datasetoptions,
        },
      ],
    };
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        color: colorswhite,
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
        },
      },
    };

    this.barChartInstance?.destroy();
    this.barChartInstance = new Chart(this.barChart, config);
  }

  render(): TemplateResult {

    const monthForInputField = `${this.selectedMonth < 9 ? '0' : ''}${this.selectedMonth + 1}`;
    this.filtered = this.entries.filter((e: Entry) => e.year === this.selectedYear && e.month === monthNames[this.selectedMonth]);
    this.totalIncome = totalIncome(this.filtered);
    this.totalExpenses = totalExpenses(this.filtered);
    this.totalSavings = totalSavings(this.filtered);
    this.totalUnspent = totalUnspent(this.filtered);

    return html`
      <div class="filter-container">
        <div>
          <p>Filter:</p>
          <input type="month" id="dateInput"
            value="${this.selectedYear}-${monthForInputField}"
          >
        </div>
        <div>
          <button class="secondary">
            ${unsafeSVG(Plus)}
            <p>Add Entry</p>
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
        <p>Unspent</p>
        <p class="large">${parseToOutput(this.totalUnspent)}</p>
      </div>

      ${this.totalIncome || this.totalExpenses ? html`
        <div class="pane">
          <div class="bar-chart-container">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      ` : html``}

      ${this.totalExpenses ? html`
        <div class="pane">
          <div class="pie-chart-container">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      ` : ``}
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
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
        .pane {
          background-color: var(--colors-grey-dark);
          border-radius: var(--gap-small);
          padding: var(--gap-normal) var(--gap-large);
        }
        .large {
          font-size: var(--gap-large);
        }
        .pane.overview {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr 2fr;
          grid-row-gap: var(--gap-normal);
        }
        .pane.overview p {
          line-height: var(--gap-large);
        }
        .bar-chart-container {
          height: 100px;
        }
      `,
    ];

  }

}
