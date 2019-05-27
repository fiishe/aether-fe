import React, { Component } from 'react'
import AvMenu from '../components/AvMenu'
import getMeta from '../helpers/getMeta';

class AvContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggle = this.toggle.bind(this)
    this.outsideClick = this.outsideClick.bind(this)
    this.avatar = this.avatar.bind(this)
  }

  toggle() {
    this.setState({ expanded: !(this.state.expanded) })
  }

  outsideClick(event) {
    if (!this.refs.node.contains(event.target)) {
      this.setState({ expanded: false })
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
      <img className="top-av" src={getMeta("avatar_url") || "https://i.imgur.com/yC321Eb.png"} />
    )
  }

  render() {
    if (this.state.expanded) {
      return(
        <div onClick={this.toggle} ref="node">
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
        <div onClick={this.toggle} ref="node">
          {this.avatar()}
        </div>
      )
    }
  }
}

export default AvContainer
