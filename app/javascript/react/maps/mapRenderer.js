const CANVAS_DEFAULT_WIDTH = 260
const CANVAS_DEFAULT_HEIGHT = 150
const IMAGE_MAX_WIDTH = 4096, IMAGE_MAX_HEIGHT = 4096

const hex2rgba = (hex, alpha = 1.0) => {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16),
      a = parseFloat(alpha)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

class mapRenderer {
  constructor(canvas, init) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    // Payload data
    this.bg = init.background || null
    this.grid = init.grid || {
      color: "#000000",
      alpha: 100,
      tileSize: 32
    }
    this.terrain = {}
  }

  //////////////////////////////////////////////////////////////////////////////
  // GETTERS

  getWidth() {
    return this.canvas.width
  }

  getHeight() {
    return this.canvas.height
  }

  getGridRGBA() {
    let alpha = parseFloat(this.grid.alpha) / 100.0
    return hex2rgba(this.grid.color, alpha)
  }

  // returns {x, y} at top left corner of the tile at given coords
  getTileCorner(gridX, gridY) {
    return {
      x: gridX * this.grid.tileSize,
      y: gridY * this.grid.tileSize
    }
  }

  getTileCenter(gridX, gridY) {
    let tileSize = this.grid.tileSize
    return {
      x: gridX * tileSize + (tileSize / 2),
      y: gridY * tileSize + (tileSize / 2)
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // SETTERS

  setBackground(image) { // image is an Image object
    this.bg = image

    // cap image size
    image.width = Math.min(image.width, IMAGE_MAX_WIDTH)
    image.height = Math.min(image.height, IMAGE_MAX_HEIGHT)

    // make canvas match image size
    this.canvas.width = Math.max(image.width, CANVAS_DEFAULT_WIDTH)
    this.canvas.height = Math.max(image.height, CANVAS_DEFAULT_HEIGHT)
  }

  setGrid(gridObj) {
    this.grid.alpha = gridObj.alpha
    this.grid.color = gridObj.color
    this.grid.tileSize = gridObj.tileSize
  }

  //////////////////////////////////////////////////////////////////////////////
  // DRAWING METHODS

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // Called when there is no background image
  drawDefault() {
    let ctx = this.ctx, width = this.getWidth(), height = this.getHeight()

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

  drawBackground() {
    this.ctx.drawImage(this.bg, 0, 0)
  }

  drawGrid() {
    let ctx = this.ctx, width = this.getWidth(), height = this.getHeight()

    ctx.beginPath()

    // draw vertical lines
    let x = 0
    while (x < width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      x += this.grid.tileSize
    }
    //  draw horizontal lines
    let y = 0
    while (y < height) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      y += this.grid.tileSize
    }

    ctx.strokeStyle = this.getGridRGBA()
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // draws image in center of given grid tile
  drawImageOnGrid(image, gridX, gridY) {
    let origin = this.getTileCenter(gridX, gridY)
    origin.x -= image.width / 2
    origin.y -= image.height / 2

    this.ctx.drawImage(image, origin.x, origin.y)
  }

  // Main rendering function
  draw() {
    this.clear()

    // Check if background img exists
    if (!this.bg) {
      this.drawDefault()
      return
    }

    this.drawBackground()
    this.drawGrid()
  }
}

export default mapRenderer
