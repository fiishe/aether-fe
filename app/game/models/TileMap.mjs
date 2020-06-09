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
    gridAlpha: 100        // grid alpha
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
      () => new Array(width).fill(tileData['plain'])
    )
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
  setTile(x, y, tileName) {
    if (this.tiles[y][x].name != tileName) {
      let newTile = tileData[tileName]
      this.tiles[y][x] = newTile
      return true
    }
    else {
      return false
    }
  }

  pushRow(row) {
    let newRow = row || Array(this.getWidth()).fill(0)
    this.tiles.push(newRow)
  }

  pushColumn(col) {
    let inserter
    if (col) {
      inserter = (row, index) => { row.push(col[index]) }
    }
    else {
      inserter = (row) => { row.push(0) }
    }
    this.tiles.forEach(inserter)
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
