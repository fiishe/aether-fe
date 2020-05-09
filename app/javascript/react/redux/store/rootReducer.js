import { combineReducers } from 'redux'

import { users } from '../modules/users'

const rootReducer = combineReducers({
  users // ES6 shorthand for 'users: users'
})

export default rootReducer
