import React from 'react'
import FetchingComponent from '../../lib/FetchingComponent'
import Tooltip from '../../common/Tooltip'

import { connect } from 'react-redux'
import { editMapName, upload } from '../../redux/modules/maps'

import { fetchPost } from '../../lib/defaultFetch'

class Save extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // use interpolation to create a new copy of the string
      // instead of a reference to it
      name: `${this.props.name}`
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    this.props.editMapName(this.state.name)

    // do fetch request etc here
  }

  render() {
    return(
      <div>
        <h5>
          Save
          <Tooltip body="Name the map and submit it to the server." />
        </h5>
        <label>
          Map name
          <p>max 32 characters</p>
          <input className="form-input-text"
            type="text"name="mapname"
            placeholder=""
            maxLength="32"
            value={this.state.name}
            onChange={this.handleChange}
            />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.maps.name,
    image: state.maps.image,
    width: state.maps.mapWidth,
    height: state.maps.mapHeight,
    grid: state.maps.grid
  }
}

const mapDispatchToProps = {
  editMapName,
  upload
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
