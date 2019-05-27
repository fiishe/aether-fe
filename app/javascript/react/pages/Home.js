import React from 'react';
import Page from './Page';
import UserShowContainer from '../containers/UserShowContainer';

class Home extends Page {
  yield() {
    return(
      <div>
        <UserShowContainer userId="me" />
      </div>
    )
  }
}

export default Home
