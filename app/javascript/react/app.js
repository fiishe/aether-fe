import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Landing from './pages/Landing'
import Home from './pages/Home'
import UserShow from './pages/UserShow'
import NotFound from './pages/NotFound'
import NewCampaignForm from './forms/NewCampaignForm'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route exact path="/" component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/login' component={() => {window.location = '/login'}} />
      <Route path='/users/:id' component={UserShow} />
      <Route path='/campaigns/new' component={NewCampaignForm} />
      <Route path='*' component={NotFound} />
    </Router>
  )
}

export default App
