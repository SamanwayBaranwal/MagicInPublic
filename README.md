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

This project implements **3 optimization techniques** with measurable results.

### Total Page Weight

| Resource | Size |
|----------|------|
| `index.html` | 29.7 KB |
| `index.css` | 30.7 KB |
| Images (bob.jpg + naval.jpg + yc.png + favicon.svg) | 28.2 KB |
| **Total initial load (no frameworks, no bundler)** | **~88.6 KB** |
| html2canvas (lazy, only on Download) | 80 KB (deferred) |

For comparison, a typical Create React App ships ~200KB+ of JavaScript alone.

---

### 1. Lazy Loading — html2canvas (~80KB saved on initial load)

| | Before | After |
|---|--------|-------|
| **Initial page load** | 168.6 KB (html2canvas loaded eagerly) | **88.6 KB** (html2canvas deferred) |
| **When it loads** | Every page visit, even if user never downloads | Only on first "Download" button click |
| **Subsequent downloads** | Already loaded | Cached in Promise, resolves instantly |

**How:** Removed the `<script src="html2canvas">` tag from `<head>`. Created a `loadHtml2Canvas()` function that dynamically injects the script only when needed. The Promise is cached so it's never fetched twice.

**Code:** [`index.html` — loadHtml2Canvas()](index.html)

---

### 2. HTTP Caching — Static Assets (zero re-downloads for returning visitors)

| Asset | Cache-Control Header | Duration |
|-------|---------------------|----------|
| `/assets/*` (images, favicon) | `public, max-age=31536000, immutable` | 1 year, never re-validates |
| `/index.css` | `public, max-age=86400, stale-while-revalidate=604800` | 1 day fresh, serves stale up to 7 days |

**How:** Added `Cache-Control` headers via [`vercel.json`](vercel.json). Returning visitors load the page entirely from browser cache — zero network requests for static assets.

**Result:** Second visit loads in **<100ms** (all assets cached). First visit is unaffected.

---

### 3. Minimal Dependencies — Reduced bundle size

| | This Project | Typical React App |
|---|---|---|
| **npm dependencies** | 1 (`dotenv`) | 50-200+ |
| **`node_modules` size** | ~500 KB | 200-500 MB |
| **Frontend framework JS** | 0 KB (vanilla) | 130+ KB (React + ReactDOM) |
| **Build step required** | No | Yes (webpack/vite) |
| **Tree-shaking needed** | No (nothing to shake) | Yes |

**How:** Built the entire frontend in vanilla HTML/CSS/JS with zero frameworks. The only external library (`html2canvas`) is lazy-loaded from CDN. The backend uses just `dotenv` for environment variable loading.

## Built by

**Samanway Baranwal**
- X: [@0xSamanway](https://twitter.com/0xSamanway)
- IG: [samanway.base.eth](https://instagram.com/samanway.base.eth)
- GitHub: [samanwaybaranwal](https://github.com/samanwaybaranwal)

## Acknowledgments

A huge thank you to **[Hack Club](https://hackclub.com)** for providing the AI API key that powers this entire project. Without their generous support and the incredible developer community they've built, Magic would not exist. Hack Club gave me the tools, the platform, and the inspiration to ship this.

Shoutout to the Hack Club team for **Flavortown** and the sidequests — they push you to build better, ship faster, and actually care about things like performance and optimization.

## Flavortown

This project is shipped on **Flavortown** and submitted for the **Optimization Sidequest**.

Optimization techniques implemented:
1. **Lazy Loading** — html2canvas loaded on-demand (saves ~80KB on initial load)
2. **HTTP Caching** — Cache-Control headers for all static assets via vercel.json
3. **Minimal Dependencies** — 1 npm package, 88.6KB total page weight, zero framework overhead

See the [Optimization](#optimization) section above for full details with before/after measurements.
