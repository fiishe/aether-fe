import React, { Component } from 'react';

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: props.className
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({cls: this.props.className + " flash-clicked"})
    setTimeout(() => { this.setState({cls: "flash-end"}) }, 800) //ms
  }

  render() {
    return(
      <div className={this.state.cls} onClick={this.handleClick}>
        <p>{this.props.children}</p>
        <i className="fas fa-times"></i>
      </div>
    )
  }
}

export default Flash
