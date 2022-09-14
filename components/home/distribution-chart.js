var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../../styles/default';
import { Chart } from 'chart.js';
import { colorsgreylight, colorswhite } from '../../styles/colors';
import { groupForPieChart } from '../../util/helper';
import { convertCategoryToString } from '../../util/models/category';
export class DistributionChartComponent extends RxLitElement {
    render() {
        return html `
      <div>
        <canvas id="chart"></canvas>
      </div>
    `;
    }
    updated() {
        var _a;
        if (!this.chart)
            return;
        const helpData = groupForPieChart(this.entries);
        const total = Object.values(helpData).map(v => v.amount).reduce((acc, val) => acc + val, 0);
        const data = {
            labels: [...Object.entries(helpData).map(([k, v]) => `${convertCategoryToString(k)} (${parseFloat((v.amount / total * 100).toString()).toFixed(2)} %)`)],
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
                plugins: {
                    legend: {
                        display: true,
                        position: 'left',
                        align: 'end',
                    },
                },
            },
        };
        (_a = this.chartInstance) === null || _a === void 0 ? void 0 : _a.destroy();
        this.chartInstance = new Chart(this.chart, config);
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
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
__decorate([
    state()
], DistributionChartComponent.prototype, "entries", void 0);
__decorate([
    query('#chart')
], DistributionChartComponent.prototype, "chart", void 0);
