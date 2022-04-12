const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages');

router.get('/messages/new', messagesCtrl.new);
// router.post('/messages', messagesCtrl.create);
router.post('/matches/:id/messages', messagesCtrl.sendMessage);



module.exports = router;