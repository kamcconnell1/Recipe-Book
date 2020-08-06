import React from 'reactn'
import { getAllRecipes } from '../../lib/api'

import SearchForm from '../common/SearchForm'
import Dropdown from '../common/Dropdown'
import RecipeCard from './RecipeCard'

class RecipeIndex extends React.Component {
  state = {
    recipes: [],
    searchQuery: '',
    filteredRecipes: [],
    selectedOption: 'all'
  }

  async componentDidMount() {
    try {
      const res = await getAllRecipes()
      this.setState({ recipes: res.data, filteredRecipes: res.data })
    } catch (err) {
      console.log(err);
    }
  }

  filterRecipes = event => {
    const searchQuery = event.target.value
    const filteredRecipes = this.state.recipes.filter(recipe => {
      const regexp = new RegExp(searchQuery, 'i')
      return recipe.name.match(regexp) || recipe.ingredients.match(regexp)
    })
    this.setState({ searchQuery, filteredRecipes })
  }

  filterMeals = event => {
    const selectedOption = event.target.value
    let filteredRecipes
    if (selectedOption === 'All') {
      filteredRecipes = this.state.recipes
    } else {
      filteredRecipes = this.state.recipes.filter(recipe => {
        return (recipe.meal.indexOf(selectedOption) >= 0)
      })
    }
    console.log(filteredRecipes);

    this.setState({ selectedOption, filteredRecipes })
  }


  render() {

    return (
      <div className="recipeindex">
        <div className='page-title'>
          <h1 className="title has-text-centered">Recipes</h1>
        </div>
        <section className="section" >
          <div className="container">
            <div className='searches'>
              <SearchForm onChange={this.filterRecipes} query={this.state.searchQuery} />
              <Dropdown onChange={this.filterMeals} />
            </div>
            <div className="columns is-multiline is-mobile">
              {this.state.filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.name}{...recipe} />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default RecipeIndex