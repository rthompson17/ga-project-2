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
    matchDate: {
        type: Date
    },
    overallRating: String,
    currentlyMatched: { type: Boolean, default: false},
    reviews: [reviewSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);


