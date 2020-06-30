import React from 'react'
import Layer from './Layer'

import { connect } from 'react-redux'

const hex2rgba = (hex, alpha = 1.0) => {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16),
      a = parseFloat(alpha)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const GridLayer = (props) => {
  let draw = (ctx) => {
    let width = props.width,
        height = props.height,
        ts = props.tileSize

    ctx.beginPath()

    // draw vertical lines
    let x = 0
    while (x < width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      x += ts
    }

    //  draw horizontal lines
    let y = 0
    while (y < height) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      y += ts
    }

    ctx.strokeStyle = hex2rgba(props.color, props.alpha/100.0)
    ctx.lineWidth = 1
    ctx.stroke()
  }

  let redraw = (ctx) => {
    ctx.clearRect(0, 0, props.width, props.height)
    draw(ctx)
  }

  return (
    <Layer
      id="grid-layer"
      width={props.width} height={props.height}
      draw={draw} redraw={redraw}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    alpha: state.maps.grid.alpha,
    color: state.maps.grid.color,
    tileSize: state.maps.grid.tileSize
  }
}

export default connect(mapStateToProps, null)(GridLayer)
