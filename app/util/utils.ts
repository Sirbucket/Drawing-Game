import {Canvas} from "../drawing"
import {Image} from "../guessing"
import {Button, Typebox, Container, Element} from "../controls"

export class Utils {
    constructor() {}
    
    newButton(name, list) {
        const button = new Button(name)
    
        list.push(button)
        return button
    }

    newImage(src, list) {
        const image = new Image(src)
    
        list.push(image)
        return image
    }

    newTypebox(name, list) {
        const typebox = new Typebox(name)
    
        list.push(typebox)
        return typebox
    }

    newContainer(list, list2) {
        const container = new Container(list)

        list2.push(container)
        return container
    }

    newCanvas(w, h) {
        const canvas = new Canvas(w, h)

        return canvas
    }

    newElement(name, displayname, list) {
        const element = new Element(name, displayname)

        list.push(element)
        return element
    }
}