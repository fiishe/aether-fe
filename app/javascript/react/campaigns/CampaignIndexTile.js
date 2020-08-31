import React from 'react'
import UserCellList, { UserCell } from '../users/UserCellList'
import { Link } from 'react-router-dom'

const CampaignIndexTile = props => {
  let campaign = props.data

  return(
    <div className="row panel" {...props} >
      <div className="bar">
        <Link to={`/campaigns/${campaign.id}`}>
          <h5>{campaign.name}</h5>
        </Link>
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
