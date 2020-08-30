import React, { Component } from 'react'

class TooltipWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: false })
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    let tooltipClass = this.state.isOpen ? 'tooltip-show' : 'display-none'

    return(
      <span
        role="tooltip"
        aria-label={this.props.body}
        aria-haspopup="true"
        onClick={this.toggle}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        className={this.props.className}
        >
        {this.props.children}
        <div className={tooltipClass}>
          {this.props.body}
        </div>
      </span>
    )
  }
}

export default TooltipWrapper
