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
  constructor(width, height, gridOptions) {
    this.width = width || mapConfig.default.canvasWidth
    this.height = height || mapConfig.default.canvasHeight
    this.gridOptions = gridOptions || {
      alpha: mapConfig.default.gridAlpha,
      color: mapConfig.default.gridColor,
      tileSize: mapConfig.default.tileSize
    }

    // bind funcs
    this.drawTerrainMarker = this.drawTerrainMarker.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////
  // READ

  getGridRGBA() {
    let alpha = parseFloat(this.gridOptions.alpha) / 100.0
    return hex2rgba(this.gridOptions.color, alpha)
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

  clear(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
  }

  // Drawn when there is no background image
  drawUploadPrompt(bgLayer, textLayer) {
    let width = mapConfig.default.canvasWidth,
        height = mapConfig.default.canvasHeight

    bgLayer.fillStyle = 'rgba(255, 255, 255, 0.1)'
    bgLayer.fillRect(0, 0, width, height)

    textLayer.font = '12px Arial'
    textLayer.fillStyle = '#CEC3BE'
    textLayer.textAlign = 'center'
    textLayer.fillText(
      "Drag and drop or use the dialog below",
      width / 2,
      height / 2
    )
    textLayer.fillText(
      "to upload a background image",
      width / 2,
      height / 2 + 14
    )
  }

  drawBackground(ctx, image) {
    if (image) {
      ctx.drawImage(image, 0, 0)
      return true
    }
    else {
      return false
    }
  }

  // draw() but only for a single tile at grid coords x, y
  drawTile(ctx, x, y) {
    let topLeft = this.getTileCorner(x, y),
        tileSize = this.gridOptions.tileSize

    ctx.drawImage(
      this.src,             // image
      topLeft.x, topLeft.y, // topleft corner of section of source image
      tileSize, tileSize,   // size of section of source image
      topLeft.x, topLeft.y  // offset at which to draw on canvas
    )

    if (this.drawSettings.terrainMarkers) {
      this.drawTerrainMarker(x, y, this.map.getTile(x, y))
    }
  }

  drawTerrainMarker(ctx, x, y, tile) {
    let terrainId = tile.symbol
    let pos = this.getTileCorner(x, y)
    let tileSize = this.gridOptions.tileSize

    let img = new Image()

    img.onload = () => {
      ctx.drawImage(img, pos.x, pos.y, tileSize, tileSize)
    }

    img.src = terrainIcons[tile.name]
  }

  clearGameTile(ctx, x, y) {
    let pos = this.getTileCorner(x, y),
        tileSize = this.gridOptions.tileSize

    ctx.clearRect(pos.x, pos.y, tileSize, tileSize)
  }

  drawTerrainMarkers(ctx, map) {
    ctx.font = '14px Arial'
    ctx.fillStyle = '#0000ff'
    ctx.textAlign = 'center'

    map.forEachTile((x, y, tile) => {
      this.drawTerrainMarker(ctx, x, y, tile)
    })
  }

  drawGrid(ctx) {
    let width = this.width,
        height = this.height

    ctx.beginPath()

    // draw vertical lines
    let x = 0
    while (x < width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      x += this.gridOptions.tileSize
    }

    //  draw horizontal lines
    let y = 0
    while (y < height) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      y += this.gridOptions.tileSize
    }

    ctx.strokeStyle = this.getGridRGBA(this.gridOptions)
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // draws given image in center of given grid tile
  drawImageOnGrid(ctx, image, gridX, gridY) {
    let origin = this.getTileCenter(gridX, gridY)
    origin.x -= image.width / 2
    origin.y -= image.height / 2

    ctx.drawImage(image, origin.x, origin.y)
  }
}

export default MapRenderer
