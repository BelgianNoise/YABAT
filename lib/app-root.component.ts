import { html, css, CSSResult, TemplateResult, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { from } from 'rxjs';
import { createMachine, interpret, Interpreter, State, StateMachine } from 'xstate';
import { AppContext } from './app.context';
import { AppEvent, ClickedLogInEvent, ClickedLogOutEvent } from './app.events';
import { appMachine } from './app.machine';
import { AppDataStates, AppState, AppStates, AppStateSchema, AppWindowStates } from './app.states';
import { define, hydrate } from './util/components';
import { LoginPageComponent } from './pages/login-page';
import { HomePageComponent } from './pages/home-page';
import { PageHeaderComponent } from './components/page-header';
import { LoadingBarComponent } from './components/loading-bar';

export class AppRootComponent extends RxLitElement {

  private machine: StateMachine<AppContext, AppStateSchema, AppEvent, AppState>;
  private actor: Interpreter<AppContext, AppStateSchema, AppEvent, AppState>;

  @state() state?: State<AppContext, AppEvent, AppStateSchema, AppState>;

  constructor() {

    super();

    define('login-page', hydrate(LoginPageComponent)());
    define('home-page', hydrate(HomePageComponent)());
    define('page-header', hydrate(PageHeaderComponent)());
    define('loading-bar', hydrate(LoadingBarComponent)());

    this.machine = createMachine<AppContext, AppEvent, AppState>(appMachine)
      .withContext({ data: [] });
    this.actor = interpret(this.machine).onTransition((s) => console.log(s.value));
    this.subscribe('state', from(this.actor));
    this.actor.start();

  }

  clickedLogin(ev: CustomEvent): void {
    this.actor.send(new ClickedLogInEvent(ev.detail.email, ev.detail.password));
  }
  clickedLogout(): void {
    this.actor.send(new ClickedLogOutEvent())
  }

  render(): TemplateResult {

    return html`

      ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_OUT })
        || this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.LOGGING_IN })
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

        ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_HOME_PAGE }) ? html`
          <home-page></home-page>
        ` : html`` }

      ` }
    `;

  }

  static get styles(): CSSResult[] {

    return [
      css`
        :host {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        loading-bar {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
        }
      `,
    ];

  }

}
