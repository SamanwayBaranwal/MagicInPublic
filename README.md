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

## Run Locally

The entire application runs from a single unified server. No separate frontend dev servers required.

```bash
git clone https://github.com/samanwaybaranwal/MagicInPublic.git
cd MagicInPublic

# Install dependencies (express, cors, dotenv)
npm install

# Add your Hack Club API key to a .env file
echo "API_KEY=your_api_key_here" > .env

# Start the server
node server.js
```

Open `http://localhost:3000` in your browser.

## Built by

**Samanway Baranwal**
- X: [@0xSamanway](https://twitter.com/0xSamanway)
- IG: [samanway.base.eth](https://instagram.com/samanway.base.eth)
- GitHub: [samanwaybaranwal](https://github.com/samanwaybaranwal)
