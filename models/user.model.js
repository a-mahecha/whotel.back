const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true
  }, 
  password: {
    type: String,
    require: true
  }, 
  lastLogin: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)


