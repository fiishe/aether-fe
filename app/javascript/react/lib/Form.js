import React, { Component } from 'react'
import { fetchPost, fetchPatch } from './defaultFetch'

class Form extends Component {
  constructor(props) {
    super(props)
    this.fields = this.getFields()
    this.validations = this.getValidations()

    this.submitText = "Submit"

    let initialValues = {}
    this.fields.forEach(field => {
      initialValues[field.name] = field.value || ""
    })

    this.state = {
      values: initialValues,
      errors: []
    }

    this.getFields = this.getFields.bind(this)
    this.getValidations = this.getValidations.bind(this)
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.renderErrors = this.renderErrors.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.fetchSendPayload = this.fetchSendPayload.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
  }

  getFields() { // replace this in children
    return [
      {
        name: "firstname",
        label: "First Name",
        type: "text"
      },
      {
        name: "lastname",
        label: "Last Name",
        type: "text"
      }
    ]
  }

  getValidations() {
    return [
      {
        message: "First name must be less than 16 characters",
        check: () => {return (this.payload().firstname.length < 16)}
      }
    ]
  }

  values() {
    return this.state.values
  }

  payload() {
    let payload = JSON.parse(JSON.stringify(this.state.values))
    for (var key in payload) {
      if (payload[key] == "") { payload[key] = null }
    }
    return JSON.stringify(payload)
  }

  validate() {
    let isValid = true
    let errorList = []
    this.validations.forEach(validation => {
      if (validation.check && !validation.check()) {
        errorList.push(validation.message)
        isValid = false
      }
    })
    this.setState({ errors: errorList })
    return isValid
  }

  handleChange(event, key) {
    let newVals = JSON.parse(JSON.stringify(this.state.values)) //duplicate obj
    newVals[key] = event.target.value

    this.setState({ values: newVals })
    this.onFormChange()
  }

  onFormChange() {
    // overwrite this method to do something when a field changes
  }

  handleSubmit(event) {
    event.preventDefault()

    let isValid = this.validate()
    if (!isValid) { return }

    this.submit()
  }

  submit() {
    console.log(
      "Printing form's current payload() below.\n" +
      "Overwrite the submit() method to change this behavior."
    );
    console.log(this.payload());
  }

  renderFields() {
    let fields = this.fields.map((field, i) => {
      if (field.customJSX) {
        return field.customJSX
      }
      else if (field.type == "textarea") {
        return(
          <div className={'form-field-textarea'} key={i}>
            <label>
              {field.label}
              <p>{field.tip}</p>
              <textarea
                className={'form-field-textarea'}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                required={false}
                value={this.state.values[field.name] || ''}
                onChange={event => this.handleChange(event, field.name)}
              />
            </label>
          </div>
        )
      }
      else {
        return(
          <div className={`form-field-${field.type}`} key={i}>
            <label>
              {field.label}
              <p>{field.tip}</p>
              <input
                className={`form-input-${field.type}`}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                type={field.type}
                value={this.state.values[field.name] || ''}
                onChange={event => this.handleChange(event, field.name)}
              />
            </label>
          </div>
        )
      }
    })
    return fields
  }

  renderErrors() {
    let errorList = this.state.errors
    if (errorList.length > 0) {
      let errors = errorList.map((error, i) => {
        return(
          <li key={i}>{error}</li>
        )
      })

      return(
        <ul className="form-errors">
          {errors}
        </ul>
      )
    }
    else {
      return null
    }
  }

  renderForm() {
    return(
      <div>
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          {this.renderFields()}
          <div className="form-submit-container">
            <input className="form-submit" type="submit" value={this.submitText || "Submit"} />
          </div>
        </form>
      </div>
    )
  }

  fetchSendPayload(endpoint, method) {
    let fetchReq = fetchPost
    if (method == 'PATCH') { fetchReq = fetchPatch }

    return new Promise((resolve, reject) => {
      fetchReq(endpoint, this.payload())
      .then(json => { resolve(json) })
      .catch(error => {
        reject(error)
      })
    })
  }

  isEmpty() {
    for (var fieldName in this.state.values) {
      if (this.state.values[fieldName]) {return false}
    }
    return true
  }

  render() {
    return(this.renderForm())
  }
}

export default Form
