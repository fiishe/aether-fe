import React from 'react'
import Page from './Page'
import CampaignShowContainer from '../campaigns/CampaignShowContainer'

class CampaignShowPage extends Page {
  yield() {
    let id = this.props.match.params.id
    return(
      <div>
        <CampaignShowContainer id={id} />
      </div>
    )
  }
}

export default CampaignShowPage
