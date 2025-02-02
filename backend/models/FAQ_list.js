const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
    question_en: {
        type: String,
        required: true
      },
      question_hi: {
        type: String,
        required: true
      },
      question_fr: {
        type: String,
        required: true
      },
      answer_en: {
        type: String,
        required: true
      },
      answer_hi: {
        type: String,
        required: true
      },
      answer_fr: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
}, {collection:'FAQList'});

module.exports = mongoose.model("FAQ", FAQSchema);;
