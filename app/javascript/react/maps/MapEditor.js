import React, { Component } from 'react'
import MapEditorToolbar from './MapEditorToolbar'
import MapEditorView from './MapEditorView'
import MapEditorDialog from './MapEditorDialog'

import { connect } from 'react-redux'
import { setImage, editPaint } from '../redux/modules/maps'

class MapEditor extends Component {
  constructor(props) {
    super(props)
    this.touchAction = () => {}   // Becomes func called when canvas is touched

    this.mapViewRef = React.createRef()
    this.mapView = null
    this.layers = null

    this.state = {
      mouseDown: false
    }

    this.readImage = this.readImage.bind(this)
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
        this.props.setImageFile()

        let topUrl = window.webkitURL || window.URL
        let url = topUrl.createObjectURL(file) // generate blob url

        resolve(url)
      }
      catch (e) {
        reject(e)
      }
    })
  }

  processImage(file) {
    if (!file.type.match(/image.*/)) {
      console.error("The dropped file is not an image")
      return
    }

    let topUrl = window.webkitURL || window.URL
    let url = topUrl.createObjectURL(file)

    // store image src and filetype in redux store to upload later
    this.props.setImage(url, file.type)
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  handleDrop(event) {
    event.preventDefault()

    let file = event.dataTransfer.files[0]
    this.processImage(file)
  }

  handleFileInput(event) {
    event.preventDefault()

    let file = event.target.files[0]
    this.processImage(file)
  }

  //////////////////////////////////////////////////////////////////////////////
  // EDITING

  editTerrain(tX, tY) {
    let newTile = this.props.currentTileBrush
    let tileChanged = this.props.map.setTile(tX, tY, newTile)

    if (tileChanged) {
      // send signal to redraw tile
      // by changing lastAction in redux store
      this.props.editPaint(tX, tY)
    }
  }

  handleMouseDown(event) {
    event.preventDefault()

    switch(this.props.currentTool) {
      case 'terrain':
        this.touchAction = this.editTerrain
      break

      default:
        this.touchAction = () => {}
    }

    this.setState({ mouseDown: true })

    // do action once to support tap clicking
    this.handleMouseMove(event)
  }

  handleMouseMove(event) {
    event.preventDefault()
    let boundingRect = event.target.getBoundingClientRect()

    let pX = event.clientX - boundingRect.x, // touch coords in pixels
        pY = event.clientY - boundingRect.y

    let tX = parseInt(pX / this.props.tileSize),
        tY = parseInt(pY / this.props.tileSize)

    this.touchAction(tX, tY)
  }

  handleMouseUp(event) {
    event.preventDefault()
    if (!this.state.mouseDown) { return }

    this.setState({ mouseDown: false })
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
    // capture mouseup event from outside the component
    document.addEventListener('click', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleMouseUp)
  }

  render() {
    return(
      <div>
        <div className="row">
          <MapEditorToolbar />
        </div>
        <div className="row">
          <div className="scroll">
            <MapEditorView
              ref={this.mapViewRef}
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
              />
          </div>
        </div>
        <div className="row">
          <MapEditorDialog handleFileInput={this.handleFileInput} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.maps.map,
    tileSize: state.maps.grid.tileSize,
    currentTool: state.maps.editor.tool,
    currentTileBrush: state.maps.editor.tileBrush
  }
}

const mapDispatchToProps = {
  setImage,
  editPaint
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor)
