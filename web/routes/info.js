var express = require('express');
var router = express.Router();

let info_controller = require('../controllers/infoController')

router.get('/', info_controller.info_get);

module.exports = router;