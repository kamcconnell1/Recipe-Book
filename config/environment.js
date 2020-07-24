const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/recipeboard'
const port = process.env.PORT || 8000
const secret = process.env.SECRET || 'hippobambi' 



module.exports = {
  dbURI,
  port,
  secret
}
