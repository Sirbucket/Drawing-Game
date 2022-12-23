
export class Button {
    name = 'div';
    callbacks = [];
    constructor(html) {
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