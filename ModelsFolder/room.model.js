const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  number: {
    type: String,
    require: true
  },
}, {
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)


