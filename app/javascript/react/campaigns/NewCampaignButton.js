import React, { Component } from 'react';
import NewCampaignForm from './NewCampaignForm'

class NewCampaignButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ showForm: !(this.state.showForm) })
  }

  yield() {
    if (!this.state.showForm) {
      return(
        <button onClick={this.toggle}>
          <i className="fas fa-plus" />
          <div className="inline-block default-margin">New Campaign</div>
        </button>
      )
    }
    else {
      return(<NewCampaignForm />)
    }
  }

  render() {
    return(
      <div className="v-bar">
        {this.yield()}
      </div>
    )
  }
}

export default NewCampaignButton
