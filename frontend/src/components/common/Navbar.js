import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'


class Navbar extends React.Component {
  state = { 
    isOpen: false
   }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleLogout = () => {
    logout() 
    this.props.history.push('/recipes')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    const { isOpen } = this.state
    
  return (
    <nav className="navbar is-dark">
    <div className="container">
    <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">
            <Link to="/recipes" className="navbar-item">Recipes</Link>
            {isAuthenticated() && <Link to="/recipes/add" className="navbar-item">Add Recipe</Link>}
        </div>
        <div className="navbar-end">
        {!isAuthenticated() &&  <Link to="/register" className="navbar-item">Register</Link>}
        {!isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
        {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item">Logout</span>}
        </div>
      </div>
    </div>
  </nav>
  )
}
}

export default withRouter(Navbar)