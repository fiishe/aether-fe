import React from 'react'

const CampaignIndexTile = props => {
  let campaign = props.data
  return(
    <div className="panel" {...props} >
      <h5>{campaign.name}</h5>
    </div>
  )
}

export default CampaignIndexTile
