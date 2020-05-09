import defaultFetch from "../../lib/defaultFetch"

// INITIAL STATE
const initialState = {
  userData: {},
  editing: false,
  isFetching: false,
  displayError: false
}

// ACTION CREATORS

const TOGGLE_PROFILE_EDIT = "TOGGLE_PROFILE_EDIT"
const toggleProfileEdit = () => {
  return {
    type: TOGGLE_PROFILE_EDIT
  }
}

const FETCH_USER_SHOW_REQUEST = "FETCH_USER_SHOW_REQUEST"
const fetchUserShowRequest = () => {
  return {
    type: FETCH_USER_SHOW_REQUEST
  }
}

const FETCH_USER_SHOW_SUCCESS = "FETCH_USER_SHOW_SUCCESS"
const fetchUserShowSuccess = response => {
  return {
    type: FETCH_USER_SHOW_SUCCESS,
    response
  }
}

const FETCH_USER_SHOW_ERROR = "FETCH_USER_SHOW_ERROR"
const fetchUserShowError = error => {
  return {
    type: FETCH_USER_SHOW_ERROR,
    error
  }
}

const fetchUserShow = (userId) => {
  return (dispatch) => {
    // dispatch an action to update state + say that we are waiting for response
    dispatch(fetchUserShowRequest())

    // return a fetch request
    defaultFetch(`/api/v1/users/${userId}`)
      .then(userData => {
        // update state with the returned data
        dispatch(fetchUserShowSuccess(userData))
      })
      .catch(error => {
        // update state to render an error message
        dispatch(fetchUserShowError(error))
      })
  }
}

// REDUCER
const users = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_PROFILE_EDIT:
      return {...state, editing: true }
        // above is object spread syntax for a copy of state with our new info

    case FETCH_USER_SHOW_REQUEST:
      return {...state, isFetching: true }

    case FETCH_USER_SHOW_SUCCESS:
      return {...state,
        isFetching: false,
        userData: action.userData
      }

    case FETCH_USER_SHOW_ERROR:
      return {...state,
        isFetching: false,
        displayError: true
      }

    default:
      return state
  }
}

export {
  toggleProfileEdit,
  fetchUserShow,
  users
}
