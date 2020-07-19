import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Redirect from './pages/Redirect'
import TopBar from './common/TopBar'
import NavBar from './common/NavBar'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import UserShowPage from './pages/UserShowPage'
import MapEditPage from './pages/MapEditPage'

const UserRouter = props => {
  return(
    <Switch>
      <Route path='/users/:id' component={UserShowPage} />
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

const App = props => {
  return(
    <Provider store={props.store}>
      <BrowserRouter>
        <div>
          <TopBar />
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/home' component={HomePage} />
            <Route path='/login' component={Redirect('/login')} />
            <Route path='/logout' component={Redirect('/logout')} />
            <Route path='/users' component={UserRouter} />
            <Route path='/maps' component={MapRouter} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
