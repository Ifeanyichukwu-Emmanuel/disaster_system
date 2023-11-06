const mongoose = require('mongoose');

const disasterSchema = mongoose.Schema({
    disaster: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Disaster =mongoose.model('disaster', disasterSchema);

module.exports = Disaster;

