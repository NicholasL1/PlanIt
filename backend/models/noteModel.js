const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket'
  },
  text: {
    type: String,
    required: [true, 'Enter some notes'],
  },
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Note', noteSchema)