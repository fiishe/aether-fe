// Map
// Represents a map.

import tileData from '../models/tileData'

const mapConfig = {
  default: {
    canvasWidth: 256,     // canvas width in pixels
    canvasHeight: 192,    // canvas height in pixels
    mapWidth: 8,          // map width in tiles
    mapHeight: 6,         // map height in tiles
    tileSize: 32,         // tile width/height in pixels
    gridColor: '#000000', // grid color
    gridAlpha: 100,       // grid alpha
    tile: 0               // initial tile to populate empty maps with
  },
  minimum: {
    mapSize: 1,           // map width/height in tiles
    tileSize: 32          // tile width/height in pixels
  },
  maximum: {
    mapSize: 64,
    tileSize: 128,
    imageSize: 4096       // image width/height in pixels
  }
}

class TileMap {
  constructor(width = 1, height = 1) {
    // initialize 2d array filled with plains
    this.tiles = Array.from(
      Array(height),
      () => new Array(width).fill(mapConfig.default.tile)
    )

    this.getWidth = this.getWidth.bind(this)
    this.getHeight = this.getHeight.bind(this)
    this.getTile = this.getTile.bind(this)
    this.tileIsInRange = this.tileIsInRange.bind(this)
    this.setTile = this.setTile.bind(this)
    this.pushRow = this.pushRow.bind(this)
    this.pushColumn = this.pushColumn.bind(this)
    this.forEachTile = this.forEachTile.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////
  // READ

  getWidth() { // map width in tiles
    return this.tiles[0].length
  }

  getHeight() { // map height in tiles
    return this.tiles.length
  }

  getTile(x, y) {
    return this.tiles[y][x]
  }

  tileIsInRange(x, y) {
    return x >= 0 && x < this.getWidth() &&
           y >= 0 && y < this.getHeight()
  }

  dump() {
    let out = ""
    this.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        out += tile.symbol
      })
      out += "\n"
    })
    console.log(out);
    return out
  }

  //////////////////////////////////////////////////////////////////////////////
  // WRITE

  // set value of a single tile, returning true if it changed
  setTile(x, y, tileId) {
    if (tileId && (this.tiles[y][x] != tileId)) {
      this.tiles[y][x] = tileId
      return true
    }
    else {
      return false
    }
  }

  pushRow(row) {
    let newRow = row || Array(this.getWidth()).fill(mapConfig.default.tile)
    this.tiles.push(newRow)
  }

  pushColumn(col) {
    let inserter
    if (col) {
      inserter = (row, index) => { row.push(col[index]) }
    }
    else {
      inserter = (row) => { row.push(mapConfig.default.tile) }
    }
    this.tiles.forEach(inserter)
  }

  crop(targetWidth, targetHeight) {
    let i

    // vertical crop
    for (i = this.getHeight(); i > targetHeight; i--) {
      this.tiles.pop()
    }

    // horizontal crop
    this.tiles.forEach(row => {
      // row = subset of row that only has targetWidth elements
    })
  }

  // Iterates through all of the map's tiles
  forEachTile(func) {
    this.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        func(x, y, tile)
      })
    })
  }
}

export { mapConfig }
export default TileMap
