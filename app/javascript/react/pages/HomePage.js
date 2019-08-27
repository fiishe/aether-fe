import React from 'react';
import Page from './Page';
import UserProfileContainer from '../containers/UserProfileContainer';
import UserCharactersContainer from '../containers/UserCharactersContainer';

class HomePage extends Page {
  yield() {
    return(
      <div>
        <UserProfileContainer userId="me" />
        <UserCharactersContainer userId="me" />
      </div>
    )
  }
}

export default HomePage
