import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserProfile from './UserProfile'
import UserEditForm from './UserEditForm'

import { toggleProfileEdit, fetchUserShow } from '../redux/modules/users'

class UserProfileContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserShow(this.props.userId)
  }

  render()
  {
    switch(this.props.displayState) {
      case 'loading':
        return(
          <UserProfile loading />
        )
      case 'loaded':
        return(
          <div>
            <UserProfile
              user={this.props.userData}
              userId={this.props.userId} />
          </div>
        )
      case 'editing':
        return(
          <UserEditForm userId={this.props.userId} />
        )
      case 'error':
      default:
        return(
          <div className="row panel">
            Something went wrong while retrieving data. Try reloading.
          </div>
        )
    }
  }
}

// Gain access to store via props
const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    editing: state.users.editing,
    isFetching: state.users.isFetching,
    displayState: state.users.displayState
  }
}

// Gain access to action creators
const mapDispatchToProps = {
  toggleProfileEdit,
  fetchUserShow
}

// connect returns a function that returns a wrapped UserProfileContainer
// that is subscribed to the store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileContainer)
