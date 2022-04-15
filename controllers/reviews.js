const Match = require("../models/match");

module.exports = {
  create,
  delete: deleteReview,
  edit,
  update,
};

function edit(req, res, next) {
  Match.findOne(
    { "reviews._id": req.params.id },
    function (err, matchDocument) {
      console.log(matchDocument);
      const review = matchDocument.reviews.id(req.params.id);
      if (!review.user.equals(req.user._id))
        return res.redirect(`/matches/${matchDocument._id}`);
      console.log(review);
      res.render("matches/edit", {
        review,
      });
    }
  );
}

function deleteReview(req, res, next) {
  Match.findOne(
    { "reviews._id": req.params.id },
    function (err, matchDocument) {
      const review = matchDocument.reviews.id(req.params.id);
      if (!review.user.equals(req.user._id))
        return res.redirect(`/matches/${matchDocument._id}`);
      review.remove();
      matchDocument.save(function (err) {
        if (err) next(err);
        res.redirect(`/matches/${matchDocument._id}`);
      });
    }
  );
}

/// allows editing and updating of a message from text originally written in the review
function update(req, res, next) {
  Match.findOne(
    { "reviews._id": req.params.id },
    function (err, matchDocument) {
      const review = matchDocument.reviews.id(req.params.id);
      console.log(review, "<--- this is the review");
      console.log(req.body, "<--- this is the req.body");
      review.reviewText = req.body.reviewText;
      console.log(review, "<-- this is the updates review");
      if (!review.user.equals(req.user._id))
        return res.redirect(`/matches/${matchDocument._id}`);
      Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
      matchDocument.save(function (err) {
        if (err) next(err);
        res.redirect(`/matches/${matchDocument._id}`);
      });
    }
  );
}

// pushes user's data to the review
function create(req, res) {
  console.log(req.body);
  Match.findById(req.params.id),
    function (err, matchFromTheDatabase) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      matchFromTheDatabase.reviews.push(req.body);
      matchFromTheDatabase.save(function (err) {
        console.log(matchFromTheDatabase);
        res.redirect(`/matches/${matchFromTheDatabase._id}`);
      });
    };
}
