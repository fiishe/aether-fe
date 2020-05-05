import React, { Component } from 'react'
import { defaultFetch } from '../helpers'

class FetchingComponent extends Component {
  constructor(props) {
    super(props)
    this.renderState = "loading"
  }

  componentDidMount() {
    if (!this.endpoint) { throw(new Error('target API endpoint was not set')) }

    defaultFetch(this.endpoint)
      .then(payload => {
        this.renderState = "loaded"
        this.fetchCompleted(payload)
      })
      .catch(e => {
        console.error(e)
        this.renderState = "error"
      })
  }

  fetchCompleted(response) {
    // "custom" lifecycle method
    // takes JSON response from fetch and does smth with it (typically setState)
    console.log(response);
  }

  yields() {
    // returns what render() should return depending on the state of the fetch
    return ({
      loading: <div>I am loading.</div>,
      loaded: <div>I have loaded.</div>,
      error: <div>Something went wrong.</div>
    })
  }

  render() {
    return this.yields()[this.renderState]
  }
}

export default FetchingComponent
