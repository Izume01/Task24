const getStats = require('../controller/statsController');
const express = require('express');

const router = express.Router();    

router.get('/stats', getStats);

module.exports = router;
