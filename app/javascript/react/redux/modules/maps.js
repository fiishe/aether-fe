import makeActionCreator from './makeActionCreator'
import { fetchPost } from '../../lib/defaultFetch'

import TileMap, { mapConfig } from '../../../game/models/TileMap'

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
  name: "",
  image: null,
  grid: {
    alpha: mapConfig.default.gridAlpha,
    color: mapConfig.default.gridColor,
    tileSize: mapConfig.default.tileSize
  },
  editor: {
    tool: 'upload',
    tileBrush: 0,
    lastAction: null
  }
}

// ACTION CREATORS
const SET_IMAGE = "SET_IMAGE"
const setImage = makeActionCreator(
  SET_IMAGE,
  'newImage'
)

const CHANGE_MAP_WIDTH = "CHANGE_MAP_WIDTH"
const changeMapWidth = makeActionCreator(
  CHANGE_MAP_WIDTH,
  'delta'
)
const incrementWidth = () => { return dispatch => { dispatch(changeMapWidth(1)) } }
const decrementWidth = () => { return dispatch => { dispatch(changeMapWidth(-1)) } }

const CHANGE_MAP_HEIGHT = "CHANGE_MAP_HEIGHT"
const changeMapHeight = makeActionCreator(
  CHANGE_MAP_HEIGHT,
  'delta'
)
const incrementHeight = () => { return dispatch => { dispatch(changeMapHeight(1)) } }
const decrementHeight = () => { return dispatch => { dispatch(changeMapHeight(-1)) } }

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

const EDIT_MAP_NAME = "EDIT_MAP_NAME"
const editMapName = makeActionCreator(
  EDIT_MAP_NAME,
  'newName'
)

const EDIT_PAINT = "EDIT_PAINT"
const editPaint = makeActionCreator(
  EDIT_PAINT,
  'x',
  'y'
)

const EDIT_RESOLVE_ACTION = "EDIT_RESOLVE_ACTION"
const editResolveAction = makeActionCreator(
  EDIT_RESOLVE_ACTION
)

const UPLOAD_REQUEST = "FETCH_UPLOAD_MAP_REQUEST"
const uploadRequest = makeActionCreator(UPLOAD_REQUEST)
const UPLOAD_SUCCESS = "UPLOAD_SUCCESS"
const uploadSuccess = makeActionCreator(
  UPLOAD_SUCCESS,
  'response'
)
const UPLOAD_ERROR = "UPLOAD_ERROR"
const uploadError = makeActionCreator(
  UPLOAD_ERROR,
  'error'
)

const upload = (payload) => {
  return dispatch => {
    dispatch(uploadRequest())

    fetchPost(`/api/v1/maps/new`)
      .then(res => {
        dispatch(uploadSuccess(res))
      })
      .catch(e => {
        console.error(e)
        dispatch(uploadError(e))
      })
  }
}

// REDUCERS
const maps = (state = initialState, action) => {
  switch(action.type) {
    case SET_IMAGE:
      return {...state, image: action.newImage }

    case CHANGE_MAP_WIDTH:
      return {...state,
        mapWidth: state.mapWidth + action.delta,
        mapHeight: state.mapHeight,
        viewWidth: state.viewWidth + action.delta * state.grid.tileSize,
        viewHeight: state.viewHeight
      }

    case CHANGE_MAP_HEIGHT:
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

    case EDIT_MAP_NAME:
      return {...state,
        name: action.newName
      }

    case EDIT_PAINT:
      return {...state,
        editor: {...state.editor,
          lastAction: {
            x: action.x,
            y: action.y,
            tool: state.editor.tool,
            param: state.editor.tileBrush
          }
        }
      }

    case EDIT_RESOLVE_ACTION:
      return {...state,
        editor: {...state.editor,
          lastAction: null
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
  editMapName,
  editPaint,
  editResolveAction,
  upload,
  maps
}
