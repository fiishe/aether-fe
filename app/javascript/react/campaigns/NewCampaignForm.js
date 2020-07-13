import React, { Component } from 'react';
import Form from '../lib/Form'
import { fetchPost } from '../lib/defaultFetch'

class NewCampaignForm extends Form {
  getFields() {
    return [
      {
        name: "name",
        label: "Name",
        type: "text"
      }
    ]
  }

  handleSubmit(event) {
    event.preventDefault()

    fetchPost(`api/v1/campaigns`, JSON.stringify(this.payload()))
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(`error in form submission: ${e.message}`)
      })
  }

  render() {
    return(
      <div className="panel">
        <h4>New Campaign</h4>
        {this.renderForm()}
      </div>
    )
  }
}

export default NewCampaignForm
