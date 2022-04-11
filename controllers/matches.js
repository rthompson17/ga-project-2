const Match = require("../models/match");
const Message = require('../models/message');


function show(req, res) {
   Match.findById(req.params.id)
   .populate('reviewerMessage')
   .exec(function(err, match) {

    Message.find(
        {_id: {$nin: match.reviewerMessage}},
        function(err, messages) {
        console.log(messages);
         res.render('matches/show', {
         matchName: 'Match Detail', match: match, messages: messages
        });
       }
   );
});
}

function newMatch(req, res) {
    res.render('matches/new', {matchName: "Add Match"});
}

function index(req, res) {
    Match.find({}, function(err, matches) {
        res.render("matches/index", {
            matches,
            matchName: "All Matches"
        })
    })
}


function create(req, res) {
    req.body.currentlyMatched = !!req.body.currentlyMatched;
    const match = new Match(req.body);
    match.save(function (err) {
        console.log(err, " this err");
        if (err) return res.redirect("/matches/new");
        console.log(match);
        res.redirect(`/matches/${match._id}`);
    });
}

module.exports = {
    new: newMatch,
    create,
    index,
    show
}