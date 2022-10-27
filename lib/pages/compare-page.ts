import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';
import { define, hydrate } from '../util/components';
import { CompareChartComponent } from '../components/detailed/compare-chart';
import { CategoryType, convertCategoryToString } from '../util/models/category';
import { CustomSelectMultipleComponent } from '../components/custom-select-multiple';
import { colorMappings } from '../util/helper';

export class ComparePageComponent extends RxLitElement {

  @state() currentYear = new Date().getUTCFullYear();
  @state() entries: Entry[];
  @state() selectedCategories: CategoryType[];

  constructor() {
    super();
    define('compare-chart', hydrate(CompareChartComponent)());
    define('custom-select-multiple', hydrate(CustomSelectMultipleComponent)());
  }

  render(): TemplateResult {

    const filtered = this.entries?.filter(e => this.currentYear === e.year);

    return html`
      <div class="pane">
        <h2>Select which categories to compare</h2>
        <custom-select-multiple
          @selected="${(ev: CustomEvent<CategoryType[]>) => this.selectedCategories = ev.detail}"
          .options="${
            Object.keys({
              ... colorMappings
            }).reduce((prev, curr) => ({
              ...prev,
              [curr]: convertCategoryToString(curr),
            }), {})}"
        >
        </custom-select-multiple>
      </div>

      <div class="pane chart">
        <compare-chart
          .entries="${filtered}"
          .categories="${this.selectedCategories}"
        ></compare-chart>
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          max-height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--gap-large);
          overflow: hidden !important;
        }
        .pane.chart {
          flex: 1 1;
          display: flex;
          max-height: calc(100% - 2*var(--gap-normal) - 3*var(--gap-large) - var(--gap-normal));
        }
        compare-chart {
          flex: 1 1;
        }
        h2 {
          padding-bottom: var(--gap-normal);
        }
      `,
    ];

  }

}
