import React, { Component } from 'react';
import Flash from '../components/Flash';

class FlashContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flashData: []
    }
    this.addFlash = this.addFlash.bind(this)
    this.removeFlash = this.removeFlash.bind(this)
  }

  componentDidMount() {
    // retrieve flashes from document (from rails flash method)
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

  render() {
    let flashes = this.state.flashData.map((obj, index) => {
      return(
        <Flash className={obj.cls} key={index} remove={() => {this.removeFlash(index)}}>
          {obj.text}
        </Flash>
      )
    })

    return(
      <div id="flash-anchor">
        <div id="flash-container">
          {flashes}
          <div onClick={() => {this.addFlash("success", "helloooo")}}>hhh</div>
        </div>
      </div>
    )
  }
}

export default FlashContainer
