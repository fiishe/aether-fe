import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserShowPage from '../pages/UserShowPage'

const UserRouter = props => {
  return(
    <Switch>
      <Route path='/users/:id' component={UserShowPage} />
    </Switch>
  )
}

export default UserRouter
