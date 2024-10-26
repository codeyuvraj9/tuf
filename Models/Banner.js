const mongoose = require('mongoose');
const { Schema } = mongoose;

const Banner = new Schema({
    description: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVisible: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('banner', Banner);