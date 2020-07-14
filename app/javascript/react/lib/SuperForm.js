import React, { Component } from 'react'

/*******************************************************************************
  This component acts like a HTML <form> element but uses the state variable to
  control the input elements, the React way.
  Render as follows:

  <SuperForm
    onSubmit={(formData) => {do something with formData}}
    validations=[
      {
        message: "Username must be 16 characters or less",
        check: (payload) => { return true if the validation passes }
      }
    ]
    >
    <SuperInput
      label="Username"  // Field's label text, rendered in HTML
      tip="Max 16 chars"// Smaller helper text
      name="username"   // Field's internal name (required)
      value="Bob"       // Initial value of the field (default "")
      uncontrolled={1}  // If set, SuperForm ignores the input
      // Other props (such as className) are passed to the <input>
      />
    <input type="submit" value="Submit" uncontrolled={1} />
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
    this.validate = this.validate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderErrorMessages = this.renderErrorMessages.bind(this)
    this.renderFormFields = this.renderFormFields.bind(this)

    if (!props.children.forEach) {
      console.warn(
        "This component breaks when it has only 1 child (because it calls" +
        "props.children.map, while props.children is not an array if there is" +
        "only 1). This shouldn't usually happen because even a form with one" +
        "field will also have a submit element."
      )
    }

    // set initial values in state
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

  validate() {
    const errors = []

    // if no validations, pass by default
    if (!this.props.validations) { return true }

    this.props.validations.forEach(validation => {
      if (!validation.check(this.state.values)) {
        // add error message to list
        errors.push(validation.message)
      }
    })

    this.setState({ errors: errors })
    return(errors.length == 0)
  }

  handleSubmit() {
    event.preventDefault()

    if (this.validate()) {
      this.props.handleSubmit(this.state.values)
    }
  }

  renderErrorMessages() {
    if (this.state.errors.length == 0) { return null }
    
    const errors = this.state.errors.map((errorMsg, index) => {
      return( <li key={index}>{errorMsg}</li> )
    })

    return( <ul className="form-errors">{errors}</ul> )
  }

  renderFormFields() {
    return this.props.children.map((child, index) => {
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
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        {this.renderErrorMessages()}
        {this.renderFormFields()}
      </form>
    )
  }
}

const SuperInput = (props) => {
  return(
    <label>
      {props.label}
      <p>{props.tip}</p>
      <input {...props} />
    </label>
  )
}

export default SuperForm
export { SuperInput }
