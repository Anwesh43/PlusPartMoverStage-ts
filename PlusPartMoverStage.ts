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
