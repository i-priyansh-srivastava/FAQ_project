import React from "react";
import '../styles/FaqList.css';

function FaqList({ faqs }) {
  return (
    <div className="faq-list">
      <h3>Stored FAQs</h3>
      {faqs.length > 0 ? (
        <ul>
          {faqs.map((faq, index) => (
            <li key={index}>
              <strong>Q: </strong>{faq.question}<br />
              <strong>A: </strong>{faq.answer}
            </li>
          ))}
        </ul>
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  );
}

export default FaqList;
