import React from 'react'
import { Link } from 'react-router-dom'

const UserCell = props => {
  let user = props.data

  return(
    <Link to={`/users/${user.id}`}>
      <li className={"user-cell " + (props.role || "")}>
        <img src={user.avatar_url} className="user-cell__avatar" />
        {props.minimize ? null :
          <p className="user-cell__name">{user.nick || user.username}</p>
        }
      </li>
    </Link>
  )
}

const UserCellList = props => {
  let users = props.data.map((user, index) => {
    return (
      <UserCell data={user}
        role={user.role}
        minimize={props.minimize}
        key={index}
        />
    )
  })

  return(
    <ul className="user-cells">
      {users}
    </ul>
  )
}

export default UserCellList
export { UserCell }
