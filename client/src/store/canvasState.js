import { makeAutoObservable } from 'mobx'

class CanvasState {
    constructor() {
        makeAutoObservable(this)
    }
    canvas = null
    backList = []
    forwardList = []

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToBack(data) {
        this.backList.push(data)
    }

    pushToForward(data) {
        this.forwardList.push(data)
    }

    back() {
        let ctx = this.canvas.getContext('2d')

        if (this.backList.length > 0) {
            let dataURL = this.backList.pop()
            this.forwardList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            alert('Отменить действие невозможно')
        }
    }

    forward() {
        let ctx = this.canvas.getContext('2d')

        if (this.forwardList.length > 0) {
            let dataURL = this.forwardList.pop()
            this.backList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            alert('Отменить действие невозможно')
        }
    }
}

export default new CanvasState()