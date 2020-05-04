import React from 'react'
import Enzyme from '../enzyme'
import HomePage from 'pages/HomePage'

describe('HomePage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <HomePage />
    )
  })

  it('should pass', () => {
    expect(1).toEqual(1)
  })

  it('should pass', () => {
    console.log(wrapper.debug());
    expect((wrapper).find('#site-title')).toExist()
  })
})
