const Match = require('../models/match')

module.exports = {
    create,
    delete: deleteReview,
    edit,
    update
}

function edit(req, res, next) {
    //pre populate the value of the text that will be there, so query the review ID 
    Match.findOne({'reviews._id': req.params.id}, function(err, matchDocument) {
        console.log(matchDocument);
        const review = matchDocument.reviews.id(req.params.id);
        if(!review.user.equals(req.user._id)) return res.redirect(`/matches/${matchDocument._id}`);
       // review.populate(req.body.reviewText);
        console.log(review)
        // matchDocument.save(function(err) {
        //     if(err) next(err);
        //     res.redirect(`/matches/${matchDocument.id}`)
        // })
        res.render('matches/edit', {
            review
        })
    })
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


/// complete the function replacing review.remove() -- MAKE 'UPDATE' 
function update(req, res, next) {
    Match.findOne({'reviews._id': req.params.id}, function(err, matchDocument){

        const review = matchDocument.reviews.id(req.params.id);
        console.log(review, '<--- this is the review');
        console.log(req.body, '<--- this is the req.body');
        review.reviewText = req.body.reviewText;
        console.log(review, '<-- this is the updates review')
        if(!review.user.equals(req.user._id)) return res.redirect(`/matches/${matchDocument._id}`);
       // update one review
        Match.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
            //{ '$set': reviewText, rating }
        );
        //matchDocument.reviews.pop(req.body);
        //matchDocument.reviews.push(req.body);
        matchDocument.save(function(err){
            if(err) next(err);
            res.redirect(`/matches/${matchDocument._id}`)
        })

    })
}

// ////
// match.reviews.push(reviewObj);
// match.save(function (err) {
//     console.log(err, " this err");
//     if (err) return res.redirect("/matches/new");
//     console.log(match);
//     res.redirect(`/matches/`);
// });
// }
//////

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
