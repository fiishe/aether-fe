import React, { Component } from 'react'

class Layer extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()

    this.fixScale = this.fixScale.bind(this)
  }

  componentDidMount() {
    this.canvas = this.ref.current
    this.ctx = this.canvas.getContext('2d')

    this.fixScale(this.props.width, this.props.height)
    this.props.draw(this.ctx)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.redraw) {
      this.props.redraw(this.ctx)
    }
    else {
      this.props.draw(this.ctx)
    }
  }

  fixScale(targetWidth, targetHeight) {
    let dpr = window.devicePixelRatio || 1
    if (dpr == 1) { return }

    this.canvas.width = targetWidth * dpr
    this.canvas.height = targetHeight * dpr
    this.canvas.style.width = `${targetWidth}px`
    this.canvas.style.height = `${targetHeight}px`

    this.ctx.scale(dpr, dpr)
  }

  render() {
    return(
      <canvas
        className={this.props.invisible ? 'display-none' : ''}
        id={this.props.id}
        width={this.props.width} height={this.props.height}
        ref={this.ref}
        />
    )
  }
}

export default Layer
