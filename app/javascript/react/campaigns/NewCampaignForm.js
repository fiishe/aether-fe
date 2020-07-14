import React, { Component } from 'react';
import Form from '../lib/Form'
import SuperForm from '../lib/SuperForm'
import { fetchPost } from '../lib/defaultFetch'

const NewCampaignForm = () => {
  return(
    <SuperForm handleSubmit={(payload) => {console.log(payload)}}>
      <input
        name="a"
        className={`form-input-text`}
        maxLength={32}
        placeholder={'bruh'}
        type={'text'}
        value={''}
      />
      <input
        name="b"
        className={`form-input-text`}
        maxLength={32}
        placeholder={'bruh'}
        type={'text'}
        value={'asdf'}
      />
      <input className="form-submit" type="submit" value="Submit" uncontrolled={1} />
    </SuperForm>
  )
}

/*
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
*/
export default NewCampaignForm
