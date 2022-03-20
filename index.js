    require('dotenv').config()
    
    const express = require('express')

    const morgan = require('morgan')

    const app= express()

    const Contact = require('./models/contact')

    const cors = require('cors')
    app.use(cors())


    app.use(express.static('build'))
    app.use(express.json())

    morgan.token('data', function(req, res) {

        
        return JSON.stringify(req.body);
    })

    app.use(
        morgan(":method :url :status :res[content-length] - :response-time ms :data")
    )

    
    
//

    app.get('/api/persons', (request, response) => {
        
        Contact.find({}).then(contacts => {

            response.json(contacts)
      
          })
    })

    app.get('/info', (request, response) => {
        response.json(`Phonebook has info for ${persons.length} people ${new Date()}`)

    })

    app.get('/api/persons/:id', (request, response) => {
        
        const id = Number(request.params.id)

        const person= persons.filter((person)=> person.id == id)

        if (person) {
            response.json(person)
          } else {
            response.status(404).end()
          }
    })
   



    app.post('/api/persons', (request,response)=> {
        const body = request.body

        if (body.name === undefined) {
          return response.status(400).json({ error: 'content missing' })
        }
      
        const contact = new Contact({
          
            name: body.name,
            number: body.number
          
        })
      
        contact.save().then(savedContact => {
          response.json(savedContact)
        })
    })

    app.delete('/api/persons/:id', (request,response) => {

        const id = Number(request.params.id)

        persons = persons.filter((person)=> person.id !== id)

        response.status(204).end()

    })



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