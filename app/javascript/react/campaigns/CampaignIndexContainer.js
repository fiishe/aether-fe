import React, { Component } from 'react'
import NewCampaignButton from './NewCampaignButton'
import { fetchGet } from '../lib/defaultFetch'

class CampaignIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: 'loading',
      campaigns: []
    }
    this.endpoint = `/api/v1/users/${props.userId}/campaigns`
  }

  componentDidMount() {
    fetchGet(this.endpoint)
      .then(payload => {
        this.setState({
          render: 'loaded',
          campaigns: payload.data.campaigns
        })
      })
  }

  render() {
    switch(this.state.render) {
      case 'loading':
        return(
          <div className="loading-text">Loading...</div>
        )

      case 'loaded':
        let campaigns
        if (this.state.campaigns.length < 1) {
          campaigns = (
            <p className="default-margin sneaky-text center-text">
              Join a campaign with an invite link from a friend,
              or click below to create one yourself!
            </p>
          )
        }
        else {
          campaigns = this.state.campaigns.map((campaginData, index) => {
            return(
              <div key={index}>
                {campaignData}
              </div>
            )
          })
        }

        return(
          <div>
            {campaigns}
            <NewCampaignButton />
          </div>
        )

      default:
        return(
          <div className="row panel">
            Something went wrong while retrieving data. Try reloading.
          </div>
        )
    }
  }
}

export default CampaignIndexContainer
