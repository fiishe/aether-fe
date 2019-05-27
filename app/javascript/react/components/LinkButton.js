import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
  return(
    <div className={props.className} className={props.idName}>
      <Link to={props.to}>
        <p className="link-button">
          {props.children}
        </p>
      </Link>
    </div>
  )
}

export default LinkButton
