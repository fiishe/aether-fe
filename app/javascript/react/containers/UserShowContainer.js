import React, { Component } from 'react';
import UserShow from '../components/UserShow';
import UserEditForm from '../forms/UserEditForm';

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {},
      render: "loading"
    }
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.props.userId}`)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == "fail") { throw(new Error(json.data.message)) }
        else { this.setState({render: "loaded", userData: json}) }
      })
      .catch(e => {
        console.error(`Error while fetching user data: ${e.message}`)
        this.setState({render: "error"})
      })
  }

  render() {
    switch(this.state.render) {
      case "loading":
        return(
          <UserShow loading={true} />
        )
        break
      case "loaded":
        let user = this.state.userData
        return(
          <UserShow user={this.state.userData} />
        )
        break
      default:
        return(
          <div className="row panel">Something went wrong while retrieving data. Try reloading.</div>
        )
    }
  }
}

export default UserShowContainer
