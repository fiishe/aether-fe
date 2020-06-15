import React from 'react'
import makeActionCreator from './makeActionCreator'

import TileMap, { mapConfig } from '../../../../game/models/TileMap'

const editorTools = {
  upload: 'upload',
  grid: 'grid',
  terrain: 'terrain'
}

// INITIAL STATE
const initialState = {
  map: new TileMap(mapConfig.default.mapWidth, mapConfig.default.mapHeight),
  mapWidth: mapConfig.default.mapWidth,
  mapHeight: mapConfig.default.mapHeight,
  viewWidth: mapConfig.default.mapWidth * mapConfig.default.tileSize,
  viewHeight: mapConfig.default.mapHeight * mapConfig.default.tileSize,
  image: null,
  grid: {
    alpha: mapConfig.default.gridAlpha,
    color: mapConfig.default.gridColor,
    tileSize: mapConfig.default.tileSize
  },
  editor: {
    tool: 'upload',
    tileBrush: 'plain'
  }
}

// ACTION CREATORS
const SET_IMAGE = "SET_IMAGE"
const setImage = makeActionCreator(
  SET_IMAGE,
  'newImage'
)

const ADD_TO_MAP_WIDTH = "ADD_TO_MAP_WIDTH"
const addToMapWidth = makeActionCreator(
  ADD_TO_MAP_WIDTH,
  'delta'
)
const incrementWidth = () => { return dispatch => { dispatch(addToMapWidth(1)) } }
const decrementWidth = () => { return dispatch => { dispatch(addToMapWidth(-1)) } }

const ADD_TO_MAP_HEIGHT = "ADD_TO_MAP_HEIGHT"
const addToMapHeight = makeActionCreator(
  ADD_TO_MAP_HEIGHT,
  'delta'
)
const incrementHeight = () => { return dispatch => { dispatch(addToMapHeight(1)) } }
const decrementHeight = () => { return dispatch => { dispatch(addToMapHeight(-1)) } }

const GRID_SET_ALPHA = "GRID_SET_ALPHA"
const gridSetAlpha = makeActionCreator(
  GRID_SET_ALPHA,
  'newAlpha'
)

const GRID_SET_COLOR = "GRID_SET_COLOR"
const gridSetColor = makeActionCreator(
  GRID_SET_COLOR,
  'newColor'
)

const GRID_SET_TILESIZE = "GRID_SET_TILESIZE"
const gridSetTileSize = makeActionCreator(
  GRID_SET_TILESIZE,
  'newTileSize'
)

const GRID_UPDATE = "GRID_UPDATE"
const gridUpdate = makeActionCreator(
  GRID_SET_TILESIZE,
  'diff'
)

const EDIT_SELECT_TOOL = "EDIT_SELECT_TOOL"
const editSelectTool = makeActionCreator(
  EDIT_SELECT_TOOL,
  'tool'
)

const EDIT_SELECT_TILE_BRUSH = "EDIT_SELECT_TILE_BRUSH"
const editSelectTileBrush = makeActionCreator(
  EDIT_SELECT_TILE_BRUSH,
  'tileBrush'
)

// REDUCERS
const maps = (state = initialState, action) => {
  switch(action.type) {
    case SET_IMAGE:
      return {...state, image: action.newImage }

    case ADD_TO_MAP_WIDTH:
      return {...state,
        mapWidth: state.mapWidth + action.delta,
        mapHeight: state.mapHeight,
        viewWidth: state.viewWidth + action.delta * state.grid.tileSize,
        viewHeight: state.viewHeight
      }

    case ADD_TO_MAP_HEIGHT:
      return {...state,
        mapWidth: state.mapWidth,
        mapHeight: state.mapHeight + action.delta,
        viewWidth: state.viewWidth,
        viewHeight: state.viewHeight + action.delta * state.grid.tileSize
      }

    case GRID_SET_ALPHA:
      return {...state,
        grid: {...state.grid,
          alpha: action.newAlpha
        }
      }
    case GRID_SET_COLOR:
      return {...state,
        grid: {...state.grid,
          color: action.newColor
        }
      }
    case GRID_SET_TILESIZE:
      return {...state,
        viewWidth: state.mapWidth * action.newTileSize,
        viewHeight: state.mapHeight * action.newTileSize,
        grid: {...state.grid,
          tileSize: action.newTileSize
        }
      }
    case GRID_UPDATE:
      return {...state,
        grid: Object.assign({}, state.grid, action.diff)
      }

    case EDIT_SELECT_TOOL:
      return {...state,
        editor: {...state.editor,
          tool: action.tool
        }
      }

    case EDIT_SELECT_TILE_BRUSH:
      return {...state,
        editor: {...state.editor,
          tileBrush: action.tileBrush
        }
      }
    default:
      return state
  }
}

export {
  setImage,
  incrementWidth,
  decrementWidth,
  incrementHeight,
  decrementHeight,
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize,
  editSelectTool,
  editSelectTileBrush,
  maps
}
