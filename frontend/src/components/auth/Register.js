import React from 'react'
import { registerUser } from '../../lib/api'
// import { setToken } from '../../lib/auth'

class Register extends React.Component {
state = {
  registerForm: {
    username: '',
    email: '', 
    password: '',
    passwordConfirmation: ''
  },
  errors: {}
}

handleChange = event => {
  // console.log(event.target.value);
  const registerForm = {...this.state.registerForm, [event.target.name]: event.target.value}
  // console.log(registerForm);
  this.setState({registerForm})
}

handleSubmit = async event => {
  event.preventDefault()
  try {
    await registerUser(this.state.registerForm)
    console.log('user registered')
    // console.log(res.data.token);
    this.props.history.push('/login')
    
    // setToken(res.data.token)
  } catch (err){
    this.setState({errors: err.response.data.errors})
  }
}

  render() {
    // console.log(this.state);
    const { registerForm } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <form onSubmit={this.handleSubmit} >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className='input is-success'
                  placeholder="Username"
                  name="username"
                onChange={this.handleChange}
                value={registerForm.username}
                />
              </div>
              </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className='input is-success'
                  placeholder="Email"
                  name="email"
                onChange={this.handleChange}
                value={registerForm.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className='input is-success'
                  type="password"
                  placeholder="Password"
                  name="password"
                onChange={this.handleChange}
                value={registerForm.password}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className='input is-success'
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                onChange={this.handleChange}
                value={registerForm.passwordConfirmation}
                />
              </div>
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