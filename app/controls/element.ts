
export class Element {
    name = 'div';
    callbacks = [];
    constructor(name, displayname) {
        this.element = document.createElement(this.name);
        this.element.innerHTML = `
            <label>
                <div class = ${name}>
                    ${displayname}
                </div>
            </label>
        `
    }
}