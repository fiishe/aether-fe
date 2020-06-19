import React from 'react'
import FetchingComponent from '../../lib/FetchingComponent'
import Tooltip from '../../common/Tooltip'

import { connect } from 'react-redux'

class Save extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {

  }

  render() {
    return(
      <div>
        <h5>
          Save
          <Tooltip
            body="Name the map and submit it to the server."
            />
        </h5>
        <label>
          Map name
          <p>max 32 characters</p>
          <input className="form-input-text"
            type="text"name="mapname"
            placeholder=""
            maxLength="32"
            />
        </label>
      </div>
    )
  }
}

const mapDispatchToProps = {

}

export default connect(
  null,
  mapDispatchToProps
)(Save)
