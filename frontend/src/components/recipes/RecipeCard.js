import React from 'react'
import { Link } from 'react-router-dom'


const RecipeCard = ({ name, image, _id, cookingTime }) => (

  <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
    <Link to={`/recipes/${_id}`}>
      <div className="recipecard">
      <div className="card" >
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-6">{name}</p>
          <p className="subtitle  is-6">Time:  {cookingTime} mins</p>
        </div>
      </div>
      </div>
    </Link>
  </div>
)


export default RecipeCard

