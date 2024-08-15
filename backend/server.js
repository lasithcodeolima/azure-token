require('dotenv').config();  

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.post('/token', async (req, res) => {
    try {
        const response = await axios.post(
            process.env.OAUTH_TOKEN_URL,
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                scope: process.env.SCOPE,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching token:', error);
        res.status(500).send('Error fetching token');
    }
});

app.post('/authenticate', (req, res) => {
    const { token } = req.body;

    console.log('Received Token for Authentication:', token);

    if (token) {
        res.json({ success: true, message: 'Token is valid' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
