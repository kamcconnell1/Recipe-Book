import React from 'react'

import { getRecipe, editRecipe } from '../../lib/api'
import RecipeForm from './RecipeForm'

class RecipeEdit extends React.Component {
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
      stepFive: ''},
      cookingTime: '',
      notes: ''
    }, 
    errors: {}
  }

  async componentDidMount() {
    const recipeId = this.props.match.params.id
    try {
      const res = await getRecipe(recipeId)
      this.setState({ formData: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
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
    const recipeId = this.props.match.params.id
    try {
      const res = await editRecipe(recipeId, this.state.formData)
      console.log(res);
      this.props.history.push(`/recipes/${recipeId}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <RecipeForm
            formData={this.state.formData}
            handleMultiChange={this.handleMultiChange}
            handleMethodChange={this.handleMethodChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Update Recipe"
          />
        </div>
      </section>
    )
  }
}
export default RecipeEdit