import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopBar from './containers/TopBar'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import UserRouter from './routers/UserRouter'
import NotFound from './pages/NotFound'
import NewCampaignForm from './forms/NewCampaignForm'

const App = props => {
  return(
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={() => {window.location = '/login'; return(<div />)}} />
          <Route path='/users' component={UserRouter} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
