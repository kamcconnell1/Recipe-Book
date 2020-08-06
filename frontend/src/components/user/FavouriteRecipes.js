import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { getUser, removeFromFavourites } from '../../lib/api'
import RecipeCard from '../recipes/RecipeCard'

function FavouriteRecipes() {
  const history = useHistory()
  const [recipes, setRecipes] = useState(null)

  const getData = async () => {
    try {
      const res = await getUser()
      setRecipes(res.data.favourites)
    } catch (err) {
      history.push('/notfound')
    }
  }
  React.useEffect(() => {
    getData()
  }, [])


  const deleteRecipe = async event => {
    try {
      const res = await removeFromFavourites(event.currentTarget.value)
      console.log(res)
      getData()
    } catch (err) {
      console.log(err)
    }
  }

  if (!recipes) return null

  return (
    <div className='favourites'>
      <div className='page-title'>
        <h1 className="title has-text-centered">Favourites</h1>
      </div>
      <section className="section">
        <div className="container">
          {recipes.length > 0 ?
            <div className="columns is-multiline is-mobile">
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.name}
                  deleteRecipe={deleteRecipe}
                  {...recipe} />
              ))}
            </div>
            :
            <div className="container has-text-centered">
              <p className='title is-5 has-text-success'>Looks like you haven't added anything yet</p>
              <Link className='title is-6 link has-text-primary' to={'/recipes'}>View All Recipes</Link>
            </div>
          }
        </div>
      </section>
    </div>
  )
}

export default FavouriteRecipes