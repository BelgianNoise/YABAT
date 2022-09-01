import { html, css, CSSResult, TemplateResult, state } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { from } from 'rxjs';
import { createMachine, interpret, Interpreter, State, StateMachine } from 'xstate';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { AppContext } from './app.context';
import { AppEvent } from './app.events';
import { appMachine } from './app.machine';
import { AppState, AppStates, AppStateSchema, AppWindowStates } from './app.states';

export class AppRootComponent extends RxLitElement {

  private machine: StateMachine<AppContext, AppStateSchema, AppEvent, AppState>;
  private actor: Interpreter<AppContext, AppStateSchema, AppEvent, AppState>;

  @state() state?: State<AppContext, AppEvent, AppStateSchema, AppState>;

  constructor() {

    super();

    this.machine = createMachine<AppContext, AppEvent, AppState>(appMachine)
      .withContext({ data: [] });
    this.actor = interpret(this.machine).onTransition((s) => console.log(s.value));
    this.subscribe('state', from(this.actor));
    this.actor.start();

  }

  render(): TemplateResult {

    return html`
      ${ this.state?.matches({ [AppStates.WINDOW]: AppWindowStates.VIEWING_LOGIN_PAGE }) ? html`
        <h1> login page </h1>
      ` : html`` }
    `;

  }

  static get styles(): CSSResult[] {

    return [
      css``,
    ];

  }

}
