const express = require("express")
const connaissanceController = require('../controllers/connaissanceController')
const router = express.Router()

router.get('/allConnaissances', connaissanceController.allConnaissances);
router.get('/ConnaissanceParId/', connaissanceController.ConnaissanceParId);
router.post('/addConnaissance', connaissanceController.addConnaissance);
router.delete('/deleteConnaissance/', connaissanceController.deleteConnaissance);
router.put('/modifConnaissance/', connaissanceController.modifConnaissanceParId);





module.exports = router;