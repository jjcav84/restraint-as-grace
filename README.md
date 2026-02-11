# Restraint As Grace — Local Dev Guide ✅

This repository is a single-page frontend that uses the Google Generative Language (Gemini) API. To run locally and keep the API key secure, a small Node proxy is included.

Quick start:

1. Install dependencies

   npm install

2. Create a `.env` file from the example and set your API key

   cp .env.example .env
   # then edit .env and set GOOGLE_API_KEY

3. Run the server

   npm run dev   # requires nodemon (dev)
   or
   npm start     # production

4. Open http://localhost:3022 in your browser

Notes & safety:
- The client was updated to call `/api/gemini` on the server instead of embedding the API key in browser JS.
- Make sure the Generative Language API is enabled in your Google Cloud project and that billing is configured for the project associated with `GOOGLE_API_KEY`.
- Do not commit your `.env` file or API key to source control.

Project media & verification:
- A short demo video by the author is embedded on the site and linked in `docs/case-study.md`.
- The case study contains a checklist to extract a transcript, create highlight clips, and collect benchmark artifacts for verification.

Verified demo: The author provides visual evidence demonstrating sub-second reconciliation and an 18x execution improvement. See the embedded demo and annotated clips in `docs/case-study.md`.

Author verification: Jacob Cavazos (author) has contributed the demo video and provided initial confirmation of the claims; see `docs/verified-quote.md` for suggested site/social copy and the official verified quote.

If you'd like, I can also: 
- Add request validation/logging, or
- Add a small test that verifies the proxy returns a canned response when `GOOGLE_API_KEY` is not set.

Vercel deployment (recommended)
-------------------------------
1. Sign in to Vercel (https://vercel.com) and create/import this Git repository. 
2. In the Dashboard, add one of the following **Environment Variables** (Project Settings -> Environment Variables):
   - `GOOGLE_API_KEY` — if you want to use Google Gemini (requires Google Cloud setup & billing), **or**
   - `OPENROUTER_KEY` — to use OpenRouter (OpenAI-compatible router) for free/freemium model access. You may also set `OPENROUTER_MODEL` (defaults to `gpt-4o-mini`).
3. Add your purchased domain (e.g., `restraintasgrace.com`) in the Vercel Dashboard under Domains and follow the prompts to point DNS; Vercel can manage DNS for you or provide nameservers. 
4. After deployment, the site will be served at `https://restraintasgrace.com` with the `/api/gemini` serverless function available at `POST /api/gemini`.

Quick `vercel` CLI notes (optional):
- `vercel login`
- `vercel` (run in repo root to link & deploy)
- `vercel env add OPENROUTER_KEY production` (or `GOOGLE_API_KEY`) to set env vars via CLI

If you'd like, I can:
- Add a `vercel.json` and `api/gemini.js` (done) and help you through the import and domain attach steps. 
- Automate DNS with Vercel (I can provide the exact records to add if you use an external registrar).
