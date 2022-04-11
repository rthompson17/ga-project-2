const Match = require("../models/match");
const Message = require('../models/message');


module.exports = {
    new: newMatch,
    create,
    index,
    show
}
function show(req, res) {
//    Match.findById(req.params.id)
//    .populate('')
res.render("matches/show")
}

function create() {

}

function index(req, res) {
    res.render("matches/index")
}

function newMatch() {
    
}