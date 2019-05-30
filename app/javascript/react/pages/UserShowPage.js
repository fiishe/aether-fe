import React from 'react'
import Page from './Page'
import UserShowContainer from '../containers/UserShowContainer'

class UserShowPage extends Page {
  yield() {
    let userId = this.props.match.params.id
    return(
      <UserShowContainer userId={userId} />
    )
  }
}

export default UserShowPage
