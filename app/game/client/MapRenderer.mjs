// MapRenderer
// Extends Map to add rendering methods

import Map, { mapConfig } from '../models/Map'

const hex2rgba = (hex, alpha = 1.0) => {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16),
      a = parseFloat(alpha)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

class MapRenderer {
  constructor(canvas, init) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.drawSettings = {
      // What to draw
      grid: true,
      terrainMarkers: false
    }

    // Payload data
    this.bg = init.background || null
    this.grid = init.grid || {
      color: "#000000",
      alpha: 100,
      tileSize: 32
    }

    this.map = new Map({ width: 6, height: 6 })
  }

  //////////////////////////////////////////////////////////////////////////////
  // READ

  widthInTiles() {
    return this.map.getWidth()
  }

  heightInTiles() {
    return this.map.getHeight()
  }

  widthInPixels() {
    return this.widthInTiles() * this.grid.tileSize
  }

  heightInPixels() {
    return this.heightInTiles() * this.grid.tileSize
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
  // WRITE

  // Update canvas size to fit current map/tile sizes
  updateCanvas() {
    this.canvas.width = this.widthInPixels()
    this.canvas.height = this.heightInPixels()
  }

  setBackground(image) { // image is an Image object
    this.bg = image

    // cap image size
    image.width = Math.min(image.width, mapConfig.imageSize.maximum)
    image.height = Math.min(image.height, mapConfig.imageSize.maximum)

    this.updateCanvas()
  }

  setGrid(gridObj) {
    this.grid.alpha = gridObj.alpha
    this.grid.color = gridObj.color
    this.grid.tileSize = gridObj.tileSize

    // update attribs dependent on tileSize
    this.updateCanvas()
  }

  setTile(tileX, tileY, tileId) {
    this.map.setTile(tileX, tileY, tileId)
  }

  //////////////////////////////////////////////////////////////////////////////
  // DRAW

  clear() {
    this.ctx.fillStyle = "#2F3440"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // Called when there is no background image
  drawDefault() {
    let ctx = this.ctx,
        width = this.canvas.width,
        height = this.canvas.height

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(0, 0, width, height)

    ctx.font = '12px Arial'
    ctx.fillStyle = '#CEC3BE'
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

  drawTerrainMarkers() {
    this.ctx.strokeStyle = "#000000"
    this.ctx.font = '14px Arial'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.textAlign = 'left'

    this.map.forEachTile((x, y, tile) => {
      let terrainId = tile.symbol
      let pos = this.getTileCorner(x, y)
      pos.x += 2
      pos.y += 14

      this.ctx.strokeText(terrainId, pos.x, pos.y)
      this.ctx.fillText(terrainId, pos.x, pos.y)
    })
  }

  drawGrid() {
    let ctx = this.ctx,
        width = this.widthInPixels(),
        height = this.heightInPixels()

    ctx.beginPath()

    // draw vertical lines
    let x = 0
    while (x < this.widthInPixels()) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      x += this.grid.tileSize
    }

    //  draw horizontal lines
    let y = 0
    while (y < this.heightInPixels()) {
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
    if (this.drawSettings.grid) { this.drawGrid() }
    if (this.drawSettings.terrainMarkers) { this.drawTerrainMarkers() }
  }
}

export default MapRenderer
