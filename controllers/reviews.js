const Match = require('../models/match')

module.exports = {
    create,
    delete: deleteReview
}

function deleteReview() {

}

function create(req, res) {
    Match.findById(req.params.id), function(err, matchFromTheDatabase) {

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        matchFromTheDatabase.reviews.push(req.body);
        matchFromTheDatabase.save(function(err){
            console.log(matchFromTheDatabase)
            res.redirect(`/matches/${matchFromTheDatabase._id}`)
        })
    }
}
