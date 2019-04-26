import React from 'react';

const Flash = props => {
  return(
    <div className={"flash " + props.className}>
      {props.children}
    </div>
  )
}

export default Flash
