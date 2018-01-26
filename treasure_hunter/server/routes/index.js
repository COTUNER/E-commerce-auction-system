const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  console.log('homepage');
  res.render('index', { title: 'Express' });
});

module.exports = router;
