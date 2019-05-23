import React from 'react';
import { Link } from 'react-router';
import getMeta from '../helpers/getMeta';
import icon from 'images/icon.png';

const TopBar = (props) => {
  return(
    <div>
      <nav>
        <div className="bar-section">
          <div id="title-container">
            <Link to="/home">
              <img src={icon} />
              <h2>AetherFE</h2>
            </Link>
          </div>
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
