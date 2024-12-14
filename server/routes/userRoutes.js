const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import the controller

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/getuser', userController.getUserByEmail)
router.post('/addmother', userController.addMother)
router.post('/addchild', userController.addChild)
module.exports = router;
