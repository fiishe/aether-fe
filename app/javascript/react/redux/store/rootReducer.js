import { combineReducers } from 'redux'

import { common } from '../modules/common'
import { users } from '../modules/users'
import { maps } from '../modules/maps'

const rootReducer = combineReducers({
  common, // ES6 shorthand for 'common: common'
  users,
  maps
})

export default rootReducer
