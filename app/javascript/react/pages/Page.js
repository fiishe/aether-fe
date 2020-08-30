import React, { Component } from 'react';
import TopBar from '../common/TopBar';
import NavBar from '../common/NavBar';
import Flash from '../common/Flash';

class Page extends Component {
  // This class serves as an equivalent to a "layout" erb template.
  // Pages (components that inherit from this class) should have a yield() method
  // that returns the JSX that would typically be in their render().

  constructor(props) {
    super(props)
  }

  yield() {
    return(
      <div>Change me by overwriting the yield() method to return your JSX</div>
    )
  }

  render() {
    return(
      <div>
        <Flash />
        {this.yield()}
      </div>
    )
  }
}

export default Page
