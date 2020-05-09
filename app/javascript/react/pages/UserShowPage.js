import React from 'react'
import Page from './Page'
import UserProfileContainer from '../users/UserProfileContainer'
import UserCharactersContainer from '../users/UserCharactersContainer'

class UserShowPage extends Page {
  yield() {
    let userId = this.props.match.params.id
    return(
      <div>
        <UserProfileContainer userId={userId} />
        <UserCharactersContainer userId={userId} />
      </div>
    )
  }
}

export default UserShowPage
