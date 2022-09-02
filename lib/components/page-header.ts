import { html, css, CSSResult, TemplateResult, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';

export class PageHeaderComponent extends RxLitElement {

  clickedLogout(): void {
    this.dispatchEvent(new CustomEvent('clicked-logout'));
  }

  render(): TemplateResult {

    return html`
      Page Header
      <button @click="${() => this.clickedLogout()}">Logout</button>
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
