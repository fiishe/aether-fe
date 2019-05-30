import React from 'react';
import Form from './Form';
import { withRouter } from 'react-router-dom';
import UserShow from '../components/UserShow';

class UserEditForm extends Form {
  constructor(props) {
    super(props)
    this.state['avatar_url'] = ''
    this.state['render'] = 'loading'

    this.submitText = 'Save'
  }

  componentDidMount() {
    fetch(`/api/v1/users/me`)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        this.fields[0].placeholder = json.username
        this.setState({
          avatar_url: json.avatar_url,
          render: "loaded",
          values: {
            nick: json.nick || "",
            bio: json.bio || ""
          }
        })
      })
      .catch(e => {
        console.error(`Error while fetching user data: ${e.message}`)
        this.setState({render: "error"})
      })
  }

  getFields() {
    return [
      {
        name: "nick",
        label: "Nickname",
        tip: "2-16 characters",
        type: "text",
        maxLength: 16
      },
      {
        name: "bio",
        label: "Bio",
        tip: "max 140 characters",
        type: "textarea",
        maxLength: 140
      }
    ]
  }

  getValidations() {
    return [
      {
        message: "Nickname must be longer than 2 characters",
        check: () => {
          console.log(this.state.values);
          let len = this.state.values['nick'].length
          return (len == 0 || len >= 2)
        }
      }
    ]
  }

  submit() {
    this.fetchTo('/api/v1/users/me', 'PATCH')
    .then(res => {
      if (res.status == "fail") {
        this.addErrors(res.data.errors)
      }
      else {
        this.props.history.push("/")
      }
    })
    .catch(e => {
      console.log(`Failed to update user info: ${e.message}`);
    })
  }

  render() {
    if (this.state.render == 'loading') {
      return(
        <UserShow loading={true} />
      )
    }
    else {
      return(
        <div className="row panel">
          <div className="small-12 medium-4 columns av-container">
            <img src={this.state.avatar_url} />
          </div>
          <div className="small-12 medium-8 columns top-space">
            {this.renderForm()}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(UserEditForm)
// withRouter adds history as a prop so we can redirect by pushing to history
