import React from 'react'
import Page from './Page'
import UserEditForm from '../users/UserEditForm'

class UserEditPage extends Page {
  yield() {
    return(
      <UserEditForm />
    )
  }
}

export default UserEditPage
