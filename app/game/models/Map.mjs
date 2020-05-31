// Map
// Represents a map.

import tileData from '../models/tileData'

const mapConfig = {
  canvas: {
    // canvas element
    defaultWidth: 384,
    defaultHeight: 384
  },
  imageSize: {
    // image width/height in pixels
    maximum: 4096
  },
  mapSize: {
    // map width/height in tiles
    minimum: 1,
    maximum: 64,
    default: 6
  },
  tileSize: {
    // tile width/height in pixels
    minimum: 32,
    maximum: 128,
    default: 32
  }
}

class Map {
  constructor(init) {
    if (init.tiles) {
      this.tiles = init.tiles
    }
    else if (init.width && init.height) {
      // initialize 2d array filled with plains
      this.tiles = Array.from(
        Array(init.height),
        () => new Array(init.width).fill(tileData['plain'])
      )
    }
    else {
      this.tiles = [ [0] ]
    }
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

  setTile(x, y, tileName) {
    if (this.tileIsInRange(x, y)) {
      let newTile = tileData[tileName]
      this.tiles[y][x] = newTile
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
export default Map
