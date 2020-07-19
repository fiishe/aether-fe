import React from 'react';
import { Link } from 'react-router-dom';
import AvContainer from './AvContainer';
import icon from 'images/icon.png';

const TopBar = (props) => {
  return(
    <nav className="top bar">
      <div className="bar-section">
        <div className="title-container">
          <Link to="/home" className="bar">
            <img src={icon} />
            <h2>Aether</h2>
          </Link>
        </div>
      </div>
      <div className="bar-section right">
        <AvContainer />
      </div>
    </nav>
  )
}

export default TopBar
