export function onEnter(el: HTMLElement, func: () => void): void {
  el?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') func();
  });
}
