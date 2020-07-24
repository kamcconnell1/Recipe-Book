const mongoose = require('mongoose')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const { dbURI } = require('../config/environment')
const recipeData = require('./data/recipeData')


mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)
    try {
      await db.dropDatabase()
      const user = await User.create({
        username: 'kam',
        email: 'kam@email',
        password: 'kam',
        passwordConfirmation: 'kam'
      })
      console.log(`User ${user.username} created 😃`)
      const recipeWithUsers = recipeData.map(recipe => {
        return { ...recipe, user: user._id }
      })

      const recipes = await Recipe.create(recipeWithUsers)
      console.log(`${ '🍽️ '.repeat(recipes.length)} recipes created `)
    } catch (err) {
      console.log(err)
      
    }
    await mongoose.connection.close()
    console.log('Goodbye 👋')
  })