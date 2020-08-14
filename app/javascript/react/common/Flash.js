import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFlash, removeFlash } from '../redux/modules/common'

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: this.props.className
    }

    this.lifespan = props.lifespan || 3000  // how long it lasts before fading
    this.killtime = props.killtime || 800   // how long it takes to fade
      // if you change killtime, also change the animation-duration
      // of .flash-fading in /assets/stylesheets/common.scss

    this.kill = this.kill.bind(this)
    this.timeouts = []
  }

  componentDidMount() {
    this.timeouts.push(setTimeout(this.kill, this.lifespan))
  }

  kill() {
    // start fading-out animation
    this.setState({
      cls: this.state.cls + " flash-fading"
    })
    // remove component once animation completes
    this.timeouts.push(setTimeout(this.props.remove, this.killtime))
  }

  componentWillUnmount() {
    // clear timeouts to prevent memory leak
    this.timeouts.forEach(timeout => { clearTimeout(timeout) })
  }

  render() {
    return(
      <div className={this.state.cls} onClick={this.kill}>
        <p>{this.props.children}</p>
        <i className="fas fa-times"></i>
      </div>
    )
  }
}

class FlashListComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // get initial list of flashes from HTML document
    let flashList = document.querySelector('#flash-init').children
    let flashArr = Array.from(flashList) //to Array

    // add the flash data to redux store
    flashArr.forEach(elem => {
      this.props.addFlash({
        type: elem.dataset.flashType,
        message: elem.innerText
      })
    })
  }

  render() {
    let flashes = this.props.flashes.map((flash, index) => {
      return(
        <Flash className={`flash flash-${flash.type}`}
          key={index} remove={this.props.removeFlash}
          >
          {flash.message}
        </Flash>
      )
    })

    return(
      <div className="flash-anchor">
        <div className="flash-container">
          {flashes}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    flashes: state.common.flashes
  }
}

const mapDispatchToProps = {
  addFlash,
  removeFlash
}

const FlashList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashListComponent)

export default Flash
export {
  FlashList
}
