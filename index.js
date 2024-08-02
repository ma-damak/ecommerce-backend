require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const articleRouter = require('./routes/article.route')
const scategorieRouter = require('./routes/scategorie.route')
const categorieRouter = require('./routes/categorie.route')

const app = express()

app.use(express.json())
app.use(cors())

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('conencted to mongodb')
  })
  .catch((error) => {
    console.log('error connecting to mongodb', error.message)
  })

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.use('/api/articles', articleRouter)
app.use('/api/scategories', scategorieRouter)
app.use('/api/categories', categorieRouter)

//
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    const value = error.keyValue[field]
    return response.status(400).send({
      error: `The value '${value}' for the field '${field}' already exists.`,
    })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`application is running on port ${PORT}`)
})
