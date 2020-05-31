import React, { Component } from 'react'
import MapEditorToolbar from './MapEditorToolbar'
import MapEditorDialog from './MapEditorDialog'

import { connect } from 'react-redux'
import { editSetImageSrc } from '../redux/modules/maps'

import MapRenderer from '../../../game/client/MapRenderer'

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
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
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

  handleMouseDown(event) {
    // if (!this.mapRenderer || !this.mapRenderer.src) { return }

    let pX = event.layerX, pY = event.layerY                // in pixels
    let tileCoords = this.mapRenderer.getTileCoords(pX, pY) // in tiles

    switch(this.props.currentTool) {
      case 'terrain':
        let newTile = this.props.currentTileBrush
        this.mapRenderer.map.setTile(tileCoords.x, tileCoords.y, newTile)
        this.mapRenderer.draw()
      break

      default:
    }
  }

  handleMouseUp(event) {

  }

  componentDidMount() {
    this.domCanvas = this.domCanvasRef.current
    this.mapRenderer = new MapRenderer(this.domCanvas, {
      grid: this.props.grid
    })

    this.domCanvas.addEventListener("dragover", this.handleDragover, true)
    this.domCanvas.addEventListener("drop", this.handleDrop, true)
    this.domCanvas.onmousedown = this.handleMouseDown
    this.domCanvas.onmouseup = this.handleMouseUp

    this.mapRenderer.draw()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update mapRenderer grid if grid was changed in store
    if (prevProps.grid != this.props.grid) {
      this.mapRenderer.setGrid(this.props.grid)
    }

    // only draw terrain markers if terrain tool is selected
    this.mapRenderer.drawSettings.terrainMarkers = (
      this.props.currentTool == 'terrain'
    )

    this.mapRenderer.draw()
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
    currentTool: state.maps.editor.tool,
    currentTileBrush: state.maps.editor.tileBrush,
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
