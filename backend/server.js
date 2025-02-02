const express = require("express")
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded ({extended: false}))
const router = express.Router();

require("dotenv").config();

const dbConnect = require('./Configs/database');
dbConnect();
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("Backend started");
})


app.listen(PORT, () => {
    console.log(`Server instantiated on Port: ${PORT}`);
})

const routeMount = require('./routes/FAQroutes.js')
app.use('/api/v1', routeMount)