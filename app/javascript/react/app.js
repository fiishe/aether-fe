import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopBar from './containers/TopBar'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import UserRouter from './routers/UserRouter'
import NotFoundPage from './pages/NotFoundPage'
import NewCampaignForm from './forms/NewCampaignForm'

const App = props => {
  return(
    <BrowserRouter>
      <div>
        <div>
          <TopBar />
          <NavBar />
        </div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/home' component={HomePage} />
          <Route path='/login' component={() => {window.location = '/login'; return(<div />)}} />
          <Route path='/users' component={UserRouter} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
