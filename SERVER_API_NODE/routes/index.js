var express = require('express');
var     router = express.Router();
var indexController = require('../controllers/indexControllder')

router.get('/login', indexController.login);
router.post('/login', indexController.login);

module.exports = router;
