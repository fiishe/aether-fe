import React, { Component } from 'react'
import { fetchGet, fetchPost, fetchDelete } from '../../lib/defaultFetch'
import InviteTile from './InviteTile'
import produce from 'immer'

import { connect } from 'react-redux'
import { setFlash } from '../../redux/modules/common'

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
    fetchPost(`/api/v1/campaigns/${this.props.campaignId}/invites`, "")
    .then((res) => {
      if (res.status == "success") {
        this.addInvite(res.data.invite)
      }
      else { throw new Error(res.data.message) }
    })
    .catch((e) => {
      this.props.setFlash("error", "Failed to create invite link; try again")
    })
  }

  addInvite(invite) {
    let newInviteList = produce(this.state.invites, draft => {
      draft.push(invite)
    })

    this.setState({ invites: newInviteList })
  }

  handleDeleteInvite(token) {
    fetchDelete(`/api/v1/invites/${token}`)
    .then((res) => {
      if (res.status == "success") {
        this.removeInvite(token)
      }
      else { throw new Error(res.data.message) }
    })
    .catch((e) => {
      this.props.setFlash("error", "Failed to delete invite; try again")
    })
  }

  removeInvite(token) {
    let newInviteList = this.state.invites.filter((inv) => inv.token != token)

    this.setState({ invites: newInviteList })
  }

  render() {
    let invites = this.state.invites.map((inv, index) => {
      return <InviteTile data={inv} key={index}
               handleDelete={ () => {this.handleDeleteInvite(inv.token)} } />
    })

    return(
      <ul className="invite-index">
        {invites}
        <NewInviteButton onClick={this.handleCreateInvite} />
      </ul>
    )
  }
}

export default connect(
  null,
  { setFlash }
)(InviteContainer)
