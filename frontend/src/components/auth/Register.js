import React from 'react'
import { registerUser } from '../../lib/api'
// import { setToken } from '../../lib/auth'

class Register extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(this.state.formData)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { formData, errors } = this.state

    return (
      <section className="section">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <form onSubmit={this.handleSubmit} >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${errors.username ? 'is-primary' : 'is-success' }`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={formData.username}
                  />
                </div>
                {errors.username && <small className="help is-primary">{errors.username}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${errors.email? 'is-primary' : 'is-success' }`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
                {errors.email && <small className="help is-primary">{errors.email}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${errors.password ? 'is-primary' : 'is-success' }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {errors.password && <small className="help is-primary">{errors.password}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${errors.passwordConfirmation ? 'is-primary' : 'is-success' }`}
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={formData.passwordConfirmation}
                  />
                </div>
                {errors.passwordConfirmation && <small className="help is-primary">{errors.passwordConfirmation}</small>}
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register