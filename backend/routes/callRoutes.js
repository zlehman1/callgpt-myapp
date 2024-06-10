const express = require('express');
const router = express.Router();
const { makeOutBoundCall, endCall } = require('../controllers/callController');

router.post('/initiate-call', makeOutBoundCall);
router.post('/end-call', endCall);

module.exports = router;