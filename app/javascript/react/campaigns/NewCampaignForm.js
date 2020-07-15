import React, { Component } from 'react';
import Form from '../lib/Form'
import SuperForm, { SuperInput } from '../lib/SuperForm'

import { fetchPost } from '../lib/defaultFetch'
import { stripString } from '../lib/utils'

import { connect } from 'react-redux'
import { addCampaign } from '../redux/modules/campaigns'

const NewCampaignForm = (props) => {
  const handleSubmit = async (payload) => {
    let response = await fetchPost('/api/v1/campaigns', JSON.stringify(payload))
    return response
  }

  const handleSuccess = (res) => {
    props.addCampaign(res.data.campaign)
  }

  return(
    <div className="panel small">
      <h4>New Campaign</h4>
      <SuperForm handleSubmit={handleSubmit} handleSuccess={handleSuccess}>
        <SuperInput
          label="Name" name="name"
          tip="2 - 32 characters"
          type={'text'} className={`form-input-text`}
          minLength={2} maxLength={64}
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

const mapDispatchToProps = {
  addCampaign
}

export default connect(
  null,
  mapDispatchToProps
)(NewCampaignForm)
