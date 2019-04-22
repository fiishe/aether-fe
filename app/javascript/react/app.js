import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from './pages/Page'

const App = props => {
  return(
    <Router history={browserHistory}>

      <Route path='/' component={Page}/>
    </Router>
  )
}

export default App
