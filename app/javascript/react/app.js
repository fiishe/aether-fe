import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './pages/Home'
import UserShow from './pages/UserShow'
import NotFound from './pages/NotFound'
import NewCampaignForm from './forms/NewCampaignForm'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={() => {window.location = '/login'}} />
      <Route path='/users/:id' component={UserShow} />
      <Route path='/campaigns/new' component={NewCampaignForm} />
      <Route path='*' component={NotFound} />
    </Router>
  )
}

export default App
