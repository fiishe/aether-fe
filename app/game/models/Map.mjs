// Map
// Represents a map.

const mapConfig = {
  canvas: {
    // canvas element
    defaultWidth: 260,
    defaultHeight: 150
  },
  imageSize: {
    // image width/height in pixels
    maximum: 4096
  },
  mapSize: {
    // map width/height in tiles
    minimum: 1,
    maximum: 64
  },
  tileSize: {
    // tile width/height in pixels
    minimum: 16,
    maximum: 128
  }
}

class Map {
  constructor(init) {
    this.terrain = init.terrain || [] // 2d array of tile IDs
  }

  //////////////////////////////////////////////////////////////////////////////
  // GETTERS

  getWidth() { // map width in tiles
    
  }

  getHeight() { // map height in tiles

  }

  //////////////////////////////////////////////////////////////////////////////
  // SETTERS

  setTerrain() {
    // Validate
  }
}

export { mapConfig }
export default Map
