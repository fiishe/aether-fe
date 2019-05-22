import React from 'react';
import LinkButton from './LinkButton';

const NavBar = (props) => {
  return(
    <div>
      <nav className="no-bg">
        <div id="nav-icons">
          <LinkButton to="/home">
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
