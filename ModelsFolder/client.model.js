const mongoose = require('mongoose')
const { Schema } = mongoose

const clientSchema = new Schema({
  document: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  }, 
  lastName: String,
  phone: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Client', clientSchema)


