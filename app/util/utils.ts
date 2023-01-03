import {Canvas} from "../drawing"
import {Image} from "../guessing"
import {Button, Typebox, Container, Element} from "../controls"

export class Utils {
    constructor() {}
    
    newButton(name : string, list) {
        const button : Button = new Button(name)
    
        list.push(button)
        return button
    }

    newImage(src : Blob, list) {
        const image = new Image(src)
    
        list.push(image)
        return image
    }

    newTypebox(name : string, list) {
        const typebox = new Typebox(name)
    
        list.push(typebox)
        return typebox
    }

    newContainer(list, list2) {
        const container = new Container(list)

        list2.push(container)
        return container
    }

    newCanvas(w : string, h : string) {
        const canvas = new Canvas(w, h)

        return canvas
    }

    newElement(name : string, displayname : string, list) {
        const element = new Element(name, displayname)

        list.push(element)
        return element
    }
}