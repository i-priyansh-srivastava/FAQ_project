const FAQ = require("../models/FAQ_list");  

const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({});
        res.json(faqs);
        console.log(faqs);
    } 
    catch (error) {
        res.status(500).send('Error fetching doctors data');
    }
};

module.exports = { getFAQs };
