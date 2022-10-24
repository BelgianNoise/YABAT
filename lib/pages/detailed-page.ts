import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';

export class DetailedPageComponent extends RxLitElement {

  @state() entries: Entry[];

  constructor() {
    super();
  }

  render(): TemplateResult {

    return html`

    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`

      `,
    ];

  }

}
