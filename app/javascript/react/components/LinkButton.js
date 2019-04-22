import React from 'react';
import { Link } from 'react-router';

const LinkButton = (props) => {
  return(
    <div>
      <Link to={props.to}>
        <p className={props.classes}>
          {props.text}
        </p>
      </Link>
    </div>
  )
}

export default LinkButton
