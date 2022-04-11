const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewText: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const matchSchema = Schema({
    matchName: {
        type: String,
        required: true
    },
    matchedDate: {
        type: Date
    },
    currentlyMatched: { type: Boolean, default: false },
    reviews: [reviewSchema],
    reviewerMessage:[{type: Schema.Types.ObjectId, ref: 'Message'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);