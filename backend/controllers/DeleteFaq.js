const FAQmodel = require("../models/FAQ_list")

const deleteFAQ = async (req, res) => {
    
    try {
        const id = req.params.id; 

        const toCancel = await FAQmodel.findByIdAndDelete(id);
    
        if (!toCancel) {
            return res.status(404).json({ message: "FAQ not found" });
        }
    
        res.status(200).json({ message: "FAQ deleted successfully", data: toCancel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
}

module.exports = { deleteFAQ }
