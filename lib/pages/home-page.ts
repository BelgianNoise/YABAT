import { html, css, CSSResult, TemplateResult, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';

export class HomePageComponent extends RxLitElement {

  render(): TemplateResult {

    return html`
      Home Page
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
