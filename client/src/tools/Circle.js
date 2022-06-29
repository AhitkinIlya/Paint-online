import Tool from "./Tool"

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    }

    mouseUpHandler() {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY =  e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            let width = currentX - this.startX
            let height = currentY - this.startY
            let radius = Math.sqrt(width ** 2, height ** 2)
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, radius) {
        const image = new Image()
        image.src = this.saved
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()    
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}