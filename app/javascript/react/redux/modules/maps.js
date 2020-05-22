import React from 'react'
import makeActionCreator from './makeActionCreator'

const editorTools = {
  upload: 'upload',
  grid: 'grid'
}

// INITIAL STATE
const initialState = {
  grid: {
    alpha: 100,
    color: "#000000",
    tileSize: 16
  },
  editor: {
    currentTool: null,
    imageSrc: null
  }
}

// ACTION CREATORS
const GRID_SET = "GRID_SET"
const gridSet = makeActionCreator(
  GRID_SET,
  'newGridState'
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
    case GRID_SET:
      return {...state,
        grid: action.newGridState
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
  gridUpdate,
  editSetImageSrc,
  editSelectTool,
  maps
}
