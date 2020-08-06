import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => (
  <section className="hero is-fullheight-with-navbar is-light">
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title has-text-white">Oops something went wrong. Please try again
        <br />
        </p>
        <Link className='subtitle link has-text-primary' to={'/recipes'}>View All Recipes</Link>
      </div>
    </div>
  </section>
)
export default Error