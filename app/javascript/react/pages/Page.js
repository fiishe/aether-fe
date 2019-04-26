import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import FlashContainer from '../containers/FlashContainer';

class Page extends Component {
  // This class serves as an equivalent to a "layout" erb template.
  // Pages (components that inherit from this class) should have a yield() method
  // that returns the JSX that would typically be in their render().

  yield() {
    return(
      <div>Change me by overwriting the yield() method to return your JSX</div>
    )
  }

  render() {
    return(
      <div>
        <NavBar />
        <FlashContainer />
        {this.yield()}
      </div>
    )
  }
}

export default Page
