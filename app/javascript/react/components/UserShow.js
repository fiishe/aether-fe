import React from 'react'

const UserShow = props => {
  let user = props.user
  let elems
  if (props.loading) {
    elems = {
      avatar: <div className="placeholder av-placeholder"></div>,
      username: <h3 className="placeholder">Loading</h3>,
      bio: <p className="placeholder">Loading<br />Loading</p>
    }
  }
  else {
    elems = {
      avatar: <img src={user.avatar_url} />,
      username: <h3 className="bold">{user.nick || user.username}</h3>,
      bio: <p>{user.bio}</p>
    }
  }

  return(
    <div className="row panel">
      <div className="small-5 medium-4 columns av-container">
        {elems.avatar}
      </div>
      <div className="small-7 medium-8 columns">
        {elems.username}
        {elems.bio}
      </div>
    </div>
  )
}

export default UserShow
