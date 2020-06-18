import React, { Component } from 'react'
import Ticker from '../../common/Ticker'

import { connect } from 'react-redux'
import {
  incrementWidth,
  decrementWidth,
  incrementHeight,
  decrementHeight
} from '../../redux/modules/maps'

class Size extends Component {
  constructor(props) {
    super(props)

    this.incWidth = this.incWidth.bind(this)
    this.incHeight = this.incHeight.bind(this)
  }

  incWidth() {
    this.props.map.pushColumn()
    this.props.incrementWidth()
  }

  incHeight() {
    this.props.map.pushRow()
    this.props.incrementHeight()
  }

  render() {
    return (
      <div>
        <h5>Map Dimensions</h5>
        <div className="inline-block">
          <Ticker name="Width: " value={this.props.width}
            increment={this.incWidth}
            decrement={this.props.decrementWidth}
            />
        </div>
        <div className="inline-block">
          <Ticker name="Height: " value={this.props.height}
            increment={this.incHeight}
            decrement={this.props.decrementHeight}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    map: state.maps.map,
    width: state.maps.mapWidth,
    height: state.maps.mapHeight
  }
}

const mapDispatchToProps = {
  incrementWidth,
  decrementWidth,
  incrementHeight,
  decrementHeight
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Size)
