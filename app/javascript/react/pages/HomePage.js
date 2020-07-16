import React from 'react'
import Page from './Page'
import CampaignIndexContainer from '../campaigns/CampaignIndexContainer'

class HomePage extends Page {
  yield() {
    return(
      <div>
        <CampaignIndexContainer userId="me" />
      </div>
    )
  }
}

export default HomePage
