const Match = require("../models/match");
const Message = require("../models/message");

// presents the user's message on the match's profile page
function show(req, res) {
  Match.findById(req.params.id)
    .populate("reviewerMessage")
    .exec(function (err, match) {
      console.log(match);
      res.render("matches/show", {
        matchName: "Match Detail",
        match: match,
      });
    });
}

// allows a user to create or "search for" their match
function newMatch(req, res) {
  res.render("matches/new", { matchName: "Add Match" });
}

// renders the index page with a user's reviewed matches
function index(req, res) {
  Match.find({}, function (err, matches) {
    res.render("matches/index", {
      matches,
      matchName: "All Matches",
    });
  });
}

// connects the match and review schema objects
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
    currentlyMatched: req.body.currentlyMatched,
  };
  const reviewObj = {
    reviewText: req.body.reviews,
    user: req.user._id,
  };
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
  show,
};
