import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import LinkButton from '../components/LinkButton';
import Flash from '../components/Flash';

class Page extends Component {
  // This class serves as an equivalent to a "layout" erb template.
  // Pages (components that inherit from this class) should have a yield() method
  // that returns the JSX that would typically be in their render().

  getFlashes() {
    let flashList = document.getElementsByClassName('flash-doc') //returns a NodeList
    let flashArr = Array.from(flashList) //to Array

    let dispFlashes = flashArr.map((elem, index) => {
      let cls = elem.className.replace("flash-doc", "flash")
      return(
        <Flash className={cls} key={index}>
          {elem.innerText}
        </Flash>
      )
    })
    return dispFlashes
  }

  yield() {
    return(
      <div>Change me by overwriting the yield() method to return your JSX</div>
    )
  }

  render() {
    return(
      <div>
        <NavBar />
        {this.getFlashes()}
        {this.yield()}
      </div>
    )
  }
}

export default Page
