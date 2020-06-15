import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  incrementWidth,
  decrementWidth,
  incrementHeight,
  decrementHeight
} from '../../redux/modules/maps'

const Ticker = props => {
  return (
    <div>
      <h6>{props.name}</h6>
      <p onClick={props.increment}>+</p>
      <p onClick={props.decrement}>-</p>
    </div>
  )
}

class Size extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h4>Dimensions</h4>
        <Ticker name={"Width: " + this.props.width}
          increment={this.props.incrementWidth}
          decrement={this.props.decrementWidth}
          />
        <Ticker name={"Height: " + this.props.height}
          increment={this.props.incrementHeight}
          decrement={this.props.decrementHeight}
          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
