import makeActionCreator from '../utils/makeActionCreator'

// INITIAL STATE
const initialState = {
  avMenuIsOpen: false
}

// ACTION CREATORS
const AV_MENU_OPEN = "AV_MENU_OPEN"
const avMenuOpen = makeActionCreator(AV_MENU_OPEN)

const AV_MENU_CLOSE = "AV_MENU_CLOSE"
const avMenuClose = makeActionCreator(AV_MENU_CLOSE)

// REDUCER
const common = (state = initialState, action) => {
  switch(action.type) {
    case AV_MENU_OPEN:
      return {...state, avMenuIsOpen: true}

    case AV_MENU_CLOSE:
      return {...state, avMenuIsOpen: false}

    default:
      return state
  }
}

export {
  avMenuOpen,
  avMenuClose,
  common
}
