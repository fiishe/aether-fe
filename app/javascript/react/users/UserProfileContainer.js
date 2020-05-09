import React from 'react';
import FetchingComponent from '../lib/FetchingComponent'
import UserProfile from './UserProfile';

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
        <UserProfile user={this.state.userData} userId={this.props.userId} />,
      error:
        <div className="row panel">
          Something went wrong while retrieving data. Try reloading.
        </div>
    }
  }
}

export default UserProfileContainer
