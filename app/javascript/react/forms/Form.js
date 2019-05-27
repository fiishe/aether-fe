import React, { Component } from 'react';
import getMeta from '../helpers/getMeta';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: this.fields().map(field => {field.value || ""})
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  fields() { // replace this in children
    return [
      {
        name: "firstname",
        label: "First Name",
        type: "text",
        value: ""
      },
      {
        name: "lastname",
        label: "Last Name",
        type: "text",
        value: ""
      }
    ]
  }

  getCSRFToken() {
    return getMeta('csrf-token')
  }

  payload() {
    let payload = {}
    this.fields().forEach((field, index) => {
      payload[field.name] = this.state.values[index]
    })
    return JSON.stringify(payload)
  }

  handleChange(event, index) {
    let newVals = this.state.values.splice(0) //duplicate array
    newVals[index] = event.target.value

    this.setState({ values: newVals })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(
      "Printing form's current payload() below.\n" +
      "Overwrite the handleSubmit() method to change this behavior."
    );
    console.log(this.payload());
  }

  renderFields() {
    let fields = this.fields().map((field, i) => {
      if (field.type == "textarea") {
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
                value={this.state.values[i] || ''}
                onChange={event => this.handleChange(event, i)}
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
                placeholder={field.placeholder}
                type={field.type}
                value={this.state.values[i] || ''}
                onChange={event => this.handleChange(event, i)}
              />
            </label>
          </div>
        )
      }
    })
    return fields
  }

  renderForm() {
    return(
      <form onSubmit={this.handleSubmit}>
        {this.renderFields()}
        <div className="form-submit-container">
          <input className="form-submit" type="submit" value={this.submitText || "Submit"} />
        </div>
      </form>
    )
  }

  render() {
    return(this.renderForm())
  }
}

export default Form
