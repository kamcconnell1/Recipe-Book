import React from 'react'

import { getRecipe, editRecipe } from '../../lib/api'
import RecipeEditForm from './RecipeEditForm'

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
      serves: ''
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

    if (!this.state.formData) return null 
    
    return (
      <div className='recipeedit'>
      <section className="section">
        <div className="container">
        <h2 className="title has-text-centered">Update Recipe</h2>
            <hr />
          <RecipeEditForm
            formData={this.state.formData}
            handleMultiChange={this.handleMultiChange}
            handleMethodChange={this.handleMethodChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Update Recipe"
          />
        </div>
      </section>
      </div>
    )
  }
}
export default RecipeEdit