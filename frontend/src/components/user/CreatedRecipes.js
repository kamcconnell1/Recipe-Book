import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import RecipeCard from '../recipes/RecipeCard'
import { getUser, deleteRecipe } from '../../lib/api'

function CreatedRecipes() {
  const history = useHistory()
  const [recipes, setRecipes] = useState(null)

  const getData = async () => {
    try {
      const res = await getUser()
      setRecipes(res.data.createdRecipes)
    } catch (err) {
      history.push('/notfound')
    }
  }
  React.useEffect(() => {
    getData()
  }, [])


  const handleRemoveRecipe = async event => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const id = event.currentTarget.value
        await deleteRecipe(id)
        getData()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleEditRecipe = event => {
    const id = event.currentTarget.value
    history.push(`/recipes/${id}/edit`)
  }

  if (!recipes) return null

  return (
    <div className='recipescreated'>
      <div className='page-title'>
        <h1 className="title has-text-centered">Your Recipes</h1>
      </div>
      <section className="section">
        <div className="container">
          {recipes.length > 0 ?
            <div className="columns is-multiline is-mobile">
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.name}
                  handleRemoveRecipe={handleRemoveRecipe}
                  handleEditRecipe={handleEditRecipe}
                  {...recipe} />
              ))}
            </div>
            :
            <div className="container has-text-centered">
              <p className='title is-5 has-text-success'>Looks like you haven't added anything yet</p>
              <Link className='title is-6 link has-text-primary' to={'/recipes/add'}>Upload A Recipe Now</Link>
            </div>
          }
        </div>
      </section>
    </div>
  )
}

export default CreatedRecipes