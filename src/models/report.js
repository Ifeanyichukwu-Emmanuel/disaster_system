const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {   
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },    
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    localGovt: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    disaster_typ: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Report = mongoose.model('report', reportSchema);

module.exports = Report;

