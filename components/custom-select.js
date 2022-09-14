var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, unsafeCSS, state, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Caret } from '../styles/svgs';
import { defaultCSS } from '../styles/default';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
export class CustomSelectComponent extends RxLitElement {
    constructor() {
        super(...arguments);
        this.showMenu = false;
    }
    selected(sel) {
        this.value.innerText = this.options[sel];
        this.dispatchEvent(new CustomEvent('selected', { detail: sel }));
    }
    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
    firstUpdated() {
        this.container.addEventListener('click', () => {
            this.toggleMenu();
        });
    }
    render() {
        return html `
      <div class="container">
        <div class="value-container">
          <p class="value">
            ${this.options && Object.keys(this.options).length ? this.options[Object.keys(this.options)[0]] : ''}
          </p>
          ${unsafeSVG(Caret)}
        </div>
        ${this.showMenu ? html `
          <div class="menu">
            ${Object.entries(this.options).map(([k, v]) => html `
              <p @click="${() => this.selected(k)}">${v}</p>
            `)}
          </div>
        ` : html ``}
      </div>
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
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
__decorate([
    state()
], CustomSelectComponent.prototype, "options", void 0);
__decorate([
    state()
], CustomSelectComponent.prototype, "showMenu", void 0);
__decorate([
    query('.container')
], CustomSelectComponent.prototype, "container", void 0);
__decorate([
    query('.menu')
], CustomSelectComponent.prototype, "menu", void 0);
__decorate([
    query('.value')
], CustomSelectComponent.prototype, "value", void 0);
