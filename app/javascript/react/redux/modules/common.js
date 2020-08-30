import produce from 'immer'
import makeActionCreator from '../utils/makeActionCreator'

const FLASH_LIFESPAN = 2200 // (ms) how long a flash is displayed

// INITIAL STATE
const initialState = {
  avMenuIsOpen: false,
  flashes: [],
  flashTimers: []
}

// ACTION CREATORS
const AV_MENU_OPEN = "COMMON/AV_MENU_OPEN"
const avMenuOpen = makeActionCreator(AV_MENU_OPEN)

const AV_MENU_CLOSE = "COMMON/AV_MENU_CLOSE"
const avMenuClose = makeActionCreator(AV_MENU_CLOSE)

const ADD_FLASH = "COMMON/ADD_FLASH"
const addFlash = makeActionCreator(ADD_FLASH, 'flash', 'callback', 'timeout')

const REMOVE_FLASH = "COMMON/REMOVE_FLASH"
const removeFlash = makeActionCreator(REMOVE_FLASH, 'index')

const createFlash = (flash, timeout = FLASH_LIFESPAN) => {
  return (dispatch) => {
    let callback = () => { dispatch(removeFlash()) }

    dispatch(addFlash(flash, callback, timeout))
  }
}

// REDUCER
const common = (state = initialState, action) => {
  switch(action.type) {
    case AV_MENU_OPEN:
      return {...state, avMenuIsOpen: true}

    case AV_MENU_CLOSE:
      return {...state, avMenuIsOpen: false}

    case ADD_FLASH:
      return produce(state, draftState => {
        draftState.flashes.unshift(action.flash)
        draftState.flashTimers.unshift(
          setTimeout(action.callback, action.timeout)
        )
      })

    case REMOVE_FLASH:
      return produce(state, draftState => {
        draftState.flashes.pop()
        draftState.flashTimers.pop()
      })

    default:
      return state
  }
}

export {
  FLASH_LIFESPAN,
  avMenuOpen,
  avMenuClose,
  createFlash,
  removeFlash,
  common
}
