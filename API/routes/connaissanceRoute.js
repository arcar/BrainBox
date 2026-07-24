const express = require("express")
const connaissanceController = require('../controllers/connaissanceController')
const router = express.Router()

router.get('/allConnaissances', connaissanceController.allConnaissances);
router.get('/ConnaissanceParId/:id', connaissanceController.ConnaissanceParId);
router.get('/ConnaissanceParTag/:tags', connaissanceController.ConnaissanceParTag);
router.post('/addConnaissance', connaissanceController.addConnaissance);
router.delete('/deleteConnaissance/:id', connaissanceController.deleteConnaissance);
router.put('/modifConnaissance/:id', connaissanceController.modifConnaissanceParId);





module.exports = router;