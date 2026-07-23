const express = require("express");

const router = express.Router();

const {
    questionIA
} = require("../controllers/iaController");


router.post("/ask", questionIA);


module.exports = router;