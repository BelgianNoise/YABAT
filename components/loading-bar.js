import { html, css, unsafeCSS } from 'lit-element';
import { RxLitElement } from 'rx-lit';
import { defaultCSS } from '../styles/default';
export class LoadingBarComponent extends RxLitElement {
    render() {
        return html `
      <div class="moving"></div>
    `;
    }
    static get styles() {
        return [
            unsafeCSS(defaultCSS),
            css `
        :host {
          height: 2px;
          width: 100%;
          background-color: var(--colors-primary-dark);
          overflow-x: hidden;
        }
        .moving {
          width: 100%;
          height: 3px;
          border-bottom-left-radius: 2px;
          border-bottom-right-radius: 2px;
          background-color: var(--colors-primary-light);
          transform-origin: 0% 50%;
          animation: animation 1s linear infinite;
        }

        @keyframes animation {
          0% { transform: translateX(0) scaleX(0); }
          40% { transform: translateX(0) scaleX(0.4); }
          100% { transform: translateX(100%) scaleX(0.5); }
        }
      `,
        ];
    }
}
