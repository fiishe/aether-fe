import React from 'react'
import { connect } from 'react-redux'
import LinkButton from '../common/LinkButton'

const UserProfile = props => {
  const user = props.user

  let elems
  if (props.loading) {
    elems = {
      avatar: <div className="placeholder av-placeholder" />,
      username: <h3 className="placeholder">Loading</h3>,
      discord: <h4 className="placeholder">Loading</h4>,
      bio: <p className="placeholder">Loading</p>,
      editButton: null
    }
  }
  else {
    elems = {
      avatar: <img src={user.avatar_url} />,
      username: <h3 className="bold">{user.nick || user.username}</h3>,
      discord: <h4 className="discord-tag">
        {user.username}#{user.discriminator}
        </h4>,
      bio: <p>{user.bio}</p>,
      editButton: null
    }
  }

  if (props.userId == "me") {
    elems.editButton =
      <button
        className="link-button default"
        onClick={props.toggleEdit}>
        Edit
      </button>;
  }

  return(
    <div className="row panel">
      <div className="bar">
        <div className="bar-section av-container">
          {elems.avatar}
        </div>
        <div className="bar-section name-container">
          {elems.username}
          {elems.discord}
        </div>
        <div className="bar-section right">
          {elems.editButton}
        </div>
      </div>
      <hr />
      <div>
        {elems.bio}
      </div>
    </div>
  )
}

export default UserProfile
