import { html, css, CSSResult, TemplateResult, unsafeCSS, query } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { onEnter } from '../util/on-enter';
import { defaultCSS } from '../styles/default';

export class LoginPageComponent extends RxLitElement {

  @query('#email') emailInput: HTMLInputElement;
  @query('#password') passwordInput: HTMLInputElement;

  clickedLogin(): void {
    const emailValue = this.emailInput.value;
    const passwordValue = this.passwordInput.value;
    if (emailValue && passwordValue) {
      this.passwordInput.value = '';
      this.dispatchEvent(new CustomEvent('clicked-login', { detail: {
        email: emailValue,
        password: passwordValue,
      }}));
    }
  }

  firstUpdated(): void {
    onEnter(this.emailInput, () => this.clickedLogin());
    onEnter(this.passwordInput, () => this.clickedLogin());
  }

  render(): TemplateResult {

    return html`
      <div class="login-window">
        <div class="logo-title">
          <img src="./logo.svg">
          <h2>YABAT</h2>
        </div>
        <div class="inputs">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="your.name@gmail.com">
          <label for="password">Password</label>
          <input type="password" id="password"> 
        </div>
        <button class="primary" @click="${() => this.clickedLogin()}">
          Login
        </button>
      </div>
      <div class="background"></div>
    `;

  }

  static get styles(): CSSResult[] {

    return [
      unsafeCSS(defaultCSS),
      css`
        :host {
          color: var(--colors-white);
          /* Center window */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          /* fix for background */
          position: relative;
          overflow: hidden;
        }

        .login-window {
          background-color: var(--colors-grey-dark);
          border-radius: var(--gap-small);
          padding: var(--gap-large);
          display: flex;
          flex-direction: column;
          gap: var(--gap-large);
          align-items: center;
        }
        .logo-title {
          display: flex;
          gap: var(--gap-normal);
          justify-content: center;
        }
        .logo-title img {
          width: 50px;
        }
        .inputs {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
          width: 400px;
        }
        .inputs label {
          padding: var(--gap-small) 0 0 var(--gap-small);
        }
        .login-window button {
          width: 50%;
        }

        .background {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          background: 
            /* top, transparent black, faked with gradient */ 
            linear-gradient(
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.7)
            ),
            url('./login-background.jpg');
          background-size: cover;
          transform: scale(1.1);
          
          /* Add the blur effect */
          filter: blur(8px);
          -webkit-filter: blur(8px);
          -moz-filter: blur(8px);
          -o-filter: blur(8px);
          -ms-filter: blur(8px);
        }
      `,
    ];

  }

}
