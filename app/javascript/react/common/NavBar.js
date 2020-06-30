import React from 'react';
import LinkButton from './LinkButton';

const NavBar = (props) => {
  return(
    <div id="nav-container">
      <nav>
        <div className="nav-icons">
          <LinkButton to="/">
            <i className="fas fa-home"></i>
          </LinkButton>
          <LinkButton to="/users/3">
            <i className="fas fa-envelope"></i>
          </LinkButton>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
