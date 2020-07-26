const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//for setting up a new user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.virtual('createdRecipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'user'
})
//set up virtual password confirmation field
userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })

// for login - hases the password put in see if the same as one saved when registered, if true they login
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}


//checks both password & password confirmation are the same
userSchema
  .pre('validate', function  (next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match!')
    }
    next()
  })

//assuming all ok hashes up the password so is obscured using bcrypt
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)