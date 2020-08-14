import React, { Component } from 'react'
import fetchGet from '../../lib/defaultFetch'

const InviteTile = props => {
  let link = window.location.hostname + '/invites/' + props.token
  let copyLink = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log("Successfully copied");
      })
      .catch(() => {
        console.log("Failed to copy");
      })
  }

  return(
    <li className="invite-index__link" onClick={copyLink}>
      {link}
    </li>
  )
}

class InviteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invites: []
    }

    this.addInvite = this.addInvite.bind(this)
  }

  async componentDidMount() {
    let res = await fetchGet(
      `/api/v1/campaigns/${this.props.campaignId}/invites`
    )
    this.setState({ invites: res })
  }

  addInvite(url) {
    newInviteList = this.state.invites.slice()
    newInviteList.push(url)
    this.setState({ invites: newInviteList })
  }

  render() {
    let invites = this.state.invites.map((inv, index) => {
      return <InviteTile token={inv.token} key={index} />
    })

    return(
      <ul className="invite-index">
        {invites}
      </ul>
    )
  }
}

export default InviteContainer
