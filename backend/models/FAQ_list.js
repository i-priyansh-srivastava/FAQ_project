const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
    questions: {
        en: { type: String, required: true },  
        hi: { type: String },  
        bn: { type: String },  
        fr: { type: String },  
        es: { type: String }   
    },
    answers: {
        en: { type: String, required: true },  
        hi: { type: String },  
        bn: { type: String },  
        fr: { type: String },  
        es: { type: String }  
    },
    createdAt: { type: Date, default: Date.now }
}, {collection:'FAQList'});

module.exports = mongoose.model("FAQ", FAQSchema);;
