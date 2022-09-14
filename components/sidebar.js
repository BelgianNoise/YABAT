var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AppStates, AppWindowStates } from '../app.states';
import { html, css, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
import { Calendar, Home } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
export class SidebarComponent extends RxLitElement {
    clickedHome() {
        this.dispatchEvent(new CustomEvent('clicked-home'));
    }
    clickedMonthly() {
        this.dispatchEvent(new CustomEvent('clicked-monthly'));
    }
    render() {
        const homeCheck = this.state.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_HOME_PAGE });
        const monthlyCheck = this.state.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_MONTHLY_PAGE });
        return html `
      <div
        class="item ${homeCheck ? 'selected' : ''}"
        @click="${() => this.clickedHome()}"
      >
        ${unsafeSVG(Home)}
        <p>Home</p>
      </div>
      <div
        class="item ${monthlyCheck ? 'selected' : ''}"
        @click="${() => this.clickedMonthly()}"
      >
        ${unsafeSVG(Calendar)}
        <p>Monthly Overview</p>
      </div>
      <div class="item">
        ${unsafeSVG(Home)}
        <p>Filler</p>
      </div>
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
        :host {
          background-color: var(--colors-grey-dark);
        }
        .item {
          display: flex;
          gap: var(--gap-small);
          align-items: center;
          padding: calc(var(--gap-tiny) + var(--gap-small)) var(--gap-normal);
          cursor: pointer;
        }
        .item:hover {
          background-color: var(--colors-grey-light);
        }
        .selected, .selected:hover {
          background-color: var(--colors-primary-light);
        }
        svg { 
          height: var(--gap-normal);
          fill: var(--colors-white);
        }
      `,
        ];
    }
}
__decorate([
    state()
], SidebarComponent.prototype, "state", void 0);
