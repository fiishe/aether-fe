import React, { Component } from 'react';
import FormField from '../components/FormField';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: this.fields().map(field => {field.value})
    }
  }

  fields() {
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

  payload() {
    debugger
    let values = this.state.fields.map(field => {
      return {

      }
    })
    return values
  }

  handleChange(event, index) {
    let newVals = this.state.values.splice(0) //duplicate array
    newVals[index] = event.target.value

    this.setState({ values: newVals })
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = JSON.stringify(this.state.fields)
  }

  render() {
    let fields = this.fields().map((field, i) => {
      return(
        <FormField
          label={field.label}
          type={field.type}
          value={this.state.values[i]}
          onChange={(event) => handleChange(event, i)}
        />
      )
    })

    return(
      <form onSubmit={this.handleSubmit}>
        {fields}
        <input className="form-submit" type="submit" value="Submit" />
      </form>
    )
  }
}

export default Form
