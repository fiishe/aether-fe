import React, { Component } from 'react'

/*******************************************************************************
  This component acts like a HTML <form> element but uses the state variable to
  control the input elements, the React way.
  Render as follows:

  <SuperForm onSubmit={(formData) => {do something with formData}}>
    <input
      name="username"   // Name of the field (required)
      value="Bob"       // Initial value of the field (default "")
      uncontrolled={1}  // If set, SuperForm ignores the input
      otherProps        // Passed to the input element (ie className, maxLength)
      />
  </SuperForm>
*******************************************************************************/

class SuperForm extends Component {
  constructor(props) {
    super(props)
    console.log(props.children);
    this.state = {
      values: {},
      errors: []
    }
    this.updateField = this.updateField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    props.children.forEach(child => {
      if (!child.props.uncontrolled) {
        this.state.values[child.props.name] = child.props.value || ''
      }
    })
  }

  updateField(fieldName, newValue) {
    let newValues = {...this.state.values}
    newValues[fieldName] = newValue

    this.setState({ values: newValues })
  }

  handleSubmit() {
    event.preventDefault()
    this.props.handleSubmit(this.state.values)
  }

  render() {
    const formFields = this.props.children.map((child, index) => {
      if (!React.isValidElement(child)) {
        throw new Error('SuperForm: invalid child element')
        return null
      }

      if (child.props.uncontrolled) {
        return child
      }
      else {
        // set value and attach change event handler
        return React.cloneElement(child, {
          value: this.state.values[child.props.name],
          onChange: (event) => {
            this.updateField(child.props.name, event.target.value)
          },
          key: index
        })
      }
    })

    return(
      <form onSubmit={this.handleSubmit}>
        {formFields}
      </form>
    )
  }
}

export default SuperForm
