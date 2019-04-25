import React from 'react'
import Page from './Page'

class UserShow extends Page {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
  }

  componentDidMount() {
    fetch(`/api/v1/users/me`)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${response.status} (${response.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.message) { this.setState({userData: null}) }
        else { this.setState({userData: json}) }
      })
      .catch(e => console.error(`Error while fetching user data: ${e.message}`))
  }

  yield() {
    if (!this.state.userData) {
      return(
        <div>You are not <a href="/login">logged in</a>.</div>
      )
    }
    else {
      return(
        <div className="row panel">
          <div className="small-5 medium-4 columns av-container">
            <img src={this.state.userData.avatar_url} />
          </div>
          <div className="small-7 medium-8 columns">
            <h3>{this.state.userData.nick || this.state.userData.username}</h3>
          </div>
        </div>
      )
    }
  }
}

export default UserShow
