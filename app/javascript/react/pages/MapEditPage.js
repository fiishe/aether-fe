import React from 'react'
import Page from './Page'
import MapEditor from '../maps/MapEditor'

class MapEditPage extends Page {
  yield() {
    let mapId = this.props.match.params.id
    return(
      <div>
        <MapEditor initialMapId={mapId} />
      </div>
    )
  }
}

export default MapEditPage
