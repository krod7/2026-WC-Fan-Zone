# FIFA FanZone 2026 — Full Build Schedule

**Start:** May 12, 2026  
**Launch target:** June 9, 2026 (2 days buffer before June 11 kickoff)  
**Total sessions:** 22 focused build days across 4 weeks

> Each session below is designed as one self-contained chat — paste the session goal + context at the top of a new conversation.

---

## At a Glance

| Week                  | Focus                       | Sessions          | Deliverable                                                       |
| --------------------- | --------------------------- | ----------------- | ----------------------------------------------------------------- |
| Week 1 — May 12–18    | Fixes + Firebase foundation | 5 days            | Site running cleanly, Firebase live, real match data              |
| Week 2 — May 19–25    | Full bracket system         | 5 days            | Interactive bracket predictor, group + KO picks, Firestore-backed |
| Week 3 — May 26–Jun 1 | Community + leaderboard     | 5 days            | Photo gallery live, automated scoring, leaderboard real-time      |
| Week 4 — Jun 2–8      | Mobile + polish + deploy    | 5 days + 2 buffer | Fully responsive, deployed on Firebase Hosting, launch-ready      |

---

## Week 1 — Fixes + Firebase Foundation

### Day 1 — Quick Fixes & Encoding Repair

**Goal:** Fix everything that's visually broken right now. No new features.  
**Estimated session length:** 1–2 hours

**Tasks:**

- [ ] Add `<meta charset="UTF-8">` as the first tag inside `<head>` — fixes all garbled characters (`â€"`, `â¤­`, etc.)
- [ ] Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` directly after
- [ ] Remove "Community" from the navbar `<ul>` (hidden section, dead link)
- [ ] Wire up the scroll arrow button in `script.js` — add click handler to `.scroll-btn` that toggles `#upcoming-matches` display and rotates the arrow icon
- [ ] Add `min-height: 100vh` to `.hero` in `styles.css` so background image fills viewport
- [ ] Fix RSVP count persistence: read from `localStorage` on page load, write on each submission

**Files touched:** `index.html`, `styles.css`, `script.js`  
**Test:** Reload the page — no garbled text anywhere. Click the schedule arrow — second grid appears. Refresh page — RSVP count persists.

---

### Day 2 — Firebase Project Setup

**Goal:** Get Firebase fully initialized and connected to the project.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Go to [console.firebase.google.com](https://console.firebase.google.com) — create project "fanzone-2026"
- [ ] Enable **Firestore Database** (start in test mode)
- [ ] Enable **Firebase Storage** (for community photo uploads)
- [ ] Enable **Firebase Hosting** (for deployment later)
- [ ] Install Firebase SDK: `npm install firebase` in project directory
- [ ] Create `firebase-config.js` in project root with your Firebase config object
- [ ] Create `firebase.js` module that exports `db`, `storage`, and `auth`
- [ ] Update `script.js` to import from `firebase.js` using ES modules
- [ ] Update `index.html` script tag: confirm `type="module"` is present on the script tag
- [ ] Set up Firestore security rules: authenticated writes, public reads for leaderboard + RSVPs
- [ ] Create the 5 Firestore collections manually in the console to seed the schema:
  - `users`, `bracketPicks`, `rsvps`, `communityPosts`, `matchResults`

**Files created:** `firebase-config.js`, `firebase.js`  
**Files touched:** `script.js`, `index.html`  
**Test:** Open browser console — no Firebase import errors. Log `db` object — should print a Firestore instance.

> **Note:** Keep `firebase-config.js` out of version control if this repo is public. Add it to `.gitignore`.

---

### Day 3 — Real Match Schedule + RSVP to Firestore

**Goal:** Replace placeholder match data with real Group Stage fixtures. Save RSVPs to Firestore.  
**Estimated session length:** 2–3 hours

**Tasks:**

_Match Schedule:_

- [ ] Create `matches.js` — a JS array/object with the first 12 Group Stage matches (June 11–13), including: home team, away team, kickoff time (CT), stadium, city, group letter
- [ ] Refactor `index.html` schedule section: remove hardcoded `match-card` HTML, generate cards dynamically from `matches.js` via JS
- [ ] Add country flag images to each card using the same flag naming convention already in the project

_RSVP to Firestore:_

- [ ] In `script.js`, on valid RSVP form submission: call `addDoc()` to save to the `rsvps` Firestore collection with fields: `name`, `country`, `submittedAt`
- [ ] On page load: call `getDocs()` on the `rsvps` collection — set the RSVP count from the real database count (replaces localStorage approach)
- [ ] Display the live RSVP list from Firestore (most recent 10) in the `#rsvp-list` element

**Files created:** `matches.js`  
**Files touched:** `index.html`, `script.js`  
**Test:** Submit an RSVP — check the Firebase console to confirm a document was created in the `rsvps` collection. Refresh page — count reflects database value, not reset.

---

### Day 4 — Bracket: Group Stage Prediction UI

**Goal:** Build the UI for users to predict which teams finish 1st and 2nd in each of the 12 groups.  
**Estimated session length:** 3–4 hours

**Context:** This is Phase 1 of the bracket. The existing champion-picker in the bracket section gets replaced with this full system. Build group stage picks first — KO bracket comes in Week 2.

**Tasks:**

- [ ] Create `bracket.js` — module that manages all bracket state
- [ ] In `index.html`, replace the existing `.bracket` section with a new multi-step bracket UI:
  - Step indicator at top: "Step 1: Groups → Step 2: Third Place → Step 3: Knockout"
  - Grid of 12 group panels (A through L), each showing 4 teams
  - Each panel: user clicks to rank the 4 teams as 1st, 2nd, 3rd, 4th
- [ ] Populate each group panel with real team data — create `groups.js` with the 12 groups and their 4 teams each (use FIFA's confirmed group draw)
- [ ] Style group panels to match the existing card aesthetic (`.match-card` pattern)
- [ ] Save group stage selections to bracket state in `bracket.js`
- [ ] "Next Step" button advances to the third-place picker (Day 5)

**Files created:** `bracket.js`, `groups.js`  
**Files touched:** `index.html`, `styles.css`  
**Test:** All 12 groups render with correct teams. Clicking teams in a group marks them as 1st/2nd/3rd/4th. State is maintained when switching between groups.

---

### Day 5 — Bracket: Third-Place Qualifier Picks

**Goal:** Build the UI for users to pick which 8 of the 12 third-place finishers advance to the Round of 32.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] After completing group picks, Step 2 shows a panel with 12 team slots (one per group's 3rd-place team)
- [ ] Teams in these slots auto-populate from the user's group stage picks (whoever they ranked 3rd in each group)
- [ ] User selects exactly 8 of the 12 — remaining 4 are eliminated
- [ ] UI feedback: selected = highlighted green, eliminated = faded out, counter shows "X / 8 selected"
- [ ] Prevent advancing to Step 3 until exactly 8 are selected
- [ ] Error state: if user tries to select a 9th, show a brief shake animation and tooltip "You can only pick 8 teams"
- [ ] "Next Step" advances to the KO bracket (built in Week 2 — for now, show a placeholder "KO Bracket Coming in Next Build" card)

**Files touched:** `bracket.js`, `index.html`, `styles.css`  
**Test:** 12 third-place teams appear based on group picks. Can select exactly 8. Counter updates live. "Next" is locked until 8 selected.

---

## Week 2 — Full Bracket System

### Day 6 — KO Bracket: Data Model + Seeding Logic

**Goal:** Build the logic that takes group picks and generates the Round of 32 matchups.  
**Estimated session length:** 3–4 hours

**Context:** FIFA pre-determines which group winner plays which runner-up in the Round of 32. This seeding table is fixed — you hardcode it once.

**Tasks:**

- [ ] In `bracket.js`, add the R32 seeding table: maps each slot (e.g., "Winner Group A vs Runner-up Group C") to the user's actual picks
- [ ] Write `generateR32Matchups(groupPicks, thirdPlacePicks)` — returns an array of 16 match objects: `{ matchId, slot1Team, slot2Team, winner: null }`
- [ ] Write `generateNextRound(previousRoundPicks)` — takes R32 results, returns R16 matchups. Reusable for each subsequent round.
- [ ] Write `calculateScore(userPicks, realResults)` — takes user's full bracket + actual match results from Firestore, returns total points broken down by round
- [ ] Add comprehensive bracket state object to `bracket.js`:
  ```
  bracketState = {
    groups: {},        // 12 groups, ranked 4 teams each
    thirdPlace: [],    // 8 selected qualifiers
    r32: [],           // 16 picks
    r16: [],           // 8 picks
    qf: [],            // 4 picks
    sf: [],            // 2 picks
    final: null        // 1 pick
  }
  ```
- [ ] Write `saveBracketToFirestore(userId, bracketState)` and `loadBracketFromFirestore(userId)`

**Files touched:** `bracket.js`  
**Test:** Console-log the generated R32 matchups — all 16 matchups should have the correct team pairings based on group picks. Score calculation returns correct values with test data.

---

### Day 7 — KO Bracket: Bowtie Visual Component

**Goal:** Build the visual bracket display — the sideways hourglass/bowtie layout showing all KO rounds.  
**Estimated session length:** 4–5 hours (most visually complex session)

**Tasks:**

- [ ] Create `bracket-ui.js` — handles all bracket DOM rendering, separate from logic
- [ ] Build the bowtie bracket HTML structure:
  - Outer container: horizontally scrollable on mobile
  - Left half: R32 (8 match slots) → R16 (4 slots) → QF (2 slots) → SF (1 slot)
  - Center: Final match slot (highlighted, gold border)
  - Right half: SF → QF → R16 → R32 (mirror of left)
  - Connector lines between rounds drawn with CSS borders (no SVG needed)
- [ ] Each match slot shows: Team 1 flag + name, "vs", Team 2 flag + name, winner selection UI
- [ ] Unfilled slots show as empty/greyed out until fed by previous round picks
- [ ] Highlight the path a team has taken through the bracket as you hover over a team name
- [ ] Add CSS for bowtie layout to `styles.css` — new `.bracket-grid`, `.bracket-match`, `.bracket-connector` classes
- [ ] Ensure the bracket is horizontally scrollable on smaller screens (critical for mobile)

**Files created:** `bracket-ui.js`  
**Files touched:** `styles.css`, `index.html`  
**Test:** Bracket renders cleanly with 32 team slots arranged in bowtie. Lines connect correctly between rounds. Scrolls horizontally without breaking layout.

---

### Day 8 — KO Bracket: Interactive Picks

**Goal:** Make every match slot in the bracket clickable so users can select winners round by round.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] In `bracket-ui.js`, attach click handlers to each team name in a match slot
- [ ] On click: mark that team as the winner, advance them to the correct slot in the next round
- [ ] If a user changes a pick in an earlier round (e.g., changes their R16 winner), cascade-clear all dependent picks downstream with a confirmation prompt: "Changing this pick will clear your QF, SF, and Final picks for this half. Continue?"
- [ ] Visual states for each team slot:
  - Default: neutral border, team name + flag
  - Selected as winner: green highlight, bold name
  - Eliminated: faded out, strikethrough optional
- [ ] Lock rounds: users cannot pick R16 winners until all R32 picks are filled
- [ ] Progress bar or step counter: "R32: 16/16 complete → R16: 0/8 complete"
- [ ] "Submit Bracket" button appears only when all 31 picks are complete

**Files touched:** `bracket-ui.js`, `bracket.js`, `styles.css`  
**Test:** Click through an entire bracket from R32 to Final. Changing an early pick clears downstream. Submit button only appears when all rounds are complete.

---

### Day 9 — Bracket: Save, Load & Lock

**Goal:** Persist the completed bracket to Firestore. Load it back on return visits. Lock bracket when tournament begins.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] On "Submit Bracket" click: call `saveBracketToFirestore()` — save complete `bracketState` to `bracketPicks/{userId}` in Firestore
- [ ] On page load: call `loadBracketFromFirestore()` — if the user has a saved bracket, populate the UI with their existing picks
- [ ] User identification for MVP (no full auth yet): generate a UUID on first visit, store in `localStorage` as `fanzone_user_id`. Use this as the Firestore document ID.
- [ ] Lock logic: after June 11, 12:00 AM CT — set all bracket picks to read-only, disable all click handlers, show "Bracket locked — Tournament has started!" banner
- [ ] Show confirmation modal after successful save: "Your bracket is saved! Check the leaderboard to see how you stack up."
- [ ] "Edit Bracket" button: allowed before June 11, triggers re-save on submit (overwrites previous)

**Files touched:** `bracket.js`, `bracket-ui.js`, `script.js`  
**Test:** Submit a bracket — check Firestore console for the document. Refresh the page — bracket loads back correctly. Change a pick and resubmit — document is overwritten with new picks.

---

### Day 10 — Bracket: Leaderboard Display

**Goal:** Build the leaderboard section that reads real bracket picks and scores from Firestore.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Remove `hidden` attribute from the leaderboard section in `index.html`
- [ ] Create `leaderboard.js` — handles Firestore reads and DOM rendering for the leaderboard
- [ ] On page load: query `bracketPicks` collection, sorted by `totalScore` descending, limit 20
- [ ] Render leaderboard table: Rank, Name, Champion Pick (with flag), Points, Last Updated
- [ ] Gold/silver/bronze row highlight for top 3 (already styled in CSS — wire it up to real data)
- [ ] Real-time listener: use `onSnapshot()` so leaderboard updates live without refresh during the tournament
- [ ] If no match results exist yet (pre-tournament): show all users at 0 pts with message "Scoring begins June 11"
- [ ] "Your rank" highlight: find the current user's row and apply a distinct border/color

**Files created:** `leaderboard.js`  
**Files touched:** `index.html`, `script.js`  
**Test:** Multiple test bracket picks in Firestore → leaderboard renders them ranked correctly. Add a second pick with a higher score → it moves to the top in real-time via `onSnapshot`.

---

## Week 3 — Community Gallery + Automated Scoring

### Day 11 — Community Gallery: Upload UI

**Goal:** Build the photo upload form for the community gallery section.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Remove `hidden` attribute from `.gallery` section in `index.html`
- [ ] Replace existing gallery placeholder with a new two-part layout:
  - Top: Upload panel ("Share your watch party! 📸")
  - Bottom: Gallery feed (photo carousel — built Day 12–13)
- [ ] Upload form fields: Photo (file input, image files only), Caption (text, max 120 chars), Your Name, Home Country (reuse existing country dropdown component)
- [ ] Image preview: when user selects a file, show a small preview thumbnail next to the form before submitting
- [ ] Client-side validation: file must be an image, under 5MB, all fields required
- [ ] Submit button labeled "Post to Gallery" — wired up in Day 12
- [ ] Style the upload panel to feel social, not corporate — looser, more fun than the RSVP form

**Files touched:** `index.html`, `styles.css`  
**Test:** Upload form renders. File picker accepts only images. Preview appears on file select. Validation shows errors if fields are empty or file is too large.

---

### Day 12 — Community Gallery: Firebase Storage Integration

**Goal:** Wire the upload form to Firebase Storage and save post metadata to Firestore.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Create `gallery.js` — handles all gallery logic
- [ ] On form submit: upload the image file to Firebase Storage at path `communityPosts/{timestamp}_{filename}`
- [ ] After upload completes: get the download URL from Firebase Storage
- [ ] Save post document to Firestore `communityPosts` collection: `{ photoURL, caption, name, country, timestamp, userId }`
- [ ] Show upload progress indicator (simple loading state on the button: "Posting..." → "Posted!")
- [ ] On success: reset the form, show brief success message, add new post to the top of the gallery feed
- [ ] Basic content moderation: add a `flagged: false` field to each post — flagged posts won't display
- [ ] Add a "Flag this post" button (small, discrete) to each gallery card that sets `flagged: true` in Firestore

**Files created:** `gallery.js`  
**Files touched:** `index.html`, `script.js`  
**Test:** Upload a photo with caption — check Firebase Storage for the image file, check Firestore for the metadata document. URL in Firestore opens the correct image.

---

### Day 13 — Community Gallery: Feed + Carousel Display

**Goal:** Pull posts from Firestore and display them in the carousel format.  
**Estimated session length:** 3–4 hours

**Tasks:**

- [ ] In `gallery.js`, on page load: query `communityPosts` collection ordered by `timestamp` descending, limit 20, where `flagged == false`
- [ ] Render posts as cards in the gallery feed: photo (full width), name + flag, caption, time since posted ("2 hours ago")
- [ ] Build the carousel: left/right arrow buttons advance through posts, current post centered and large
- [ ] Carousel behavior: wraps around (after last post, returns to first), keyboard arrow support
- [ ] Real-time listener with `onSnapshot()`: new posts from other users appear at the top of the carousel without a page refresh
- [ ] Empty state: if no posts yet, show "Be the first to share your watch party setup!"
- [ ] Lazy loading: only load full-resolution images when the card is in view (use `IntersectionObserver`)
- [ ] Activate the existing prev/next carousel buttons already in the HTML (`#prev-photo`, `#next-photo`)

**Files touched:** `gallery.js`, `script.js`, `styles.css`  
**Test:** Post 3 photos — all 3 appear in the carousel. Arrow buttons cycle through them. Open the page in a second browser tab, post from tab 2 — it appears in tab 1 automatically.

---

### Day 14 — Automated Leaderboard Scoring

**Goal:** Build the scoring system that auto-updates user scores when real match results are entered.  
**Estimated session length:** 3–4 hours

**Context:** You (as admin) enter match results into Firestore. A scoring function then loops through all user bracket picks and awards points. For MVP, this is a client-side admin function — no Cloud Functions needed yet.

**Tasks:**

- [ ] Create `scoring.js` — exports `calculateUserScore(bracketPicks, allMatchResults)` and `updateAllScores(allMatchResults)`
- [ ] `calculateUserScore`: compares a user's picks against real results round by round, returns breakdown object: `{ groups, thirdPlace, r32, r16, qf, sf, final, total }`
- [ ] Points table (hardcoded in `scoring.js`):
  - Group 1st/2nd correct: 1 pt each
  - 3rd-place qualifier correct: 2 pts each
  - R32 correct: 2 pts, R16: 4 pts, QF: 8 pts, SF: 16 pts, Final: 32 pts
- [ ] `updateAllScores`: reads all `bracketPicks` docs, runs `calculateUserScore` on each, writes updated `totalScore` back to each doc
- [ ] Trigger: `updateAllScores` is called after a new match result is added (Day 15)
- [ ] Leaderboard re-renders automatically via `onSnapshot` listener built in Day 10

**Files created:** `scoring.js`  
**Test:** Create 3 test bracket picks in Firestore with known values. Add a match result. Run `updateAllScores` — verify the correct users gained points and incorrect ones didn't.

---

### Day 15 — Admin Panel for Match Results

**Goal:** Build a simple, password-protected admin UI for entering real match results during the tournament.  
**Estimated session length:** 2–3 hours

**Context:** This doesn't need to be fancy — it's just for you to enter results. It can be a separate HTML page.

**Tasks:**

- [ ] Create `admin.html` — separate page, not linked from the main nav
- [ ] Simple password gate: on load, prompt for an admin password (hardcoded in admin.js for MVP), wrong password = redirect back to index.html
- [ ] Match result form: dropdown for match (from the `matchResults` collection), radio buttons for home win / away win / draw (group stage only), submit button
- [ ] On submit: write result to `matchResults/{matchId}` in Firestore, then call `updateAllScores()`
- [ ] Show list of all matches with result status: "Pending" or the result entered
- [ ] Include ability to correct a result (overwrite + re-run scoring)
- [ ] Create `admin.js` — handles all admin page logic

**Files created:** `admin.html`, `admin.js`  
**Test:** Enter a result for a test match — check that `matchResults` doc is updated in Firestore, and that user scores in `bracketPicks` update correctly within 5 seconds.

---

## Week 4 — Mobile + Polish + Deploy

### Day 16 — Mobile CSS: Core Breakpoints

**Goal:** Make every section of the site work correctly on iPhone and Android.  
**Estimated session length:** 3–4 hours

**Tasks:**

- [ ] Add `@media (max-width: 768px)` breakpoint block to the bottom of `styles.css`
- [ ] Single-column fixes at 768px:
  - `.about-content` → `grid-template-columns: 1fr`
  - `.rsvp-content` → `grid-template-columns: 1fr`
  - `.gallery-media` → `grid-template-columns: 1fr`
  - `.match-grid` → `grid-template-columns: repeat(2, 1fr)`
- [ ] Add `@media (max-width: 480px)`:
  - `.match-grid` → `grid-template-columns: 1fr`
  - `.hero h1` → `font-size: 32px`
  - `.hero h2` → `font-size: 22px`
  - `.cta-buttons` → `flex-direction: column`, buttons full width
  - `.countdown` → reduce font sizes
- [ ] iOS Safari viewport fix: add `padding-top: env(safe-area-inset-top)` to `.navbar`
- [ ] Touch targets: all buttons minimum 44px tall on mobile

**Files touched:** `styles.css`  
**Test:** Open on iPhone Safari. All sections stack correctly. Text is readable without zooming. Buttons are tappable without precision.

---

### Day 17 — Mobile Nav: Hamburger Menu

**Goal:** Replace the desktop nav link list with a hamburger menu on mobile.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Add a hamburger `<button>` to the navbar HTML (three lines icon), hidden on desktop
- [ ] At `max-width: 768px`: hide `.nav-links`, show hamburger button
- [ ] On hamburger click: toggle a `.nav-open` class on the navbar that makes `.nav-links` drop down vertically below the navbar bar
- [ ] Nav links in mobile mode: full width, stacked vertically, larger touch targets (48px+ height each)
- [ ] Close the menu when: any nav link is clicked, the user scrolls, or taps outside the menu
- [ ] Animate open/close: subtle slide down / fade (CSS transition, `max-height: 0` → `max-height: 300px`)
- [ ] Keep dark mode compatibility — test hamburger menu in both light and dark mode

**Files touched:** `index.html`, `styles.css`, `script.js`  
**Test:** Resize browser below 768px — nav links disappear, hamburger appears. Tap it — menu slides open. Tap a link — menu closes and page scrolls to section.

---

### Day 18 — Mobile Bracket View

**Goal:** Make the bracket bowtie readable and usable on a phone screen.  
**Estimated session length:** 3 hours

**Context:** The bowtie bracket is inherently wide. On mobile, it needs to either scroll horizontally or switch to a different presentation.

**Tasks:**

- [ ] Wrap the entire bracket bowtie in a horizontally scrollable container: `overflow-x: auto`, `white-space: nowrap`
- [ ] Add a "← Scroll to see full bracket →" hint on mobile below the bracket
- [ ] For the group stage picks (12 group panels): at mobile, show 1 group per row instead of 3-column grid
- [ ] Match slots in the bowtie: on mobile, reduce slot width from 120px to 80px, use abbreviated country codes instead of full names
- [ ] Third-place picker: at mobile, 2 columns instead of 3
- [ ] Sticky round labels that stay visible as you scroll horizontally through the bracket
- [ ] Test the full bracket interaction on iPhone Safari — every tap should register correctly

**Files touched:** `styles.css`, `bracket-ui.js`  
**Test:** Open bracket on iPhone. Group stage grid is single column and readable. Bowtie scrolls horizontally. Tapping a team to pick them as winner works without mis-tapping.

---

### Day 19 — Cross-Browser Testing + Bug Fixes

**Goal:** Identify and fix any platform-specific issues before deploy.  
**Estimated session length:** 2–3 hours

**Platforms to test:**

- iPhone 13+, Safari (your primary)
- iPhone, Chrome
- Android Chrome (use browser dev tools device emulator if no Android device)
- MacBook Safari
- MacBook Chrome
- Windows Chrome (use BrowserStack free tier if needed)

**Common issues to check:**

- [ ] `position: sticky` navbar behavior on iOS Safari (momentum scrolling quirk)
- [ ] Custom dropdown menus — do they open/close correctly on touch devices?
- [ ] File upload in gallery — does the image picker open correctly on iOS?
- [ ] Firestore real-time listeners — do they reconnect after the phone sleeps?
- [ ] Dark mode auto-detection — does it respect system setting on first visit?
- [ ] Countdown timer — does it display correctly in all timezones? (Consider showing CT explicitly)
- [ ] All flags load — no broken images
- [ ] Form validation errors show correctly at all screen sizes

**Files touched:** Various, depending on bugs found  
**Deliverable:** A written list of any remaining known issues, categorized by severity.

---

### Day 20 — Final Design Polish

**Goal:** Tighten up visual details. Make it feel finished, not student-project.  
**Estimated session length:** 2–3 hours

**Tasks:**

- [ ] Audit all section headings — consistent spacing above/below across sections
- [ ] Add scroll-reveal animations: use `IntersectionObserver` to fade in each section as it enters the viewport (`.section-hidden` → `.section-visible` class transition)
- [ ] Match cards: add group letter badge (e.g., "Group A") to each card
- [ ] Hero section: add a subtle dark overlay on the background image to improve text contrast
- [ ] Countdown timer: add a pulse animation on the "seconds" box to feel more live
- [ ] RSVP success modal: add the confetti GIF (already exists at `img/confetti-animation.gif`)
- [ ] Footer: ensure social icons are properly sized and aligned on all screen sizes
- [ ] Run through the full user journey once as a new visitor: land → read about → RSVP → pick bracket → check leaderboard → view gallery → explore links

**Files touched:** `styles.css`, `script.js`  
**Deliverable:** A site that feels complete and intentional, not under construction.

---

### Day 21 — Deploy to Firebase Hosting

**Goal:** Get the site live on a real URL.  
**Estimated session length:** 1–2 hours

**Tasks:**

- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login: `firebase login`
- [ ] Initialize hosting: `firebase init hosting` in project directory
  - Public directory: `.` (the project root, since it's a single index.html)
  - Single page app: No
  - Don't overwrite `index.html`
- [ ] Create `.firebaseignore` file — exclude: `node_modules`, `.git`, `admin.html`, `firebase-config.js` (keep admin page off the public deploy)
- [ ] Deploy: `firebase deploy --only hosting`
- [ ] Test the live URL end-to-end — Firestore reads/writes, Storage uploads, everything
- [ ] Optional: set up a custom domain in Firebase Hosting console if you have one
- [ ] Update the README with the live URL
- [ ] Share with 2–3 people for real-device testing before June 11

**Deliverable:** Live, accessible URL. Share it.

---

### Days 22–23 — Buffer / Final Fixes

**Goal:** Handle anything that broke in real-world testing.  
**Reserve for:**

- Bugs reported by test users
- Firebase security rules tightening (switch from test mode to production rules)
- Performance issues (large images in gallery, slow Firestore queries)
- Any feature that took longer than expected in Week 4

---

## Dependency Map

```
Day 1 (fixes) → can start immediately
Day 2 (Firebase) → Day 1 should be done first
Day 3 (RSVP + schedule) → requires Day 2
Day 4-5 (bracket groups + 3rd place) → requires Day 1, independent of Firebase
Day 6 (bracket logic) → requires Day 4-5
Day 7 (bracket visual) → requires Day 6
Day 8-9 (bracket picks + save) → requires Day 7 + Day 2
Day 10 (leaderboard display) → requires Day 9
Day 11-12 (gallery upload) → requires Day 2
Day 13 (gallery feed) → requires Day 12
Day 14 (scoring) → requires Day 10 + basic match data
Day 15 (admin panel) → requires Day 14
Days 16-20 (mobile + polish) → can be done in any order, after core features
Day 21 (deploy) → everything should be done
```

---

## What's Intentionally Not in This Schedule

These are ideas worth noting but deliberately left out to meet the June 11 deadline:

- **User authentication** (Firebase Auth, login/signup) — the UUID approach in localStorage is sufficient for MVP. Real auth is a post-tournament addition.
- **Push notifications** — browser push is complex to implement correctly. Nice-to-have for 2027.
- **Native app (iOS/Android)** — the mobile web experience is sufficient for this tournament.
- **News ticker** — adds complexity without adding core value. The Explore Links section covers this.
- **Bracket sharing card** (auto-generated image of your picks) — compelling feature, but image generation in the browser is an afternoon of work. Post-launch.
- **Third-place match prediction** — exists in the real tournament, but adds complexity to the scoring logic. Leave it unscored for this year.

---

## Reference: Firebase Collections Schema

```
/rsvps/{docId}
  name: string
  country: string (ISO code)
  submittedAt: timestamp

/bracketPicks/{userId}
  userId: string (localStorage UUID)
  name: string
  groups: { A: { first: "us", second: "mx", third: "ca", fourth: "uy" }, B: {...}, ... }
  thirdPlaceQualifiers: ["us", "br", "de", "fr", "es", "pt", "ar", "kr"]
  r32: [{ matchId: "r32_1", winner: "br" }, ...]
  r16: [...]
  qf: [...]
  sf: [...]
  final: { matchId: "final", winner: "br" }
  totalScore: number
  lastUpdated: timestamp

/matchResults/{matchId}
  round: "group" | "r32" | "r16" | "qf" | "sf" | "final"
  homeTeam: string (ISO code)
  awayTeam: string (ISO code)
  homeScore: number
  awayScore: number
  winner: string (ISO code, null for draws in group stage)
  playedAt: timestamp

/communityPosts/{docId}
  photoURL: string (Firebase Storage URL)
  caption: string
  name: string
  country: string (ISO code)
  userId: string
  timestamp: timestamp
  flagged: boolean

/users/{userId}
  name: string
  country: string
  rsvpId: string (reference to rsvps collection)
  createdAt: timestamp
```

---

_Last updated: May 12, 2026_
