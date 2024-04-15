var express = require('express');
var router = express.Router();

let user_controller = require('../controllers/userController')

/* GET users listing. */
router.get('/chat', user_controller.user_chat_get);

router.post('/chat', user_controller.user_chat_post);

module.exports = router;
