import React from 'react'

const Tooltip = props => {
  /*
  return(
    <span data-tooltip
      tabindex="1"
      aria-haspopup="true"
      className="has-tip"
      title={props.body}
      >
      <i className="fas fa-question-circle tooltip-icon" />
    </span>
  )
  */
  return(
    <i className="fas fa-question-circle tooltip-icon has-tip"
      data-tooltip
      aria-haspopup="true"
      title={props.body}
      />
  )
}

export default Tooltip
