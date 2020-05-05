import React from 'react'
import Page from './Page'
import UserEditForm from '../forms/UserEditForm'

class UserEditPage extends Page {
  yield() {
    return(
      <UserEditForm />
    )
  }
}

export default UserEditPage
