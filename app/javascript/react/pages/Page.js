import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Flash from '../components/Flash';

class Page extends Component {
  // This class serves as an equivalent to a "layout" erb template.
  // Pages (components that inherit from this class) should have a yield() method
  // that returns the JSX that would typically be in their render().

  constructor(props) {
    super(props)
    this.state = {
      flashData: []
    }
    this.addFlash = this.addFlash.bind(this)
    this.removeFlash = this.removeFlash.bind(this)
    this.renderFlash = this.renderFlash.bind(this)
  }

  componentDidMount() {
    // retrieve flashes from document (rails flash method)
    let flashList = document.getElementsByClassName('flash-doc') //returns a NodeList
    let flashArr = Array.from(flashList) //to Array

    let displayFlashData = flashArr.map((elem, index) => {
      let cls = elem.className.replace("flash-doc", "flash")
      return(
        {
          cls: cls,
          text: elem.innerText
        }
      )
    })
    this.setState({flashData: displayFlashData})
  }

  addFlash(type, text) {
    let newFlash = {
      cls: `flash flash-${type}`,
      text: text
    }
    this.setState({
      flashData: this.state.flashData.concat([newFlash])
    })
  }

  removeFlash(index) {
    let target = this.state.flashData[index]
    this.setState({
      flashData: this.state.flashData.filter((flash) => {
        return flash != target
      })
    })
  }

  renderFlash() {
    let flashes
    if(this.state.flashData) {
      flashes = this.state.flashData.map((obj, index) => {
        return(
          <Flash className={obj.cls} key={index} remove={() => {this.removeFlash(index)}}>
            {obj.text}
          </Flash>
        )
      })
    }

    return(
      <div id="flash-anchor">
        <div id="flash-container">
          {flashes}
        </div>
      </div>
    )
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
        {this.renderFlash()}
        {this.yield()}
      </div>
    )
  }
}

export default Page
