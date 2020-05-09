import React from 'react'
import { connect } from 'react-redux'

import FetchingComponent from '../lib/FetchingComponent'
import UserProfile from './UserProfile'
import UserEditForm from './UserEditForm'

import { toggleProfileEdit } from '../redux/modules/users'

class UserProfileContainer extends FetchingComponent {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
    this.endpoint = `/api/v1/users/${props.userId}`
  }

  fetchCompleted(json) {
    this.setState({ userData: json })
  }

  yields() {
    return {
      loading:
        <UserProfile loading />,
      loaded:
        <div>
          <UserProfile user={this.state.userData} userId={this.props.userId} />
        </div>,
      error:
        <div className="row panel">
          Something went wrong while retrieving data. Try reloading.
        </div>
    }
  }

  render()
  {
    if (this.props.editing) {
      return <UserEditForm  userId={this.props.userId} />
    }
    else {
      return this.yields()[this.renderState]
    }
  }
}

// Gain access to store via props
const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    editing: state.users.editing
  }
}

// Gain access to action (creators)
const mapDispatchToProps = {
  toggleUserProfileEdit
}

// connect returns a function that returns a wrapped UserProfileContainer
// that is subscribed to the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileContainer)
