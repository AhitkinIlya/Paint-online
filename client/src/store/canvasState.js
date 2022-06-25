import { makeAutoObservable } from 'mobx'

class CanvasState {
    constructor() {
        makeAutoObservable(this)
    }
    canvas = null

    setCanvas(canvas) {
        this.canvas = canvas
    }
}

export default new CanvasState()