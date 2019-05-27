import React from 'react';
import Form from './Form';
import UserShow from '../components/UserShow';

class UserEditForm extends Form {
  constructor(props) {
    super(props)
    this.state['placeholders'] = {}
    this.state['avatar_url'] = ''
    this.state['render'] = 'loading'
    this.getPlaceholder = this.getPlaceholder.bind(this)
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
        this.setState({
          placeholders: {
            nick: json.nick || json.username,
            bio: json.bio
          },
          avatar_url: json.avatar_url,
          render: "loaded"
        })
      })
      .catch(e => {
        console.error(`Error while fetching user data: ${e.message}`)
        this.setState({render: "error"})
      })
  }

  fields() {
    return [
      {
        name: "nick",
        label: "Nickname",
        tip: "2-16 characters",
        type: "text",
        maxLength: 16,
        placeholder: this.getPlaceholder('nick')
      },
      {
        name: "bio",
        label: "Bio",
        tip: "max 140 characters",
        type: "textarea",
        maxLength: 140,
        placeholder: this.getPlaceholder('bio')
      }
    ]
  }

  getPlaceholder(fieldName) {
    try {
      return this.state.placeholders[fieldName]
    }
    catch {
      return ""
    }
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
          <div className="small-5 medium-4 columns av-container">
            <img src={this.state.avatar_url} />
          </div>
          <div className="small-7 medium-8 columns">
            {this.renderForm()}
          </div>
        </div>
      )
    }
  }
}

export default UserEditForm