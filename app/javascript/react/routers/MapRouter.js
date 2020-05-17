import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MapEditPage from '../pages/MapEditPage'

const MapRouter = props => {
  return(
    <Switch>
      <Route path='/maps/new' component={MapEditPage} />
      <Route path='/maps/edit/:id' component={MapEditPage} />
    </Switch>
  )
}

export default MapRouter
