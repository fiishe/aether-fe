import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFlash } from '../../redux/modules/common'
import { fetchDelete } from '../../lib/defaultFetch'

const InviteTile = props => {
  let link = window.location.hostname + '/invites/' + props.token
  let copyLink = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        props.createFlash({
          type: "success",
          message: "Copied invite link to clipboard"
        })
      })
  }

  return(
    <li className="invite-index__tile" onClick={copyLink}>
      {link}
    </li>
  )
}

export default connect(
  null,
  { createFlash }
)(InviteTile)
