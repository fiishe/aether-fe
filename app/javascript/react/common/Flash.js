import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
  setFlash, clearFlash
} from '../redux/modules/common'

const FLASH_LIFESPAN = 2200       // (ms) how long a flash is displayed
const FLASH_START_FADE = 2000     // (ms) how long before a flash starts to fade
const FLASH_FADE_TIME = 200       // (ms) how long a flash takes to fade
// if you change FLASH_START_FADE and FLASH_FADE_TIME, make according changes
// in /assets/stylesheets/common.scss

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: `flash flash-${props.type}`,
      display: true
    }
    this.fadeTimer = null
    this.startFade = this.startFade.bind(this)
  }

  componentDidMount() {
    this.fadeTimer = setTimeout(this.startFade, FLASH_START_FADE)
  }

  startFade() {
    this.setState({ display: false })
  }

  componentWillUnmount() {
    clearTimeout(this.fadeTimer)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props != prevProps) {
      // reset fade timer if flash content is changing
      clearTimeout(this.fadeTimer)
      this.fadeTimer = setTimeout(this.startFade, FLASH_START_FADE)
    }
  }

  render() {
    return(
      <CSSTransition
        in={this.state.display}
        classNames="flash"
        timeout={FLASH_FADE_TIME}
        onExited={this.props.handleClear}
        unmountOnExit
        >
        <div className={this.state.cls} onClick={this.startFade}>
          {this.props.children}
          <i className="fas fa-times"></i>
        </div>
      </CSSTransition>
    )
  }
}

class FlashContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // get initial flash from HTML document
    let flashList = document.querySelector('#flash-init').children
    let flashArr = Array.from(flashList) //to Array

    // add the flash data to redux store
    flashArr.forEach(elem => {
      this.props.setFlash(
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
    let flash = this.props.flash

    return(
      <div className="flash-anchor">
        {
          flash ? (
            <Flash type={flash.type} handleClear={this.props.clearFlash}>
              <p>{flash.message}</p>
            </Flash>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    flash: state.common.flash
  }
}

const mapDispatchToProps = {
  setFlash,
  clearFlash
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashContainer)
