const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    seats: {
        type: [String],
        default: [],
    },
    maxseats: {
        type: Number,
        default: 100,
    },
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("Event", EventSchema)