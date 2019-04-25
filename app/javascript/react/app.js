import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from './pages/Page'
import NotFound from './pages/NotFound'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route exact path='/' component={Page} />
      <Route path='*' component={NotFound} />
    </Router>
  )
}

export default App
