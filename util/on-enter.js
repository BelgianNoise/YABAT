export function onEnter(el, func) {
    el === null || el === void 0 ? void 0 : el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
            func();
    });
}
