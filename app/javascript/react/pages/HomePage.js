import React from 'react';
import Page from './Page';
import UserShowContainer from '../containers/UserShowContainer';
import UserCharactersContainer from '../containers/UserCharactersContainer';

class HomePage extends Page {
  yield() {
    return(
      <div>
        <UserShowContainer userId="me" />
        <UserCharactersContainer userId="me" />
      </div>
    )
  }
}

export default HomePage
