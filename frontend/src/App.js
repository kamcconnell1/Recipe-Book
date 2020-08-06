import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/recipes/Home'
import Navbar from './components/common/Navbar'
import Error from './components/common/Error'
import RecipeIndex from './components/recipes/RecipeIndex'
import RecipeShow from './components/recipes/RecipeShow'
import RecipeAdd from './components/recipes/RecipeAdd'
import RecipeEdit from './components/recipes/RecipeEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import CreatedRecipes from './components/user/CreatedRecipes'
import FavouriteRecipes from './components/user/FavouriteRecipes'

const App = () => {


    return(
      <BrowserRouter>
      <Navbar />
      <Switch >
      <Route exact path="/" component={Home} />
      <Route path="/recipes/:id/edit" component={RecipeEdit} />
      <Route path="/recipes/add" component={RecipeAdd} />
      <Route path="/recipes/:id" component={RecipeShow} />
      <Route path="/createdrecipes" component={CreatedRecipes} />
      <Route path="/favourites" component={FavouriteRecipes} />
      <Route path="/recipes" component={RecipeIndex} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/*" component={Error} />
      </Switch>
      </BrowserRouter>
    )
  
}
export default App