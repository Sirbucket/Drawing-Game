export class Container {
    clone: Node
    cloneContent: HTMLElement
    content: HTMLElement 
    oldHTML: string
    constructor(list) {
        let itemTemplate: HTMLTemplateElement = document.querySelector("#controls");
        const length: number = list.length;
        this.clone = itemTemplate.cloneNode(true);
        this.cloneContent = this.clone.content.querySelector(".controls");
        for (let i = 0; i < length; ++i) {
            this.content = this.cloneContent.querySelector(".controlbox"); //Create clone
            this.oldHTML = this.cloneContent.innerHTML;
            this.content.appendChild(list[i].element);
        }
    }
}