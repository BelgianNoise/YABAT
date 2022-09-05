import { css } from 'lit-element';

export const defaultCSS = css`
  body, html {
    width: 100%;
    height: 100%;
    color: var(--colors-white);
  }
  
  * {
    font-family: 'Fira Sans';
  }

  body, html, h1, h2, p, span, div, form {
    padding: 0;
    margin: 0;
  }

  input, textarea, select {
    border: none;
    outline: none;
    padding: var(--gap-small) var(--gap-normal);
    color: var(--colors-white);
    background-color: var(--colors-grey-light);
    border-radius: var(--gap-small);
    resize: none;
    font-size: var(--font-size-medium);
  }

  label {
    font-size: var(--font-size-small);
  }

  button {
    line-height: 2rem;
    font-size: var(--font-size-large);
    padding: var(--gap-tiny) var(--gap-normal);
    cursor: pointer;
    border-radius: var(--gap-small);
    border: 1px solid var(--colors-primary-light);
    display: flex;
    gap: var(--gap-small);
    justify-content: center;
    align-items: center;
  }

  button svg {
    height: 1.5rem;
  }

  button.primary {
    background-color: var(--colors-primary-light);
    color: var(--colors-white);
    fill: var(--colors-white);
  }

  button.secondary {
    background-color: transparent;
    color: var(--colors-primary-light);
    fill: var(--colors-primary-light);
  }

  button.primary:hover {
    background-color: var(--colors-primary-dark);
  }

  button.secondary:hover {
    background-color: var(--colors-grey-light);
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  *::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .positive { color: var(--colors-primary-light); }
  .negative { color: var(--colors-red-normal); }
  .neutral { color: var(--colors-secondary); }
`;