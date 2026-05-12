# ⚽ FIFA FanZone 2026

> **Your personal World Cup watch party headquarters.**
> RSVP, predict the champion, track the schedule, and celebrate the beautiful game — all in one place.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/krod7)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![World Cup](https://img.shields.io/badge/FIFA%20World%20Cup-2026-green)](https://www.fifa.com)

---

## 📖 Overview

FIFA FanZone 2026 is a fan-built event hub for the 2026 FIFA World Cup — hosted across the United States, Canada, and Mexico. It centralizes everything your watch party group needs: event info, RSVPs, bracket predictions, and community connection, without forcing anyone to dig through group chats or spreadsheets.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — just open and go.

---

## ✨ Features

### ✅ Live (MVP)

| Feature                   | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Countdown Timer**       | Real-time countdown to Opening Match kickoff (June 11, 2026)                   |
| **RSVP Form**             | Name, email, and home country submission with flag display                     |
| **Champion Bracket Pick** | Select your predicted 2026 World Cup winner from all 48 qualified nations      |
| **Game Schedule Grid**    | Match card layout with pagination arrow for additional fixtures                |
| **Dark Mode**             | Full light/dark theme toggle with `localStorage` persistence                   |
| **Explore Links**         | Curated external resources: FIFA, FotMob, OneFootball, Goal.com, Transfermarkt |
| **Social Footer**         | Links to Instagram, Snapchat, GitHub, and LinkedIn                             |

### 🚧 In Progress

| Feature                                              | Status                             |
| ---------------------------------------------------- | ---------------------------------- |
| Real Group Stage match data (teams, times, stadiums) | Pending FIFA schedule confirmation |
| Mobile responsive layout                             | In development                     |
| RSVP persistence via `localStorage`                  | Planned                            |
| Bracket leaderboard (live)                           | Planned                            |
| Scroll-arrow match grid toggle                       | In development                     |

### 💡 Planned (Post-MVP)

| Feature                    | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| **Community Gallery**      | Fan photo carousel + embedded highlight videos             |
| **Breaking News Ticker**   | Live football headlines via news API                       |
| **Shareable Bracket Card** | Auto-generated image card of your champion pick            |
| **Push Notifications**     | Kickoff reminders for watch party guests                   |
| **Real-time Leaderboard**  | Track who predicted correctly as the tournament progresses |

---

## 🗂️ Project Structure

```
World Cup Fan Event/
├── index.html              # Main page — all sections in one file
├── styles.css              # Global styles + dark mode + component styles
├── script.js               # Countdown, RSVP logic, bracket, dark mode toggle
├── qualified-countries.json # 48 nations qualified for the 2026 World Cup
├── all-countries.json       # Full world countries list (for RSVP home country)
├── LICENSE                  # MIT License
├── README.md                # You are here
└── img/                     # Image Directory implemented in UI
    ├── flags/
    ├── social-icons/
    ├── soccer-banner.jpg
    ├── worldcup-icon.png
    ├── confetti-animation.gif
    ├── fun&food-icon.gif
    ├── memories-icon.gif
    └── placeholder.png
```

---

## 🚀 Getting Started

### Prerequisites

No build tools required. This project runs entirely in the browser.

### Local Development

```bash
# Clone the repository
git clone https://github.com/krod7/world-cup-fan-event.git

# Navigate to the project directory
cd "World Cup Fan Event"

# Open in browser (macOS)
open index.html

# Or serve locally to avoid CORS issues with fetch() calls
npx serve .
# → Available at http://localhost:3000
```

> **Note:** The `fetch()` calls for `qualified-countries.json` and `all-countries.json` require a local server when running on some browsers. Use `npx serve .` or the Live Server VS Code extension.

---

## 🎨 Design System

### Color Palette

| Variable          | Hex       | Usage                                      |
| ----------------- | --------- | ------------------------------------------ |
| `--canary-yellow` | `#FFCC00` | Countdown, accents — homage to Brazil 2014 |
| `--verdant-green` | `#009739` | About section shadow, success states       |
| `--ocean-blue`    | `#3E8EDE` | Links, match card shadows, submit button   |
| `--sunset-orange` | `#FF6F3C` | Hover states, link highlights              |
| `--maple-red`     | `#D72638` | Hero h1, RSVP shadows — Canada host nation |
| `--desert-sage`   | `#B5C9A5` | Mexico host nation accent                  |
| `--patriot-blue`  | `#1C3F94` | Navbar, headings — USA host nation         |
| `--cloud-white`   | `#F4F4F4` | Light mode background                      |
| `--charcoal`      | `#2e2e2e` | Dark mode background, body text            |

> The primary palette pays homage to the **2014 Brasil World Cup** (yellow + green + blue). Accent colors represent the **three 2026 host nations** (Canada 🇨🇦, Mexico 🇲🇽, USA 🇺🇸).

### Typography

| Font               | Usage                           |
| ------------------ | ------------------------------- |
| `Permanent Marker` | All headings (h1–h6)            |
| `Kalam`            | Body text, labels, descriptions |
| `Monoton`          | Countdown timer display         |
| `Roboto Mono`      | Footer text, monospace elements |

---

## 🌍 Country Data

### `qualified-countries.json`

Contains all **48 nations** that qualified for the 2026 FIFA World Cup. Keys are ISO 3166-1 alpha-2 country codes (matching flag image filenames). Used in the Bracket Champion Picker.

### `all-countries.json`

Contains ~250 countries worldwide. Used in the RSVP Home Country dropdown so any fan from any nation can represent.

**Flag images** live in `img/flags/` and follow the naming convention `{iso-code}.png`

---

## 🗓️ Key Dates

| Date                   | Milestone                             |
| ---------------------- | ------------------------------------- |
| June 11, 2026          | **Opening Match — Tournament Begins** |
| June 11 – July 2, 2026 | Group Stage (48 matches)              |
| July 2–5, 2026         | Round of 32                           |
| July 5–9, 2026         | Round of 16                           |
| July 9–12, 2026        | Quarterfinals                         |
| July 14–16, 2026       | Semifinals                            |
| July 19, 2026          | **Final — MetLife Stadium, New York** |

---

## 🧩 Key Implementation Notes

### Dark Mode

- Toggled by adding/removing the `dark` class on `<html>`
- Preference persisted in `localStorage` under the key `"theme"`
- Falls back to `prefers-color-scheme` system setting on first visit

### Country Dropdowns

- Custom-built (no library) — opens/closes via `.open` class toggle
- Closes on outside click via document-level click listener
- Flag images injected dynamically from JSON data
- Both dropdowns (bracket + RSVP) use the same `.country-dropdown` component pattern

### Modals

- Both RSVP and Bracket modals use `.modal` / `.modal.show` visibility pattern
- Auto-dismiss after 8 seconds via `setTimeout`
- Also closable via `.close-btn` click

### Form Validation

- RSVP form validates: name (min 2 chars), email (regex `__@__.__ `), country (non-empty)
- Invalid fields highlighted with `.invalid` class (red border + tint)
- Validation state resets on each submission attempt

---

## 🔧 Known Issues & Backlog

- [ ] **No mobile breakpoints** — layout breaks below ~768px (highest priority)
- [ ] **Schedule has placeholder data** — needs real Group Stage match info
- [ ] **RSVP count resets on refresh** — no `localStorage` persistence yet
- [ ] **Leaderboard hidden** — marked `hidden` in HTML, needs real data pipeline
- [ ] **Gallery hidden** — section exists but unpopulated, needs real photos
- [ ] **Scroll arrow not wired** — `#scroll-btn` click handler missing from `script.js`
- [ ] **Hero needs min-height** — background image crops on smaller viewports

---

## 🚦 Roadmap to June 11 Launch

### Week 1 — Foundation

- [ ] Add mobile responsive CSS (hamburger nav, single-column layout below 768px)
- [ ] Wire up scroll arrow button to toggle `#upcoming-matches`
- [ ] Add `localStorage` for RSVP count persistence

### Week 2 — Real Data

- [ ] Replace placeholder match cards with real Group Stage fixtures
- [ ] Unhide and populate bracket leaderboard with initial picks
- [ ] Add actual stadium names and match times (CT timezone)

### Week 3 — Polish

- [ ] Scroll-reveal animations on section entry (IntersectionObserver)
- [ ] Shareable bracket card or social media share button
- [ ] Final cross-browser + mobile device testing

### Post-Launch

- [ ] Community gallery activation
- [ ] Leaderboard updates as tournament progresses
- [ ] News ticker integration

---

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/mobile-nav`)
3. Commit your changes (`git commit -m 'Add hamburger menu for mobile'`)
4. Push to the branch (`git push origin feature/mobile-nav`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Kaleb Rodriguez**

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/kaleb.rodriguez07/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaleb-rodriguez7)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/krod7)

---

_Built with ⚽ for the beautiful game. FIFA FanZone 2026 is an independent fan project and is not affiliated with or endorsed by FIFA._
