import { getAuth } from 'firebase/auth';
import { html, css, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { Logo, User } from '../styles/svgs';
import { defaultCSS } from '../styles/default';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
export class PageHeaderComponent extends RxLitElement {
    clickedLogout() {
        this.dispatchEvent(new CustomEvent('clicked-logout'));
    }
    render() {
        return html `
      <div class="header-section">
          ${unsafeSVG(Logo)}
          <span class="title">YABAT</span>
      </div>
      <div class="header-section">
        <div class="user-dropdown">
          ${unsafeSVG(User)}
          <span>
            <span><p>Logged in as: </p><p class="email">${getAuth().currentUser.email}</p></span>
            <button class="secondary" @click="${() => this.clickedLogout()}">Logout</button>
          </span>
        </div>
      </div>
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
        :host {
          background-color: var(--colors-grey-dark);
          padding: var(--gap-small) var(--gap-normal);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px var(--colors-primary-light);
        }
        .header-section {
          display: flex;
          gap: var(--gap-normal);
          align-items: center;
        }
        .header-section svg {
          height: 20px;
        }
        .title {
          font-size: var(--font-size-large);
        }
        .user-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }
        .user-dropdown  svg {
          height: 30px;
          fill: var(--colors-white);
        }
        .user-dropdown > span {
          display: none;
          position: absolute;
          z-index: 1;
          right: 0;
          top: calc(100% - var(--gap-tiny));
          background-color: var(--colors-grey-dark);
          border: solid 1px var(--colors-primary-light);
          border-radius: var(--gap-tiny);
          padding: var(--gap-normal);
          width: auto;
          white-space: nowrap;
          flex-direction: column;
          gap: var(--gap-small);
          align-items: flex-end;
        }
        .user-dropdown > span > span {
          display: flex;
          gap: var(--gap-small);
        }
        .user-dropdown .email {
          color: #AAA;
        }
        .user-dropdown:hover > span {
          display: flex;
        }
      `,
        ];
    }
}
