import React, { useState } from "react";
import axios from "axios";
import "../styles/FaqManagement.css";

function FaqManagement() {
  const [showForm, setShowForm] = useState(false);
  const [faqData, setFaqData] = useState({
    question_en: "",
    answer_en: "",
    question_hi: "",
    answer_hi: "",
    question_fr: "",
    answer_fr: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  const handleTranslate = async () => {
    try {
      if (!faqData.question_en || !faqData.answer_en) {
        alert("Please enter the English question and answer first.");
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/v1/translate`, {
        params: { text: `${faqData.question_en} ||| ${faqData.answer_en}` },
      });

      const { question_hi, answer_hi, question_fr, answer_fr } = response.data;

      setFaqData({
        ...faqData,
        question_hi,
        answer_hi,
        question_fr,
        answer_fr,
      });
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(faqData);

      const response = await axios.post(`http://localhost:5000/api/v1/faqs`, faqData);
      console.log("FAQ Saved:", response.data);

      setFaqData({
        question_en: "",
        answer_en: "",
        question_hi: "",
        answer_hi: "",
        question_fr: "",
        answer_fr: "",
      });

      console.log("Data saved");
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  return (
    <div className="FaqContainer">
      <div className="searchBar">
        <input type="text" placeholder="Search FAQs..." className="searchInput" />
      </div>
      <button className="addFaqButton" onClick={() => setShowForm(!showForm)}>
        {showForm ? "CLOSE" : "ADD NEW FAQ"}
      </button>
      {showForm && (
        <form className="faqForm" onSubmit={handleSubmit}>
          <div className="faqInputGroup">
            <label>English Question:</label>
            <input
              type="text"
              name="question_en"
              placeholder="Enter question in English"
              value={faqData.question_en}
              onChange={handleInputChange}
            />
            <label>English Answer:</label>
            <input
              type="text"
              name="answer_en"
              placeholder="Enter answer in English"
              value={faqData.answer_en}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="translateButton" onClick={handleTranslate}>
            Automatically Translate
          </button>

          <div className="faqInputGroup">
            <label>Hindi Question:</label>
            <input
              type="text"
              name="question_hi"
              placeholder="हिंदी में प्रश्न दर्ज करें"
              value={faqData.question_hi}
              onChange={handleInputChange}
            />
            <label>Hindi Answer:</label>
            <input
              type="text"
              name="answer_hi"
              placeholder="हिंदी में उत्तर दर्ज करें"
              value={faqData.answer_hi}
              onChange={handleInputChange}
            />
          </div>
          <div className="faqInputGroup">
            <label>French Question:</label>
            <input
              type="text"
              name="question_fr"
              placeholder="Entrez la question en français"
              value={faqData.question_fr}
              onChange={handleInputChange}
            />
            <label>French Answer:</label>
            <input
              type="text"
              name="answer_fr"
              placeholder="Entrez la réponse en français"
              value={faqData.answer_fr}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submitFaqButton">
            Submit FAQ
          </button>
        </form>
      )}
    </div>
  );
}

export default FaqManagement;
