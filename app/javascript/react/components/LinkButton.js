import React from 'react';
import { Link } from 'react-router';

const LinkButton = (props) => {
  return(
    <div className={props.className} id={props.idName}>
      <Link to={props.to}>
        <p className="link-button">
          {props.children}
        </p>
      </Link>
    </div>
  )
}

export default LinkButton
