const jwt = require('jsonwebtoken')  // to decode the token
const { secret } = require('../config/environment')
const User = require('../models/user')
const { unauthorized } = require('../lib/errorMessages')

async function register(req, res, next) {
  try {
    console.log('logging in')
    
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized) 
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({
      message: `Welcome back ${user.username}`,
      token
    })
  } catch (err) {
    next(err)
  }
}



module.exports = {
  register: register,
  login: login
}


