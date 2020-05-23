import React, { Component } from 'react'
import MapEditorToolbar from './MapEditorToolbar'
import MapEditorDialog from './MapEditorDialog'
import mapRenderer from './mapRenderer'

import { connect } from 'react-redux'
import { editSetImageSrc } from '../redux/modules/maps'

class MapEditor extends Component {
  constructor(props) {
    super(props)
    this.domCanvasRef = React.createRef()
    this.domCanvas = null // Becomes reference to canvas node with all DOM props
    this.mapRenderer = null // Becomes a mapRenderer instance

    this.readImage = this.readImage.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.processImage = this.processImage.bind(this)
    this.handleDragover = this.handleDragover.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
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
      .then(image => {
        this.mapRenderer.setBackground(image)
        this.mapRenderer.draw()
      })
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

  componentDidMount() {
    this.domCanvas = this.domCanvasRef.current
    this.domCanvas.addEventListener("dragover", this.handleDragover, true)
    this.domCanvas.addEventListener("drop", this.handleDrop, true)

    this.mapRenderer = new mapRenderer(this.domCanvas, {
      grid: this.props.grid
    })
    this.mapRenderer.draw()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.grid != this.props.grid) {
      this.mapRenderer.setGrid(this.props.grid)
      this.mapRenderer.draw()
    }
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
          <div className="scroll">
            <canvas id="map-editor" ref={this.domCanvasRef} />
          </div>
          <MapEditorDialog handleFileInput={this.handleFileInput} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    grid: state.maps.grid
  }
}

const mapDispatchToProps = {
  editSetImageSrc
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor)
