const Match = require('../models/match')

module.exports = {
    create,
    delete: deleteReview,
    edit
}

function deleteReview(req, res, next) {
    Match.findOne({'reviews._id': req.params.id}, function(err, matchDocument){

        const review = matchDocument.reviews.id(req.params.id);

        if(!review.user.equals(req.user._id)) return res.redirect(`/matches/${matchDocument._id}`);
        review.remove()

        matchDocument.save(function(err){
            if(err) next(err);
            res.redirect(`/matches/${matchDocument._id}`)
        })

    })
}


/// complete the function replacing review.remove()
function edit(req, res, next) {
    Match.findOne({'reviews._id': req.params.id}, function(err, matchDocument){

        const review = matchDocument.reviews.id(req.params.id);

        if(!review.user.equals(req.user._id)) return res.redirect(`/matches/${matchDocument._id}`);
       // update one review
        review.findOneAndUpdate(
            { __id: req.params.id },
            { '$set': reviewText, rating }
        );

        matchDocument.save(function(err){
            if(err) next(err);
            res.redirect(`/matches/${matchDocument._id}`)
        })

    })
}



function create(req, res) {
    console.log(req.body);
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
