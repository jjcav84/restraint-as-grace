require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';

app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt, systemInstruction, isJson } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    if (isJson) {
      payload.generationConfig = {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            reflections: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  title: { type: 'STRING' },
                  icon: { type: 'STRING' },
                  desc: { type: 'STRING' }
                }
              }
            }
          }
        }
      };
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing server-side GOOGLE_API_KEY. Set it in .env.' });

    const response = await axios.post(`${MODEL_URL}?key=${apiKey}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Proxy Error:', err?.response?.data || err.message || err);
    res.status(500).json({ error: 'Proxy error', detail: err?.response?.data || err.message });
  }
});

// Static file serving (serve the existing index.html)
app.use(express.static(path.join(__dirname, '/')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3022;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
