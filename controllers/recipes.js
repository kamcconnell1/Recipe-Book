const Recipe = require('../models/recipe')
const { notFound, unauthorized } = require('../lib/errorMessages')

// * Create the controllers for your resouce here (index, create), (show, update delete optional)

async function recipeIndex(req, res, next) {
  try {
    const recipes = await Recipe.find().populate('user').populate('comments.user')
    if (!recipes) throw new Error(notFound)
    res.status(200).json(recipes)
  } catch (err) {
    next(err)
  }
}

async function recipeCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdRecipe = await Recipe.create(req.body)
    res.status(201).json(createdRecipe)
  } catch (err) {
    next(err)
  }
}

async function recipeShow(req, res, next) {
  const recipeId = req.params.id
  try {
    const recipe = await Recipe.findById(recipeId).populate('user').populate('comments.user')
    if (!recipe) throw new Error(notFound)
    res.status(200).json(recipe)
  } catch (err) {
    next(err)
  }
}

async function recipeUpdate(req, res, next) {
  const recipeId = req.params.id
  try {
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) throw new Error(notFound)
    if (!recipe.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(recipe, req.body)
    await recipe.save()
    res.status(202).json(recipe)
  } catch (err) {
    next(err)
  }
}

async function recipeDelete(req, res, next) {
  const recipeId = req.params.id
  try {
    const recipetoDelete = await Recipe.findById(recipeId)
    if (!recipetoDelete) throw new Error(notFound)
    if (!recipetoDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await recipetoDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function recipeComment(req, res, next) {
  try {
    const recipeId = req.params.id
    req.body.user = req.currentUser
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) throw new Error(notFound)

    recipe.comments.push(req.body)
    await recipe.save()
    res.status(201).json(recipe)
  } catch (err) {
    next(err)
  }
}

async function recipeCommentDelete(req, res, next) {
  try {
    const recipeId = req.params.id
    const commentId = req.params.commentId
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) throw new Error(notFound)

    const commentToRemove = recipe.comments.id(commentId)
    if (!commentToRemove) throw new Error(notFound)
    if (!commentToRemove.user.equals(req.currentUser._id) || !recipe.user.equals(req.currentUser._id)) {
      throw new Error(unauthorized)
    }
    await commentToRemove.remove()
    await recipe.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


// * export your controllers for use in the router
module.exports = {
  index: recipeIndex,
  create: recipeCreate,
  show: recipeShow,
  update: recipeUpdate,
  delete: recipeDelete,
  comment: recipeComment,
  deleteComment: recipeCommentDelete
}