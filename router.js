const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.use('/', require('routes/index'));
router.use('/bookinfo', require('routes/bookinfo'));
router.use('/barcode', require('routes/barcode'));

module.exports = router;