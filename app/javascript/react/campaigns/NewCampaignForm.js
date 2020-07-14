import React, { Component } from 'react';
import Form from '../lib/Form'
import SuperForm, { SuperInput } from '../lib/SuperForm'

import { fetchPost } from '../lib/defaultFetch'
import { stripString } from '../lib/utils'

const NewCampaignForm = () => {
  return(
    <div className="panel small">
      <SuperForm
        handleSubmit={(payload) => {console.log(payload)}}
        validations={[
          {
            message: "Name is too short (minimum 2 characters)",
            check: (pl) => { return stripString(pl.name).length >= 2 }
          }
        ]}>
        <SuperInput
          label="Campaign Name" name="name"
          className={`form-input-text`}
          maxLength={32}
          type={'text'}
          />
        <div className="bar" uncontrolled={1}>
          <input
            className="button small" type="submit"
            value="Submit" uncontrolled={1}
            />
          <div
            className="button small secondary"
            onClick={() => {console.log('hi')}}>
            Cancel
          </div>
        </div>
      </SuperForm>
    </div>
  )
}

export default NewCampaignForm
