const router = require('express').Router()
const recipes = require('../controllers/recipes')
const auth = require('../controllers/auth')
const user = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')

//? AUTH
router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

//? RECIPES
router.route('/recipes')
  .get(recipes.index)
  .post(secureRoute, recipes.create)

router.route('/recipes/:id')
  .get(recipes.show)
  .put(secureRoute, recipes.update)
  .delete(secureRoute, recipes.delete)

//? COMMENTS
router.route('/recipes/:id/comments')
  .post(secureRoute, recipes.comment)

router.route('/recipes/:id/comments/:commentId')
  .delete(secureRoute, recipes.deleteComment)

//? USER
router.route('/profile')
  .get(secureRoute, user.profile)

//? FAVOURITES
router.route('/favourites')
  .post(secureRoute, user.favouriteRecipes)

router.route('/favourites/:id')
  .delete(secureRoute, user.removeFavourite)

// * Export your router! you will need to register this as middleware in "index.js" !

module.exports = router