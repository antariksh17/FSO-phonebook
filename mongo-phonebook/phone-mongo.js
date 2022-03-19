const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node phone-mongo.js <password>')
  process.exit(1)
} 


const password = process.argv[2]

const url = `mongodb+srv://antariksh:${password}@cluster0.ouytb.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
})



if(process.argv.length==3){

    Contact.find({}).then(result => {
        result.forEach(contact => {
        console.log(contact)
        })
        mongoose.connection.close()
    })


} else if(process.argv.length==4){

    console.log('Please provide the number also to be added as an argument:  node phone-mongo.js <password> <"firstname lastName"> <number> ')
    process.exit(1)

} else if(rocess.argv.length==5){
    
    contact.save().then(result => {
        console.log(`Added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
      })
      
}






//pass: jack$1 -> jack%241