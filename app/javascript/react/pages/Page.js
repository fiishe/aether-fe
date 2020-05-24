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
    this.state = {
      flashData: []
    }
    this.mountFlashes = this.mountFlashes.bind(this)
    this.addFlash = this.addFlash.bind(this)
    this.removeFlash = this.removeFlash.bind(this)
    this.renderFlashes = this.renderFlashes.bind(this)
  }

  componentDidMount() {
    this.mountFlashes()
  }

  mountFlashes() {
    let flashList = document.getElementsByClassName('flash-doc') //returns a NodeList
    let flashArr = Array.from(flashList) //to Array
    console.log(flashArr);

    let displayFlashData = flashArr.map((elem, index) => {
      let cls = elem.className.replace("flash-doc", "flash")
                  .replace("display-none","")

      flashList[index].parentNode.removeChild(flashList[index]) // prevent re-rendering on navigation
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

  renderFlashes() {
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
      <div className="flash-anchor">
        <div className="flash-container">
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
        {this.renderFlashes()}
        {this.yield()}
      </div>
    )
  }
}

export default Page
