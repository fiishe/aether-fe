import React from 'react';
import { Link } from 'react-router';
import getMeta from '../helpers/getMeta';

const TopBar = (props) => {
  return(
    <div>
      <nav>
        <div className="bar-section">
          <h2 id="site-title">
            <Link to="/home">AetherFE</Link>
          </h2>
        </div>
        <div className="bar-section right">
          <Link to="/users/me">
            <img id="top-av" src={getMeta("avatar_url") || "https://i.imgur.com/yC321Eb.png"} />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default TopBar
