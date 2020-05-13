import { combineReducers } from 'redux'

import { common } from '../modules/common'
import { users } from '../modules/users'

const rootReducer = combineReducers({
  common, // ES6 shorthand for 'common: common'
  users
})

export default rootReducer
