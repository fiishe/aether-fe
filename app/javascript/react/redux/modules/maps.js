import React from 'react'
import makeActionCreator from './makeActionCreator'

const editorTools = {
  upload: 'upload',
  grid: 'grid',
  terrain: 'terrain'
}

// INITIAL STATE
const initialState = {
  grid: {
    alpha: 100,
    color: "#000000",
    tileSize: 16
  },
  editor: {
    currentTool: 'upload',
    imageSrc: null
  }
}

// ACTION CREATORS
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

const EDIT_SET_IMAGE_SRC = "EDIT_SET_IMAGE_SRC"
const editSetImageSrc = makeActionCreator(
  EDIT_SET_IMAGE_SRC,
  'src'
)

const EDIT_SELECT_TOOL = "EDIT_SELECT_TOOL"
const editSelectTool = makeActionCreator(
  EDIT_SELECT_TOOL,
  'tool'
)

// REDUCERS
const maps = (state = initialState, action) => {
  switch(action.type) {
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
    case EDIT_SET_IMAGE_SRC:
      return {...state,
        editor: {...state.editor,
          imageSrc: action.src
        }
      }
    case EDIT_SELECT_TOOL:
      return {...state,
        editor: {...state.editor,
          currentTool: action.tool
        }
      }
    default:
      return state
  }
}

export {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize,
  editSetImageSrc,
  editSelectTool,
  maps
}
