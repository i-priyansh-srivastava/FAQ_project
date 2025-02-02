import React, { useState } from "react";
import axios from "axios";
import FaqList from "./FaqList";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from 'react-markdown';

import "../styles/FaqManagement.css";

function FaqManagement() {
  const [showForm, setShowForm] = useState(false);
  const [description, setdescription] = useState('');
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

  const handleMarkdownChange = (value, name) => {
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
    <div>
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
              {/* <MarkdownEditor
                value={faqData.answer_en}
                onChange={({ text }) => handleMarkdownChange(text, "answer_en")}
                style={{ height: "200px" }}
              /> */}
              <MarkdownEditor
                value={faqData.answer_en}
                onChange={({ text }) => handleMarkdownChange(text, "answer_en")}
                style={{ width: "100%", height: "200px" }}
              />            </div>

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

              <MarkdownEditor
                value={faqData.answer_hi}
                onChange={({ text }) => handleMarkdownChange(text, "answer_hi")}
                style={{ width: "100%", height: "200px" }}
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

              <MarkdownEditor
                value={faqData.answer_fr}
                onChange={({ text }) => handleMarkdownChange(text, "answer_fr")}
                style={{ width: "100%", height: "200px" }}
              />
            </div>

            <button type="submit" className="submitFaqButton">
              Submit FAQ
            </button>
          </form>
        )}
      </div>

      <div className="AllFAQList">
        <FaqList></FaqList>
      </div>
    </div>
  );
}

export default FaqManagement;
