
export class Element {
    name: string = 'div';
    element: HTMLElement
    callbacks = [];
    constructor(name: string, displayname: string) {
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