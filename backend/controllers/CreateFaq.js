const FAQ = require("../models/FAQ_list"); 

const addFAQ = async (req, res) => {
  try {
    const { question_en, answer_en, question_hi, answer_hi, question_fr, answer_fr } = req.body;

    if (!question_en || !answer_en || !question_hi || !answer_hi || !question_fr || !answer_fr) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFAQ = new FAQ({
      question_en,
      answer_en,
      question_hi,
      answer_hi,
      question_fr,
      answer_fr,
    });

    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    console.error("Error saving FAQ:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addFAQ };
