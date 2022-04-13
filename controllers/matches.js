const Match = require("../models/match");
const Message = require('../models/message');


function show(req, res) {
   Match.findById(req.params.id)
   .populate('reviewerMessage')
   // also populate reviewSchema user
   .exec(function(err, match) {
console.log(match);
         res.render('matches/show', {
         matchName: 'Match Detail', match: match 
         //messages: messages
        });
       }
   );

};


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
    console.log(req.body);
    if (req.body.currentlyMatched === "on") {
        req.body.currentlyMatched = true;
    } else {
        req.body.currentlyMatched = false;
    }
    const matchObj = {
        matchName: req.body.matchName,
        matchedDate: req.body.matchDate,
        currentlyMatched: req.body.currentlyMatched
    }
    const reviewObj = {
        reviewText: req.body.reviews,
        user: req.user._id,

    }
    const match = new Match(matchObj);
    match.reviews.push(reviewObj);
    match.save(function (err) {
        console.log(err, " this err");
        if (err) return res.redirect("/matches/new");
        console.log(match);
        res.redirect(`/matches/`);
    });
}

module.exports = {
    new: newMatch,
    create,
    index,
    show
}