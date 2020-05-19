import React, { Component } from 'react'

import { connect } from 'react-redux'
import { setImageSrc } from '../redux/modules/maps'

class MapEditor extends Component {
  constructor(props) {
    super(props)
    this.domCanvasRef = React.createRef()
    this.domCanvas = null // Becomes reference to canvas node with all DOM props

    this.handleDragover = this.handleDragover.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.readImage = this.readImage.bind(this)
    this.draw = this.draw.bind(this)
  }

  handleDragover(event) {
    event.preventDefault()
  }

  handleDrop(event) {
    event.preventDefault()
    console.log(event.dataTransfer.files);
    this.readImage(event.dataTransfer.files[0])
  }

  readImage(file) {
    // check if file is image
    if (!file.type.match(/image.*/)) {
  		console.log("The dropped file is not an image");
  		return;
    }

    let reader = new FileReader()
    reader.onload = (event) => {
      let imgData = event.target.result // base64-encoded image
      this.loadImage(imgData)
    }
    reader.readAsDataURL(file)
  }

  loadImage(imgData) {
    this.props.setImageSrc(imgData)

    let img = new Image()
    img.src = imgData
    this.draw(img)
  }

  draw(image) {
    let ctx = this.domCanvas.getContext('2d')
    let width = this.domCanvas.width
    let height = this.domCanvas.height

    // clear canvas
    ctx.clearRect(0, 0, width, height)

    // background
    if (image) {
      ctx.drawImage(image, 0, 0)
    }
    else { // no image, default bg
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, this.domCanvas.width, this.domCanvas.height)
    }
  }

  componentDidMount() {
    this.domCanvas = this.domCanvasRef.current
    let ctx = this.domCanvas.getContext('2d')
    ctx.font = '12px Arial'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(0, 0, this.domCanvas.width, this.domCanvas.height)
    ctx.fillStyle = '#cec3be'
    ctx.fillText("Drag and drop to upload a background", 4, 16)

    this.domCanvas.addEventListener("dragover", this.handleDragover, true)
    this.domCanvas.addEventListener("drop", this.handleDrop, true)
  }

  componentWillUnmount() {
    this.domCanvas.removeEventListener("dragover", this.handleDragover)
    this.domCanvas.removeEventListener("drop", this.handleDrop)
  }

  render() {
    return(
      <div>
        <canvas id="map-editor" ref={this.domCanvasRef} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.maps.image
  }
}

const mapDispatchToProps = {
  setImageSrc
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor)
