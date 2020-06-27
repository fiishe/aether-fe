import React from 'react'
import MapLayer from './MapLayer.mjs'

class MapRenderer {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.layers = []
  }

  addLayer(name) {
    let newLayer = new MapLayer(
      name,
      this.width, this.height,
      this.layers.length
    )
    this.layers.push(newLayer)

    return newLayer
  }

  render() {
    console.log(this.layers);
    return this.layers
  }
}

export default MapRenderer
