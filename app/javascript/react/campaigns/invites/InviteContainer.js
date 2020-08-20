import React, { Component } from 'react'
import { fetchGet, fetchPost } from '../../lib/defaultFetch'
import InviteTile from './InviteTile'
import produce from 'immer'

class NewInviteButton extends Component {
  render() {
    return(
      <button className="invite-index__create-button"
        onClick={this.props.onClick}
        >
        <i className="fas fa-plus" />
        <div className="inline-block default-margin">New invite link</div>
      </button>
    )
  }
}

class InviteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invites: []
    }

    this.handleCreateInvite = this.handleCreateInvite.bind(this)
    this.addInvite = this.addInvite.bind(this)
  }

  async componentDidMount() {
    let res = await fetchGet(
      `/api/v1/campaigns/${this.props.campaignId}/invites`
    )
    this.setState({ invites: res })
  }

  async handleCreateInvite() {
    let res = await fetchPost(
      `/api/v1/campaigns/${this.props.campaignId}/invites`,
      {}
    )
    if (res.status == "success") {
      this.addInvite(res.data.invite)
    }
  }

  addInvite(invite) {
    newInviteList = produce(this.state.invites, draft => {
      draft.push(invite)
    })

    this.setState({ invites: newInviteList })
  }

  render() {
    let invites = this.state.invites.map((inv, index) => {
      return <InviteTile token={inv.token} key={index} />
    })

    return(
      <ul className="invite-index">
        {invites}
        <NewInviteButton onClick={this.handleCreateInvite} />
      </ul>
    )
  }
}

export default InviteContainer
