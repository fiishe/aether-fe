import produce from 'immer'
import makeActionCreator from '../utils/makeActionCreator'
import { fetchGet } from "../../lib/defaultFetch"

// INITIAL STATE
const initialState = {
  index: [],
  createFormIsOpen: false
}

// ACTION CREATORS
const SET_INDEX = "CAMPAIGNS/SET_INDEX"
const setCampaignsList = makeActionCreator(SET_INDEX, 'campaigns')

const ADD_CAMPAIGN = "CAMPAIGNS/ADD_CAMPAIGN_TO_INDEX"
const addCampaign = makeActionCreator(ADD_CAMPAIGN, 'campaign')

const TOGGLE_CREATE_FORM = "TOGGLE_CREATE_FORM"
const toggleCreateForm = makeActionCreator(TOGGLE_CREATE_FORM)

// REDUCER
const campaigns = (state = initialState, action) => {
  switch(action.type) {
    case SET_INDEX:
      return { ...state,
        index: action.campaigns
      }

    case ADD_CAMPAIGN:
      return produce(state, (draftState) => {
        draftState.index.push(action.campaign)
        // produce allows us to mutate draftState,
        // then immutably assigns draftState to state
        // https://immerjs.github.io/immer/docs/produce
      })

    case TOGGLE_CREATE_FORM:
      return {...state, createFormIsOpen: !state.createFormIsOpen}

    default:
      return state
  }
}

export {
  setCampaignsList,
  addCampaign,
  toggleCreateForm,
  campaigns
}
