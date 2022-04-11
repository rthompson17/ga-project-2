const Message = require('../models/message');
const Match = require('../models/match');
const match = require('../models/match');

module.exports = {
    new: newMatch,
    create,
    sendMessage
}

//// CLOSE EYE ON THIS ONE...
function sendMessage() {
    Match.findById(req.params.id, function(err, reviewerDocument){
        reviewerDocument.reviewerMessage.push(req.body.messageId);
        reviewerDocument.save(function(err){
            res.redirect(`/matches/${reviewerDocument.__id}`)
        })
    })
}


function create(req, res) {
    Message.create(req.body, function (err, message) {
        res.redirect('/messages/new');
    });
}

function newMatch(req, res) {
    Message.find({}, function (err, messages) {
        res.render('messages/new', {
            title: 'Send Direct Message',
            messages
        });
    })
}