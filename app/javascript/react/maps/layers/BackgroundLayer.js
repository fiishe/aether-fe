import React from 'react'
import Layer from './Layer'

import { connect } from 'react-redux'

const BackgroundLayer = (props) => {
  let draw = (ctx) => {
    if (props.image) {
      ctx.drawImage(props.image, 0, 0)
    }
    else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, props.width, props.height)
    }
  }

  return (
    <Layer
      id="bg-layer"
      width={props.width} height={props.height}
      draw={draw}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    image: state.maps.image
  }
}

export default connect(mapStateToProps, null)(BackgroundLayer)
