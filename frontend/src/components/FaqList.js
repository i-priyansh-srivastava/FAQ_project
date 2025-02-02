import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/FaqList.css';

function FaqList() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/ALLfaqs");
        const data = await response.json();
        const englishFaqs = data.map(faq => ({
          question: faq.question_en,
          answer: faq.answer_en,
          id: faq._id, 
        }));
        setFaqs(englishFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit FAQ with ID: ${id}`);
  };

  const handleDelete = async (ID) => {
    if (!ID) {
      toast.error("Invalid ID.");
      return;
    }
    try {
      console.log("Deleting appointment with ID:", ID);
      await axios.delete(`http://localhost:5000/api/v1/deleteFAQ/${ID}`);
      
      setFaqs((prev) => prev.filter((it) => it._id !== ID))
      toast.info("Appointment cancelled");

    }

    catch (e) {
      console.log(e);
      toast.error("Failed to delete FAQ");
    }

  }

  return (
    <div className="faq-list">
      <h3>Stored FAQs</h3>
      {faqs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <button className="editBtn" onClick={() => handleEdit(faq.id)}>Edit</button>
                  <button className="delBtn" onClick={() => handleDelete(faq.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  );
}

export default FaqList;
