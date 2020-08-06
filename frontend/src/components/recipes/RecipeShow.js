import React from 'react'
import { Link } from 'react-router-dom'

import RecipeMethod from './RecipeMethod'
import CommentBox from '../comments/CommentBox'
import CommentCard from '../comments/CommentCard'

import { isOwner, isAuthenticated } from '../../lib/auth'
import { getRecipe, addComment, deleteComment, deleteRecipe, addToFavourites } from '../../lib/api'


class RecipeShow extends React.Component {
  state = {
    recipe: null,
    commentsArr: [],
    comments: {
      text: ''
    }, 
    favourite: ''
  }

  async componentDidMount() {
    try {
      this.getRecipePage()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  async getRecipePage() {
    try {
      const recipeId = this.props.match.params.id
      const res = await getRecipe(recipeId)
      this.setState({ recipe: res.data, commentsArr: res.data.comments })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // handleDeleteRecipe = async event => {
  //   try {
  //     const recipeId = this.props.match.params.id
  //     await deleteRecipe(recipeId)
  //     this.props.history.push('/recipes')
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  //* Comments on the recipe
  handleChange = event => {
    const comments = { ...this.state.comments, [event.target.name]: event.target.value }
    this.setState({ comments })
  }

  handleAddComment = async event => {
    event.preventDefault()
    const recipeId = this.props.match.params.id
    try {
      const res = await addComment(recipeId, this.state.comments)
      this.setState({ commentsArr: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getRecipePage()
    } catch (err) {
      console.log(err.response)
    }
  }

  handleDeleteComment = async event => {
    try {
      const recipeId = this.props.match.params.id
      const commentId = event.target.value
      await deleteComment(recipeId, commentId)
      this.getRecipePage()
    } catch (err) {
      console.log(err.response)
    }
  }

//* Favourite Recipe
handleAddToFavourites = async event => {
  try {
    const recipe = {...this.state.favourite, [event.currentTarget.name]: event.currentTarget.value}
    await addToFavourites(recipe)
  } catch (err) {
    console.log(err);
    
  }
}

  render() {
    if (!this.state.recipe) return null
    const { recipe, commentsArr } = this.state

    let ingredients = recipe.ingredients.replace(/\b\w/g, l => l.toUpperCase()).split('\n').join(',').split(',')    

    return (
      <div className="recipeshow">
        <section className="section" >
          <div className="container">
            <h2 className="title has-text-centered">{recipe.name}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={recipe.image} alt={recipe.name} />
                  <button className='try-again-btn' onClick={this.handleAddToFavourites} name='recipe' value={recipe._id}>
                  <span className="icon is-large has-text-primary">
                  <i  className="fas fa-2x fa-heart" ></i>
                  </span>
                  </button>
                </figure>
                {/* <div className='recipe-btns'>
                {isOwner(recipe.user._id) && <Link to={`/recipes/${recipe._id}/edit`} className="button is-success is-fullwidth is-small edit-button ">Edit Recipe</Link>}
                {isOwner(recipe.user._id) &&
                  <button
                    className="button is-small is-fullwidth delete-button"
                    onClick={this.handleDeleteRecipe}>Delete Recipe</button>}
                    </div> */}
              </div>
              <div className="column is-half">
                <div className='cooking-info'>
                <h6 className="subtitle">Serves: {recipe.serves || ''} </h6>
                <h6 className="subtitle">Cooking Time: {recipe.cookingTime} minutes</h6>
                {recipe.cookingTemp ?
                  <h6 className="subtitle">Temperature: {recipe.cookingTemp} &deg;C</h6>
                  : ''
                }
                </div>
                <hr />
                <h5 className="title is-4">Ingredients</h5>
                <ul className='ingredients'>
                  {ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                    ))}
                </ul>
                    <hr />
                <h5 className="title is-4">Method</h5>
                <RecipeMethod {...recipe} />
                <p className="subtitle is-6 added-by">Added By: {recipe.user.username}</p>
                <p className="subtitle is-6 added-by">Credit: {recipe.credit}</p>
                <br />
                { isAuthenticated() && 
                <CommentBox
                  handleChange={this.handleChange}
                  handleAddComment={this.handleAddComment}
                  recipe={this.state.recipe}
                  comments={this.state.comments}
                />
                }
                <div className="comments">
                  {commentsArr.reverse().map(comment =>
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      onClick={this.handleDeleteComment}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section >
      </div>
    )
  }
}

export default RecipeShow
