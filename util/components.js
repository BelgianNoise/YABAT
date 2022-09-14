export const define = (tag, module) => {
    if (!customElements.get(tag))
        customElements.define(tag, module);
};
export const hydrate = (ctor) => (...params) => class extends ctor {
    constructor() { super(...params); }
};
