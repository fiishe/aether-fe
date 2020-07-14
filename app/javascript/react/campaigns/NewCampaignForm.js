import React, { Component } from 'react';
import Form from '../lib/Form'
import SuperForm, { SuperInput } from '../lib/SuperForm'
import { fetchPost } from '../lib/defaultFetch'

const NewCampaignForm = () => {
  return(
    <div className="panel">
      <SuperForm
        handleSubmit={(payload) => {console.log(payload)}}
        validations={[
          {
            message: "Name must be less than 16 characters",
            check: (pl) => { return pl.name.length < 16 }
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
            className="form-submit" type="submit"
            value="Submit" uncontrolled={1}
            />
          <button
            className="secondary"
            onClick={() => {console.log('hi')}}>
            Cancel
          </button>
        </div>
      </SuperForm>
    </div>
  )
}

export default NewCampaignForm
