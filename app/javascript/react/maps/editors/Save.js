import React from 'react'
import Form from '../../lib/Form'
import { stripString } from '../../lib/utils'
import FetchingComponent from '../../lib/FetchingComponent'
import Tooltip from '../../common/Tooltip'

import { connect } from 'react-redux'
import { editMapName } from '../../redux/modules/maps'

import { fetchPost } from '../../lib/defaultFetch'

class Save extends Form {
  constructor(props) {
    super(props)

    this.state['displayError'] = false

    this.getBackgroundImage = this.getBackgroundImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFields() {
    return [{
      name: 'mapName',
      label: 'Map name',
      tip: '2-32 characters',
      type: 'text',
      maxLength: 32,
      initialValue: this.props.mapName
    }]
  }

  getValidations() {
    return [
      {
        message: "Map name is too short (minimum 2 characters)",
        check: () => {
          let len = stripString(this.state.values['mapName']).length
          return (len >= 2)
        }
      },
      {
        message: "Map is missing a background image — drag and drop or use " +
          "the upload tool to add one",
        check: () => {
          return this.props.image.src ? true : false
        }
      }
    ]
  }

  async getBackgroundImage(name) {
    let data = await fetch(this.props.image.src).then(res => res.blob())
    return data
  }

  async handleSubmit(event) {
    event.preventDefault()

    // run front-end validations
    if (!this.validate()) { return }

    // prepare image file
    let imgBlob = await this.getBackgroundImage()
    let extension = this.props.image.fileType.split('/')[1],
        fileName = `${this.state.values['mapName']}.${extension}`
    fileName = fileName.replace(/ /g, '_')

    // create formData object
    let formData = new FormData()
    formData.set('name',       this.state.values.mapName)
    formData.set('width',      this.props.width)
    formData.set('height',     this.props.height)
    formData.set('grid_alpha', this.props.grid.alpha)
    formData.set('grid_color', this.props.grid.color)
    formData.set('tile_size',  this.props.grid.tileSize)
    formData.set('tile_data',  JSON.stringify(this.props.map.tiles))
    formData.set(
      'background_image', imgBlob, fileName
    )

    // make call to api with formData
    let res = await fetchPost(`/api/v1/maps`, formData, {
      'Accept': 'application/json'
    })

    if (res.status == 'fail') {
      console.log(res.data.errors)
      this.setState({ errors: res.data.errors })
    }
    else {
      console.log('successfully uploaded map!');
      console.log(res.data);
    }
  }

  render() {
    return(
      <div>
        <h5>
          Save
          <Tooltip body="Name the map and submit it to the server." />
        </h5>
        {this.renderErrors()}
        {this.renderFields()}
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapName: state.maps.name,
    image: state.maps.image,
    width: state.maps.mapWidth,
    height: state.maps.mapHeight,
    grid: state.maps.grid,
    map: state.maps.map
  }
}

const mapDispatchToProps = {
  editMapName
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
