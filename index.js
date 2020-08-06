const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./config/routes')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const app = express()
const { dbURI, port } = require('./config/environment')


// * If connection to mongo works, we should see "Mongo is connected log in terminal"
mongoose.connect(dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

app.use(express.static(`${__dirname}/frontend/build`))

app.use(bodyParser.json())

app.use(logger) // * <-- Logging middleware not found in "lib/logger.js"

// * Place and additional middlewares below here

app.use('/api',router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.use(errorHandler)

app.listen(port, () => console.log(`Express is listening on port ${port}`))