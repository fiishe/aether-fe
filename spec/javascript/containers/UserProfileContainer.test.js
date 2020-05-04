import React from 'react';
import { shallow } from 'enzyme';
import UserProfileContainer from 'containers/UserProfileContainer';

const fetchMock = require("fetch-mock-jest");

describe('UserProfileContainer', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <UserProfileContainer userId="1" />
    );
  })

  const user = {
    id: 1,
    username: "fishe",
    discriminator: "7861",
    nick: null,
    avatar_url: "https://placekitten.com/128/128",
    bio: "This is a test bio."
  };
  fetchMock.get('api/v1/users/1', user);

  it('should pass', () => {
    expect(1).toEqual(1);
  });

  it('should render a UserProfile', () => {
    expect((component).find('UserProfile')).toExist();
  });
})
