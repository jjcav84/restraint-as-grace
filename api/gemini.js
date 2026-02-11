const axios = require('axios');

const GOOGLE_MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';
const OPENROUTER_URL = 'https://api.openrouter.ai/v1/chat/completions';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, systemInstruction, isJson } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // --- Google Gemini payload ---
  const googlePayload = { contents: [{ parts: [{ text: prompt }] }] };
  if (systemInstruction) googlePayload.systemInstruction = { parts: [{ text: systemInstruction }] };
  if (isJson) {
    googlePayload.generationConfig = {
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

  // Provider fallback order: Google -> OpenRouter (OpenAI-compatible router)
  try {
    // 1) Google Gemini if key available
    const googleKey = process.env.GOOGLE_API_KEY;
    if (googleKey) {
      const gResp = await axios.post(`${GOOGLE_MODEL_URL}?key=${googleKey}`, googlePayload, { headers: { 'Content-Type': 'application/json' } });
      return res.status(200).json(gResp.data);
    }

    // 2) OpenRouter fallback (OpenAI-compatible)
    const openRouterKey = process.env.OPENROUTER_KEY;
    if (openRouterKey) {
      const messages = [{ role: 'user', content: prompt }];
      const orPayload = { model: process.env.OPENROUTER_MODEL || 'gpt-4o-mini', messages };
      const orResp = await axios.post(OPENROUTER_URL, orPayload, { headers: { 'Authorization': `Bearer ${openRouterKey}`, 'Content-Type': 'application/json' } });
      return res.status(200).json(orResp.data);
    }

    // 3) Hugging Face note: add HF integration here if desired (use HF token and model endpoint)

    // No provider configured
    return res.status(500).json({ error: 'No provider available. Set GOOGLE_API_KEY or OPENROUTER_KEY in environment.' });
  } catch (err) {
    console.error('Proxy Error:', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'Proxy error', detail: err?.response?.data || err.message });
  }
};
