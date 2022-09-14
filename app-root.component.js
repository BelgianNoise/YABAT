var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, state, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { from, map } from 'rxjs';
import { createMachine, interpret } from 'xstate';
import { ClickedAddEntryEvent, ClickedDeleteEntryEvent, ClickedHomeEvent, ClickedLogInEvent, ClickedLogOutEvent, ClickedMonthlyEvent } from './app.events';
import { appMachine } from './app.machine';
import { AppDataStates, AppStates, AppWindowStates } from './app.states';
import { define, hydrate } from './util/components';
import { LoginPageComponent } from './pages/login-page';
import { HomePageComponent } from './pages/home-page';
import { PageHeaderComponent } from './components/page-header';
import { LoadingBarComponent } from './components/loading-bar';
import { defaultCSS } from './styles/default';
import { SidebarComponent } from './components/sidebar';
import { MonthlyPageComponent } from './pages/monthly-page';
import { Chart, registerables } from 'chart.js';
export class AppRootComponent extends RxLitElement {
    constructor() {
        super();
        Chart.register(...registerables);
        define('login-page', hydrate(LoginPageComponent)());
        define('home-page', hydrate(HomePageComponent)());
        define('monthly-page', hydrate(MonthlyPageComponent)());
        define('page-header', hydrate(PageHeaderComponent)());
        define('loading-bar', hydrate(LoadingBarComponent)());
        define('sidebar-component', hydrate(SidebarComponent)());
        this.machine = createMachine(appMachine)
            .withContext({ data: [] });
        this.actor = interpret(this.machine).onTransition((s) => console.log('STATE: ', s.value));
        this.subscribe('state', from(this.actor));
        this.subscribe('entries', from(this.actor).pipe(map((state) => state.context.data)));
        this.actor.start();
    }
    clickedLogin(ev) {
        this.actor.send(new ClickedLogInEvent(ev.detail.email, ev.detail.password));
    }
    clickedLogout() {
        this.actor.send(new ClickedLogOutEvent());
    }
    clickedHome() {
        this.actor.send(new ClickedHomeEvent());
    }
    clickedMonthly() {
        this.actor.send(new ClickedMonthlyEvent());
    }
    clickedAddEntry(ev) {
        this.actor.send(new ClickedAddEntryEvent(ev.detail));
    }
    clickedDelete(ev) {
        this.actor.send(new ClickedDeleteEntryEvent(ev.detail));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return html `

      ${((_a = this.state) === null || _a === void 0 ? void 0 : _a.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_OUT }))
            || ((_b = this.state) === null || _b === void 0 ? void 0 : _b.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_IN }))
            || ((_c = this.state) === null || _c === void 0 ? void 0 : _c.matches({ [AppStates.DATA]: AppDataStates.ADDING_DATA }))
            || ((_d = this.state) === null || _d === void 0 ? void 0 : _d.matches({ [AppStates.DATA]: AppDataStates.LOADING_DATA })) ? html `
      
        <loading-bar></loading-bar>

      ` : html ``}

      ${((_e = this.state) === null || _e === void 0 ? void 0 : _e.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_LOGIN_PAGE }))
            || ((_f = this.state) === null || _f === void 0 ? void 0 : _f.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_IN })) ? html `

        <login-page
          @clicked-login="${(ev) => this.clickedLogin(ev)}"
        ></login-page>

      ` : html `

        <page-header
          @clicked-logout="${() => this.clickedLogout()}"
        ></page-header>

        <div class="body">
          <sidebar-component
            @clicked-home="${() => this.clickedHome()}"
            @clicked-monthly="${() => this.clickedMonthly()}"
            .state="${this.state}"
          ></sidebar-component>

          ${((_g = this.state) === null || _g === void 0 ? void 0 : _g.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_HOME_PAGE })) ? html `
            <home-page
              .entries="${this.entries}"
            ></home-page>
          ` : html ``}

          ${((_h = this.state) === null || _h === void 0 ? void 0 : _h.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_MONTHLY_PAGE })) ? html `
            <monthly-page
              .entries="${this.entries}"
              @clicked-add="${(ev) => this.clickedAddEntry(ev)}"
              @clicked-delete="${(ev) => this.clickedDelete(ev)}"
            ></monthly-page>
          ` : html ``}
        </div>

      `}
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
        :host {
          height: 100%;
          max-height: 100%;
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          background-color: var(--colors-black);
          color: var(--colors-white);
        }
        loading-bar {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
        }
        page-header {
          flex: 0;
        }
        .body {
          flex: 1 0;
          display: flex;
          height: calc(100% - var(--header-height) - 1px);
        }
        .body > *:last-child  {
          overflow: scroll;
          padding: var(--gap-large);
          background-color: var(--colors-black);
          height: calc(100% - 2 * var(--gap-large));
          max-height: calc(100% - 2 * var(--gap-large));
          width: 100%;
          max-width: 100%;
        }
        sidebar-component {
          min-width: 250px;
          flex: 0 0;
        }
        home-page {
          flex: 1 0;
        }
      `,
        ];
    }
}
__decorate([
    state()
], AppRootComponent.prototype, "state", void 0);
__decorate([
    state()
], AppRootComponent.prototype, "entries", void 0);
