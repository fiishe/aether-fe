import React, { Component } from 'react'
import fetchGet from '../lib/defaultFetch'
import UserCellList, { UserCell } from '../users/UserCellList'

class CampaignShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: 'loading',
      campaignData: {}
    }
  }

  componentDidMount() {
    fetchGet(`/api/v1/campaigns/${this.props.id}`)
      .then(res => {
        this.setState({
          render: 'loaded',
          campaignData: res
        })
      })
      .catch(e => {
        this.setState({
          render: 'error',
          error: e.message
        })
      })
  }

  render() {
    switch(this.state.render) {
      case 'loading':
        return(
          <div className="panel">
            Loading
          </div>
        )
      case 'loaded':
        let campaign = this.state.campaignData
        let users = campaign.users,
            admins = campaign.users.filter(user => {
              return user.role == 'admin'
            }),
            members = campaign.users.filter(user => {
              return user.role == 'member'
            })
        return(
          <div className="panel campaign-show">
            <h3>{campaign.name}</h3>
            <div className="campaign-show__users-list">
              <p>host:</p>
              <UserCell data={campaign.owner} role="owner" />

              {admins.length > 0 ? <p>admins:</p> : null}
              <UserCellList data={admins} />

              {members.length > 0 ? <p>members:</p> : null}
              <UserCellList data={members} />
            </div>
          </div>
        )
      default:
        return(
          <div className="panel">
            Something went wrong.
          </div>
        )
    }
  }
}

export default CampaignShowContainer
