var express = require('express');
var router = express.Router();

let chat_controller = require('../controllers/chatController')

router.get('/', chat_controller.chat_get);

router.post('/', chat_controller.chat_post);

router.get('/dataset', chat_controller.chat_dataset_get);

module.exports = router;
