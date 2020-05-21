import React, { Component } from 'react'
import MapEditorToolbar from './MapEditorToolbar'

import { connect } from 'react-redux'
import { editSetImageSrc } from '../redux/modules/maps'

const IMAGE_MAX_WIDTH = 4096
const IMAGE_MAX_HEIGHT = 4096

class MapEditor extends Component {
  constructor(props) {
    super(props)
    this.domCanvasRef = React.createRef()
    this.domCanvas = null // Becomes reference to canvas node with all DOM props

    this.readImage = this.readImage.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.processImage = this.processImage.bind(this)
    this.handleDragover = this.handleDragover.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.draw = this.draw.bind(this)
  }

  readImage(file) { // resolves with base64-encoded image data
    return new Promise((resolve, reject) => {
      try {
        // check if file is image
        if (!file.type.match(/image.*/)) {
      		reject("The dropped file is not an image");
        }

        let reader = new FileReader()
        reader.onload = (event) => {
          let imgData = event.target.result // base64-encoded image
          resolve(imgData)
        }
        reader.readAsDataURL(file)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  loadImage(imgData) { // resolves with loaded image object (ready to draw)
    return new Promise((resolve, reject) => {
      try {
        this.props.editSetImageSrc(imgData)

        let img = new Image()
        img.addEventListener('load', () => {
          resolve(img)
        })
        img.src = imgData
      }
      catch (e) {
        reject(e)
      }
    })
  }

  processImage(file) {
    this.readImage(file)
      .then(imgData => this.loadImage(imgData))
      .then(image => this.draw(image))
      .catch(e => {
        console.error(e)
      })
  }

  handleDragover(event) {
    event.preventDefault()
  }

  handleDrop(event) {
    event.preventDefault()

    let imgFile = event.dataTransfer.files[0]
    this.processImage(imgFile)
  }

  handleFileInput(event) {
    event.preventDefault()

    let imgFile = event.target.files[0]
    this.processImage(imgFile)
  }

  draw(image) {
    // make canvas match image size
    if (image) {
      image.width = Math.min(image.width, IMAGE_MAX_WIDTH)
      image.height = Math.min(image.height, IMAGE_MAX_HEIGHT)
      this.domCanvas.width = Math.max(image.width, 300)
      this.domCanvas.height = Math.max(image.height, 150)
    }

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

      ctx.font = '12px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, this.domCanvas.width, this.domCanvas.height)
      ctx.fillStyle = '#cec3be'
      ctx.fillText("Drag and drop to upload a background", 4, 16)
    }
  }

  componentDidMount() {
    this.domCanvas = this.domCanvasRef.current
    this.domCanvas.addEventListener("dragover", this.handleDragover, true)
    this.domCanvas.addEventListener("drop", this.handleDrop, true)
    this.draw()
  }

  componentWillUnmount() {
    this.domCanvas.removeEventListener("dragover", this.handleDragover)
    this.domCanvas.removeEventListener("drop", this.handleDrop)
  }

  render() {
    return(
      <div>
        <div className="row">
          <MapEditorToolbar />
        </div>
        <div className="row">
          <canvas id="map-editor" ref={this.domCanvasRef} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.maps.editor
  }
}

const mapDispatchToProps = {
  editSetImageSrc
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor)
