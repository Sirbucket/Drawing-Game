export class Image {
    element: HTMLElement
    image: HTMLImageElement
    callbacks = []
    constructor(imageName: string) {
        this.element.innerHTML = `
            <label>
                <img class = "image" src = ${imageName}>
            </label>
        `;
        this.image = this.element.querySelector(".image");
        const image: HTMLImageElement = this.image;
        image.addEventListener("click", () => {
            const len: number = this.callbacks.length;
            for (let i: number = 0; i < len; ++i) {
                const c = this.callbacks[i];
                c();
            }
        });
    }

    onClick(cb) {
        this.callbacks.push(cb);
    }
}