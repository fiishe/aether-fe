import React, { Component } from 'react'
import MapEditorToolbar from './MapEditorToolbar'
import MapView from './MapView'
import MapEditorDialog from './MapEditorDialog'

import { connect } from 'react-redux'
import { setImage } from '../redux/modules/maps'

import MapRenderer from '../../../game/client/MapRenderer'

class MapEditor extends Component {
  constructor(props) {
    super(props)
    this.touchAction = () => {}   // Becomes func called when canvas is touched

    this.mapViewRef = React.createRef()
    this.mapView = null

    this.readImage = this.readImage.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.processImage = this.processImage.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////
  // IMAGE LOADING

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
        this.props.setImage(image)
      })
      .catch(e => {
        console.error(e)
      })
  }

  handleDragOver(event) {
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

  //////////////////////////////////////////////////////////////////////////////
  // EDITING

  editTerrain(tX, tY) {
    console.log(`${tX}, ${tY}`);
    let newTile = this.props.currentTileBrush
    let tileChanged = this.mapRenderer.map.setTile(tX, tY, newTile)

    if (tileChanged) {
      this.mapRenderer.clearGameTile(tX, tY)
      this.mapRenderer.drawTerrainMarker(tX, tY, newTile)
    }
  }

  handleMouseDown(event) {
    event.preventDefault()
    // Do nothing if mapRenderer is not ready
    if (!this.mapRenderer) { return }

    switch(this.props.currentTool) {
      case 'terrain':
        this.touchAction = this.editTerrain
      break

      default:
        this.touchAction = () => {}
    }

    // do action once to support tap clicking
    this.handleMouseMove(event)
  }

  handleMouseMove(event) {
    event.preventDefault()

    let pX = event.screenX, pY = event.screenY      // touch coords in pixels

    let tX = this.mapRenderer.pixelsToTiles(pX),  // in tiles
        tY = this.mapRenderer.pixelsToTiles(pY)

    console.log(`${tX}, ${tY}`);

    // this.touchAction(tX, tY)
  }

  handleMouseUp(event) {
    event.preventDefault()
    this.touchAction = () => {}
  }

  handleTouchStart(event) {
    this.handleMouseDown(event)
  }

  handleTouchMove(event) {
    this.handleMouseMove(event)
  }

  handleTouchEnd(event) {
    this.handleMouseUp(event)
  }

  //////////////////////////////////////////////////////////////////////////////
  // LIFECYCLE

  componentDidMount() {
    this.mapView = this.mapViewRef.current
    this.mapRenderer = this.mapView.mapRenderer

    this.mapView.onDragOver = this.handleDragOver
    this.mapView.onDrop = this.handleDrop
    this.mapView.mousedown = this.handleMouseDown
    this.mapView.mousemove = this.handleMouseMove
    this.mapView.onMouseUp = this.handleMouseUp
    this.mapView.onTouchStart = this.handleTouchStart
    this.mapView.onTouchMove = this.handleTouchMove
    this.mapView.onTouchEnd = this.handleTouchEnd
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentTool == 'terrain') {
      this.mapRenderer.drawTerrainMarkers()
    }
    else {
      this.mapRenderer.clear(this.mapRenderer.layers.game)
    }
  }

  render() {
    return(
      <div>
        <div className="row">
          <MapEditorToolbar />
        </div>
        <div className="row">
          <div className="scroll">
            <MapView ref={this.mapViewRef} />
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
  setImage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor)
