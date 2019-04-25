import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import LinkButton from '../components/LinkButton';

class Page extends Component {
  // This class serves as an equivalent to a "layout" erb template.
  // Pages (components that inherit from this class) should have a yield() method
  // that returns the JSX that would typically be in their render().

  yield() {
    return(
      <div>Hellooooo???</div>
    )
  }

  render() {
    return(
      <div>
        <NavBar />
        {this.yield()}
      </div>
    )
  }
}

export default Page
