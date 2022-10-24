import { AppContext } from '../app.context';
import { AppEvent } from '../app.events';
import { AppState, AppStates, AppStateSchema, AppWindowStates } from '../app.states';
import { html, css, CSSResult, TemplateResult, unsafeCSS, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { State } from 'xstate';
import { defaultCSS } from '../styles/default';
import { Calendar, Filter, Home } from '../styles/svgs';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';

export class SidebarComponent extends RxLitElement {

  @state() state: State<AppContext, AppEvent, AppStateSchema, AppState>;

  clickedHome(): void {
    this.dispatchEvent(new CustomEvent('clicked-home'));
  }
  clickedMonthly(): void {
    this.dispatchEvent(new CustomEvent('clicked-monthly'));
  }
  clickedDetailed(): void {
    this.dispatchEvent(new CustomEvent('clicked-detailed'));
  }

  render(): TemplateResult {

    const homeCheck = this.state.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_HOME_PAGE });
    const monthlyCheck = this.state.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_MONTHLY_PAGE });
    const detailedCheck = this.state.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_DETAILED_PAGE });

    return html`
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
      <div
        class="item ${detailedCheck ? 'selected' : ''}"
        @click="${() => this.clickedDetailed()}"
      >
        ${unsafeSVG(Filter)}
        <p>Detailed Overview</p>
      </div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
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
