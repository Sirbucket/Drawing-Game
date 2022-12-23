export class Canvas {
    w: string
    h: string
    element: HTMLElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    mousemovecbs = []
    mousedowncbs = []
    mouseupcbs = []
    
    constructor(w: string, h: string) {
        this.w = w; 
        this.h = h;
        this.element = document.createElement("element");
        this.element.innerHTML = `
        <label>
            <canvas id = "canvas" width = ${this.w} height = ${this.h}></canvas>
        </label>
        `;
        this.canvas = this.element.querySelector("#canvas")
        const canvas: HTMLCanvasElement = this.canvas
        this.ctx = canvas.getContext("2d")
        canvas.addEventListener("mousedown", (event) => {
            const len: number = this.mousedowncbs.length;
            for (let i: number = 0; i<len; ++i) {
                const c = this.mousedowncbs[i];
                c(event);
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            const len: number = this.mousemovecbs.length;
            for (let i: number = 0; i<len; ++i) {
                const c = this.mousemovecbs[i];
                c(event);
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            const len: number = this.mouseupcbs.length;
            for (let i: number = 0; i<len; ++i) {
                const c = this.mouseupcbs[i];
                c(event);
            }
        });
    }

    onMouseMove(cb) {
        this.mousemovecbs.push(cb)
    }
    onMouseDown(cb) {
        this.mousedowncbs.push(cb)
    }
    onMouseUp(cb) {
        this.mouseupcbs.push(cb)
    }
}