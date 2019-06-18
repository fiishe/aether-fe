import React from 'react';
import FetchingComponent from '../components/FetchingComponent'

class UserCharactersContainer extends FetchingComponent {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
    this.endpoint = `/api/v1/users/${props.userId}/characters`
  }

  fetchCompleted(json) {
    this.setState({ userData: json })
  }

  yields() {
    return {
      loading: <div>Loading...</div>,
      loaded:
        <div className="row panel red-bg">
          <h5>Characters</h5>
          {JSON.stringify(this.state.userData)}
        </div>,
      error: <div className="row panel">Something went wrong while retrieving data. Try reloading.</div>
    }
  }
}

export default UserCharactersContainer
