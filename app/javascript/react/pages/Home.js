import React from 'react';
import Page from './Page';
import NewCampaignButton from '../components/NewCampaignButton'

class Home extends Page {
  yield() {
    return(
      <div className="row panel">
        <NewCampaignButton />
      </div>
    )
  }
}

export default Home
