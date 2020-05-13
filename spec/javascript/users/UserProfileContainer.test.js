import React from 'react'
import { shallow } from 'enzyme'
import UserProfileContainer from 'users/UserProfileContainer'

const fetchMock = require("fetch-mock-jest")

describe('UserProfileContainer', () => {
  let component
  beforeEach(() => {
    component = shallow(
      <UserProfileContainer userId="1" />
    )
  })

  const user = {
    id: 1,
    username: "fishe",
    discriminator: "7861",
    nick: null,
    avatar_url: "https://placekitten.com/128/128",
    bio: "This is a test bio."
  }
  fetchMock.get('api/v1/users/1', user)

  xtest('renders a UserProfile', () => {
    const userProfile = component.find('UserProfile')
    expect(userProfile).toExist()
    expect(userProfile).toHaveProp('loading')
  })
})
