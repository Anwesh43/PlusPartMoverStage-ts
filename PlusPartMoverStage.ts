const w : number = window.innerWidth, h : number = window.innerHeight
class PlusPartMoverStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D
    size : number = Math.min(w, h)
    ppm : PlusPartMover = new PlusPartMover()
    animator : Animator = new Animator()

    initCanvas() {
        this.canvas.width = this.size
        this.canvas.height = this.size
        this.context = this.canvas.getContext('2d')
    }

    render() {
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0, 0, w, h)
        this.ppm.draw(this.context, this.size)
    }

    handleTap() {
        this.canvas.onmousedown = () => {
            this.ppm.startUpdating(() => {
              this.animator.start(() => {
                  this.render()
                  this.ppm.update(() => {
                      this.animator.stop()
                  })
              })
            })
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

class PlusPartMover {
    state : State = new State()

    draw(context : CanvasRenderingContext2D, size : number) {
        context.lineWidth = Math.min(size, size) / 60
        context.lineCap = 'round'
        context.strokeStyle = '#4A148C'
        context.save()
        context.translate(size/2, size/2)
        for(var i = 0; i < 4; i++) {
            const sc : number = Math.min(0.25, Math.max(0, this.state.scale - i * 0.25)) * 4
            context.save()
            context.rotate(Math.PI/2 * i)
            context.save()
            context.translate(0, -h/2 * sc)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -size/10)
            context.stroke()
            context.restore()
            context.restore()
        }
        context.restore()
    }

    update(cb : Function) {
        this.state.update(cb)
    }

    startUpdating(cb : Function) {
        this.state.startUpdating(cb)
    }
}
