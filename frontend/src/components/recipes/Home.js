import React from 'react'
import { Link } from 'react-router-dom'
import { getAllRecipes } from '../../lib/api'

class Home extends React.Component {
  state = {
    recipes: [],
    recipe: null
  }

  async componentDidMount() {
    try {
      const res = await getAllRecipes()
      this.setState({ recipes: res.data }, () => this.chooseRandomRecipe())
    } catch (err) {
      console.log(err);
    }
  }

  chooseRandomRecipe = () => {
    const recipeId = Math.round(Math.random() * this.state.recipes.length)
    this.setState({ recipe: this.state.recipes[recipeId] })
  }


  render() {
    if (!this.state.recipes) return null
    if (!this.state.recipe) return null

    const { recipe } = this.state

    return (
      <div className="homepage">
        <section className="hero is-medium is-light is-bold is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column home-title">
                  <h1 className="title">
                    Home Cooking Collection
                </h1>
                  <h2 className="subtitle is-light">
                    For when you can't remember anything you've cooked before
                </h2>
                </div>
                <div className="column has-text-centered home-recipe">
                  <Link to={`/recipes/${recipe._id}`}>
                    <p className='recipe-title'>Why not try {recipe.name} today?</p>
                    <img className='recipe-picture' src={recipe.image} alt={recipe.name} />
                  </Link>
                  <p className='home-options'>
                    Not what you fancy? Why don't you
                      <span>
                      <button onClick={this.chooseRandomRecipe} className='try-again-btn'>Try Again</button>
                    </span>
                      or
                      <span ><Link className='link' to={'/recipes'}>View All Recipes</Link></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    )
  }
}
export default Home