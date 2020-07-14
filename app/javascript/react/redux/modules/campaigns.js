import makeActionCreator from '../utils/makeActionCreator'
import { fetchGet } from "../../lib/defaultFetch"

// INITIAL STATE
const initialState = {
  createFormIsOpen: false
}

// ACTION CREATORS
const TOGGLE_CREATE_FORM = "TOGGLE_CREATE_FORM"
const toggleCreateForm = makeActionCreator(TOGGLE_CREATE_FORM)
/*
const FETCH_INDEX_REQUEST = "FETCH_INDEX_REQUEST"
const fetchIndexRequest = makeActionCreator(FETCH_INDEX_REQUEST)
const FETCH_INDEX_SUCCESS = "FETCH_INDEX_SUCCESS"
const fetchIndexSuccess = makeActionCreator( FETCH_INDEX_SUCCESS, 'response' )
const FETCH_INDEX_ERROR = "FETCH_INDEX_ERROR"
const fetchIndexError = makeActionCreator( FETCH_INDEX_ERROR, 'error' )

const fetchMyCampaigns = () => {
  return (dispatch) => {
    // dispatch an action to update state + say that we are waiting for response
    dispatch(fetchIndexRequest())

    // return a fetch request
    fetchGet(`/api/v1/campaigns/me`)
      .then(userData => {
        // update state with the returned data
        dispatch(fetchIndexSuccess(userData))
      })
      .catch(error => {
        // update state to render an error message
        console.error(error)
        dispatch(fetchIndexError(error))
      })
  }
}
*/

// REDUCER
const campaigns = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_CREATE_FORM:
      return {...state, createFormIsOpen: !state.createFormIsOpen}

    default:
      return state
  }
}

export {
  toggleCreateForm,
  campaigns
}
