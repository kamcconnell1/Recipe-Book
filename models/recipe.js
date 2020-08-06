const  mongoose = require('mongoose')
// * Create your model for your resource here

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 85 },
  meal: [{ type: String, required: true }],
  image: { type: String, required: true }, 
  ingredients: { type: String, required: true },
  method: { type: Object, required: true },
  cookingTime: { type: Number, required: true }, 
  cookingTemp: { type: Number, required: false }, 
  serves: { type: Number, required: true }, 
  credit: { type: String, required: true },
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})



module.exports = mongoose.model('Recipe', recipeSchema)







// * Remember to export it at the end for use in your controllers

// * head over to "controller.js" next