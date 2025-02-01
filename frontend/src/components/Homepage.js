import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Homepage.css"

const faqs = [
    {
        category: "General FAQs",
        questions: [
            { question: "Is there a free trial available?", answer: "Yes, a free version is available for you to try!" },
            { question: "What does the free version include?", answer: "The free version includes basic UI components." },
            { question: "Do I need to pay for Figma?", answer: "No, Figma offers a free plan with essential features." }
        ]
    },
    {
        category: "Billing FAQs",
        questions: [
            { question: "Is it a one-time payment?", answer: "No, we offer both subscription and one-time payment options." },
            { question: "What does 'lifetime access' mean?", answer: "Lifetime access means you can use the product indefinitely." }
        ]
    }
];

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

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                <select className="language-select" >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="fr">Français (French)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                </select>

            </div>

            <div className="faq-wrapper">
                {faqs.map((faqCategory, index) => (
                    <div key={index} className="faq-section">
                        <h3 className="faq-category">{faqCategory.category}</h3>
                        <div className="faq-box">
                            {faqCategory.questions.map((faq, i) => {
                                const currentIndex = `${index}-${i}`;
                                return (
                                    <div key={currentIndex} className="faq-item">
                                        <button onClick={() => toggleFAQ(currentIndex)} className="faq-question">
                                            {faq.question}
                                            <FaChevronDown className={`icon ${openIndex === currentIndex ? 'rotate' : ''}`} />
                                        </button>
                                        {openIndex === currentIndex && <p className="faq-answer">{faq.answer}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
