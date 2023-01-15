import { html, css, CSSResult, TemplateResult, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Caret } from '../styles/svgs';
import { defaultCSS } from '../styles/default';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';

export class CustomSelectComponent extends RxLitElement {

  @state() options: Record<string, string>;
  @state() showMenu: boolean = false;

  @query('.container') container: HTMLElement;
  @query('.menu') menu: HTMLElement;
  @query('.value') value: HTMLParagraphElement;

  selected(sel: string) {
    this.value.innerText = this.options[sel];
    this.dispatchEvent(new CustomEvent('selected', { detail: sel }));
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  firstUpdated(): void {
    this.container.addEventListener('click',() => {
      this.toggleMenu();
    });
  }

  render(): TemplateResult {

    return html`
      <div class="container">
        <div class="value-container">
          <p class="value">
            ${this.options && Object.keys(this.options).length ? this.options[Object.keys(this.options)[0]] : ''}
          </p>
          ${unsafeSVG(Caret)}
        </div>
        ${this.showMenu ? html`
          <div class="menu">
            ${Object.entries(this.options).map(([k,v]) => html`
              <p @click="${() => this.selected(k)}">${v}</p>
            `)}
          </div>
        ` : html``}
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        .container {
          position: relative;
          color: var(--colors-white);
          background-color: var(--colors-grey-light);
          border-radius: var(--gap-small);
          font-size: var(--font-size-medium);
        }
        .value-container {
          padding: var(--gap-small) var(--gap-normal);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap-small);
        }
        .value-container svg {
          height: 20px;
          fill: var(--colors-white);
        }
        .menu {
          max-height: 200px;
          position: absolute;
          top: 0;
          left: -1px;
          z-index: 2;
          background-color: inherit;
          width: 100%;
          border-radius: var(--gap-small);
          overflow: scroll;
          border: 1px solid var(--colors-primary-dark);
        }
        .menu p {
          padding: var(--gap-small) var(--gap-normal);
        }
        .menu p:hover {
          background-color: var(--colors-primary-dark);
        }
      `,
    ];

  }

}
