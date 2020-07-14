import React, { Component } from 'react';
import NewCampaignForm from './NewCampaignForm'

import { connect } from 'react-redux'
import { toggleCreateForm } from '../redux/modules/campaigns'

const NewCampaignButton = props => {
  return (
    <button onClick={props.onClick}>
      <i className="fas fa-plus" />
      <div className="inline-block default-margin">New Campaign</div>
    </button>
  )
}

const NewCampaignContainer = props => {
  if (props.createFormIsOpen) {
    return(<NewCampaignForm toggle={props.toggleCreateForm} />)
  }
  else {
    return(<NewCampaignButton onClick={props.toggleCreateForm} />)
  }
}

const mapStateToProps = state => {
  return {
    createFormIsOpen: state.campaigns.createFormIsOpen
  }
}

const mapDispatchToProps = {
  toggleCreateForm
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampaignContainer)
