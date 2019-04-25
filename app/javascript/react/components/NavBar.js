import React from 'react';
import { Link } from 'react-router';
import LinkButton from './LinkButton';

const NavBar = (props) => {
  return(
    <div>
      <nav>
        <div className="nav-section">
          <h2 id="site-title">
            <Link to="/">AetherFE</Link>
          </h2>
        </div>
        <div className="nav-section-right">
          <LinkButton to="/login" text="Login" />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
