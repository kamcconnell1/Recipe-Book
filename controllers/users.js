const User = require('../models/user')
const Recipe = require('../models/recipe')
const { unauthorized, notFound, duplicate } = require('../lib/errorMessages')

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdRecipes').populate('favourites')
    if (!user) throw new Error(unauthorized)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function addRecipeToFavourites(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const recipe = await Recipe.findById(req.body.recipe)
    console.log(recipe)
    
    if (!recipe) throw Error(notFound)
    if (user.favourites.includes(recipe._id)) throw new Error(duplicate)
    user.favourites.push(recipe)
    await user.save()
    res.status(201).json(user.favourites)
  } catch (err) {
    next(err)
  }
}

async function removeRecipeFromFavourites(req, res, next) {
  console.log('here')
  
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    if (!user.favourites.includes(req.params.id)) throw new Error(notFound)
    await user.favourites.remove(req.params.id)
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  profile: userProfile,
  favouriteRecipes: addRecipeToFavourites,
  removeFavourite: removeRecipeFromFavourites
}