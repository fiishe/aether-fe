import React, { Component } from 'react'
import NewCampaignContainer from './NewCampaignContainer'
import { fetchGet } from '../lib/defaultFetch'
import { connect } from 'react-redux'

const NoCampaignsMessage = props => {
  return(
    <p className="default-margin sneaky-text center-text">
      Join a campaign with an invite link from a friend,
      or click below to create one yourself!
    </p>
  )
}

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
        let campaigns = this.state.campaigns.map((campaignData, index) => {
          return( <div key={index}>{JSON.stringify(campaignData)}</div> )
        })

        let displayNoCampaignsMsg = (
          campaigns.length < 1 && !this.props.createFormIsOpen
        )

        return(
          <div>
            {campaigns}
            {displayNoCampaignsMsg ? <NoCampaignsMessage /> : null}
            <div className="v-bar">
              <NewCampaignContainer />
            </div>
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

const mapStateToProps = state => {
  return {
    createFormIsOpen: state.campaigns.createFormIsOpen
  }
}

export default connect(
  mapStateToProps,
  null
)(CampaignIndexContainer)
