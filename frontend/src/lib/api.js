import axios from 'axios'
import { getToken } from '../lib/auth'

const url = '/api'
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// ? RECIPES ---------------------------
export const getAllRecipes = () => {
  return axios.get(`${url}/recipes`)
}

export const getRecipe = recipeId => {
  return axios.get(`${url}/recipes/${recipeId}`)
}

export const addRecipe = recipeForm => {
  return axios.post(`${url}/recipes`, recipeForm, withHeaders())
}

export const editRecipe = (recipeId, recipeForm) => {
  return axios.put(`${url}/recipes/${recipeId}`, recipeForm, withHeaders())
}

export const deleteRecipe = (recipeId) => {
  return axios.delete(`${url}/recipes/${recipeId}`, withHeaders())
}

const imageURL = process.env.REACT_APP_IMAGE_URL

export const postImage = data => {
  return axios.post(imageURL, data)
}

//? COMMENTS ----------------------------
export const addComment = (recipeId, commentForm) => {
  return axios.post(`${url}/recipes/${recipeId}/comments`, commentForm, withHeaders())
}

export const deleteComment = (recipeId, commentId) => {
  return axios.delete(`${url}/recipes/${recipeId}/comments/${commentId}`, withHeaders())
}

//? USER -------------------------------
export const registerUser = (registerForm) => {
  return axios.post(`${url}/register`, registerForm)
}

export const loginUser = registerForm => {
  return axios.post(`${url}/login`, registerForm)
}

export const getUser = () => {
  return axios.get(`${url}/profile`, withHeaders())
}

//? FAVOURITES --------------------------
export const addToFavourites = recipeId => {  
  return axios.post(`${url}/favourites`, recipeId, withHeaders())
}

export const removeFromFavourites = recipeId => {
  return axios.delete(`${url}/favourites/${recipeId}`, withHeaders())
}

export const uploadClothesImage = process.env.REACT_APP_IMAGE_PRESET