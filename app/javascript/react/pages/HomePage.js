import React from 'react'
import Page from './Page'
import UserProfileContainer from '../users/UserProfileContainer'
import UserCharactersContainer from '../users/UserCharactersContainer'

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
