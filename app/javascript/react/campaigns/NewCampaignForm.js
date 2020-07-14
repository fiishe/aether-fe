import React, { Component } from 'react';
import Form from '../lib/Form'
import SuperForm, { SuperInput } from '../lib/SuperForm'

import { fetchPost } from '../lib/defaultFetch'
import { stripString } from '../lib/utils'

const NewCampaignForm = (props) => {
  return(
    <div className="panel small">
      <h4>New Campaign</h4>
      <SuperForm handleSubmit={(payload) => {console.log(payload)}}>
        <SuperInput
          label="Name" name="name"
          tip="2 - 32 characters"
          type={'text'} className={`form-input-text`}
          minLength={2} maxLength={32}
          required
          />
        <div className="bar" uncontrolled={1}>
          <input
            className="button small" type="submit"
            value="Submit" uncontrolled={1}
            />
          <div
            className="button small secondary"
            onClick={props.toggle}>
            Cancel
          </div>
        </div>
      </SuperForm>
    </div>
  )
}

export default NewCampaignForm
