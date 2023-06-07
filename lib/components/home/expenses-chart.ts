import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../../util/models/entry';
import { defaultCSS } from '../../styles/default';
import { Chart, ChartConfiguration } from 'chart.js';
import { colorsgreylight, colorsrednormal, colorswhite } from '../../styles/colors';
import { Month, monthNames, shortenMonth } from '../../util/models/month';
import { totalExpenses, totalInvestmentsExpenses } from '../../util/helper';

export class ExpensesChartComponent extends RxLitElement {

  @state() entries: Entry[];
  @query('#chart') chart: HTMLCanvasElement;
  private chartInstance: Chart;

  render(): TemplateResult {

    return html`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `;

  }

  updated(): void {
    const calculatedNumbers: Record<string, { exp: number; inv: number }> = {};
    Object.keys(Month).forEach((m) => {
      const entries = this.entries.filter(e => e.month === m);
      const inv = totalInvestmentsExpenses(entries);
      calculatedNumbers[m] = {
        exp: totalExpenses(entries) - inv,
        inv,
      };
    });
    if (!this.chart) return;
    const data = {
      labels: monthNames.map(m => shortenMonth(m as Month)),
      datasets: [
        { 
          data: Object.values(calculatedNumbers).map((n) => n.exp),
          backgroundColor: colorsrednormal,
          hoverBackgroundColor: colorswhite,
          borderColor: colorsgreylight,
          borderWidth: 1,
          barPercentage: 1,
          categoryPercentage: 1,
          label: 'Expenses',
          stack: '0',
        },
        {
          data: Object.values(calculatedNumbers).map((n) => n.inv),
          backgroundColor: 'purple',
          hoverBackgroundColor: colorswhite,
          borderColor: colorsgreylight,
          borderWidth: 1,
          barPercentage: 1,
          categoryPercentage: 1,
          label: 'Investments',
          stack: '0',
        }
      ],
    };
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        color: colorswhite,
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 0 },
        plugins: { legend: { display: false } },
      },
    };

    this.chartInstance?.destroy();
    this.chartInstance = new Chart(this.chart, config);
  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `,
    ];

  }

}
