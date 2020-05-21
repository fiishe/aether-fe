const CANVAS_DEFAULT_WIDTH = 260
const CANVAS_DEFAULT_HEIGHT = 150
const IMAGE_MAX_WIDTH = 4096, IMAGE_MAX_HEIGHT = 4096

class mapRenderer {
  constructor(canvas, background = null) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.bg = background
  }

  getWidth() {
    return this.canvas.width
  }

  getHeight() {
    return this.canvas.height
  }

  setBackground(image) { // image is an Image object
    this.bg = image

    // cap image size
    image.width = Math.min(image.width, IMAGE_MAX_WIDTH)
    image.height = Math.min(image.height, IMAGE_MAX_HEIGHT)

    // make canvas match image size
    this.canvas.width = Math.max(image.width, CANVAS_DEFAULT_WIDTH)
    this.canvas.height = Math.max(image.height, CANVAS_DEFAULT_HEIGHT)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.clear()
    let ctx = this.ctx, width = this.getWidth(), height = this.getHeight()

    if (this.bg) {
      ctx.drawImage(this.bg, 0, 0)
    }
    else { // no background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = '12px Arial'
      ctx.fillStyle = '#cec3be'
      ctx.textAlign = 'center'
      ctx.fillText(
        "Drag and drop or use the dialog below",
        width / 2,
        height / 2
      )
      ctx.fillText(
        "to upload a background image",
        width / 2,
        height / 2 + 14
      )
    }
  }
}

export default mapRenderer
