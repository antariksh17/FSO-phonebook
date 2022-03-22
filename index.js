require('dotenv').config()

const express = require('express')

const app= express()

const morgan = require('morgan')

const cors = require('cors')

const Contact = require('./models/contact')


app.use(express.json())

app.use(cors())


app.use(express.static('build'))


// eslint-disable-next-line no-unused-vars
morgan.token('data', function(req, res) {


  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)





app.get('/api/persons', (request, response) => {

  Contact.find({}).then(contacts => {

    response.json(contacts)

  })

    // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

app.get('/info', (request, response) => {

  Contact.find({}).then(contacts => {

    response.json(`Phonebook has info for ${contacts.length} people ${new Date()}`)



  })



})

app.get('/api/persons/:id', (request, response,next) => {

  Contact.findById(request.params.id).then(contact => {

    if(contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  })

    .catch(error => next(error))



})








app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = ({

    name: body.name,
    number: body.number

  })

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })

    .then(updatedContact => {
      response.json(updatedContact)
    })

    .catch(error => next(error))
})






app.post('/api/persons', (request,response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const contact = new Contact({

    name: body.name,
    number: body.number

  })


  Contact.findOne({ name:body.name }).then(contacts => {

    if(contacts) {

      return response.status(400).json({ error: 'Contact already exists in DB' })

    } else {


      contact.save().then(savedContact => {
        response.json(savedContact)
      })

        .catch((error) => next(error))
    }
  })

})

app.delete('/api/persons/:id', (request,response, next) => {

  Contact.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })

    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})


//-------------------------------------------

// let persons = [
//     {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//     },
//     {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//     },
//     {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//     },
//     {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//     }
// ]

//part 3 completed-with-fixes