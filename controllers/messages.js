const Message = require("../models/message");
const Match = require("../models/match");
const match = require("../models/match");

module.exports = {
  new: newMatch,
  create,
  sendMessage,
};

// stretch goal I'd like to work on in the future, but not currently being used, it will be used for a message inbox where a chat bot will reply to messages sent
function sendMessage() {
  Match.findById(req.params.id, function (err, reviewerDocument) {
    reviewerDocument.reviewerMessage.push(req.body.messageId);
    reviewerDocument.save(function (err) {
      res.redirect(`/matches/${reviewerDocument._id}`);
    });
  });
}

// allows sending of a message to display on the match's profile page. Would like to add a chat bot here as well
async function sendMessage(req, res) {
  const match = await Match.findById(req.params.id);
  const message = await Message.create(req.body);
  console.log(message, "<-- this is a message");
  match.reviewerMessage.push(message);
  console.log(match);
  match.save();
  res.redirect("/matches/" + req.params.id);
}

function create(req, res) {
  Message.create(req.body, function (err, message) {
    console.log(message);
    console.log(req.body);
    res.redirect("/messages/new");
  });
}

function newMatch(req, res) {
  Message.find({}, function (err, messages) {
    res.render("messages/new", {
      title: "Send Direct Message",
      messages,
    });
  });
}
