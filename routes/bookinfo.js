const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('bookinfo', { title: 'bookinfo'});
});

module.exports = router;
