const router = require('express').Router()
const recipes = require('../controllers/recipes')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')
const user = require('../controllers/users')


router.route('/recipes')
  .get(recipes.index)
  .post(secureRoute, recipes.create)

router.route('/recipes/:id')
  .get(recipes.show)
  .put(secureRoute, recipes.update)
  .delete(secureRoute, recipes.delete)

router.route('/recipes/:id/comments')
  .post(secureRoute, recipes.comment)

router.route('/recipes/:id/comments/:commentId')
  .delete(secureRoute, recipes.deleteComment)

router.route('/profile')
  .get(secureRoute, user.profile)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)


// * Export your router! you will need to register this as middleware in "index.js" !

module.exports = router