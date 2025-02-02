const express = require("express");
const { addFAQ } = require("../controllers/CreateFaq");
const { translateText } = require("../controllers/Translate.js")

const router = express.Router();

router.post("/faqs", addFAQ);

router.get("/translate", translateText);

module.exports = router;
