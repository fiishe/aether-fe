import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'

let configureStore = () => {
  const composeWithDevTools = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )
  return store
}

export default configureStore
