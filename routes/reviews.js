const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/matches/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id', reviewsCtrl.delete);
router.get('/reviews/:id/edit', reviewsCtrl.edit);

// to edit a review
//router.put('/reviews/:id', reviewsCtrl.edit);

router.put('/reviews/:id', reviewsCtrl.update);


module.exports = router;