import React from 'react'
import Page from './Page'
import UserShowContainer from '../containers/UserShowContainer'

class UserShow extends Page {
  yield() {
    return(
      <UserShowContainer id={this.props.params.id} />
    )
  }
}

export default UserShow
