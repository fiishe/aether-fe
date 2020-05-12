import makeActionCreator from './makeActionCreator'
import defaultFetch from "../../lib/defaultFetch"

// INITIAL STATE
const initialState = {
  userData: {},
  editing: false,
  isFetching: false,
  displayState: 'loading'
}

// ACTION CREATORS

const TOGGLE_PROFILE_EDIT = "TOGGLE_PROFILE_EDIT"
const toggleProfileEdit = makeActionCreator(TOGGLE_PROFILE_EDIT)

const FETCH_USER_SHOW_REQUEST = "FETCH_USER_SHOW_REQUEST"
const fetchUserShowRequest = makeActionCreator(FETCH_USER_SHOW_REQUEST)

const FETCH_USER_SHOW_SUCCESS = "FETCH_USER_SHOW_SUCCESS"
const fetchUserShowSuccess = makeActionCreator(
  FETCH_USER_SHOW_SUCCESS,
  'response'
)

const FETCH_USER_SHOW_ERROR = "FETCH_USER_SHOW_ERROR"
const fetchUserShowError = makeActionCreator(
  FETCH_USER_SHOW_ERROR,
  'error'
)

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
        console.error(error)
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
      return {...state,
        isFetching: true,
        displayState: 'loading'
      }

    case FETCH_USER_SHOW_SUCCESS:
      return {...state,
        isFetching: false,
        displayState: 'loaded',
        userData: action.response
      }

    case FETCH_USER_SHOW_ERROR:
      return {...state,
        isFetching: false,
        displayState: 'error'
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
