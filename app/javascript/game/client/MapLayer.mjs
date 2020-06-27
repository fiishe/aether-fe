import React from 'react'

class MapLayer {
  constructor(name, width, height, index) {
    this.name = name

    this.canvas = React.createElement('canvas')
    this.canvas.id = name
    this.canvas.width = width
    this.canvas.height = height

    this.ctx = this.canvas.getContext('2d')
  }

  fixScale(targetWidth, targetHeight) {
    let dpr = window.devicePixelRatio || 1
    if (dpr == 1) { return }

    this.canvas.width = targetWidth * dpr
    this.canvas.height = targetHeight * dpr
    this.canvas.style.width = `${targetWidth}px`
    this.canvas.style.height = `${targetHeight}px`

    this.ctx.scale(dpr, dpr)
  }
}

export default MapLayer
