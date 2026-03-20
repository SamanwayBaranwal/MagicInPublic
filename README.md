# MagicInPublic ✧

An AI-powered startup idea analyzer designed to give you raw, unfiltered reactions from real personas—all wrapped in a stunning, cinematic digital experience.

![Magic Analysis Preview](./assets/preview.png) *(Preview snapshot)*

## Features

- **Cinematic Experience:** A fullscreen looping video background with frosted, glassmorphic UI elements and a liquid-glass input field.
- **Ambient Animations:** Dynamic, floating background orbs and subtle pulse animations that bring the results pages to life.
- **7Cs Actionable Framework:** No fluffy essays. The AI characters respond with extreme clarity and brutal constraints:
  - **Mom** — Your biggest hater & fan, offering emotional reality checks.
  - **The Builder** — Shipped 3 startups, got funded by YC, mass-quit twice. Delivers pure action (`PROBLEM` -> `WHY IT MATTERS` -> `DO THIS`).
  - **YC Partner** — Simulated Y Combinator partner analysis that only asks the sharpest, most painful questions about your wedge and market.
  - **Brutal Truth** — One line that hits hard and shatters your delusions.
  - **The Numbers** — Quantifiable scores for Uniqueness, Demand, Difficulty, and Stickiness.
- **Export to Image:** Instantly generate shareable screenshots of your brutal feedback or Mom's review.

## Tech Stack & Design

- **Core Engine:** Vanilla HTML / CSS / JS, fully responsive.
- **Backend:** Node.js server acting as a secure proxy to the AI API.
- **AI Intelligence:** Hack Club API (Qwen model) mapped with advanced, highly-constrained system prompts.
- **Typography:** `Instrument Serif` for a premium cinematic display, matched with `Inter` for hyper-legible body text.
- **Aesthetic:** "Retina Glass" — heavy use of backdrop-blur, semi-transparent liquid-glass borders, subtle inner shadows, and dynamic gradient overlays.

## Deploy to Vercel (Recommended)

This project is perfectly optimized for **Vercel Serverless**. The frontend is static, and the backend securely runs via a Serverless function in the `api/` folder. This ensures infinite scaling, zero cold-starts, and **100% security for your API Key**.

1. Create an account on [Vercel.com](https://vercel.com) and connect your GitHub.
2. Import the `MagicInPublic` repository.
3. Before clicking deploy, go to **Environment Variables** and add:
   - Name: `API_KEY`
   - Value: `your_hack_club_api_key_here`
4. Click **Deploy**. Vercel will automatically serve the frontend and route requests to the secure `api/analyse.js` serverless function. 

*Your API key never touches the browser.*

## Run Locally

If you want to test it locally before deploying:

```bash
git clone https://github.com/samanwaybaranwal/MagicInPublic.git
cd MagicInPublic

# Install dependencies (express, cors, dotenv)
npm install

# Add your Hack Club API key to a .env file
echo "API_KEY=your_api_key_here" > .env

# Start the local server
node server.js
```

Open `http://localhost:3000` in your browser.

## Optimization

This project implements the following optimization techniques:

### 1. Lazy Loading (html2canvas)

**What:** The `html2canvas` library (~80KB) is used only for the "Download" card feature. Previously, it was loaded eagerly on every page visit via a `<script>` tag in `<head>`.

**How:** Replaced the eager `<script>` tag with a dynamic loader function (`loadHtml2Canvas()`) that only fetches the library when a user clicks "Download" for the first time. The loaded script is cached in a Promise so it's never fetched twice.

**Result:**
- Initial page load: **-80KB** smaller (the library is never downloaded if the user doesn't click Download)
- Returning downloads: instant (cached Promise resolves immediately)
- Zero impact on functionality — downloads work exactly the same

### 2. HTTP Caching (Static Assets)

**What:** Static assets (images, favicon, CSS) were re-downloaded on every visit with no cache headers.

**How:** Added `Cache-Control` headers via `vercel.json`:
- **Images/assets:** `public, max-age=31536000, immutable` (cached for 1 year, never re-validated)
- **CSS:** `public, max-age=86400, stale-while-revalidate=604800` (cached 1 day, serves stale for up to 1 week while revalidating in background)

**Result:**
- Returning visitors load the page **instantly** from browser cache
- First-time visitors still get fresh assets
- Zero bandwidth wasted on repeat visits

### 3. Minimal Dependencies

**What:** The entire project runs on just 1 npm dependency (`dotenv`) and 1 CDN library (`html2canvas`, lazy-loaded).

**Result:**
- `node_modules` is ~500KB total (vs. typical React projects at 200MB+)
- No build step, no bundler, no tree-shaking needed — there's nothing to shake
- Frontend is pure vanilla HTML/CSS/JS — zero framework overhead

## Built by

**Samanway Baranwal**
- X: [@0xSamanway](https://twitter.com/0xSamanway)
- IG: [samanway.base.eth](https://instagram.com/samanway.base.eth)
- GitHub: [samanwaybaranwal](https://github.com/samanwaybaranwal)
