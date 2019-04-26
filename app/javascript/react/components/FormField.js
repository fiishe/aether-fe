import React from 'react'

const FormField = props => {
  return(
    <div className={`form-field-${props.type}`}>
      <label>
        {props.label}
        <input
          className={`form-input-${props.type}`}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

export default FormField
