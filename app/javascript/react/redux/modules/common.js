import produce from 'immer'
import makeActionCreator from '../utils/makeActionCreator'

// INITIAL STATE
const initialState = {
  avMenuIsOpen: false,
  flash: null
}

// ACTION CREATORS
const AV_MENU_OPEN = "COMMON/AV_MENU_OPEN"
const avMenuOpen = makeActionCreator(AV_MENU_OPEN)

const AV_MENU_CLOSE = "COMMON/AV_MENU_CLOSE"
const avMenuClose = makeActionCreator(AV_MENU_CLOSE)

const SET_FLASH = "COMMON/SET_FLASH"
const setFlash = makeActionCreator(SET_FLASH, 'flash')

const CLEAR_FLASH = "COMMON/CLEAR_FLASH"
const clearFlash = makeActionCreator(CLEAR_FLASH)

// REDUCER
const common = (state = initialState, action) => {
  switch(action.type) {
    case AV_MENU_OPEN:
      return {...state, avMenuIsOpen: true}

    case AV_MENU_CLOSE:
      return {...state, avMenuIsOpen: false}

    case SET_FLASH:
      return {...state, flash: action.flash}

    case CLEAR_FLASH:
      return {...state, flash: null}

    default:
      return state
  }
}

export {
  avMenuOpen,
  avMenuClose,
  setFlash,
  clearFlash,
  common
}
