import React from 'react'
import Enzyme from '../enzyme'
import Home from '../../../app/javascript/react/pages/Home'

describe('Home', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Home />
    )
  })

  it('should pass', () => {
    expect(1).toEqual(1)
  })
})
