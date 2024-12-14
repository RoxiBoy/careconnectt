const express = require('express');
const router = express.Router();
const motherController = require('../controllers/motherController');

router.post('/createMother', motherController.createMother);   // Create new mother
router.get('/getMother/:id', motherController.getMother);   // Get a specific mother by ID
router.get('/getAllMothers', motherController.getAllMothers);   // Get all mothers
router.put('/updateMothers/:id', motherController.updateMother); // Update a mother's information
router.delete('/deleteMothers/:id', motherController.deleteMother); // Delete a mother

module.exports = router;
