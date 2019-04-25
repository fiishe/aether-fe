import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from './pages/Page'
import UserShow from './pages/UserShow'
import NotFound from './pages/NotFound'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route exact path='/' component={Page} />
      <Route path='/users/:id' component={UserShow} />
      <Route path='*' component={NotFound} />
    </Router>
  )
}

export default App
