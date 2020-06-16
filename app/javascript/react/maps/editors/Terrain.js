import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  editSelectTileBrush
} from '../../redux/modules/maps'

import tileData from '../../../../game/models/tileData'
import terrainIcons from 'images/terrain/terrainIcons.mjs'

const TerrainSelector = props => {
  return (
    <div className="small-6 medium-3 large-2 columns" onClick={props.onClick}>
      <p className={props.isSelected ? "selected" : ""}>
        <img
          src={terrainIcons[props.name]}
          width="32px" height="32px"
          className="terrain-icon"
          id={`terrain-icon-${props.name}`} />
        {props.name}
      </p>
    </div>
  )
}

const Terrain = props => {
  let terrains = tileData.tiles // array of terrain objects

  let selectors = terrains.map((terrain, index) => {
    return (
      <TerrainSelector
        key={index}
        name={terrain.name}
        symbol={terrain.symbol}
        isSelected={props.currentTileBrush == terrain.id}
        onClick={ () => { props.editSelectTileBrush(terrain.id) } } />
    )
  })

  return (
    <div className="row">
      {selectors}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentTileBrush: state.maps.editor.tileBrush
  }
}

const mapDispatchToProps = {
  editSelectTileBrush
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terrain)
