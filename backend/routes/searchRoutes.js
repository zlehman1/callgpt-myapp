const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.post('/find-pharmacies', searchController.findNearbyPharmacies);

module.exports = router;
