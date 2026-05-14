FIFA FanZone 2026 — Full Build Schedule

Week 1 — Foundation & Fixes
Day 1 — Quick fixes & get Firebase running

Add <meta charset="UTF-8"> as first line inside <head> — fixes all garbled characters
Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> on the line below it
Remove "Community" from the navbar <ul> (section is hidden, link goes nowhere)
Add min-height: 100vh to .hero in CSS
Wire up the scroll arrow click handler in script.js to toggle #upcoming-matches and rotate the arrow icon
Add RSVP count persistence using localStorage — read on load, write on each submit
Reinitialize Firebase project (Firestore + Storage + Hosting) in Firebase console
Install Firebase SDK and create firebase-config.js with your project credentials
Test that Firestore reads/writes work from your local server

Day 2 — Real match data + schedule overhaul

Look up the full 2026 FIFA World Cup Group Stage schedule (all 48 matches, 12 groups)
Replace all "Team A vs Team B" placeholder cards with real fixtures — team names, kickoff times in CT, stadium names
Organize the match cards by matchday (Matchday 1, 2, 3) with a small label above each grid
Update the scroll arrow logic so it pages through matchdays rather than just two static grids
Confirm all 12 group letters (A through L) are documented — you'll need them for the bracket section

Week 2 — Bracket Challenge Part 1 (Group Stage Predictions)
Day 3 — Group stage prediction UI

Design the data structure for group stage picks: for each of 12 groups, user picks 1st place, 2nd place, and one 3rd-place finisher
Build the group prediction component — display each group (A–L) with its 4 real teams
For each group, render a dropdown or drag-rank UI to let users pick 1st and 2nd
Add a separate "Best 3rd place" section — display all 12 group 3rd-place picks as a pool, user selects 8 of them to advance
Add client-side validation — all 12 groups must have a 1st and 2nd pick, exactly 8 third-place teams selected

Day 4 — Save group picks to Firestore + show confirmation

Set up the /bracketPicks/{userId} Firestore collection
On submit, write group stage picks to Firestore under the user's entry
Generate a simple user ID (UUID stored in localStorage) to track each browser session as one user
Show a confirmation state after saving — highlight the submitted picks, lock the form with an "Edit picks" button
Pull and display the user's existing picks on page load if they've already submitted

Week 3 — Bracket Challenge Part 2 (KO Round + Leaderboard)
Day 5 — KO bracket visual + predictions

Build the bowtie bracket component — 32 slots on each side converging to the Final in the center
Populate R32 slots with the fixed matchup structure (which group winner plays which 3rd-place qualifier etc.) — this is the standard FIFA draw formula
Let users click each matchup slot to pick the winner — winning pick auto-populates the next round's slot
Keep bracket locked until group stage picks are submitted
Style: winner slots highlighted in canary yellow, eliminated teams grayed out

Day 6 — Leaderboard setup + automated scoring

Create the /matchResults/{matchId} Firestore collection — you'll manually write results here as tournament progresses
Write a Firebase Cloud Function that triggers on new match results → loops all bracket picks → calculates points per the scoring system → updates each user's total score in /bracketPicks
Build the leaderboard UI — pull all bracket picks ordered by totalScore, render rank, name, country flag, champion pick, and score
Unhide the leaderboard section, connect it to live Firestore data
Test the full loop: write a fake result → confirm scores update → confirm leaderboard re-ranks

Week 4 — Community Gallery + RSVP Backend
Day 7 — Community gallery: upload + display

Unhide the gallery section in HTML
Build photo upload UI — file input, caption text field, auto-populated username and country from RSVP data
On submit: upload image to Firebase Storage → get download URL → write post document to /communityPosts Firestore collection
Add basic content moderation: file type restriction (jpg/png/gif only), max file size (5MB), and a report button on each post
Set Firebase Storage security rules to only allow authenticated-style writes (check your session UUID)

Day 8 — Gallery carousel + RSVP to Firestore

Pull all posts from Firestore on page load, ordered by timestamp descending
Render posts in the carousel — photo, caption, username, flag, "X hours ago" timestamp
Wire the carousel prev/next buttons to cycle through posts
Update RSVP form submit to also write to /rsvps/{docId} in Firestore
Pull RSVP list from Firestore on load so the list and count persist across all visitors (not per-device anymore)
Add a real-time Firestore listener on the RSVP collection so new RSVPs appear live without refresh

Week 5 — Mobile + Cross-Browser
Day 9 — Mobile responsive CSS

Add @media (max-width: 768px) breakpoint: single-column layout for about, rsvp, gallery sections
Build hamburger menu — hide .nav-links on mobile, show ☰ button, clicking it toggles a full-width dropdown nav panel
Match grid: 2 columns at 768px, 1 column below 480px
Hero: reduce h1 to 32px, h2 to 22px, countdown font to 20px
Country dropdowns: ensure they open upward when near bottom of screen (position: fixed approach or overflow detection)
Bracket bowtie: add horizontal scroll on mobile with a "← swipe →" hint label

Day 10 — iOS Safari + cross-browser testing

Test on iPhone Safari: check fixed navbar jump bug, fix with env(safe-area-inset-top) padding
Test on Android Chrome: verify dropdowns, modals, and file upload all work
Test on desktop Chrome, Firefox, and Safari
Fix any flexbox/grid inconsistencies between browsers
Check dark mode on all platforms — confirm iOS respects prefers-color-scheme on first load

Week 6 — Polish + Launch
Day 11 — Animations + UX polish

Add IntersectionObserver scroll-reveal: sections fade/slide in as user scrolls down
Add a loading skeleton state to the leaderboard and gallery while Firestore data fetches
Add a share button to the bracket confirmation — generates a pre-filled tweet/message: "I'm predicting [country] to win the 2026 World Cup! Join me at [URL]"
Add a "Bracket locked" countdown — once the tournament starts, picks can no longer be edited
Polish the bracket bowtie — add team flag icons in each slot once user has made picks

Day 12 — Final testing + deploy

Set Firebase Firestore security rules properly — no public writes to results or scores collections
Run through the complete user journey end to end: land → RSVP → make bracket picks → view leaderboard → upload gallery post
Check all nav anchor links go to the correct sections in correct order
Verify countdown timer accuracy — confirm it hits 00:00:00 on June 11 at the correct kickoff time
Run firebase deploy — site live on Firebase Hosting
Share the URL and confirm it loads correctly on your phone over cellular (not local wifi)

Ongoing — During the Tournament (June 11 → July 19)

After each match: write the result to /matchResults in Firestore → automated scoring fires
Monitor leaderboard for any scoring bugs after first batch of results
Post in the community gallery yourself to seed it with content
After Group Stage ends: lock group stage picks, unlock KO bracket picks for the R32 draw
After each KO round: lock that round's picks before the next set of matches kick off
