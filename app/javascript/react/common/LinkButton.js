import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = (props) => {
  let styleClass = "link-button " + (props.className || "")
  if (props.defaultStyle) {
    styleClass += " default"
  }
  return(
    <div className={styleClass}>
      <Link to={props.to}>
        <p>{props.children}</p>
      </Link>
    </div>
  )
}

export default LinkButton
