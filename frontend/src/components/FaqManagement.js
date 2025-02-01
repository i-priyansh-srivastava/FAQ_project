import FaqList from "./FaqList.js"
import React, { useState } from "react";
import "../styles/FaqManagement.css";

function FaqManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);

  const handleSearch = () => {
    // Implement search functionality
    console.log("Search for:", searchQuery);
  };

  const handleAddFaq = () => {
    const newFaq = { question, answer };
    setFaqs([...faqs, newFaq]);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="faq-management">
      <h1>FAQ Management</h1>
      
      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Add FAQ Section */}
      <div className="add-faq">
        <h3>Add New FAQ</h3>
        <textarea
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Enter your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAddFaq}>Add FAQ</button>
      </div>

      {/* Display FAQs */}
      <FaqList faqs={faqs} />
    </div>
  );
}

export default FaqManagement;
