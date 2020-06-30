import React, { Component } from 'react'
import AvMenu from './AvMenu'

import { connect } from 'react-redux'
import { avMenuOpen, avMenuClose } from '../redux/modules/common'

import { getMeta } from '../lib/utils';

class AvContainer extends Component {
  constructor(props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this)
    this.avatar = this.avatar.bind(this)
  }

  outsideClick(event) {
    if (!this.refs.node.contains(event.target) && this.props.avMenuIsOpen) {
      this.props.avMenuClose()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.outsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outsideClick)
  }

  avatar() {
    return(
      <img
        className="top-av"
        src={getMeta("avatar_url") || "https://i.imgur.com/yC321Eb.png"}
        />
    )
  }

  render() {
    if (this.props.avMenuIsOpen) {
      return(
        <div onClick={this.props.avMenuClose} ref="node">
          {this.avatar()}
          <div className="top-av-open-filler" />
          <div>
            <AvMenu />
          </div>
        </div>
      )
    }
    else {
      return(
        <div onClick={this.props.avMenuOpen} ref="node">
          {this.avatar()}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    avMenuIsOpen: state.common.avMenuIsOpen
  }
}

const mapDispatchToProps = {
  avMenuOpen,
  avMenuClose
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvContainer)
