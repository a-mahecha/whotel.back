const mongoose = require('mongoose')
const { Schema } = mongoose

const roomClientSchema = new Schema({
  roomNumber: {
    type: String,
    require: true
  },
  clientId: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    require: true
  },
  active: {
    type: Boolean,
    require: true
  },
  endDate: Date,
  total: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('RoomClient', roomClientSchema)


