import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserShow from '../pages/UserShow'
import UserEdit from '../pages/UserEdit'

const UserRouter = props => {
  return(
    <Switch>
      <Route path='/users/me/edit' component={UserEdit} />
      <Route path='/users/:id' component={UserShow} />
    </Switch>
  )
}

export default UserRouter
