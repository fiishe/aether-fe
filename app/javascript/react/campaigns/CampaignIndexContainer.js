import React, { Component } from 'react'
import CampaignIndexTile from './CampaignIndexTile'
import NewCampaignContainer from './NewCampaignContainer'
import { fetchGet } from '../lib/defaultFetch'
import { connect } from 'react-redux'
import { setCampaignsList } from '../redux/modules/campaigns'

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
  }

  componentDidMount() {
    fetchGet(`/api/v1/users/${this.props.userId}/campaigns`)
      .then(payload => {
        this.props.setCampaignsList(payload.data.campaigns)
        this.setState({ render: 'loaded' })
      })
  }

  render() {
    switch(this.state.render) {
      case 'loading':
        return(
          <div className="loading-text">Loading...</div>
        )

      case 'loaded':
        let campaigns = this.props.campaigns.map((campaignData, index) => {
          return( <CampaignIndexTile data={campaignData} key={index} /> )
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
    campaigns: state.campaigns.index,
    createFormIsOpen: state.campaigns.createFormIsOpen
  }
}

const mapDispatchToProps = {
  setCampaignsList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignIndexContainer)
