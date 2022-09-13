import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../../util/models/entry';
import { defaultCSS } from '../../styles/default';
import { Chart, ChartConfiguration } from 'chart.js';
import { colorsgreylight, colorssecondary, colorswhite } from '../../styles/colors';
import { Month, monthNames, shortenMonth } from '../../util/models/month';
import { totalSavings } from '../../util/helper';

export class SavingsChartComponent extends RxLitElement {

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
    const calculatedNumbers = {};
    Object.keys(Month).forEach((m) => {
      const entries = this.entries.filter(e => e.month === m);
      calculatedNumbers[m] = totalSavings(entries);
    });
    if (!this.chart) return;
    const data = {
      labels: monthNames.map(m => shortenMonth(m as Month)),
      datasets: [{ 
        data: Object.values(calculatedNumbers) as number[],
        backgroundColor: colorssecondary,
        hoverBackgroundColor: colorswhite,
        borderColor: colorsgreylight,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
      }],
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
