import React from 'react'
import makeActionCreator from './makeActionCreator'

// INITIAL STATE
const initialState = {
  imageSrc: null
}

// ACTION CREATORS
const SET_IMAGE_SRC = "SET_IMAGE_SRC"
const setImageSrc = makeActionCreator(
  SET_IMAGE_SRC,
  'src'
)

// REDUCERS
const maps = (state = initialState, action) => {
  switch(action.type) {
    case SET_IMAGE_SRC:
      return {...state, imageSrc: action.src}
    default:
      return state
  }
}

export {
  setImageSrc,
  maps
}
