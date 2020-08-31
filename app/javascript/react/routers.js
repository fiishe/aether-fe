import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CampaignIndexPage from './pages/CampaignIndexPage'
import CampaignShowPage from './pages/CampaignShowPage'
import MapEditPage from './pages/MapEditPage'
import UserShowPage from './pages/UserShowPage'

const CampaignRouter = props => {
  return(
    <Switch>
      <Route exact path='/campaigns' component={CampaignIndexPage} />
      <Route path='/campaigns/:id' component={CampaignShowPage} />
    </Switch>
  )
}

const MapRouter = props => {
  return(
    <Switch>
      <Route path='/maps/new' component={MapEditPage} />
      <Route path='/maps/edit/:id' component={MapEditPage} />
    </Switch>
  )
}

const UserRouter = props => {
  return(
    <Switch>
      <Route path='/users/:id' component={UserShowPage} />
    </Switch>
  )
}

export {
  CampaignRouter,
  MapRouter,
  UserRouter
}
