import React, { Component } from 'react'

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
    this.tipRef = React.createRef()
    this.tip = null

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
      <span className="tooltip-container"
        title={this.props.body}
        role="tooltip"
        aria-haspopup="true"
        onClick={this.toggle}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        >
        <i className="fas fa-question-circle"
          title={this.props.body}
          />
        <div className={this.state.isOpen ? '' : 'display-none'}>
          {this.props.body}
        </div>
      </span>
    )
  }
}

export default Tooltip
