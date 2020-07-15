import React from 'react'
import UserCellList from '../users/UserCellList'

const CampaignIndexTile = props => {
  let campaign = props.data

  return(
    <div className="panel" {...props} >
      <h5>{campaign.name}</h5>
      <UserCellList data={campaign.users} />
    </div>
  )
}

export default CampaignIndexTile
