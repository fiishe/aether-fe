import React, { Component } from 'react';
import NewCampaignForm from '../forms/NewCampaignForm'

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
        <div onClick={this.toggle}>button here</div>
      )
    }
    else {
      return(<NewCampaignForm />)
    }
  }

  render() {
    return(
      <div>
        {this.yield()}
      </div>
    )
  }
}

export default NewCampaignButton
