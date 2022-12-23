export class Typebox {
    name: string = 'div';
    element: HTMLElement
    typebox: HTMLInputElement
    callbacks = [];
    constructor(html: string) {
        this.element = document.createElement(this.name);
        this.element.innerHTML = `
            <label>
                <input class = "userInput" type = "text">
                    ${html}
                </input>
            </label>
        `
        this.typebox = this.element.querySelector(".userInput")
        const typebox = this.typebox
        typebox.addEventListener("input", () => {
            for (let c of this.callbacks) {
                c()
            }
        });
    }

    onInput(cb) {
        this.callbacks.push(cb)
    }
}