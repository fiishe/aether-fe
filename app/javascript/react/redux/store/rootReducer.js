import { combineReducers } from 'redux'

import { campaigns } from '../modules/campaigns'
import { common } from '../modules/common'
import { users } from '../modules/users'
import { maps } from '../modules/maps'

const rootReducer = combineReducers({
  campaigns, // ES6 shorthand for 'campaigns: campaigns'
  common,
  users,
  maps
})

export default rootReducer
