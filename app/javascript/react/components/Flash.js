import React, { Component } from 'react';

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: this.props.className
    }
    this.kill = this.kill.bind(this)
  }

  componentDidMount() {
    setTimeout(this.kill, 3000)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cls: nextProps.className
    })
  }

  kill() {
    this.setState({
      cls: this.state.cls + " flash-fading"
    })
    setTimeout(this.props.remove, 800)
      // if you change the timeout duration, also change the animation-duration
      // of .flash-fading in /assets/stylesheets/blocks.scss
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

export default Flash
