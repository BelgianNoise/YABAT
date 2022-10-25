import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';
import { define, hydrate } from '../util/components';
import { DetailedChartComponent } from '../components/detailed/detailed-chart';
import { CategoryType } from '../util/models/category';

export class DetailedPageComponent extends RxLitElement {

  @state() currentYear = new Date().getUTCFullYear();
  @state() entries: Entry[];
  @state() selectedCategories: CategoryType[];

  constructor() {
    super();
    define('detailed-chart', hydrate(DetailedChartComponent)());
  }

  render(): TemplateResult {

    const filtered = this.entries?.filter(e => this.currentYear === e.year);

    return html`
      <div class="pane">
        <detailed-chart
          .entries="${filtered}"
          .categories="${this.selectedCategories}"
        ></detailed-chart>
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          min-height: calc(100% - 2 * var(--gap-large));
          display: flex;
          flex-direction: column;
        }
        .pane {
          flex: 1 1;
        }
        detailed-chart {
          min-height: 100%;
          min-width: 100%;
        }
      `,
    ];

  }

}
