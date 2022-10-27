import { html, css, CSSResult, TemplateResult, state, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { from, map } from 'rxjs';
import { createMachine, interpret, Interpreter, State, StateMachine } from 'xstate';
import { AppContext } from './app.context';
import { AppEvent, ClickedAddEntryEvent, ClickedDeleteEntryEvent, ClickedCompareEvent, ClickedHomeEvent, ClickedLogInEvent, ClickedLogOutEvent, ClickedMonthlyEvent } from './app.events';
import { appMachine } from './app.machine';
import { AppDataStates, AppState, AppStates, AppStateSchema, AppWindowStates } from './app.states';
import { define, hydrate } from './util/components';
import { LoginPageComponent } from './pages/login-page';
import { HomePageComponent } from './pages/home-page';
import { PageHeaderComponent } from './components/page-header';
import { LoadingBarComponent } from './components/loading-bar';
import { defaultCSS } from './styles/default';
import { Entry } from './util/models/entry';
import { SidebarComponent } from './components/sidebar';
import { MonthlyPageComponent } from './pages/monthly-page';
import { Chart, registerables } from 'chart.js';
import { ComparePageComponent } from './pages/compare-page';

export class AppRootComponent extends RxLitElement {

  private machine: StateMachine<AppContext, AppStateSchema, AppEvent, AppState>;
  private actor: Interpreter<AppContext, AppStateSchema, AppEvent, AppState>;
  
  @state() state?: State<AppContext, AppEvent, AppStateSchema, AppState>;
  @state() entries: Entry[];

  constructor() {

    super();

    Chart.register(...registerables);

    define('login-page', hydrate(LoginPageComponent)());
    define('home-page', hydrate(HomePageComponent)());
    define('monthly-page', hydrate(MonthlyPageComponent)());
    define('compare-page', hydrate(ComparePageComponent)());
    define('page-header', hydrate(PageHeaderComponent)());
    define('loading-bar', hydrate(LoadingBarComponent)());
    define('sidebar-component', hydrate(SidebarComponent)());

    this.machine = createMachine<AppContext, AppEvent, AppState>(appMachine)
      .withContext({ data: [] });
    this.actor = interpret(this.machine).onTransition((s) => console.log('STATE: ', s.value));
    this.subscribe('state', from(this.actor));
    this.subscribe('entries', from(this.actor).pipe(
      map((state) => state.context.data),
    ));
    this.actor.start();

  }

  clickedLogin(ev: CustomEvent): void {
    this.actor.send(new ClickedLogInEvent(ev.detail.email, ev.detail.password));
  }
  clickedLogout(): void {
    this.actor.send(new ClickedLogOutEvent());
  }
  clickedHome(): void {
    this.actor.send(new ClickedHomeEvent());
  }
  clickedMonthly(): void {
    this.actor.send(new ClickedMonthlyEvent());
  }
  clickedCompare(): void {
    this.actor.send(new ClickedCompareEvent());
  }
  clickedAddEntry(ev: CustomEvent<Entry>): void {
    this.actor.send(new ClickedAddEntryEvent(ev.detail));
  }
  clickedDelete(ev: CustomEvent<string>): void {
    this.actor.send(new ClickedDeleteEntryEvent(ev.detail));
  }

  render(): TemplateResult {

    return html`

      ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_OUT })
        || this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_IN })
        || this.state?.matches({ [AppStates.DATA]: AppDataStates.ADDING_DATA })
        || this.state?.matches({ [AppStates.DATA]: AppDataStates.LOADING_DATA }) ? html`
      
        <loading-bar></loading-bar>

      ` : html`` }

      ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_LOGIN_PAGE })
        || this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_IN }) ? html`

        <login-page
          @clicked-login="${(ev) => this.clickedLogin(ev)}"
        ></login-page>

      ` : html`

        <page-header
          @clicked-logout="${() => this.clickedLogout()}"
        ></page-header>

        <div class="body">
          <sidebar-component
            @clicked-home="${() => this.clickedHome()}"
            @clicked-monthly="${() => this.clickedMonthly()}"
            @clicked-compare="${() => this.clickedCompare()}"
            .state="${this.state}"
          ></sidebar-component>

          ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_HOME_PAGE }) ? html`
            <home-page
              .entries="${this.entries}"
            ></home-page>
          ` : html`` }

          ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_MONTHLY_PAGE }) ? html`
            <monthly-page
              .entries="${this.entries}"
              @clicked-add="${(ev) => this.clickedAddEntry(ev)}"
              @clicked-delete="${(ev) => this.clickedDelete(ev)}"
            ></monthly-page>
          ` : html`` }

          ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_COMPARE_PAGE }) ? html`
            <compare-page
              .entries="${this.entries}"
            ></compare-page>
          ` : html`` }

        </div>

      ` }
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
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
