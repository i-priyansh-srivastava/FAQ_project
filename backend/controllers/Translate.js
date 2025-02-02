const axios = require("axios");
require("dotenv").config();

const translateText = async (req, res) => {
  try {
    const { text } = req.query; 
    if (!text) {
      return res.status(400).json({ message: "Text is required for translation" });
    }

    const texts = text.split(" ||| "); 
    const [question_en, answer_en] = texts;

    const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ message: "API Key not found" });
    }

    const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    const translate = async (q, target) => {
      const response = await axios.post(API_URL, {
        q,
        target,
        source: "en",
        format: "text",
      });
      return response.data.data.translations[0].translatedText;
    };

    const question_hi = await translate(question_en, "hi");
    const answer_hi = await translate(answer_en, "hi");
    const question_fr = await translate(question_en, "fr");
    const answer_fr = await translate(answer_en, "fr");
    console.log(question_hi);
    console.log(answer_fr);
    
    

    res.json({ question_hi, answer_hi, question_fr, answer_fr });
  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({ message: "Translation failed" });
  }
};

module.exports = { translateText };
