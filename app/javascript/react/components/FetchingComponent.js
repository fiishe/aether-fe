import React, { Component } from 'react'

class FetchingComponent extends Component {
  constructor(props) {
    super(props)
    this.renderState = "loading"
  }

  componentDidMount() {
    if (!this.endpoint) { throw(new Error('target API endpoint was not set')) }

    fetch(this.endpoint)
      .then(res => {
        if(res.ok) {return res}
        else {
          let errorMessage = `${res.status} (${res.statusText})`
          throw(new Error(errorMessage))
        }
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == "fail") { throw(new Error(json.data.message)) }
        else {
          this.renderState = "loaded"
          this.fetchCompleted(json)
        }
      })
      .catch(e => {
        console.error(e)
        this.renderState = "error"
      })
  }

  fetchCompleted(response) {
    // takes JSON response from fetch and does something with it (typically setState).
    console.log(response);
  }

  yields() {
    // returns what render() should return depending on the state of the fetch.
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
