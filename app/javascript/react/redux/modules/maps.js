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
  size: {
    width: mapConfig.default.mapWidth,
    height: mapConfig.default.mapHeight
  },
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
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize,
  editSelectTool,
  editSelectTileBrush,
  maps
}
