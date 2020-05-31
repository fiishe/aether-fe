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
    this.scaleCanvas(
      mapConfig.canvas.defaultWidth, mapConfig.canvas.defaultHeight
    )

    this.drawSettings = {
      // What to draw
      grid: true,
      terrainMarkers: false
    }

    // Payload data
    this.src = init.background || null
    this.grid = init.grid || {
      color: "#000000",
      alpha: 100,
      tileSize: 32
    }

    this.map = new Map({ width: 6, height: 6 })

    // bind funcs
    this.drawTerrainMarker = this.drawTerrainMarker.bind(this)
  }

  scaleCanvas(targetWidth, targetHeight) {
    // scale canvas up by dpr and down by the same amount in class
    //  so that it doesn't look awful on hiDPI screens
    // https://html5rocks.com/en/tutorials/canvas/hidpi
    let canvas = this.canvas
    let dpr = window.devicePixelRatio || 1    // device pixel ratio

    canvas.width = targetWidth * dpr
    canvas.height = targetHeight * dpr
    canvas.style.width = `${targetWidth}px`
    canvas.style.height = `${targetHeight}px`

    let ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
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

  // convert pixel values to tile values
  pixelsToTiles(pixels) {
    return parseInt(pixels / this.grid.tileSize)
  }

  //////////////////////////////////////////////////////////////////////////////
  // WRITE

  // Update canvas size to fit current map/tile sizes
  updateCanvas() {
    this.scaleCanvas(this.widthInPixels(), this.heightInPixels())
  }

  setBackground(image) { // image is an Image object
    this.src = image

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

  //////////////////////////////////////////////////////////////////////////////
  // DRAW

  clear() {
    this.ctx.fillStyle = "#2F3440"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // Called when there is no background image
  drawDefault() {
    let ctx = this.ctx,
        width = mapConfig.canvas.defaultWidth,
        height = mapConfig.canvas.defaultHeight

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
    this.ctx.drawImage(this.src, 0, 0)
  }

  // draw() but only for a single tile at grid coords x, y
  drawTile(x, y) {
    let topLeft = this.getTileCorner(x, y),
        tileSize = this.grid.tileSize

    this.ctx.drawImage(
      this.src,             // image
      topLeft.x, topLeft.y, // topleft corner of section of source image
      tileSize, tileSize,   // size of section of source image
      topLeft.x, topLeft.y  // offset at which to draw on canvas
    )

    if (this.drawSettings.terrainMarkers) {
      this.drawTerrainMarker(x, y, this.map.getTile(x, y))
    }
  }

  drawTerrainMarker(x, y, tile) {
    let terrainId = tile.symbol
    let pos = this.getTileCenter(x, y)
    pos.y += 5

    this.ctx.strokeText(terrainId, pos.x, pos.y)
    this.ctx.fillText(terrainId, pos.x, pos.y)
  }

  drawTerrainMarkers() {
    this.ctx.strokeStyle = "#000000"
    this.ctx.font = '14px Arial'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.textAlign = 'center'

    this.map.forEachTile(this.drawTerrainMarker)
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

  // draws given image in center of given grid tile
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
    if (!this.src) {
      this.drawDefault()
      return
    }

    this.drawBackground()
    if (this.drawSettings.grid) { this.drawGrid() }
    if (this.drawSettings.terrainMarkers) { this.drawTerrainMarkers() }
  }
}

export default MapRenderer
