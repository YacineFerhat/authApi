
const express = require('express');
const adminController = require('../controllers/user');
const router = express.Router();

router.post(
  '/',
  adminController.createUser
);

router.post('/login', adminController.login);

module.exports = router;