import React from 'react'
import LinkButton from './LinkButton'

const AvMenu = props => {
  return(
    <ul className="av-menu">
      <li>
        <LinkButton to="/users/me/edit">Edit profile</LinkButton>
      </li>
      <li>
        <LinkButton to="/logout">Logout</LinkButton>
      </li>
    </ul>
  )
}

export default AvMenu
