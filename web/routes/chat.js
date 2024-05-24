var express = require('express');
var router = express.Router();

let chat_controller = require('../controllers/chatController')

router.get('/', chat_controller.chat_get);

router.post('/', chat_controller.chat_post);

router.get('/dataset', chat_controller.chat_dataset_get);

router.get('/next-question', chat_controller.chat_next_question);
router.get('/previous-question', chat_controller.chat_previous_question);

//router.get('/info', chat_controller.testAIMessage)

module.exports = router;
