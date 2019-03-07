import React from 'react'
import Layout from '../components/layout'
class Contact extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      emailid: '',
      phoneno: '',
      message: '',
      mailSent: false,
      fields: {},
      errors: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitContactForm = this.submitContactForm.bind(this)
  }

  handleChange(e) {
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({
      fields,
    })
  }

  submitContactForm(e) {
    e.preventDefault()
    if (this.validateForm()) {
      let fields = this.state.fields
      this.setState({ fields: fields })

      fetch('http://gatsbywp.dev1.in/wp-json/gatsbywp/v1/add_entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData)
          this.setState({ fields: fields, mailSent: true })
        })
        .catch(error => this.setState({ error: error.message }))
      console.log(fields)
    }
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['username']) {
      formIsValid = false
      errors['username'] = '*Please enter your username.'
    }

    if (typeof fields['username'] !== 'undefined') {
      if (!fields['username'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['username'] = '*Please enter alphabet characters only.'
      }
    }

    if (!fields['emailid']) {
      formIsValid = false
      errors['emailid'] = '*Please enter your email-ID.'
    }

    if (typeof fields['emailid'] !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      )
      if (!pattern.test(fields['emailid'])) {
        formIsValid = false
        errors['emailid'] = '*Please enter valid email-ID.'
      }
    }

    if (!fields['phoneno']) {
      formIsValid = false
      errors['phoneno'] = '*Please enter your mobile no.'
    }

    if (typeof fields['phoneno'] !== 'undefined') {
      if (!fields['phoneno'].match(/^[0-9]{10}$/)) {
        formIsValid = false
        errors['phoneno'] = '*Please enter valid mobile no.'
      }
    }

    this.setState({
      errors: errors,
    })
    return formIsValid
  }

  render() {
    return (
      <Layout>
        <div className="wrap-contact">
          <span className="contact-form-title">Contact Us</span>
          <form
            method="post"
            className="contact-form validate-form"
            name="contactForm"
            onSubmit={this.submitContactForm}
          >
            <div className="onethird">
              <label className="label-inputs">
                Name
                <span style={{ color: 'red', fontWeight: 'bold' }}> * </span>
              </label>
              <div className="wrap-inputs  validate-input">
                <input
                  type="text"
                  className="inputs"
                  name="username"
                  value={this.state.fields.username}
                  onChange={this.handleChange}
                />
                <span className="focus-inputs" />
              </div>
              <div className="errorMsg">{this.state.errors.username}</div>
            </div>
            <div className="onethird">
              <label className="label-inputs">
                Email ID
                <span style={{ color: 'red', fontWeight: 'bold' }}> * </span>
              </label>
              <div className="wrap-inputs  validate-input">
                <input
                  type="text"
                  className="inputs"
                  name="emailid"
                  value={this.state.fields.emailid}
                  onChange={this.handleChange}
                />
                <span className="focus-inputs" />
              </div>
              <div className="errorMsg">{this.state.errors.emailid}</div>
            </div>
            <div className="onethird">
              <label className="label-inputs">
                Phone No
                <span style={{ color: 'red', fontWeight: 'bold' }}> * </span>
              </label>
              <div className="wrap-inputs  validate-input">
                <input
                  type="text"
                  className="inputs"
                  name="phoneno"
                  value={this.state.fields.phoneno}
                  onChange={this.handleChange}
                />
                <span className="focus-inputs" />
              </div>
              <div className="errorMsg">{this.state.errors.phoneno}</div>
            </div>
            <label className="label-inputs">Message</label>
            <div className="wrap-inputs  validate-input">
              <textarea
                className="inputs"
                name="message"
                placeholder="Please enter your comments..."
                value={this.state.fields.message}
                onChange={this.handleChange}
              />
              <span className="focus-inputs" />
            </div>
            <div className="container-contact-form-btn">
              <button className="contact-form-btn">
                <span>Submit</span>
              </button>
            </div>
            <div className="formSuccess">
              {this.state.mailSent && (
                <div className="successMsg">Thank you for contacting us.</div>
              )}
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default Contact
