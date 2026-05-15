# ⚽ FIFA FanZone 2026

> **48 Countries. One Tournament. Where's Your Party?**
> Pin your watch location, predict the champion, track the bracket, and celebrate the beautiful game — all in one place.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/krod7)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![World Cup](https://img.shields.io/badge/FIFA%20World%20Cup-2026-green)](https://www.fifa.com)

---

## 📖 Table of Contents

1. [Product Overview](#-product-overview)
2. [Problem Definition](#-problem-definition)
3. [Target Users](#-target-users)
4. [Value Proposition](#-value-proposition)
5. [Feature Prioritization](#-feature-prioritization)
6. [User Flow](#-user-flow)
7. [Differentiation Strategy](#-differentiation-strategy)
8. [Success Metrics](#-success-metrics)
9. [Risks & Weaknesses](#-risks--weaknesses)
10. [MVP Launch Plan](#-mvp-launch-plan)
11. [Design Principles](#-design-principles)
12. [Information Architecture](#-information-architecture)
13. [Core Screens & Layout](#-core-screens--layout)
14. [UX Philosophy](#-ux-philosophy)
15. [Visual Design System](#-visual-design-system)
16. [Engagement Design](#-engagement-design)
17. [Accessibility & Usability](#-accessibility--usability)
18. [Competitive Inspiration](#-competitive-inspiration)
19. [Developer Handoff Notes](#-developer-handoff-notes)
20. [Sketch Review & Critique](#-sketch-review--critique)
21. [Project Structure](#-project-structure)
22. [Getting Started](#-getting-started)
23. [Key Dates](#-key-dates)
24. [Build Schedule](#-build-schedule)
25. [Known Issues & Backlog](#-known-issues--backlog)
26. [Contributing](#-contributing)
27. [License](#-license)
28. [Author](#-author)

---

## 📦 Product Overview

FIFA FanZone 2026 is a fan-built event hub for the 2026 FIFA World Cup, hosted across the United States, Canada, and Mexico. It turns the social chaos of a World Cup watch party into a structured, interactive, and shareable experience — connecting fans globally through a live community map, a full bracket challenge, and real-time match data, all without requiring an app download or account creation.

Built with vanilla HTML, CSS, and JavaScript. Firebase on the backend. No frameworks, no build step — open and go.

---

## 🎯 Problem Definition

### The Core Problem

Every four years, the World Cup creates a global moment of connection. But that connection is fragmented: groups manage RSVPs across text threads, predict champions in spreadsheets, and watch parties have no shared digital home.

### Who Experiences This & How Often

- **Casual fans** who want to join the excitement but don't know where to watch or who to root for — they experience this confusion during every major tournament (every 4 years, but also at EURO, Copa América, and Champions League).
- **Organized host fans** who run watch parties for their friend group and manage logistics entirely via group chats — they feel this pain every match week (up to 8 matches per day in the group stage).
- **Diaspora communities** who are emotionally invested in a specific national team and want to connect with others rooting for the same country — they want this year-round but feel it most acutely during World Cup.

### Why Existing Solutions Are Insufficient

| Tool                             | What It Does            | Why It Falls Short                                              |
| -------------------------------- | ----------------------- | --------------------------------------------------------------- |
| Group chats (WhatsApp, iMessage) | Coordinate watch plans  | No structured RSVP, prediction tracking, or community discovery |
| FIFA Official App                | Match schedules, scores | No social layer, no watch party features, sterile UX            |
| FotMob / OneFootball             | Live stats & news       | No community or prediction features                             |
| Spreadsheets                     | Bracket predictions     | Zero UX, no sharing, manual updates, not mobile-friendly        |
| Reddit / Twitter                 | Discussion & hype       | Overwhelming noise, no personalization, no event coordination   |

There is no single hub that combines event planning, community discovery, and bracket competition in a way that feels personal and social.

---

## 👥 Target Users

### Persona 1 — The Social Organizer ("The Host")

**Profile:** 22–35 years old, college-educated, hosts watch parties for 5–20 people regularly during major tournaments. Follows football casually but deeply cares about the shared experience.

**Motivations:**

- Wants a clean, impressive tool to manage RSVPs and hype up the group
- Loves the idea of a leaderboard to fuel friendly competition
- Wants to look organized without putting in admin work

**Frustrations:**

- Chasing down RSVP confirmations via DM
- Building bracket spreadsheets manually
- No easy way to share match schedules or keep everyone on the same page

**Behaviors:**

- Shares links to the group chat frequently
- Checks the app before and after matches
- Competitive — will refresh the leaderboard multiple times

### Persona 2 — The Football Fanatic ("The Devotee")

**Profile:** 18–40 years old, follows football year-round, has a strong allegiance to a specific national team. May be watching alone or with 1–2 close friends.

**Motivations:**

- Wants to feel connected to a global fan community during the tournament
- Cares deeply about tracking predictions and proving they have the best football knowledge
- Excited to see how many fans worldwide are watching the same team

**Frustrations:**

- Feels isolated watching alone while the world celebrates
- Existing apps don't capture the emotional energy of the tournament
- Can't easily find others rooting for the same team in their area

**Behaviors:**

- Visits multiple times per matchday
- Engages deeply with the bracket and leaderboard
- Will share their bracket prediction on social media if it looks good

### Persona 3 — The Casual Joiner ("The Bandwagoner")

**Profile:** 25–45 years old, watches the World Cup every four years, doesn't follow club football. Drawn in by the global event energy and social pressure from friends.

**Motivations:**

- Wants to participate without looking clueless
- Enjoys the social ritual more than the sport itself
- Will make a bracket pick just to have a stake in the outcome

**Frustrations:**

- Overwhelmed by complex football knowledge sites
- Doesn't know where to watch or who to root for
- Needs simple entry points (one pick, one form)

**Behaviors:**

- Signs up once, checks the leaderboard occasionally
- More likely to use the globe/map than the full bracket challenge
- Converts to a repeat visitor if their country is doing well in the tournament

---

## 💎 Value Proposition

### Why Users Choose FanZone Over Alternatives

FanZone is the only product that combines **community discovery** (where is everyone watching?), **personal stakes** (who do you think wins?), and **real-time tournament data** in a single, frictionless, beautiful experience.

### The Hook (Drives Initial Visits)

> **"48 Countries. One Tournament. Where's Your Party?"**

The community globe is the hook. Users see a live world map dotted with fan pins and immediately want to add theirs. It's visual, social, and personal — the first moment creates a sense of belonging to something bigger.

### The Retention Loop (Keeps Users Coming Back)

```
Match result → Bracket scores update → Leaderboard shifts → User checks standings
       ↑                                                             ↓
New match approaches ← Push notification / ticker alert ← User shares their rank
```

The tournament's natural rhythm (3–4 matches per day during group stage) creates built-in return triggers. The bracket leaderboard creates personal investment: every match result matters because it moves your position.

---

## ⚡ Feature Prioritization

### Must-Have (MVP — Before June 11)

| Feature                      | Justification                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Countdown Timer**          | Creates urgency and anchors the product to the event. Zero cost to build, high emotional impact.                                           |
| **News Ticker (Sticky)**     | Keeps users informed with zero friction. Drives return visits without requiring a separate news product. Stays in viewport at all times.   |
| **Community Globe / Map**    | The primary hook. Visualizes "where is everyone watching" in a compelling, shareable way. Drives organic sharing ("look, I'm on the map"). |
| **Globe Pin Form**           | Name + country → pin on globe. Low friction. Email optional (or captured later).                                                           |
| **Globe Leaderboard**        | Shows top watch-party countries (most pins per country). Fuels national pride and repeat visits.                                           |
| **Champion Bracket Pick**    | Single pick, lowest-friction prediction. 30 seconds to complete. Keeps casual users engaged.                                               |
| **Full Bracket Challenge**   | Group stage picks (A–L) + KO stage bracket. Core product for the Devotee persona.                                                          |
| **Bracket Leaderboard**      | Tracks points as results come in. The #1 retention driver. Must update automatically.                                                      |
| **Game Schedule**            | Real match data: teams, times (CT), stadiums. No placeholder cards.                                                                        |
| **Mobile Responsive Layout** | 60–70% of traffic will be mobile. This is not optional.                                                                                    |
| **Dark Mode**                | Already built. Keep it — reduces eye strain for late-night match watching.                                                                 |

### Nice-to-Have (V1.1 — During Tournament)

| Feature                              | Justification                                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Shareable Bracket Card**           | Auto-generated image card of bracket pick. High virality potential — each share is a free ad.        |
| **Push / Browser Notifications**     | "Match kicks off in 30 minutes" — drives same-session return.                                        |
| **Gallery: Fan Photo Upload**        | Community content extends dwell time. Low-cost to seed by posting your own photos first.             |
| **Country Stats in Bracket Section** | "X% of fans picked Brazil to win" — social proof layer that makes the bracket feel alive.            |
| **RSVP Email Persistence**           | Store RSVPs in Firestore so count survives refreshes. Builds social proof ("47 people are joining"). |

### Future Ideas (Post-Tournament or V2)

| Feature                           | Justification                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Live Score Overlay**            | Real-time scores inside the product during matches. Keeps users from leaving to check scores elsewhere. |
| **Watch Party Finder**            | Let hosts make their party discoverable to nearby fans. Geo-based community building.                   |
| **Fan Forum / Match Chat**        | Live discussion thread per match. High engagement, high moderation cost.                                |
| **Multi-Tournament Support**      | Expand to EURO 2028, Copa América, Champions League. Recurring revenue model.                           |
| **Breaking News API Integration** | Replace static ticker with live football headlines from a news API.                                     |

---

## 🗺️ User Flow

### First-Time Visitor

```
1. Land on Hero section
   → Title ("World Cup FanZone 2026") + Countdown immediately visible
   → Ticker cycling football news above hero
   → Two CTAs: "Make Predictions" and "View Schedule"

2. Scroll to Community Globe
   → "48 Countries. One Tournament. Where's Your Party?"
   → Sees the live map dotted with fan pins from around the world
   → Reads leaderboard: "🇧🇷 Brazil – 847 fans watching"
   → Feels FOMO → clicks "Add Your Pin"

3. Pin Form (Name + Country + Submit)
   → Low friction: 3 fields, one click
   → Confirmation: pin animates onto the globe
   → Leaderboard updates live

4. Scrolls to Bracket Challenge
   → Prompted with a friendly headline: "Who lifts the cup?"
   → Picks champion via dropdown (lowest-friction entry)
   → Invited to do full bracket (Group Stage A–L → KO Rounds)
   → Submits. Confirmation modal fires with trophy animation.

5. Views Schedule
   → Scans real match cards (Group A Matchday 1, etc.)
   → Bookmark or share the page

6. Footer → Follows social links, bookmarks the page
```

### Returning Visitor (Match Day)

```
1. Ticker immediately shows latest headlines
2. Checks bracket leaderboard for rank update after last result
3. Scans schedule for today's matches
4. Checks community globe leaderboard (which countries jumped up?)
5. Shares rank or bracket on social
```

---

## 🏆 Differentiation Strategy

### What Makes FanZone Stand Out

**1. The Community Globe is genuinely novel.**
No other fan site shows you a live, pinned world map of where fans are watching from. It's visual, social, and emotionally resonant — it makes you feel like part of a global moment, not just a website visitor.

**2. Full bracket + leaderboard replaces spreadsheet hell.**
Existing fan bracket tools are either too complex (fantasy football platforms) or too simple (single-pick apps). FanZone threads the needle: quick entry for casual fans (champion pick only) with a full tournament bracket for devotees — all in the same product.

**3. Built for the watch party, not the pundit.**
The design language is festive, energetic, and personal. It's not trying to be ESPN. It's built for a friend group's watch party, which is an underserved niche.

### Virality Mechanisms

- **Globe pins:** Every person who pins their location sees the map and shares it — "look, I'm on the map!" Each share drives new pins.
- **Shareable bracket card:** Auto-generated card showing your picks and current rank. Frictionless share to Twitter/Instagram Stories.
- **Leaderboard ranking:** People who rank highly will share. People who drop after a match result will want to show they were close.
- **National pride:** If Brazil fans see "🇧🇷 Brazil — #1 most-watched country," they share it.

---

## 📊 Success Metrics

### Primary Metrics

| Metric                   | Definition                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Globe Pins Submitted** | # of fan pins added to the community map. Proxy for activation.                                                  |
| **Bracket Submissions**  | # of complete bracket picks. Proxy for engaged users.                                                            |
| **DAU/MAU Ratio**        | Daily vs. monthly active users. Target: >40% ratio during group stage (3 match days/week drives natural return). |
| **Session Return Rate**  | % of users who return within 7 days. Target: >50% during group stage.                                            |

### What Success Looks Like

**Month 1 (June — Group Stage):**

- 200+ globe pins across 20+ countries
- 75+ full bracket submissions
- 500+ unique visitors per matchday
- Social shares generating at least 25% of new traffic

**Month 3 (End of Tournament — July):**

- At least one bracket leaderboard leader organically shares their win
- Globe map has pins from all 6 inhabited continents
- 30-day retention rate: >20% (users checking back for results)

**1 Year Out (Post-Tournament):**

- Architecture ready to reactivate for EURO 2028
- Email list (from optional captures) with 100+ subscribers for next tournament launch
- Open-source contributions from at least 2 external developers

---

## ⚠️ Risks & Weaknesses

| Risk                                                    | Likelihood | Impact | Mitigation                                                                                              |
| ------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------- |
| **Traffic only during tournament (June–July)**          | High       | Medium | Capture emails, keep the site live as an archive. Seeds returning traffic for next tournament.          |
| **Globe pins become stale if not real-time**            | Medium     | High   | Use Firestore real-time listener so the map updates live without page refresh.                          |
| **Bracket scoring bugs after real results post**        | Medium     | High   | Test scoring logic with simulated results before the tournament. Add a manual admin override.           |
| **Mobile layout breaks on critical devices**            | High       | High   | Prioritize mobile CSS before launch. Test on iOS Safari (most common failure point).                    |
| **No real match data before FIFA publishes schedule**   | High       | Medium | Group stage schedule is now public. Hard-code it. KO fixtures populate automatically after groups.      |
| **Low globe pin count at launch (empty map looks sad)** | Medium     | High   | Seed the map with ~20 personal pins from friends/family before making it public. Perception is reality. |
| **Firebase costs spike if viral**                       | Low        | Medium | Set Firebase budget alerts. The read pattern (everyone reads, few write) is cheap at scale.             |

---

## 🚀 MVP Launch Plan

### What to Build First (Priority Order)

**Phase 1 — Critical Path (Must ship before June 11)**

1. **Mobile responsive CSS** — single column below 768px, hamburger nav, scalable countdown. This is the highest-risk open item.
2. **Sticky News Ticker** — fixed below navbar. Content can be hardcoded strings for now; replace with API later.
3. **Community Globe** — interactive map (Leaflet.js or Globe.gl) with Firestore-backed pins. Name + Country → pin on map.
4. **Globe Leaderboard** — country aggregation of pins (top 10 countries by pin count), live via Firestore.
5. **Real Schedule Data** — replace all placeholder "Team A vs Team B" cards with real Group Stage fixtures.
6. **Scroll Arrow** — wire up the match grid pagination button.

**Phase 2 — Core Experience (Ship by June 11)**

7. **Full Bracket UI** — Group stage selectors (A–L) + KO bracket bowtie. Picks saved to Firestore.
8. **Bracket Leaderboard** — live scoring as results are manually entered.
9. **RSVP to Firestore** — persist the RSVP count and list across all visitors.

### How to Validate Quickly

- **Soft launch to friend group** (~10 people) 2 weeks before June 11. Ask them to: submit a globe pin, make a bracket pick, check the site on their phone.
- Track: Where does the flow break? What's confusing on mobile? Does the globe load?
- Iterate for 1 week based on feedback, then do a wider share (social media, Reddit r/soccer) the week of June 11.

---

## 🎨 Design Principles

These five principles govern every design decision in FanZone. When a feature, layout choice, or interaction is debated, these are the tiebreakers.

**1. Festive First, Functional Always**
The World Cup is a celebration. Every screen should feel like the opening ceremony — energetic, colorful, international. But it must also work perfectly: fast load, no broken layouts, no confusing forms.

**2. One Clear Action Per Screen**
Users should never feel lost about what to do next. Each section has one primary call to action: the Hero says "Make Predictions." The Globe says "Add Your Pin." The Bracket says "Submit Your Pick." Secondary actions (links, share, explore) are present but visually subordinate.

**3. Global by Default**
This is a product for the world. Flag icons, country names, and the globe itself must feel like genuine internationalism — not an afterthought. Every country in the data set gets equal visual treatment.

**4. Instant Feedback**
Every user action — submitting a pin, making a bracket pick, submitting an RSVP — must produce immediate, satisfying visual feedback. No dead clicks. Confirmation modals, pin animations, and sound cues (optional) reinforce that the action worked.

**5. Mobile is the Real Screen**
Design for a 390px iPhone first, then scale up. If something looks better on desktop but awkward on mobile, redesign it. The majority of users will interact via phone, probably from a couch during a match.

---

## 🏗️ Information Architecture

### Page Structure (Single-Page App, Anchor Nav)

```
┌─────────────────────────────────────────────┐
│  NAVBAR (fixed, z-index: 100)               │
│  Logo | About · Schedule · Bracket · Explore │
│                         | Light/Dark Toggle  │
├─────────────────────────────────────────────┤
│  NEWS TICKER (sticky, below navbar)         │
│  ← Scrolling football headlines →           │
├─────────────────────────────────────────────┤
│  HERO                                       │
│  Title + Countdown + CTAs                   │
│  [Make Predictions] [View Schedule]         │
├─────────────────────────────────────────────┤
│  COMMUNITY GLOBE  #globe                    │
│  Headline + Pin Form + Globe + Leaderboard  │
├─────────────────────────────────────────────┤
│  BRACKET CHALLENGE  #bracket                │
│  Group Stage (A–L) → KO Rounds → Submit     │
│  Bracket Leaderboard                        │
├─────────────────────────────────────────────┤
│  GAME SCHEDULE  #schedule                   │
│  Match cards paginated by matchday          │
├─────────────────────────────────────────────┤
│  EXPLORE LINKS  #links                      │
│  Curated external resources                 │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  Social links + copyright                   │
└─────────────────────────────────────────────┘
```

### Navigation Links

- **Community** → `#globe`
- **Schedule** → `#schedule`
- **Bracket Challenge** → `#bracket`
- **Explore** → `#links`

> ⚠️ Note: The **About section has been removed** from the nav and page flow. See [Sketch Review](#-sketch-review--critique) for the rationale. The Hero section communicates the product concept immediately through the title, the countdown, and the two CTAs — an additional About block adds scroll distance before users reach the interactive features.

---

## 📱 Core Screens & Layout

### 1. Navbar

**Purpose:** Global navigation, brand identity, theme toggle.

**Layout:**

- Left: Logo (worldcup icon, links to `#top`)
- Center: Nav links (Community | Schedule | Bracket | Explore)
- Right: Light/Dark toggle button (☾ / ☼)
- Fixed position, full-width, 80px height
- Bottom border: 2px solid `--canary-yellow` (signature visual brand line)
- `z-index: 100` to float above ticker and all content

**Mobile (< 768px):**

- Center nav links collapse into a hamburger menu (☰)
- Tapping hamburger opens a full-width dropdown panel below the navbar with vertical nav links
- Hamburger button replaces the nav-links `ul` on small screens

---

### 2. News Ticker

**Purpose:** Keeps users informed with live football headlines without interrupting the page experience. Creates the feeling of a live broadcast.

**Layout:**

- Sticky, directly below the navbar (`top: 80px`)
- Full-width horizontal bar, ~40px height
- Background: `--charcoal` (light mode) / `--patriot-blue` (dark mode)
- Text: `--canary-yellow`, `Roboto Mono` font, `font-size: 14px`
- Single line of text scrolls horizontally (CSS `animation: ticker-scroll` infinite)
- "⚽ LIVE" badge on the left side to reinforce the broadcast feel
- Content: hardcoded array of strings rotated via `setInterval` for MVP; replace with news API later

**Key interaction:** Ticker does not scroll with the page — it stays fixed between the navbar and the rest of the content. `scroll-padding-top` on `html` must account for both navbar height (80px) + ticker height (40px) = 120px total offset.

---

### 3. Hero Section

**Purpose:** Immediate orientation, emotional hook, and action gateway.

**Layout:**

- Full-width, background image (`soccer-banner.jpg`) with overlay gradient for text legibility
- `min-height: 100vh` — always fills the screen on first load
- Centered vertical stack: H1 Title → H2 Subtitle → Countdown → CTA Buttons

**Key Elements:**

- **H1:** "World Cup FanZone 2026" — large, bold, `Permanent Marker` font, `--maple-red` color
- **H2:** "The Beautiful Game We Love" — `--patriot-blue`, slightly smaller
- **Countdown Timer:** Days : Hours : Minutes : Seconds in `Monoton` font, `--canary-yellow`. Each unit in a `.time-box` with a label below
- **CTAs:** Two buttons side by side — "Make Predictions" (links to `#bracket`) and "View Schedule" (links to `#schedule`). `--canary-yellow` fill, hover shifts to `--sunset-orange`

**Mobile:** Stack the countdown time boxes vertically or reduce font size to fit the smaller screen without overflow. CTAs stack vertically below 480px.

---

### 4. Community Globe Section

**Purpose:** The product's primary hook. Visualizes the global fan community. Gives every user a reason to submit their data and a reason to return.

**Headline:** "48 Countries. One Tournament. Where's Your Party?"
**Sub-headline:** "Add your pin to the map"

**Layout (Desktop — two-column grid):**

```
┌──────────────────────┬───────────────────────────┐
│  PIN FORM            │  INTERACTIVE GLOBE / MAP   │
│  [Name]              │                           │
│  [Country Dropdown]  │   🌍 (rotating globe      │
│  [Submit]            │    with fan pins)          │
│                      │                           │
├──────────────────────┴───────────────────────────┤
│  WATCH PARTY LEADERBOARD                         │
│  🥇 🇧🇷 Brazil — 847 fans watching              │
│  🥈 🇩🇪 Germany — 621 fans watching             │
│  🥉 🇲🇽 Mexico — 589 fans watching              │
│  ... (top 10 countries by pin count)            │
└──────────────────────────────────────────────────┘
```

**Mobile:** Pin form stacks above globe (full width), leaderboard below globe.

**Key Elements:**

- **Pin Form:** Name (text input) + Country (custom dropdown with flag icons, same pattern as existing bracket dropdown) + Submit button. No email required — friction must stay minimal.
- **Globe:** Rendered via Globe.gl or Leaflet.js. Pins appear as small flag markers at the selected country's centroid. New pins animate in. Globe rotates slowly on load.
- **Leaderboard:** Top 10 countries ranked by pin count. Updates in real-time via Firestore listener. Gold/silver/bronze medals for top 3. Each row shows: rank medal + flag + country name + fan count.

> **Important distinction:** This section tracks **where users are watching from**, not who they are rooting for. Rooting allegiances and champion predictions belong in the Bracket Challenge section. The globe is about community geography, not football preference.

---

### 5. Bracket Challenge Section

**Purpose:** Creates personal stakes in the tournament outcome. Drives the deepest engagement and highest return rate.

**Layout:**

**Step 1 — Champion Quick Pick (always visible)**

```
"Who will lift the cup?"
[Country Dropdown → Submit]  ← 30 seconds, casual-user friendly
```

**Step 2 — Group Stage Predictions**

```
┌────┬────┬────┬────┬────┬────┐
│ A  │ B  │ C  │ D  │ E  │ F  │   ← 12 group cards (A–L)
├────┼────┼────┼────┼────┼────┤
│ G  │ H  │ I  │ J  │ K  │ L  │
└────┴────┴────┴────┴────┴────┘
Each card: pick 1st place, 2nd place from the group's 4 real teams
"Best 3rd Place" selector: choose 8 of 12 third-place finishers to advance
```

**Step 3 — KO Bracket (Bowtie visual)**

```
R32 → R16 → QF → SF → FINAL ← SF ← QF ← R16 ← R32
                        ↑
                   Champion Pick
```

Clicking a matchup slot picks the winner. Winner auto-populates the next round slot. Bracket locks when the tournament starts.

**Step 4 — Submit + Confirmation Modal**

- Trophy animation fires on submit
- Modal shows: predicted champion name + flag + "You predict [Country] to be FIFA World Cup Champions!"

**Bracket Leaderboard:**
Below the bracket form. Columns: Rank | Name | Champion Pick (with flag) | Points. Top 3 highlighted in gold/silver/bronze. Updates after each real match result is logged.

**Country Stats Layer (V1.1):**
Small pill below each bracket pick: "23% of fans also picked Spain." Social proof without overwhelming the UI.

---

### 6. Game Schedule Section

**Purpose:** Utility. Keeps users from leaving to check schedules elsewhere.

**Layout:**

- 3-column match card grid (desktop), 1-column (mobile below 480px)
- Cards grouped by Matchday label (Matchday 1, Matchday 2, Matchday 3)
- Scroll arrow paginates between matchdays (not a grid toggle — it cycles through matchday groups)
- Each card: Team A flag + name | "vs" | Team B flag + name | Kickoff time (CT) | Stadium name | City

---

### 7. Explore Links Section

**Purpose:** Extends usefulness for users who want more depth. Drives trust by connecting to authoritative sources.

**Layout:**

- Full-width stacked link blocks
- Each block: site name (H3) + one-line description + hover lift animation
- Links: FIFA.com | FotMob | OneFootball | Goal.com | Transfermarkt

---

### 8. Footer

**Purpose:** Contact, social proof, legal.

- Social icons: Instagram | Snapchat | GitHub | LinkedIn
- Copyright line + email
- Light/Dark icon variants already implemented — keep as-is

---

## 🔮 UX Philosophy

### Reducing Friction

- **No account required.** Users pin their location and submit bracket picks with just a name and country — no signup wall.
- **Progressive commitment.** Users can do the champion quick-pick in 30 seconds, then optionally go deeper with the full group stage bracket. The path of least resistance is always visible.
- **Auto-dismiss modals.** Confirmation modals close after 8 seconds. Users shouldn't have to hunt for an X.
- **Inline validation, not page reload.** Form errors highlight the specific invalid field with `.invalid` class (red border + tint). No page refresh, no lost data.

### Natural Guidance

- Section order mirrors the natural user journey: orientation (Hero) → community belonging (Globe) → personal stakes (Bracket) → utility (Schedule) → depth (Links).
- CTAs in the Hero ("Make Predictions" | "View Schedule") jump directly to the relevant section. Users don't need to read the nav.
- The bracket is sequenced: champion pick first (easiest) → group stage → KO bracket. Complexity is revealed gradually.

### Micro-Interactions

| Trigger                   | Response                                                                      |
| ------------------------- | ----------------------------------------------------------------------------- |
| Globe pin submitted       | Pin marker animates onto the map from above. Leaderboard row increments live. |
| Bracket pick submitted    | Trophy animation in modal pulses with `trophyGlow` keyframe.                  |
| Match card hover          | Card lifts 4px (`translateY(-4px)`) + shadow shifts to `--maple-red`.         |
| Incorrect RSVP/form field | Field flashes red border + light red background tint. Input clears.           |
| Nav link hover            | Text transitions to `--sunset-orange` over 0.3s.                              |
| Scroll reveal             | Sections fade/slide in as user scrolls (IntersectionObserver — planned).      |

---

## 🎨 Visual Design System

### Color Palette

| Variable          | Hex       | Usage                                            |
| ----------------- | --------- | ------------------------------------------------ |
| `--canary-yellow` | `#FFCC00` | Countdown, CTAs, accents — homage to Brazil 2014 |
| `--verdant-green` | `#009739` | About section shadow, success states             |
| `--ocean-blue`    | `#3E8EDE` | Links, match card shadows, submit button         |
| `--sunset-orange` | `#FF6F3C` | Hover states, link highlights                    |
| `--maple-red`     | `#D72638` | Hero H1, match card hover — Canada host          |
| `--desert-sage`   | `#B5C9A5` | Mexico host accent (use sparingly)               |
| `--patriot-blue`  | `#1C3F94` | Navbar, headings — USA host                      |
| `--cloud-white`   | `#F4F4F4` | Light mode background                            |
| `--charcoal`      | `#2e2e2e` | Dark mode background, body text                  |
| `--gold`          | `#FFD700` | Leaderboard 1st place                            |
| `--silver`        | `#c0c0c0` | Leaderboard 2nd place                            |
| `--bronze`        | `#CD7F32` | Leaderboard 3rd place                            |

> The primary palette pays homage to the **2014 Brasil World Cup** (yellow + green + blue). Accent colors represent the **three 2026 host nations** (Canada 🇨🇦, Mexico 🇲🇽, USA 🇺🇸).

### Typography

| Font               | Usage                                  | Why                                                                                               |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `Permanent Marker` | All headings (H1–H6)                   | High personality, reads like handwriting on a stadium banner. Unique, unmistakably sports-themed. |
| `Kalam`            | Body text, labels, descriptions        | Friendly handwritten feel, but more legible than Marker at small sizes.                           |
| `Monoton`          | Countdown timer                        | Monospace, retro, broadcast-clock energy. Creates a "match is about to start" tension.            |
| `Roboto Mono`      | Ticker, footer, code-adjacent elements | Monospace for "live feed" / broadcast text. Clean contrast to Kalam.                              |

### Overall Aesthetic

**Festive Broadcast** — the visual language of a sports broadcast meets a fan-made scrapbook. Bold typography, high-energy colors, flag imagery everywhere, and motion that feels alive. Not corporate. Not sterile. This is a fan product, and it should look like one.

---

## 🔁 Engagement Design

### Habit Loops

**During the Tournament (June 11 – July 19):**

- **Match results → bracket scoring → leaderboard shift** triggers a return visit within 24 hours of each match.
- **Daily schedule check:** users return each morning to see the day's fixtures.
- **Globe leaderboard:** national pride — fans from high-ranking countries share the stat; fans from low-ranking countries want to boost their country.

### Notification Strategy (V1.1)

| Notification         | Trigger                     | Message                                                                    |
| -------------------- | --------------------------- | -------------------------------------------------------------------------- |
| Match reminder       | 30 min before kickoff       | "🇩🇪 Germany vs 🇯🇵 Japan kicks off in 30 minutes. Check your bracket pick!" |
| Bracket score update | After each result           | "Your bracket updated. You're now #12 on the leaderboard 🔥"               |
| Bracket lock warning | 1 hour before Opening Match | "Last chance to submit your bracket before the tournament locks!"          |

### Social Sharing

- **Globe share:** "I'm watching from [🇺🇸 Texas, USA] — join the FanZone! [URL]"
- **Bracket share:** Auto-generated card: champion flag + current rank + "I'm #4 on the FanZone leaderboard. Can you beat me? [URL]"
- Both shares use `navigator.share()` on mobile (native share sheet) and clipboard copy on desktop.

---

## ♿ Accessibility & Usability

- All interactive elements have `aria-label` attributes (already implemented on buttons and nav items — maintain this standard for all new elements).
- Color contrast: all text on colored backgrounds must meet WCAG AA (4.5:1 minimum). Test the `--canary-yellow` text on white backgrounds — this is the most common failure point.
- Dropdown menus are keyboard-navigable (`Tab` to focus, `Enter` to select, `Escape` to close). Currently not implemented — add `keydown` event listeners.
- All flag images have descriptive `alt` text: `alt="${countryName} flag"` pattern already established — keep it.
- Font sizes: body text minimum 16px. Countdown minimum 20px on mobile. Never let `Monoton` go below 18px — it's decorative but must remain legible.
- Touch targets: all buttons and interactive elements minimum 44×44px on mobile (Apple HIG standard).
- Globe/map must have a text fallback leaderboard for users who cannot render the WebGL component (show the leaderboard table prominently regardless).

---

## 🔍 Competitive Inspiration

### 1. Sofascore / FotMob — Learn: Real-time stat updates without page reload

These apps set the expectation that match data is live. The bracket leaderboard and globe leaderboard must update in real-time (Firestore listeners) to match this expectation. Static "refresh to update" leaderboards feel broken next to these benchmarks.

### 2. Wordle (NYT Games) — Learn: Single-action daily habit loop + social sharing

Wordle's genius is one action per day that produces a shareable result. The bracket leaderboard after each match day should feel like this — "here's your daily score update, share it." The auto-generated bracket card is our equivalent of Wordle's emoji grid.

### 3. Kahoot — Learn: Live leaderboard creates social energy in a room

Kahoot's real-time leaderboard makes everyone in a room stare at the screen and cheer or groan. The bracket leaderboard at a watch party should replicate this: a big-screen-friendly leaderboard view where positions shift in real time as a group watches together.

---

## 👨‍💻 Developer Handoff Notes

### Critical Implementation Details

**Ticker (Sticky, below navbar):**

- `position: sticky; top: 80px;` (navbar height) with `z-index: 99`
- Update `html { scroll-padding-top: 120px; }` (navbar 80px + ticker 40px) to prevent anchored sections from hiding behind the ticker
- Text animation: `@keyframes tickerScroll { from { transform: translateX(100%); } to { transform: translateX(-100%); } }` on the inner text span
- `setInterval` swaps content every N seconds (or CSS animation handles the scroll loop)

**Community Globe:**

- Recommended library: `Globe.gl` (WebGL-based, beautiful, ~150kb gzipped) or `Leaflet.js` with a custom tile layer (lighter, more accessible)
- Pins should render at the geographic centroid of the selected country (precompute a `countryCode → [lat, lng]` JSON map)
- Firestore collection: `/globePins/{docId}` with fields: `{ name, countryCode, timestamp }`
- Real-time listener: `onSnapshot` on the collection — aggregate by `countryCode` client-side for the leaderboard
- Fallback: if WebGL unavailable, show a static SVG world map with dots at country centroids

**Bracket Locking:**

- Use a Firestore document `/config/tournamentStatus` with field `{ bracketLocked: false }`
- On page load, read this value. If `bracketLocked: true`, disable all bracket input elements and show a "Bracket is locked — tournament has started" banner
- Admin updates this document manually before Opening Match

**Dropdown Close on Outside Click:**

- Current implementation uses a document-level `click` listener. This causes a conflict when two dropdowns exist on the same page (clicking the second dropdown's selected element fires the first dropdown's outside-click listener). Fix: compare `e.target` against each specific dropdown, not just one.

**Modal Auto-dismiss Race Condition:**

- Current `setTimeout` for modal dismiss fires even if the user manually closed the modal first. This causes the modal to re-hide (harmlessly, but logs a class-removal call on a hidden element). Fix: clear the timeout `id` in the manual close handler using `clearTimeout`.

**Mobile Hamburger Menu:**

- Add a `#hamburger-btn` element that is `display: none` on desktop, `display: block` on mobile
- Toggle a `.nav-open` class on `.nav-links` that switches it from `display: none` to `display: flex; flex-direction: column`
- Close the nav when any nav link is clicked (add click listeners to each `li a`)

**iOS Safari Fixed Positioning:**

- iOS Safari has a known bug where `position: fixed` elements jump when the address bar hides/shows during scroll. Mitigate with: `position: -webkit-sticky; position: sticky;` for the ticker, and test the navbar specifically on iOS 16+.
- Add `env(safe-area-inset-top)` padding to the navbar for iPhone notch/Dynamic Island devices.

**Firestore Security Rules:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /globePins/{pin} {
      allow read: if true;
      allow write: if request.resource.data.keys().hasOnly(['name', 'countryCode', 'timestamp'])
                   && request.resource.data.name is string
                   && request.resource.data.name.size() >= 2
                   && request.resource.data.name.size() <= 50;
    }
    match /bracketPicks/{pick} {
      allow read: if true;
      allow write: if true; // tighten with auth later
    }
    match /matchResults/{result} {
      allow read: if true;
      allow write: if false; // admin-only via Firebase console
    }
  }
}
```

---

## 🖊️ Sketch Review & Critique

### What the Sketch Gets Right

The single-page layout in the sketch is clean and intentional. Reading top to bottom:

```
Navbar → Ticker → Hero (Title + Countdown + CTAs) → Community Globe → Bracket Challenge → Additional Links → Footer
```

This is the correct order. It front-loads the emotional hook (countdown, globe) before the deep-engagement feature (bracket), which is exactly right for the three user personas. The sketch serves as a sound blueprint.

**Specific wins:**

- Placing the **Ticker directly below the Navbar** (not inside Hero) is correct — it stays in viewport regardless of scroll depth and keeps the broadcast energy alive throughout the session.
- The **"Make Predictions" and "View Schedule" CTAs** in the Hero are action-oriented and specific. Far better than generic "Learn More" buttons.
- The **"Add your pin to the globe"** concept is the product's best idea. The tagline "48 Countries. One Tournament. Where's Your Party?" is genuinely compelling copy — keep it exactly.
- Noting **"Leaderboard too!!!"** next to the globe section is right — the leaderboard makes the globe competitive and gives it replay value.
- The **bracket structure** (Groups → KO Stages → Submit) correctly mirrors how the actual tournament works.

### Critiques & Gaps

**1. The RSVP section is not in the sketch — and it shouldn't be.**
The sketch correctly consolidates the "who's coming" concept into the globe pin form (Name + Country). A separate RSVP form with email is a different product concern (event planning) that creates friction before the fun features. For MVP: fold RSVP into the globe pin (the act of pinning IS the RSVP). Email collection can happen in a lightweight "notify me of bracket results" opt-in after the bracket is submitted.

**2. No mobile hamburger menu is shown.**
This is the highest-risk gap. The desktop nav doesn't work on mobile. The hamburger menu must be in the CSS/JS before launch — it is not optional.

**3. "Additional Links??" — the uncertainty is appropriate but it needs a decision.**
Keep the Explore Links section. It provides genuine utility (official schedules, stats, news) and helps users who want more depth without FanZone having to build those features. Rename from "Additional Links" to **"Explore"** (already done in the nav).

**4. The KO bracket in the sketch is drawn as a simple tree — but the visual implementation needs careful responsive design.**
The bowtie bracket collapses very poorly on mobile. Solution: horizontal scroll with a "← swipe →" hint label on screens below 768px. Do not try to reflow the bracket vertically — it loses the spatial logic.

**5. The sketch does not show a "loading" or "empty state" for the globe.**
If no pins exist yet (early launch), the globe should show a friendly prompt: "Be the first to pin your watch location!" rather than an empty map.

### ❌ Do We Need an About Section?

**No. Remove it from the page flow.**

**Rationale:** The current About section exists to explain what the site is to a confused first-time visitor. But the Hero section already does this job: the title ("World Cup FanZone 2026"), the countdown timer, and the CTAs ("Make Predictions" | "View Schedule") collectively communicate the product concept in under 5 seconds.

Adding an About section means a user has to scroll past ~400px of explanatory text before reaching the globe (the actual hook). For the Devotee and Social Organizer personas, this is pure friction — they already know what a World Cup fan site is. For the Casual Joiner, the globe map and countdown will intrigue them more effectively than a paragraph of text.

**If any context is needed**, fold it into a single-line subtitle in the Hero: _"Your watch party HQ — pick your champion, pin your city, and celebrate the beautiful game."_ That does the job in one line without a dedicated section.

---

## 🗂️ Project Structure

```
World Cup Fan Event/
├── index.html                  # Main page — all sections
├── styles.css                  # Global styles, dark mode, components
├── script.js                   # Countdown, dropdowns, modals, dark mode
├── firebase-config.js          # Firebase app initialization and exports
├── qualified-countries.json    # 48 World Cup nations (bracket dropdown)
├── all-countries.json          # All ~250 countries (globe pin dropdown)
├── LICENSE                     # MIT License
├── README.md                   # This file
└── img/
    ├── flags/                  # Flag PNGs named by ISO code (e.g., us.png)
    ├── social-icons/           # Light and dark variants
    ├── soccer-banner.jpg       # Hero background image
    ├── worldcup-icon.png       # Favicon + trophy modal image
    ├── confetti-animation.gif  # RSVP/modal success animation
    ├── fun&food-icon.gif       # About section icon
    ├── memories-icon.gif       # About section icon
    └── placeholder.png         # Gallery fallback image
```

---

## 🚀 Getting Started

### Prerequisites

No build tools required. Runs entirely in the browser. For Firebase-backed features, a local server is needed to avoid CORS issues with `fetch()` calls.

```bash
# Clone the repository
git clone https://github.com/krod7/world-cup-fan-event.git

# Navigate to the project directory
cd "World Cup Fan Event"

# Serve locally (required for fetch() and Firebase)
npx serve .
# → Available at http://localhost:3000
```

> **Note:** Direct `open index.html` will cause CORS errors on the JSON fetches. Always use a local server during development.

---

## 🗓️ Key Dates

| Date                   | Milestone                             |
| ---------------------- | ------------------------------------- |
| June 11, 2026          | **Opening Match — Tournament Begins** |
| June 11 – July 2, 2026 | Group Stage (48 matches, 12 groups)   |
| July 2–5, 2026         | Round of 32                           |
| July 5–9, 2026         | Round of 16                           |
| July 9–12, 2026        | Quarterfinals                         |
| July 14–16, 2026       | Semifinals                            |
| July 19, 2026          | **Final — MetLife Stadium, New York** |

---

## 📅 Build Schedule

### Week 1 — Foundation & Fixes

**Day 1 — Mobile + Critical Infrastructure**

- Add mobile responsive CSS: single-column layout below 768px, hamburger nav
- Wire scroll arrow button to paginate matchday grids
- Add `localStorage` RSVP count persistence (bridge until Firestore)
- Update `scroll-padding-top` to 120px (navbar + ticker offset)
- Reinitialize Firebase (Firestore + Storage + Hosting)

**Day 2 — Real Match Data + Ticker**

- Replace all placeholder match cards with real Group Stage fixtures
- Organize cards by matchday with labels (Matchday 1, 2, 3)
- Build the sticky News Ticker component below the navbar
- Populate ticker with hardcoded football headlines for MVP

### Week 2 — Community Globe

**Day 3 — Globe Implementation**

- Integrate Globe.gl or Leaflet.js
- Build the `/globePins` Firestore collection and real-time listener
- Render existing pins on globe load
- Build the Globe Leaderboard (top 10 countries by pin count)

**Day 4 — Pin Form + Globe Animations**

- Build Name + Country pin form (reuse existing dropdown pattern)
- On submit: write to Firestore → animate pin onto globe → update leaderboard live
- Empty state: "Be the first to pin your watch location!" when no pins exist
- Seed with 10–15 test pins before public launch

### Week 3 — Bracket Challenge (Full)

**Day 5 — Group Stage Prediction UI**

- Build 12 group cards (A–L) with real team names
- Each card: 1st place picker, 2nd place picker
- "Best 3rd Place" section: select 8 of 12 to advance
- Client-side validation (all groups must be filled before KO unlock)

**Day 6 — KO Bracket + Leaderboard Scoring**

- Build bowtie bracket visual (R32 → R16 → QF → SF → Final)
- Click-to-pick winner auto-populates next round slot
- Write picks to Firestore `/bracketPicks/{userId}` on submit
- Firebase Cloud Function: trigger on new `/matchResults` → score all picks → update totals
- Connect leaderboard UI to live Firestore data

### Week 4 — Polish + Launch

**Day 7 — Scroll Animations + Social Sharing**

- Add IntersectionObserver scroll-reveal on all sections
- Build shareable bracket card (canvas-generated or CSS + `html2canvas`)
- Add bracket lock countdown: "Bracket locks in X hours" banner

**Day 8 — Final Testing + Deploy**

- Full mobile device testing (iOS Safari, Android Chrome)
- Cross-browser: Chrome, Firefox, Safari desktop
- Set Firestore security rules (see Developer Handoff Notes)
- `firebase deploy` — site live on Firebase Hosting
- Seed globe pins, test leaderboard live scoring

### Ongoing (June 11 – July 19)

- After each match: log result to `/matchResults` → automated scoring fires
- Monitor leaderboard for scoring bugs
- After Group Stage: lock group picks, unlock KO bracket for R32 draw
- After each KO round: lock that round before next matches kick off

---

## 🔧 Known Issues & Backlog

- [ ] **No mobile breakpoints** — layout breaks below ~768px (highest priority before launch)
- [ ] **Ticker not implemented** — component needs to be built and made sticky below navbar
- [ ] **Community Globe not implemented** — replaces/extends current RSVP section concept
- [ ] **Schedule has placeholder data** — needs real 2026 Group Stage fixtures
- [ ] **Scroll arrow not wired** — `#scroll-btn` click handler missing from `script.js`
- [ ] **Dropdown outside-click conflict** — two dropdowns on the same page cause event listener collision
- [ ] **Modal auto-dismiss race condition** — `clearTimeout` not called on manual close
- [ ] **Hero needs `min-height: 100vh`** — background image crops on smaller viewports
- [ ] **Keyboard navigation for dropdowns** — `keydown` event listeners not implemented
- [ ] **`scroll-padding-top` needs update** — must account for navbar (80px) + ticker (40px) = 120px total
- [ ] **Bracket leaderboard hidden** — needs real data pipeline before unhiding
- [ ] **Gallery hidden** — section exists but unpopulated

---

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/community-globe`)
3. Commit your changes (`git commit -m 'Add interactive globe with Firestore pins'`)
4. Push to the branch (`git push origin feature/community-globe`)
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
