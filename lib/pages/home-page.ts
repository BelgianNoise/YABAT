import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Entry } from '../util/models/entry';
import { defaultCSS } from '../styles/default';

export class HomePageComponent extends RxLitElement {

  @state() entries: Entry[];

  render(): TemplateResult {

    return html`
      Home Page
      <span>${JSON.stringify(this.entries)}</span>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {

        }
      `,
    ];

  }

}
