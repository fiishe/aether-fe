import React from 'react';
import { Link } from 'react-router-dom';
import AvContainer from './AvContainer';
import icon from 'images/icon.png';

const TopBar = (props) => {
  return(
    <div>
      <nav className="bar">
        <div className="bar-section">
          <div className="title-container">
            <Link to="/home" className="bar">
              <img src={icon} />
              <h2>AetherFE</h2>
            </Link>
          </div>
        </div>
        <div className="bar-section right">
          <AvContainer />
        </div>
      </nav>
    </div>
  )
}

export default TopBar
