const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//review message
const reviewSchema = new Schema({
    reviewText: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    // userName: String,
    // userAvatar: String
}, {
    timestamps: true
});

const matchSchema = Schema({
    matchName: {
        type: String,
        required: true
    },
    matchDate: {
        type: Date,
        default: function () {
        return new Date().setFullYear(new Date().getFullYear());
    }
    },
    overallRating: String,
    currentlyMatched: { type: Boolean, default: false},
    reviews: [reviewSchema],
    reviewerMessage: [{type: Schema.Types.ObjectId, ref: 'Message'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);


