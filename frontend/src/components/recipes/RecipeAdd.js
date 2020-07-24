import React from 'react'
import { addRecipe } from '../../lib/api'

import RecipeForm from './RecipeForm'

class RecipeAdd extends React.Component {
state = {
  formData: {
    name: '',
    meal: [''],
    image: '',
    ingredients: '',
    method: {stepOne: '',
    stepTwo: '',
    stepThree: '',
    stepFour: '',
    stepFive: '',
    stepSix: ''
  },
    cookingTime: '',
    notes: '',
    author: ''
  }, 
  errors: {}
}

handleChange = event => {
  const formData = { ...this.state.formData, [event.target.name]: event.target.value }
  const errors = {...this.state.errors, [event.target.name]: ''}
  this.setState({ formData, errors })
}

handleMethodChange = event => {
  const name = event.target.name
  const value = event.target.value
  
  this.setState(prevState => ({
    formData: {
      ...prevState.formData, 
      method: {
        ...prevState.formData.method, 
        [name]: value
      }
    }
  }))
} 

handleMultiChange = selected => {
  const selectedItems = selected ? selected.map(item => item.value) : []
  const formData = { ...this.state.formData, meal: selectedItems }
  const errors = { ...this.state.errors, meal: '' }
  this.setState({ formData, errors })
}

handleSubmit = async event => {
  event.preventDefault()
  try {
    const res = await addRecipe(this.state.formData)
    console.log(res);
    this.props.history.push(`/recipes/${res.data._id}`)
  } catch (err) {
    console.log(err)
  }
}

  render() {
console.log('form', this.state.formData)

    return (
      <section className="section">
        <div className="container">
          <RecipeForm
          formData={this.state.formData}
          handleMultiChange={this.handleMultiChange}
          handleMethodChange={this.handleMethodChange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonText="Add Recipe"
          />
          
        </div>
      </section>
    )
  }
}

export default RecipeAdd