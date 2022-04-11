const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    reviewerMessage: {type: String, required: false},
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);