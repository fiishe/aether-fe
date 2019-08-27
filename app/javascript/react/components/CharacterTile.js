import React from 'react'
import { Link } from 'react-router-dom';

const CharacterTile = (props) => {
  let char = props.character

  let promoSymbol
  if (char.promoted) { promoSymbol = '♔' }

  let topClass = "small-12 medium-6 large-4 columns"
  if (props.isLast) { topClass += " end" }

  return(
    <div className={topClass}>
      <Link to="/">
        <div className="bar char-tile">
          <div>
            <img src="https://i.imgur.com/sy4vvnv.png" />
          </div>
          <div>
            <h6>{char.name}</h6>
            <p>Level {char.level}{char.promoSymbol} {char.class_name}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CharacterTile
