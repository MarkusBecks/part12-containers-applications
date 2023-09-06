require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./mongo/models/Contact')
const connectToMongoDB = require('./mongo/index')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// ROUTES
app.get('/info', (req, res, next) => {
  Contact.countDocuments({})
    .then((count) => {
      const info = `<p>Phonebook has info for ${count} people</p>`
      const date = new Date().toString()
      const response = `${info}${date}`

      res.send(response)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res, next) => {
  console.log('Fetching all persons...')
  Contact.find({})
    .then((contacts) => {
      console.log('Fetched persons:', contacts)
      res.json(contacts)
    })
    .catch((error) => {
      console.error('Error fetching persons:', error)
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      error: 'content missing',
    })
  }
  Contact.find({ name: body.name })
    .then((result) => {
      if (result.length > 0) {
        console.log(result)
        return res.status(400).json({
          error: 'name must be unique',
        })
      }

      const contact = new Contact({
        name: body.name,
        number: body.number,
      })

      contact
        .save()
        .then((contact) => {
          res.json(contact)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Contact.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedContact) => {
      res.json(updatedContact)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

// Connect to Mongo DB on app start
connectToMongoDB()
  .then(() => {
    // Start app
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error starting the app:', error)
  })
