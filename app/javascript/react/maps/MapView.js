import React, { Component } from 'react'
import BackgroundLayer from './layers/BackgroundLayer'
import GridLayer from './layers/GridLayer'

import { connect } from 'react-redux'

import TileMap, { mapConfig } from '../../game/models/TileMap.mjs'
import MapRenderer from '../../game/client/MapRenderer.mjs'

class MapView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: this.props.viewWidth,
      height: this.props.viewHeight
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIFECYCLE

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.viewWidth != this.props.viewWidth ||
        prevProps.viewHeight != this.props.viewHeight) {
      this.setState({
        width: this.props.viewWidth,
        height: this.props.viewHeight
      })
    }
  }

  render() {
    return (
      <div id="map-stage" className="scroll-x"
        style={ { width: this.props.viewWidth+'px', height: this.props.viewHeight+'px' } }
        onDragOver={this.props.onDragOver}
        onDrop={this.props.onDrop}
        onMouseDown={this.props.onMouseDown}
        onMouseMove={this.props.onMouseMove}
        onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart}
        onTouchMove={this.props.onTouchMove}
        onTouchEnd={this.props.onTouchEnd}
      >
        <GridLayer width={this.state.width} height={this.state.height} />
        <BackgroundLayer width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gridOptions: state.maps.grid,
    image: state.maps.image,
    map: state.maps.map,
    viewWidth: state.maps.viewWidth,
    viewHeight: state.maps.viewHeight
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(MapView)
