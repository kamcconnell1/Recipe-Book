import React from 'react'
import { Link } from 'react-router-dom'


const RecipeCard = ({ name, image, _id, cookingTime, handleRemoveRecipe, handleEditRecipe }) => {

  return (
  <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop recipecard">
    <Link to={`/recipes/${_id}`}>
      <div className="card" >
        <div className="card-image">
          <figure className="image is-4by3">
            <img className='recipe-image' src={image} alt={name} />
          </figure>
        </div>
        <div className="media-content ">
          <p className="title is-6">{name}</p>
        </div>
      </div>
    </Link>
    <button className='remove-recipe-btn button is-small is-light' value={_id} onClick={handleRemoveRecipe} title='Delete'><span className="icon is-small"><i className="fas fa-times-circle"></i></span></button>
    <button className='edit-recipe-btn button is-small is-light' value={_id}  onClick={handleEditRecipe} title='Edit'><span className="icon is-small"><i className="far fa-edit"></i></span></button>
  </div>
)
}


export default RecipeCard

