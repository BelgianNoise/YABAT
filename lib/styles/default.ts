import { css } from 'lit-element';

export const defaultCSS = css`
  body, html {
    width: 100%;
    height: 100%;
  }

  * {
    font-family: 'Fira Sans';
  }
  body, html, h1, h2, p, span, div, form {
    padding: 0;
    margin: 0;
  }

  input {
    border: none;
    outline: none;
    padding: var(--gap-small) var(--gap-normal);
    color: var(--colors-white);
    background-color: var(--colors-grey-light);
    border-radius: var(--gap-small);
  }

  label {
    font-size: var(--font-size-small);
  }

  button {
    line-height: 1.3rem;
    padding: var(--gap-tiny) var(--gap-normal);
    cursor: pointer;
    border-radius: var(--gap-small);
    border: none;
  }

  button.primary {
    background-color: var(--colors-primary-light);
    color: var(--colors-white);
  }
`;