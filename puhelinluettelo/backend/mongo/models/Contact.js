const mongoose = require('mongoose')

const phoneRegex = /^[0-9]{2,3}-[0-9]+$/
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },

  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (val) {
        return phoneRegex.test(val)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
