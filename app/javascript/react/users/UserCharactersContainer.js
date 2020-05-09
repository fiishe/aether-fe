import React from 'react';
import FetchingComponent from '../lib/FetchingComponent'
import CharacterTile from '../characters/CharacterTile'

class UserCharactersContainer extends FetchingComponent {
  constructor(props) {
    super(props)
    this.state = {
      characters: []
    }
    this.endpoint = `/api/v1/users/${props.userId}/characters`
  }

  fetchCompleted(json) {
    this.setState({ characters: json })
  }

  yields() {
    let charTiles
    if (this.renderState == "loaded") {
      charTiles = this.state.characters.map((charObj, i) => {
        let isLastTile = (i == this.state.characters.length - 1)
        return(
          <CharacterTile character={charObj} key={i} isLast={isLastTile} />
        )
      })
      if (charTiles.length == 0) {
        charTiles = <p>(none)</p>
      }
    }

    return {
      loading:
        <div className="row panel red-bg loading-text">Loading...</div>,
      loaded:
        <div className="row panel red-bg">
          <h5 className="light-text">Characters</h5>
          <div>
            {charTiles}
          </div>
        </div>,
      error:
        <div className="row panel">
          Something went wrong while retrieving data. Try reloading.
        </div>
    }
  }
}

export default UserCharactersContainer
