import React, { Component } from 'react';

class Flash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cls: this.props.className
    }

    this.lifespan = props.lifespan || 3000  // how long it lasts before fading
    this.killtime = props.killtime || 800   // how long it takes to fade
      // if you change killtime, also change the animation-duration
      // of .flash-fading in /assets/stylesheets/blocks.scss

    this.kill = this.kill.bind(this)
    this.timeouts = []
  }

  componentDidMount() {
    this.timeouts.push(setTimeout(this.kill, this.lifespan))
  }

  kill() {
    this.setState({
      cls: this.state.cls + " flash-fading"
    })
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

export default Flash
