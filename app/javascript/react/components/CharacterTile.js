import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { defaultFetch, abbreviateStats } from '../helpers'

class CharacterTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      char: this.props.character,
      expanded: false,
      detailsState: 'dormant',
      charDetails: null
    }
    this.toggleExpand = this.toggleExpand.bind(this)
    this.getDetails = this.getDetails.bind(this)
    this.renderDetails = this.renderDetails.bind(this)
  }

  toggleExpand() {
    if (this.state.detailsState == 'dormant') {
      this.setState({ detailsState: 'loading' })
      this.getDetails()
    }

    this.setState({
      expanded: !(this.state.expanded)
    })
  }

  getDetails() {
    defaultFetch(`/api/v1/characters/${this.state.char.id}`)
      .then((payload) => {
        this.setState({
          detailsState: 'loaded',
          charDetails: payload
        })
      })
      .catch(e => {
        console.error(e)
        this.setState({ detailsState: 'error' })
      })
  }

  renderDetails() {
    switch(this.state.detailsState) {
      case 'loading':
        return(
          <div className="inner loading-text">
            Loading
          </div>
        )
        break;
      case 'loaded':
        let stats = abbreviateStats(this.state.charDetails.stats)
        let statDisplay = [], i = 0

        for (var k in stats) {
          statDisplay.push(
            <div className="bar" key={i}>
              <div className="bold">{k}:</div>
              <div className="right">{stats[k]}</div>
            </div>
          )
          i += 1
        }
        return( <div className="inner">{statDisplay}</div> )
        break;
      case 'error':
        return(
          <div className="inner">
            <p>Something went wrong while loading character data. <a onClick={this.getDetails}>Click here</a> to try again.</p>
          </div>
        )
        break;
      default:
        throw new Error('renderDetails called without valid detailsState')
    }
  }

  render() {
    let char = this.state.char

    let promoSymbol
    if (char.promoted) { promoSymbol = '♔' }

    let topClass = "small-12 medium-6 large-4 columns"
    if (this.props.isLast) { topClass += " end" }

    let details
    if (this.state.expanded) { details = this.renderDetails() }

    return(
      <div className={topClass}>
        <div className="vbar char-tile">
          <div className="bar" onClick={this.toggleExpand}>
            <div className="title">
              <img src="https://i.imgur.com/sy4vvnv.png" />
            </div>
            <div className="title">
              <h6>{char.name}</h6>
              <p>Level {char.level}{char.promoSymbol} {char.class_name}</p>
            </div>
          </div>
          {details}
        </div>
      </div>
    )
  }
}

export default CharacterTile
