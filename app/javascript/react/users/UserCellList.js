import React from 'react'

const UserCell = props => {
  let user = props.data
  return(
    <li className="user-cell">
      <img src={user.avatar_url} className="user-cell__avatar" />
      <p className="user-cell__name">{user.nick || user.username}</p>
    </li>
  )
}

const UserCellList = props => {
  let users = props.data.map((user, index) => {
    return <UserCell data={user} key={index} />
  })

  return(
    <ul className="user-cells">
      {users}
    </ul>
  )
}

export default UserCellList
