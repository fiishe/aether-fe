import React from 'react'
import Page from './Page'
import CampaignShowContainer from '../campaigns/CampaignShowContainer'

class HomePage extends Page {
  yield() {
    return(
      <div>
        <CampaignShowContainer />
      </div>
    )
  }
}

export default HomePage
