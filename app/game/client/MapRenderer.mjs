// MapRenderer
// Supplements MapView component to draw a map on a canvas

import TileMap, { mapConfig } from '../models/TileMap'
import terrainIcons from 'images/terrain/terrainIcons.mjs'

const hex2rgba = (hex, alpha = 1.0) => {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16),
      a = parseFloat(alpha)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

class MapRenderer {
  constructor(map, layers, gridOptions) {
    // map object or width/height
    this.map = map

    // canvas elements
    this.layers = layers || {
      ui: null,
      game: null,
      grid: null,
      bg: null
    }

    this.gridOptions = gridOptions
    this.viewWidth = mapConfig.default.canvasWidth
    this.viewHeight = mapConfig.default.canvasHeight

    // bind funcs
    this.drawTerrainMarker = this.drawTerrainMarker.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////
  // READ

  widthInTiles() {
    return this.map.getWidth()
  }

  heightInTiles() {
    return this.map.getHeight()
  }

  getGridRGBA(gridOptions) {
    let alpha = parseFloat(gridOptions.alpha) / 100.0
    return hex2rgba(gridOptions.color, alpha)
  }

  // returns {x, y} at top left corner of the tile at given coords
  getTileCorner(gridX, gridY) {
    return {
      x: gridX * this.gridOptions.tileSize,
      y: gridY * this.gridOptions.tileSize
    }
  }

  getTileCenter(gridX, gridY) {
    let tileSize = this.gridOptions.tileSize
    return {
      x: gridX * tileSize + (tileSize / 2),
      y: gridY * tileSize + (tileSize / 2)
    }
  }

  // convert pixel values to tile values
  pixelsToTiles(pixels) {
    return parseInt(pixels / this.gridOptions.tileSize)
  }

  //////////////////////////////////////////////////////////////////////////////
  // WRITE

  updateViewDimensions() {
    let ts = this.gridOptions.tileSize
    this.viewWidth = this.widthInTiles() * ts
    this.viewHeight = this.heightInTiles() * ts
  }

  updateGridOptions(gridOptions) {
    this.gridOptions = gridOptions
  }

  //////////////////////////////////////////////////////////////////////////////
  // DRAW

  clear(layer) {
    let ctx = layer
    ctx.clearRect(0, 0, this.viewWidth, this.viewHeight)
  }

  // Called when there is no background image
  drawUploadPrompt() {
    let bg = this.layers.bg,
        ui = this.layers.ui,
        width = mapConfig.default.canvasWidth,
        height = mapConfig.default.canvasHeight

    bg.fillStyle = 'rgba(255, 255, 255, 0.1)'
    bg.fillRect(0, 0, width, height)

    ui.font = '12px Arial'
    ui.fillStyle = '#CEC3BE'
    ui.textAlign = 'center'
    ui.fillText(
      "Drag and drop or use the dialog below",
      width / 2,
      height / 2
    )
    ui.fillText(
      "to upload a background image",
      width / 2,
      height / 2 + 14
    )
  }

  drawBackground(image) {
    if (image) {
      this.layers.bg.drawImage(image, 0, 0)
    }
    else {
      this.drawUploadPrompt()
    }
  }

  // draw() but only for a single tile at grid coords x, y
  drawTile(x, y) {
    let topLeft = this.getTileCorner(x, y),
        tileSize = this.gridOptions.tileSize

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
    let pos = this.getTileCorner(x, y)
    let tileSize = this.gridOptions.tileSize

    let img = new Image()

    img.onload = () => {
      this.layers.game.drawImage(img, pos.x, pos.y, tileSize, tileSize)
    }

    img.src = terrainIcons[tile.name]
  }

  clearGameTile(x, y) {
    let pos = this.getTileCorner(x, y),
        tileSize = this.gridOptions.tileSize

    this.layers.game.clearRect(pos.x, pos.y, tileSize, tileSize)
  }

  drawTerrainMarkers() {
    let ctx = this.layers.game
    ctx.font = '14px Arial'
    ctx.fillStyle = '#0000ff'
    ctx.textAlign = 'center'

    this.map.forEachTile(this.drawTerrainMarker)
  }

  drawGrid(options) {
    let ctx = this.layers.grid,
        width = this.viewWidth,
        height = this.viewHeight

    ctx.beginPath()

    // draw vertical lines
    let x = 0
    while (x < width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      x += options.tileSize
    }

    //  draw horizontal lines
    let y = 0
    while (y < height) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      y += options.tileSize
    }

    ctx.strokeStyle = this.getGridRGBA(options)
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
}

export default MapRenderer
