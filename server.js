const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

let textData = '';

// Increase the limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Endpoint to save text data
app.post('/save', (req, res) => {
    textData = req.body.text;
});

// Endpoint to retrieve text data
app.get('/retrieve', (req, res) => {
    res.json({ text: textData });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
