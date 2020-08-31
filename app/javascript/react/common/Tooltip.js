import React, { Component } from 'react'
import TooltipWrapper from './TooltipWrapper'

const Tooltip = (props) => {
  return(
    <TooltipWrapper className="tooltip-circle" body={props.body}>
      <i className="fas fa-question-circle"
        aria-label={props.body}
        />
    </TooltipWrapper>
  )
}

export default Tooltip
