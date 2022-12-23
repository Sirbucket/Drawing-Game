export class Image {
    element
    image
    callbacks = []
    constructor(imageName) {
        this.element.innerHTML = `
            <label>
                <img class = "image" src = ${this.imageName}>
            </label>
        `;
        this.image = this.element.querySelector(".image");
        const image = this.image;
        image.addEventListener("click", () => {
            const len = this.callbacks.length;
            for(let i = 0; i<len; ++i) {
                const c = this.callbacks[i];
                c();
            }
        });
    }

    onClick(cb) {
        this.callbacks.push(cb);
    }
}