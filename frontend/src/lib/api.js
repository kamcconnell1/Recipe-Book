import axios from 'axios'
import { getToken } from '../lib/auth'


const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getAllRecipes = () => {
  return axios.get(`/api/recipes`)
}

export const getRecipe = recipeId => {
  return axios.get(`/api/recipes/${recipeId}`)
}

export const addRecipe = recipeForm => {
  return axios.post('/api/recipes', recipeForm, withHeaders())
}

export const editRecipe = (recipeId, recipeForm) => {
  return axios.put(`/api/recipes/${recipeId}`, recipeForm, withHeaders())
}

export const deleteRecipe = (recipeId) => {
  return axios.delete(`/api/recipes/${recipeId}`, withHeaders())
}

export const addComment = (recipeId, commentForm) => {
  return axios.post(`/api/recipes/${recipeId}/comments`, commentForm, withHeaders())
}

export const deleteComment = (recipeId, commentId) => {
  return axios.delete(`/api/recipes/${recipeId}/comments/${commentId}`, withHeaders())
}

export const registerUser = (registerForm) => {
  return axios.post('/api/register', registerForm)
}

export const loginUser = registerForm => {
  return axios.post('/api/login', registerForm)
}

const imageURL = process.env.REACT_APP_IMAGE_URL

export const postImage = data => {
  console.log('posting');
  
  return axios.post(imageURL, data)
}
export const uploadClothesImage = process.env.REACT_APP_IMAGE_PRESET