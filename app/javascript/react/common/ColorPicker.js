import React, { Component } from 'react'
import { BlockPicker } from 'react-color'

class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      color: props.initialColor
    }

    this.wrapperRef = React.createRef()

    this.handleClick = this.handleClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ displayColorPicker: false })
    }
  }

  handleChange(color) {
    this.setState({ color: color.hex })
    this.props.onChange(color.hex)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    let bgColor = this.state.color

    let bgStyle = {
      backgroundColor: bgColor
    }

    return (
      <div ref={this.wrapperRef}>
        <div className="color-swatch" onClick={this.handleClick}>
          <p className="color-swatch-inner" style={bgStyle}>
            {this.state.color}
          </p>
        </div>
        <div>
          {this.state.displayColorPicker ? (
            <BlockPicker color={this.state.color}
              onChangeComplete={this.handleChange}
              />
          ) : null}
        </div>
      </div>
    )
  }
}

export default ColorPicker
