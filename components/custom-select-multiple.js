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
export class CustomSelectMultipleComponent extends RxLitElement {
    constructor() {
        super(...arguments);
        this.showMenu = false;
        this.selectedItems = [];
    }
    selected(sel) {
        this.selectedItems = this.selectedItems.includes(sel)
            ? this.selectedItems.filter((i) => i !== sel)
            : [...this.selectedItems, sel];
        this.dispatchEvent(new CustomEvent('selected', { detail: this.selectedItems }));
    }
    toggleMenu() {
        this.showMenu = !this.showMenu;
        this.container.style.border = this.showMenu
            ? '1px solid var(--colors-primary-dark)'
            : 'none';
        this.container.style.borderRadius = this.showMenu
            ? 'var(--gap-small) var(--gap-small) 0 0'
            : 'var(--gap-small)';
        this.svg.style.transform = this.showMenu ? 'rotate(180deg)' : 'none';
    }
    reset() { this.selectedItems = []; }
    firstUpdated() {
        this.valueContainer.addEventListener('click', () => {
            this.toggleMenu();
        });
    }
    render() {
        return html `
      <div class="container">

        <div class="value-container">
          <p>${this.selectedItems.length} selected ... </p>
          ${unsafeSVG(Caret)}
        </div>

        ${this.showMenu ? html `
          <div class="menu">
            ${Object.entries(this.options).map(([k, v]) => html `
              <div
                class="menu-item ${this.selectedItems.includes(k) ? 'selected' : ''}"
                @click="${() => this.selected(k)}"
              >
                <p>${v}</p>
              </div>
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
          overflow: scroll;
          position: absolute;
          top: 100%;
          left: -1px;
          z-index: 2;
          background-color: inherit;
          width: 100%;
          border-radius: 0 0 var(--gap-small) var(--gap-small);
          border: 1px solid var(--colors-primary-dark);
        }
        .menu-item {
          padding: var(--gap-small) var(--gap-normal);
        }
        .menu-item:hover {
          background-color: var(--colors-primary-dark);
        }
        .menu-item.selected {
          background-color: var(--colors-primary-dark);
        }
      `,
        ];
    }
}
__decorate([
    state()
], CustomSelectMultipleComponent.prototype, "options", void 0);
__decorate([
    state()
], CustomSelectMultipleComponent.prototype, "showMenu", void 0);
__decorate([
    state()
], CustomSelectMultipleComponent.prototype, "selectedItems", void 0);
__decorate([
    query('.container')
], CustomSelectMultipleComponent.prototype, "container", void 0);
__decorate([
    query('.value-container')
], CustomSelectMultipleComponent.prototype, "valueContainer", void 0);
__decorate([
    query('.value-container svg')
], CustomSelectMultipleComponent.prototype, "svg", void 0);
__decorate([
    query('.menu')
], CustomSelectMultipleComponent.prototype, "menu", void 0);
