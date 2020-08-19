import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
  FLASH_LIFESPAN, createFlash, removeFlash
} from '../redux/modules/common'

const FLASH_START_FADE = 2000     // (ms) how long before a flash starts to fade
const FLASH_FADE_TIME = 800       // (ms) how long a flash takes to fade
// if you change FLASH_START_FADE and FLASH_FADE_TIME, make according changes
// in /assets/stylesheets/common.scss

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: `flash flash-${props.type}`,
      fading: false
    }
    this.fadeTimer = null
    this.startFade = this.startFade.bind(this)
  }

  componentDidMount() {
    this.fadeTimer = setTimeout(this.startFade, FLASH_START_FADE)
  }

  startFade() {
    this.setState({ fading: true })
  }

  componentWillUnmount() {
    clearTimeout(this.fadeTimer)
  }

  render() {
    return(
      <CSSTransition
        in={!this.props.fading}
        classNames="flash"
        timeout={FLASH_FADE_TIME}
        >
        <div className={this.state.cls}>
          {this.props.children}
          <i className="fas fa-times"></i>
        </div>
      </CSSTransition>
    )
  }
}

class FlashList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // get initial list of flashes from HTML document
    let flashList = document.querySelector('#flash-init').children
    let flashArr = Array.from(flashList) //to Array

    // add the flash data to redux store
    flashArr.forEach(elem => {
      this.props.createFlash(
        {
          type: elem.dataset.flashType,
          message: elem.innerText
        },
        FLASH_LIFESPAN
      )

      // remove from HTML
      elem.parentNode.removeChild(elem)
    })
  }

  render() {
    let flashes = this.props.flashes.map((flash, index) => {
      return(
        <Flash type={flash.type} key={index} index={index} show={true}>
          <p>{flash.message}</p>
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
  createFlash,
  removeFlash
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashList)
