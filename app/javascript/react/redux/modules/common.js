import produce from 'immer'
import makeActionCreator from '../utils/makeActionCreator'

// INITIAL STATE
const initialState = {
  avMenuIsOpen: false,
  flashes: []
}

// ACTION CREATORS
const AV_MENU_OPEN = "COMMON/AV_MENU_OPEN"
const avMenuOpen = makeActionCreator(AV_MENU_OPEN)

const AV_MENU_CLOSE = "COMMON/AV_MENU_CLOSE"
const avMenuClose = makeActionCreator(AV_MENU_CLOSE)

const ADD_FLASH = "COMMON/ADD_FLASH"
const addFlash = makeActionCreator(ADD_FLASH, 'flash')

const REMOVE_FLASH = "COMMON/REMOVE_FLASH"
const removeFlash = makeActionCreator(REMOVE_FLASH)

// REDUCER
const common = (state = initialState, action) => {
  switch(action.type) {
    case AV_MENU_OPEN:
      return {...state, avMenuIsOpen: true}

    case AV_MENU_CLOSE:
      return {...state, avMenuIsOpen: false}

    case ADD_FLASH:
      return produce(state, draftState => {
        draftState.flashes.push(action.flash)
      })

    case REMOVE_FLASH:
      return produce(state, draftState => {
        draftState.flashes.shift()
      })

    default:
      return state
  }
}

export {
  avMenuOpen,
  avMenuClose,
  addFlash,
  removeFlash,
  common
}
