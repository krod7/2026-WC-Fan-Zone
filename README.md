# FIFA 2026 World Cup Fan Zone & Bracket Challenge

A full-stack web application developed to serve as a central hub for a FIFA 2026 World Cup watch party event. This project showcases my proficiency in modern web development by integrating a real-time countdown timer, a detailed game schedule, and a community gallery. The application also includes a dynamic RSVP system powered by Firebase for data persistence. This project demonstrates my ability to build complex, user-centric applications from the ground up and manage a project's full development lifecycle.

## Upcoming Features

I am actively working on the following features to build upon the current foundation:

- **Responsive Design:** Making the site fully responsive to different screen sizes, from mobile phones to large-screen displays.
- **Real-Time Data:** Implementing a news ticker and a dynamic match card system that will display live scores and updates.
- **Bracket Challenge:** Creating a full tournament bracket challenge with prediction tracking and a leaderboard.
- **Gallery Functionality:** Improving the community gallery with functional photo and video carousels.
- **Data Updates:** Evaluating and updating the country data in the JSON files once the World Cup Qualifiers are finalized.

## Technologies Used

- **Languages:** HTML, CSS, JavaScript
- **Database:** Firebase Firestore (for the RSVP system so far)
- **Package Management:** npm
- **Bundling/Development Server:** Vite (as listed in package.json and used in scripts)
- **Version Control:** Git, GitHub
- **Other Tools:** Terminal

## Setup / Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krod7/2026-WC-Fan-Zone.git
   cd 2026-WC-Fan-Zone
   ```
2. **Install dependencies:**

   ```bash
   pnpm install
   ```

   Note: This project has been refactored to use pnpm instead of npm. pnpm is used for better performance and more efficient disk space usage, which are considered best practices for modern JavaScript projects.

3. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase config to a `.env.local` file as described in the project.
4. **Run the development server:**
   ```bash
   pnpm start OR pnpm run dev
   ```
5. **Open your browser:**  
   Visit `http://localhost:####` to view the app.
   Note: the `####` is your port number. This can vary, but Vite's default port is typically `5173`

## Status

**Work in Progress:**  
This project is actively being developed. Features and UI are subject to change as new updates are released.
