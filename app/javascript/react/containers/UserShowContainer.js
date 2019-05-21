import React, { Component } from 'react';
import UserShow from '../components/UserShow';

class UserShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {},
      render: "loading"
    }
    this.startEditing = this.startEditing.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.props.id}`)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == "fail") {
          window.location = "/"
          this.setState({render: "not-logged-in"})
        }
        else { this.setState({render: "loaded", userData: json}) }
      })
      .catch(e => {
        console.error(`Error while fetching user data: ${e.message}`)
        this.setState({render: "error"})
      })
  }

  startEditing() {
    this.setState({render: "edit-form"})
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
          <UserShow user={this.state.userData} onClickEdit={this.startEditing} />
        )
        break
      case "edit-form":
        return(
          <div className="row panel">Editing</div>
        )
      case "not-logged-in":
        return(
          <div className="row panel">You are not <a href="/login">logged in</a>.</div>
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
