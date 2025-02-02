const express = require("express");
const { addFAQ } = require("../controllers/CreateFaq");
const { translateText } = require("../controllers/Translate.js")
const { getFAQs } = require("../controllers/GetFaq.js")
const { deleteFAQ } = require("../controllers/DeleteFaq.js")
const router = express.Router();

router.post("/faqs", addFAQ);

router.get("/translate", translateText);

router.get("/ALLfaqs" , getFAQs);
router.delete("/deleteFAQ/:id", deleteFAQ);

module.exports = router;
