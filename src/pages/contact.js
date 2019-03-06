import React, { Component } from 'react'
import Layout from '../components/layout'

export class Contact extends Component {
  constructor() {
    super()
    this.state = {
      fname: '',
      lname: '',
      email: '',
      phone: '',
      message: '',
      mailSent: false,
      error: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // const data = new FormData(event.target)
    const data = this.state
    console.log(data)
    fetch('/api/form-submit-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(result => {
        this.setState({
          mailSent: result.data.sent,
        })
      })
      .catch(error => this.setState({ error: error.message }))
  }
  render() {
    return (
      <Layout>
        <div className="wrap-contact">
          <form
            className="contact-form validate-form"
            onSubmit={this.handleSubmit}
          >
            <span className="contact-form-title">Contact Us</span>
            <label className="label-inputs">
              Your Name{' '}
              <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
            </label>
            <div className="wrap-inputs rs1 validate-input">
              <input
                id="first-name"
                className="inputs"
                type="text"
                name="first-name"
                placeholder="First name"
                value={this.state.fname}
                onChange={e => this.setState({ fname: e.target.value })}
              />
              <span className="focus-inputs" />
            </div>
            <div className="wrap-inputs rs1 validate-input">
              <input
                className="inputs"
                type="text"
                name="last-name"
                placeholder="Last name"
                value={this.state.lname}
                onChange={e => this.setState({ lname: e.target.value })}
              />
              <span className="focus-inputs" />
              {/* <span className="btn-hide-validate">x</span> */}
            </div>
            <label className="label-inputs">
              Email Address{' '}
              <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
            </label>
            <div className="wrap-inputs validate-input">
              <input
                id="email"
                className="inputs"
                type="text"
                name="email"
                placeholder="Eg. example@email.com"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <span className="focus-inputs" />
            </div>
            <label className="label-inputs">Phone Number</label>
            <div className="wrap-inputs">
              <input
                id="phone"
                className="inputs"
                type="text"
                name="phone"
                placeholder="Eg. +1 800 000000"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
              <span className="focus-inputs" />
            </div>
            <label className="label-inputs">
              Message{' '}
              <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
            </label>
            <div className="wrap-inputs validate-input">
              <textarea
                id="message"
                className="inputs"
                name="message"
                placeholder="Please enter your comments..."
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
              />
              <span className="focus-inputs" />
            </div>
            <div className="container-contact-form-btn">
              <button className="contact-form-btn">
                <span>Submit</span>
              </button>
            </div>
            <div>
              {this.state.mailSent && <div>Thank you for contcting us.</div>}
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default Contact
