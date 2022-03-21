
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url)

    .then(result => {
        console.log("connected to MongoDB")
    })

    .catch((error) => {
        
        console.log("error connecting to MongoDB",error.message)

    })


    const contactSchema = new mongoose.Schema({
        
        name: {
            type: String,
            minLength:  [3, 'name should be atleast 3 characters long'],
            required: true
          },
        number: {
            type: String,
            minlength: [8, 'number should be atleast 8 characters long'],
            validate: {
              validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v);
              },
              message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }

    })
    
    contactSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id =returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })
    
    module.exports =  mongoose.model('Contact', contactSchema)