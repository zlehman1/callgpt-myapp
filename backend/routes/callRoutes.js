const express = require('express');
const router = express.Router();
const { makeOutBoundCall } = require('../controllers/callController');

router.post('/initiate-call', makeOutBoundCall);

module.exports = router;