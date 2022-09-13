import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../../util/models/entry';
import { defaultCSS } from '../../styles/default';
import { Chart, ChartConfiguration } from 'chart.js';
import { colorsgreylight, colorswhite } from '../../styles/colors';
import { groupForPieChart } from '../../util/helper';
import { convertCategoryToString } from '../../util/models/category';

export class DistributionChartComponent extends RxLitElement {

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

  updated() {
    if (!this.chart) return;
    const helpData = groupForPieChart(this.entries);
    const total = Object.values(helpData).map(v => v.amount).reduce((acc, val) => acc + val, 0);
    const data = {
      labels: [ ...Object.entries(helpData).map(([k, v]) => `${convertCategoryToString(k)} (${parseFloat((v.amount/total*100).toString()).toFixed(2)} %)`) ],
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
        plugins: {
          legend: {
            display: true,
            position: 'left',
            align: 'end',
          },
        },
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
