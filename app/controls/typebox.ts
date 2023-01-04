export class Typebox {
	element : HTMLElement
	typebox : HTMLInputElement
    name = 'div';
    callbacks = [];
    constructor(html) {
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
                c(this.typebox.value)
            }
        });
    }

    onInput(cb) {
        this.callbacks.push(cb)
    }
}