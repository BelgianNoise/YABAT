import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../../util/models/entry';
import { defaultCSS } from '../../styles/default';
import { Chart, ChartConfiguration } from 'chart.js';
import { colorsgreylight, colorswhite } from '../../styles/colors';
import { Month, shortenMonth } from '../../util/models/month';
import { groupForComparePage } from '../../util/helper';
import { CategoryType, convertCategoryToString } from '../../util/models/category';

export class CompareChartComponent extends RxLitElement {

  @state() entries: Entry[];
  @state() categories: CategoryType[];
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
    if (!this.chart) return;
    const processedData = groupForComparePage(this.entries, this.categories);
    const datasetoptions = {
      borderColor: colorsgreylight,
      borderWidth: 1,
      barPercentage: 0.9,
      categoryPercentage: 0.9,
      hoverBackgroundColor: 'white',
    };
    const data = {
      labels: Object.keys(processedData).map((mo) => shortenMonth(mo as Month)),
      datasets: [
        ... Object.keys(Object.values(processedData)[0]).map((cat) => ({
          data: Object.values(processedData).map((vv) => vv[cat].amount),
          label: convertCategoryToString(cat),
          backgroundColor: Object.values(processedData)[0][cat].color,
          stack: '0',
          ...datasetoptions,
        })),
      ],
    };
    data.datasets = data.datasets.length ? data.datasets : [{}];
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        color: colorswhite,
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 0 },
        plugins: { legend: { display: !!data.datasets[0].label } },
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
