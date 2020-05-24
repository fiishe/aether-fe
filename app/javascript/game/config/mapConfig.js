// canvas element
const canvas = {
  defaultWidth: 260,
  defaultHeight: 150
}

// image width/height in pixels
const imageSize = {
  maximum: 4096
}

// map width/height in tiles
const mapSize = {
  minimum: 1,
  maximum: 64
}

// tile width/height in pixels
const tileSize = {
  minimum: 16,
  maximum: 128
}

const mapConfig = {
  canvas,
  mapSize,
  imageSize,
  tileSize
}

export {
  canvas,
  mapSize,
  imageSize,
  tileSize
}
export default mapConfig
