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
    this.domCanvas = null         // Becomes reference to canvas node
    this.mapRenderer = null       // Becomes a mapRenderer instance
    this.touchAction = () => {}   // Becomes func called when canvas is touched

    this.readImage = this.readImage.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.processImage = this.processImage.bind(this)
    this.handleDragover = this.handleDragover.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInput = this.handleFileInput.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    this.eventListeners = [
      { event: 'dragover',    func: this.handleDragover,  useCapture: true },
      { event: 'drop',        func: this.handleDrop,      useCapture: true },
      { event: 'mousedown',   func: this.handleMouseDown  },
      { event: 'mousemove',   func: this.handleMouseMove  },
      { event: 'mouseup',     func: this.handleMouseUp    },
      { event: 'touchstart',  func: this.handleTouchStart },
      { event: 'touchmove',   func: this.handleTouchMove  },
      { event: 'touchend',    func: this.handleTouchEnd   }
    ]
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

  //////////////////////////////////////////////////////////////////////////////
  // EDITING

  editTerrain(tX, tY) {
    let newTile = this.props.currentTileBrush
    let tileChanged = this.mapRenderer.map.setTile(tX, tY, newTile)

    if (tileChanged) { this.mapRenderer.draw() }
  }

  handleMouseDown(event) {
    event.preventDefault()
    // Do nothing if mapRenderer is not ready
    if (!this.mapRenderer || !this.mapRenderer.src) { return }

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

    let pX = event.layerX, pY = event.layerY      // touch coords in pixels

    let tX = this.mapRenderer.pixelsToTiles(pX),  // in tiles
        tY = this.mapRenderer.pixelsToTiles(pY)

    this.touchAction(tX, tY)
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
    this.domCanvas = this.domCanvasRef.current
    this.mapRenderer = new MapRenderer(this.domCanvas, {
      grid: this.props.grid
    })

    let canvas = this.domCanvas
    this.eventListeners.forEach(item => {
      canvas.addEventListener(item.event, item.func, item.useCapture)
    })

    canvas.onmousemove = this.handleMouseMove
    canvas.onmouseup = this.handleMouseUp

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
    this.eventListeners.forEach(item => {
      canvas.removeEventListener(item.event, item.func)
    })
  }

  render() {
    return(
      <div>
        <div className="row">
          <MapEditorToolbar />
        </div>
        <div className="row">
          <div className="scroll">
            <canvas id="map-editor" ref={this.domCanvasRef}>
              If you see this on the page, you need a better browser
            </canvas>
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
