import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Redirect from './pages/Redirect'
import TopBar from './common/TopBar'
import NavBar from './common/NavBar'
import NotFoundPage from './pages/NotFoundPage'

import { CampaignRouter, MapRouter, UserRouter } from './routers'
import CampaignIndexPage from './pages/CampaignIndexPage'
import MapEditPage from './pages/MapEditPage'
import UserShowPage from './pages/UserShowPage'

const App = props => {
  return(
    <Provider store={props.store}>
      <BrowserRouter>
        <div>
          <TopBar />
          <NavBar />
          <Switch>
            <Route exact path='/' component={CampaignIndexPage} />
            <Route path='/home' component={CampaignIndexPage} />
            <Route path='/login' component={Redirect('/login')} />
            <Route path='/logout' component={Redirect('/logout')} />

            <Route path='/campaigns' component={CampaignRouter} />
            <Route path='/maps' component={MapRouter} />
            <Route path='/users' component={UserRouter} />

            <Route path='*' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
