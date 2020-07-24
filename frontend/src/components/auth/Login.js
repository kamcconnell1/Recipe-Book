import React from 'reactn'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

class Login extends React.Component {
  state = {
    formData: {
      username: '',
      password: ''
    }
  }

  handleChange = event => {

    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      this.setGlobal({token: res.data.token})
      this.props.history.push('/recipes')
    } catch (err) {
      console.log(err);
    }
  }

  render() {

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
                  // value={formData.username}
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
                  // value={formData.password}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}


export default Login