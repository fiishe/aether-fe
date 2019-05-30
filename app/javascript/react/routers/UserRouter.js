import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserShowPage from '../pages/UserShowPage'
import UserEditPage from '../pages/UserEditPage'

const UserRouter = props => {
  return(
    <Switch>
      <Route path='/users/me/edit' component={UserEditPage} />
      <Route path='/users/:id' component={UserShowPage} />
    </Switch>
  )
}

export default UserRouter
