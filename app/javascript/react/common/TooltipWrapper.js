import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

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
        <CSSTransition in={this.state.isOpen} timeout={200}
          classNames="tooltip-show"
          unmountOnExit
          >
          <div className="tooltip-show">
            {this.props.body}
          </div>
        </CSSTransition>
      </span>
    )
  }
}

export default TooltipWrapper
