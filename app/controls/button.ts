
export class Button {
    element: HTMLElement
    button: HTMLButtonElement
    name: string = 'div';
    callbacks = [];
    constructor(html: string) {
        this.element = document.createElement(this.name);
        this.element.innerHTML = `
            <label>
                <button class = "button" type = "button">
                    ${html}
                </button>
            </label>
        `
        this.button = this.element.querySelector(".button")
        const button = this.button
        button.addEventListener("click", () => {
            for (let c of this.callbacks) {
                c()
            }
        });
    }

    onClick(cb) {
        this.callbacks.push(cb)
    }
}