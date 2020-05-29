// Map
// Represents a map.

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
      this.tiles = Array(init.height).fill(
        Array(init.width).fill(0)
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

  //////////////////////////////////////////////////////////////////////////////
  // WRITE

  setTile(x, y, newVal) {
    if (this.tileIsInRange(x, y)) {
      this.tiles[y][x] = newVal
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
        func(x, y, this.tiles[x][y])
      })
    })
  }
}

export { mapConfig }
export default Map
