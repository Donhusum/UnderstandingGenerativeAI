const express = require('express');
const router = express.Router();

const promptController = require('../controllers/prompts.js')

router.post('/generate', promptController.generate)

module.exports = router;