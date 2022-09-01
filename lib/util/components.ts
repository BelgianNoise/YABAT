
export const define = (tag: string, module: CustomElementConstructor): void => {
  if (!customElements.get(tag)) customElements.define(tag, module);
};

export const hydrate = (ctor: CustomElementConstructor) =>
  (...params: any[]): CustomElementConstructor => class extends ctor {
    constructor() { super(...params); }
  };