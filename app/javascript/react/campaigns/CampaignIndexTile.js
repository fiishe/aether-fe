import React from 'react'
import UserCellList, { UserCell } from '../users/UserCellList'

const CampaignIndexTile = props => {
  let campaign = props.data

  return(
    <div className="panel" {...props} >
      <div className="bar">
        <h5>{campaign.name}</h5>
        <div className="campaign-index__owner">
          <p>host</p>
          <UserCell data={campaign.owner} role="owner" />
        </div>
      </div>
      <hr />
      <UserCellList data={campaign.users} />
    </div>
  )
}

export default CampaignIndexTile
