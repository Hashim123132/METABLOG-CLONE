/* eslint-disable no-undef */
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

   
    email: {
        type: String,
        required: true,
        unique: true
    },

    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    


});
const ContactUs = mongoose.model('ContactUs', userSchema);
module.exports = ContactUs;