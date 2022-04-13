const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/matches/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id', reviewsCtrl.delete);

// to edit a review
router.put('reviews/:id', reviewsCtrl.edit);


module.exports = router;