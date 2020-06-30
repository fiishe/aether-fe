import React from 'react'
import Form from '../lib/Form'
import UserProfile from './UserProfile'

import { connect } from 'react-redux'

import { stripString } from '../lib/utils'
import { fetchPatch } from '../lib/defaultFetch'

import { toggleProfileEdit, updateUserData } from '../redux/modules/users'

class UserEditForm extends Form {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.state['user'] = {}

    this.submitText = 'Save'
  }

  componentDidMount() {
    const user = this.props.userData
    this.setState({
      user,
      values: {
        nick: user.nick || "",
        bio: user.bio || ""
      }
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
    let payload = { user: this.values() }
    
    fetchPatch('/api/v1/users/me', JSON.stringify(payload))
    .then(res => {
      if (res.status == "fail") {
        console.log(res.data.errors);
        this.setState({ errors: res.data.errors })
      }
      else {
        this.props.updateUserData(res.data.user) //new data from server response
        this.props.toggleProfileEdit()
      }
    })
    .catch(e => {
      console.error(e)
    })
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const fields = this.renderFields()
    const user = this.state.user
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
              <h4 className="discord-tag">
                {user.username}#{user.discriminator}
              </h4>
            </div>
            <div className="bar-section right">
              {fields[0]}
            </div>
          </div>
          <div>
            {fields[1]}
          </div>
          <div className="form-submit-container right">
            <input
              className="form-submit"
              type="submit"
              value={this.submitText || "Submit"} />
            <button
              className="button secondary small right inline"
              onClick={this.props.toggleProfileEdit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    editing: state.users.editing,
    isFetching: state.users.isFetching,
    displayState: state.users.displayState
  }
}

const mapDispatchToProps = {
  toggleProfileEdit,
  updateUserData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEditForm)
