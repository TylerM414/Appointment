const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)