const express = require('express')
const {generatePresentation} = require('../controllers/presentationController')
const router = express.Router()

router.post('/generate', generatePresentation)

module.exports = router;