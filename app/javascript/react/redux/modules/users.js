const initialState = {
  userData: {},
  editing: false,
  isFetching: false
}

const TOGGLE_USER_PROFILE_EDIT = "TOGGLE_USER_PROFILE_EDIT"
const toggleUserProfileEdit = () => {
  return {
    type: TOGGLE_USER_PROFILE_EDIT
  }
}

const FETCH_USER_SHOW = "FETCH_USER_SHOW"
const fetchUserShowRequest = () => {
  return {
    type: FETCH_USER_SHOW
  }
}

const users = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_USER_PROFILE_EDIT:
      return Object.assign({}, state, { editing: !state.editing })

    default:
      return state
  }
}

export { toggleUserProfileEdit, users }
