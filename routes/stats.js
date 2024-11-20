const {getStats , weekdays} = require('../controller/statsController');
const express = require('express');

const router = express.Router();    

router.get('/stats', getStats);
router.get('/stats/weekdays', weekdays);

module.exports = router;
