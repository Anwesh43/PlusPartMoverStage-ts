const w : number = window.innerWidth, h : number = window.innerHeight
class PlusPartMoverStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D
    size : number = Math.min(w, h)
    initCanvas() {
        this.canvas.width = this.size
        this.canvas.height = this.size
        this.context = this.canvas.getContext('2d')
    }

    render() {
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    handleResize() {
        window.onresize = () => {
            this.size = Math.min(window.innerWidth, window.innerHeight)
        }
    }

    static init() {
        const stage : PlusPartMoverStage = new PlusPartMoverStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
        stage.handleResize()
    }
}

class State {
    scale : number = 0
    dir : number = 0
    prevScale : number = 0

    update(cb : Function) {
        this.scale += 0.1 * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {
    animated : boolean = false
    interval : number

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}
