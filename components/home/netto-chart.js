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
import { colorsgreylight, colorsgreylighter, colorswhite } from '../../styles/colors';
import { Month, monthNames, shortenMonth } from '../../util/models/month';
import { totalExpenses, totalIncome, totalSavings } from '../../util/helper';
export class NettoChartComponent extends RxLitElement {
    render() {
        return html `
      <div>
        <canvas id="chart"></canvas>
      </div>
    `;
    }
    updated() {
        var _a;
        const calculatedNumbers = {};
        Object.keys(Month).forEach((m) => {
            const entries = this.entries.filter(e => e.month === m);
            calculatedNumbers[m] = totalIncome(entries) - totalExpenses(entries) - totalSavings(entries);
        });
        if (!this.chart)
            return;
        const data = {
            labels: monthNames.map(m => shortenMonth(m)),
            datasets: [{
                    data: Object.values(calculatedNumbers),
                    backgroundColor: colorsgreylighter,
                    hoverBackgroundColor: colorswhite,
                    borderColor: colorsgreylight,
                    borderWidth: 1,
                    barPercentage: 1,
                    categoryPercentage: 1,
                }],
        };
        const config = {
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
], NettoChartComponent.prototype, "entries", void 0);
__decorate([
    query('#chart')
], NettoChartComponent.prototype, "chart", void 0);
