import React from 'react';
import Form from './Form';
import { withRouter } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { stripString } from '../helpers'

class UserEditForm extends Form {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.state['user'] = {}
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
          user: json,
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
        message: "Nickname is too short (minimum is 2 characters)",
        check: () => {
          let len = stripString(this.state.values['nick']).length
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
      console.error(e)
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  renderForm() {
    let fields = this.renderFields()
    let user = this.state.user
    return (
      <div className="row panel">
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <div className="bar">
            <div className="bar-section av-container">
              <img src={user.avatar_url} />
            </div>
            <div className="bar-section">
              <h3 className="bold">{user.nick || user.username}</h3>
              <h4 className="discord-tag">{user.username}#{user.discriminator}</h4>
            </div>
            <div className="bar-section right">
              {fields[0]}
            </div>
          </div>
          <div>
            {fields[1]}
          </div>
          <div className="form-submit-container right">
            <input className="form-submit" type="submit" value={this.submitText || "Submit"} />
            <button className="button secondary small right inline" onClick={this.goBack}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    if (this.state.render == 'loading') {
      return(
        <UserProfile loading={true} />
      )
    }
    else {
      return this.renderForm()
    }
  }
}

export default withRouter(UserEditForm)
// withRouter adds history as a prop so we can redirect by pushing to history
