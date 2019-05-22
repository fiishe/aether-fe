import React from 'react';
import Form from './Form';

class UserEditForm extends Form {
  fields() {
    return [
      {
        name: "nick",
        label: "Nickname",
        type: "text",
        value: "Soup"
      },
      {
        name: "bio",
        label: "Bio (max 140 characters)",
        type: "textarea",
        value: "",
        maxLength: 140
      }
    ]
  }

  render() {
    return(
      <div className="panel">
        {this.renderForm()}
      </div>
    )
  }
}

export default UserEditForm
