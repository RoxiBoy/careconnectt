const express = require('express');
const router = express.Router();
const InfantController = require('../controllers/infantController'); // Ensure the correct path to the controller

router.post('/createInfant', InfantController.createInfant);
router.get('/getAllInfants', InfantController.getAllInfants);
router.get('/getChild/:id', InfantController.getChild);
router.put('/updateInfant/:id', InfantController.updateInfant);
router.delete('/deleteInfant/:id', InfantController.deleteInfant);

module.exports = router;
