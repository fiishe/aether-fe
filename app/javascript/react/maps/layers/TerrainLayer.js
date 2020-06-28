import React, { Component } from 'react'
import Layer from './Layer'

import { connect } from 'react-redux'
import { editResolveAction } from '../../redux/modules/maps'

import { terrainIconsArr } from 'images/terrain/terrainIcons.mjs'

class TerrainLayer extends Component {
  constructor(props) {
    super(props)

    this.draw = this.drawTerrain.bind(this)

    this.shouldHide = this.shouldHide.bind(this)
    this.drawImage = this.drawImage.bind(this)
    this.drawTerrain = this.drawTerrain.bind(this)
    this.redrawTile = this.redrawTile.bind(this)
  }

  shouldHide() {
    return this.props.currentTool != 'terrain'
  }

  drawImage(ctx, src, x, y) {
    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, x, y)
    }
    img.src = src
  }

  drawTerrain(ctx) {
    let drawTile = (x, y, tileId) => {
      let tileSize = this.props.tileSize,
          pX = x * tileSize,
          pY = y * tileSize

      this.drawImage(ctx, terrainIconsArr[tileId], pX, pY)
    }

    this.props.map.forEachTile(drawTile)
  }

  redrawTile(ctx) {
    if(!this.props.lastAction) { return }

    let pX = this.props.lastAction.x * this.props.tileSize,
        pY = this.props.lastAction.y * this.props.tileSize,
        tileId = this.props.lastAction.param

    ctx.clearRect(pX, pY, this.props.tileSize, this.props.tileSize)

    this.drawImage(ctx, terrainIconsArr[tileId], pX, pY)

    this.props.editResolveAction()
  }

  componentDidMount() {
    this.draw = this.redrawTile
  }

  render() {
    return(
      <Layer
        id="terrain-layer"
        width={this.props.width} height={this.props.height}
        draw={this.draw}
        invisible={this.shouldHide()}
        map={this.props.map}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.maps.map,
    tileSize: state.maps.grid.tileSize,
    currentTool: state.maps.editor.tool,
    lastAction: state.maps.editor.lastAction
  }
}

const mapDispatchToProps = {
  editResolveAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TerrainLayer)
