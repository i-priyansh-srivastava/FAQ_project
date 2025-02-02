import React from "react";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react"; 
import { FaChevronDown } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/Homepage.css";

const Homepage = () => {
    const showToast = () => {
        toast.info("Feature to be live in next version!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };

    const [openIndex, setOpenIndex] = useState(null);
    const [language, setLanguage] = useState("en");
    const [allFaq, setAllFaq] = useState([]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/ALLfaqs');
                setAllFaq(response.data);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="faq-container">
            <nav className="HomeNavbar">
                <h1 className="logo">Bharat FD</h1>
                <button className="get-started">Get Started</button>
            </nav>

            <header className="hero">
                <h2>Looking for help? Here are our most frequently asked questions.</h2>
                <p>Can’t find the answer? Click 'I've got a question' or 'Chat to our team'!</p>
                <div className="hero-buttons">
                    <button className="question-btn" onClick={showToast}>I've got a question </button>
                    <button className="chat-btn" onClick={showToast}>Chat to our team</button>
                </div>
            </header>

            <div className="FAQ-multilingual">
                <select 
                    className="language-select" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="fr">Français (French)</option>
                </select>
            </div>

            <div className="faq-wrapper">
                {allFaq.map((faq, i) => (
                    <div key={i} className="faq-item">
                        <button onClick={() => toggleFAQ(i)} className="faq-question">
                        <ReactMarkdown>{faq[`question_${language}`]}</ReactMarkdown>
                            <FaChevronDown className={`icon ${openIndex === i ? 'rotate' : ''}`} />
                        </button>
                        {openIndex === i && <p className="faq-answer"><ReactMarkdown>{faq[`answer_${language}`]}</ReactMarkdown></p>} 
                    </div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Homepage;
