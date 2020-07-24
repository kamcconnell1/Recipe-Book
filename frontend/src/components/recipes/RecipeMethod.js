import React from 'react'

const RecipeMethod = ({ method }) => {

      if (!method) return null

      let methodSteps = Object.values(method).filter(task => {
        return task.length !== 0   
      })
      

  return (
    <div className='recipemethod'>
    <ol>
      {Object.values(methodSteps).map((task, i) => (
        <li 
        className="method"
        key={i}
        >{task}</li>
      ))
      }
    </ol>
  </div>
  )
}

export default RecipeMethod