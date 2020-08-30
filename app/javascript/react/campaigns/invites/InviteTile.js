import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFlash } from '../../redux/modules/common'
import TooltipWrapper from '../../common/TooltipWrapper'

const InviteTile = props => {
  let link = window.location.hostname + '/invites/' + props.data.token

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
    <li className="invite-index__tile">
      <div className="bar">
        <div className="bar-section">
          <TooltipWrapper body="Copy link">
            <div className="invite-index__tile__link" onClick={copyLink}>
              {link}
            </div>
          </TooltipWrapper>
          Remaining uses: {props.data.uses || '∞'}
        </div>
        <div className="bar-section-right">
          <button className="alert right"
            onClick={props.handleDelete}
            >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </li>
  )
}

export default connect(
  null,
  { createFlash }
)(InviteTile)
