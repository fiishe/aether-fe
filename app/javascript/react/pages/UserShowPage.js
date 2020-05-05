import React from 'react'
import Page from './Page'
import UserProfileContainer from '../containers/UserProfileContainer'
import UserCharactersContainer from '../containers/UserCharactersContainer'

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
