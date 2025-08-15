// --- Firebase SDK Imports and Configuration ---
// These lines should be at the very top of your script.js file.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
// !! IMPORTANT: These values are now read from your .env file via Vite's import.meta.env !!
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  // If you also have measurementId in your .env, uncomment and use it:
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get a reference to your Firestore database
const rsvpsCollection = collection(db, 'rsvps'); // Get a reference to the 'rsvps' collection where we'll store data

// ============================================
/* NEW: Variables for Cycling RSVP Display */
// ============================================
let allRsvps = []; // Will store all RSVPs fetched from Firestore
let currentDisplayIndex = 0; // Tracks which RSVP to start displaying from
const rsvpsPerCycle = 3; // How many RSVPs to show at one time (you can adjust this!)
const cycleIntervalTime = 5000; // How long each set of RSVPs stays visible (5 seconds)
let rsvpDisplayIntervalId = null; // To hold the ID of the interval, so we can clear it

// Function to display a subset of RSVPs and cycle through them
function displayRsvpsInCycle(rsvpListElement) {
    rsvpListElement.innerHTML = ''; // Clear current display

    if (allRsvps.length === 0) {
        rsvpListElement.innerHTML = '<li>No one has RSVP\'d yet. Be the first to join the fun!</li>';
        return;
    }

    // Determine which RSVPs to show in this cycle
    const rsvpsToShow = [];
    for (let i = 0; i < rsvpsPerCycle; i++) {
        // Use modulo to wrap around to the beginning of the list
        const actualIndex = (currentDisplayIndex + i) % allRsvps.length;
        rsvpsToShow.push(allRsvps[actualIndex]);
    }

    // Render the selected RSVPs
    rsvpsToShow.forEach(rsvp => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="img/flags/${rsvp.homeCountryCode}.png" alt="${rsvp.homeCountryName} flag" class="flag-icon" />
            <b>${rsvp.userName}</b> from ${rsvp.homeCountryName} is joining the fun!
        `;
        rsvpListElement.appendChild(listItem);
    });

    // Advance the starting index for the next cycle
    currentDisplayIndex = (currentDisplayIndex + 1) % allRsvps.length;
}

// Function to start or restart the cycling interval
function startRsvpCycling(rsvpListElement) {
    // Clear any existing interval to prevent multiple intervals running concurrently
    if (rsvpDisplayIntervalId) {
        clearInterval(rsvpDisplayIntervalId);
    }
    // Call once immediately to show initial set
    displayRsvpsInCycle(rsvpListElement);
    // Start the interval to cycle through RSVPs
    rsvpDisplayIntervalId = setInterval(() => displayRsvpsInCycle(rsvpListElement), cycleIntervalTime);
}
// ============================================
/* END NEW: Variables & Functions for Cycling RSVP Display */
// ============================================


// ============================
/* Countdown Timer */
// ============================
// Set the date to count down to (Match 1 Kickoff)
// No Kickoff time yet, adjust when necessary
// .getTime() converts the date to a timestamp
const targetDate = new Date('June 11, 2026 00:00:00').getTime();

// Define the countdown function
// => (arrow) defines the function
const countdown = () => {
  
  // new Date() gets the current time (now) stores it
  // its just a static value, "snapshot" of the time
  // .getTime() converts
  const now = new Date().getTime();
  
  // subtract the difference from the targetDate from now
  const timeLeft = targetDate - now;
  
  // Check if the countdown reaches the date
  if (timeLeft <= 0) {
    // document.getElementById() finds elements in the HTML file by id name
    // .textContent changes/updates the text inside that element
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    
    // this return will exit the function, stop running code
    return;
  }
  
  // Convert milliseconds (ms) from timeLeft into time units (days, hours, mins, seconds)
  // Math.floor() function rounds down to nearest whole time unit
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  
  // The modulus (%) helps get whats left after subtracting full time units
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  /* 
  After updating the time unit values,
  make sure single-digit numbers still have a leading 0
  just like other clocks and countdowns
  Ex: 10 -> 9 -> 09 is seen on clock
  */
 // String(days).padStart(2, '0'); places that leading 0
 document.getElementById('days').textContent = String(days).padStart(2, '0');
 document.getElementById('hours').textContent = String(hours).padStart(2, '0');
 document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
 document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

// Run the function
countdown();    // Run it once initially
setInterval(countdown, 1000);   // Update every second (1000ms)

// ============================
/* All DOM-related code should go inside this single listener */
/* Ensure all elements are available in the DOM before accessing them */
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  /* Bracket Section: Country Dropdown, Flag Setup & Modal */
  // ============================
  // Get all relevant elements that impact dropdown functionality from DOM
  const dropdown = document.getElementById("country-dropdown");
  const selected = dropdown.querySelector(".selected");
  const list = dropdown.querySelector(".dropdown-list");
  const winnerInput = document.getElementById("winner-input");
  // Get the bracket form and the winner modal elements
  const bracketForm = document.getElementById("bracket-form");
  const bracketModal = document.getElementById("bracket-modal");
  const bracketModalTitle = document.getElementById("bracket-modal-title");
  const winnerFlag = document.getElementById("winner-flag");
  const bracketModalDescription = document.getElementById("bracket-modal-description");
  const bracketCloseBtn = bracketModal.querySelector(".close-btn");

  
  // Get the country names and codes from qualified-countries.json
  fetch("qualified-countries.json")
  // Convert fetched JSON response into a JavaScript object (Load and Parse)
  
  .then(res => res.json())
  .then(data => {
    // Populate the countries in the list
    // Convert objects into an array that takes the country codes and its name [key, value]
    // Iterate through each of the pairs, [code, name]
    // Making dropdown options
    Object.entries(data).forEach(([code, name]) => {
      
      // Create a new list element into the HTML for each country
      const li = document.createElement("li");
      li.innerHTML = `
      <img src="img/flags/${code}.png" alt="${name} flag" class="flag-icon" />
      <span>${name}</span>
      `;
      li.dataset.code = code;
      
      // When an option is clicked
      li.addEventListener("click", () => {
        
        // Update and Display the selected country in the main dropdown view
        selected.innerHTML = `
        <img src="img/flags/${code}.png" alt="${name} flag" class="flag-icon" />
        <span>${name}</span>
        `;
        
        // Store selected country code in hidden input and close the dropdown
        winnerInput.value = code;
        dropdown.classList.remove("open");
      });
      
      // Add the selected country to dropdown menu
      list.appendChild(li);
    });
  });
  
  // Toggle dropdown open/close
  selected.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });
  
  // Close the dropdown when clicking outside of it using global click listener
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

  // Add a submit event listener to the bracket form
  bracketForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page from refreshing
    
    const winnerCountryCode = winnerInput.value;
    const winnerCountryName = selected.querySelector("span")?.textContent || "Your Champion";
    
    if (winnerCountryCode) {
      // Update the modal content with the winner's details
      bracketModalTitle.textContent = winnerCountryName;
      winnerFlag.innerHTML = `<img src="img/flags/${winnerCountryCode}.png" alt="${winnerCountryName} flag" class="flag-icon" />`;
      bracketModalDescription.textContent = `You predict ${winnerCountryName} to be FIFA World Cup Champions!`;
      
      // Display the modal
      bracketModal.classList.add("show");
    }
    else {
      selected.classList.add('invalid');
    }
    
    // Set the modal to disappear automatically after 8 seconds
    setTimeout(() => {
      bracketModal.classList.remove("show");
    }, 8000); // 8000 milliseconds = 8 seconds

  });
  
  // Add a click event listener to the close button to hide the modal
  bracketCloseBtn.addEventListener("click", () => {
    bracketModal.classList.remove("show");
  });
  
  // ============================
  /* RSVP Section: Form & Interaction */
  // ============================
  // Get all relevant elements from HTML to help the form function
  const rsvpForm = document.getElementById("rsvp-form");
  const nameInput = document.getElementById("user-name");
  const emailInput = document.getElementById("email");
  // Get dropdown element to implement just like in bracket section
  const homeCountryDropdown = document.getElementById("home-country-dropdown");
  const homeCountryInput = document.getElementById("home-country");
  const rsvpList = document.querySelector(".rsvp-list"); // The UL element where RSVPs are displayed
  // Get the span for the RSVP count
  const rsvpCountSpan = document.getElementById("rsvp-count");
  // Get the modal and the close button elements
  const rsvpModal = document.getElementById("rsvp-modal");
  const closeRsvpBtn = document.getElementById("close-rsvp");
  
  // REMOVED: Initializing local rsvpCount and updateRsvpCount function.
  // We will now get this from Firestore in real-time.
  
  // Populate the home country dropdown
  const homeCountrySelected = homeCountryDropdown.querySelector(".selected");
  const homeCountryList = homeCountryDropdown.querySelector(".dropdown-list");
  
  fetch("all-countries.json")
  .then(res => res.json())
  .then(data => {
    Object.entries(data).forEach(([code, name]) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <img src="img/flags/${code}.png" alt="${name} flag" class="flag-icon" />
      <span>${name}</span>
      `;
      li.dataset.code = code;
      
      li.addEventListener("click", () => {
        homeCountrySelected.innerHTML = `
        <img src="img/flags/${code}.png" alt="${name} flag" class="flag-icon" />
        <span>${name}</span>
        `;
        homeCountryInput.value = code; // Store the country code in the hidden input
        // Remove invalid highlighting immediately when a valid country is selected
        homeCountrySelected.classList.remove('invalid');
        homeCountryDropdown.classList.remove("open");
      });
      homeCountryList.appendChild(li);
    });
  });
  
  // Toggle dropdown open/close for home country
  homeCountrySelected.addEventListener("click", () => {
    homeCountryDropdown.classList.toggle("open");
  });
  
  // Close the dropdown when clicking outside of it
  document.addEventListener("click", (e) => {
    if (!homeCountryDropdown.contains(e.target)) {
      homeCountryDropdown.classList.remove("open");
    }
  });

  // --- MODIFIED: Real-time listener for RSVPs from Firestore ---
  // This will now store all RSVPs and then trigger the display cycle
  const q = query(rsvpsCollection, orderBy('timestamp', 'asc')); // Order by timestamp

  onSnapshot(q, (snapshot) => {
    allRsvps = snapshot.docs.map(doc => doc.data()); // Store all data locally in the 'allRsvps' array
    rsvpCountSpan.textContent = allRsvps.length; // Always update the total count accurately

    // Start or restart the cycling display whenever the data changes
    startRsvpCycling(rsvpList); // Pass the rsvpList element to the function
  }, (error) => {
    console.error("Error fetching real-time RSVPs: ", error);
    // Optionally display a message to the user if real-time updates fail
  });
  // --- END MODIFIED: Real-time listener ---
  
  // ============================
  /* RSVP Form Interaction & Success Modal */
  // ============================
  // MODIFIED: Added 'async' keyword because we'll be using 'await' with Firestore
  rsvpForm.addEventListener("submit", async (e) => { 
    // Prevent page from refreshing once the form is submitted
    e.preventDefault();
    
    // Reset invalid classes for all inputs at the start of submission attempt
    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    homeCountrySelected.classList.remove('invalid');
    
    // Assume inputs are valid until proven otherwise
    let isValid = true;
    
    // Get all relevant input elements to loop through, including the hidden country input value for validation
    // Declare an array of standard input fields
    const formInputs = [nameInput, emailInput];
    
    // Loop through general input fields to check if length is less than 2 characters
    formInputs.forEach(input => {
      // Check if the input's trimmed value length is less than 2
      if (input.value.trim().length < 2) {
        // Clear input box and highlight invalid
        input.value = "";
        input.classList.add('invalid');
        isValid = false;
      } 
      else {
        input.classList.remove('invalid');
      }
    });
    
    // Check Email Input for null/empty or invalid format
    if (emailInput.value.trim() === "") {
      // Clear input box and highlight invalid
      emailInput.value = "";
      emailInput.classList.add('invalid');
      isValid = false;
    }
    // Check if email has __@__.__ structure using regex (more realistic)
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailInput.value.trim())) {
      emailInput.value = "";
      emailInput.classList.add('invalid');
      isValid = false;
    } 
    else {
      emailInput.classList.remove('invalid');
    }
    
    // Check Home Country Dropdown for null/empty selection
    if (homeCountryInput.value.trim() === "") {
      // Clear input box and highlight invalid
      homeCountryInput.value = "";
      homeCountrySelected.innerHTML = "Home Country";
      homeCountrySelected.classList.add('invalid');
      isValid = false;
    } 
    else {
      homeCountrySelected.classList.remove('invalid');
    }
    
    // Processing Submission
    // Only proceed if all inputs are valid after checking all conditions
    if (isValid) {
      // Get values from the form inputs
      const userName = nameInput.value.trim();
      const userEmail = emailInput.value.trim();
      const homeCountryCode = homeCountryInput.value.trim();
      const homeCountryName = homeCountrySelected.querySelector("span").textContent; // Get the currently displayed name

      // Get the modal elements
      const modalTitle = document.getElementById("modal-title");
      const modalDescription = document.getElementById("modal-description");
      
      try {
        // --- MODIFIED: Add the RSVP data to Firestore ---
        await addDoc(rsvpsCollection, {
          userName: userName,
          userEmail: userEmail,
          homeCountryCode: homeCountryCode,
          homeCountryName: homeCountryName,
          timestamp: serverTimestamp() // Adds a Firestore server timestamp for reliable ordering
        });
        // --- END MODIFIED ---

        // Display the modal by adding the 'show' class (existing logic)
        rsvpModal.classList.add("show");
        
        // Update modal content with personalized message (existing logic)
        modalTitle.textContent = `RSVP Successful, ${userName}!`;
        modalDescription.textContent = `Thank you for joining the FIFA FanZone 2026! You're all set to celebrate the beautiful game with us!`;
        
        // Set the modal to disappear automatically after 8 seconds (existing logic)
        setTimeout(() => {
          rsvpModal.classList.remove("show");
        }, 8000); // 8000 milliseconds = 8 seconds
        
        // Clear/Reset all inputs for next user to rsvp (existing logic)
        nameInput.value = "";
        emailInput.value = "";
        homeCountryInput.value = "";
        homeCountrySelected.innerHTML = "Home Country";

      } catch (error) {
        // Handle any errors during the Firestore operation
        console.error("Error adding RSVP to Firestore: ", error);
        alert("Oops! There was an error submitting your RSVP. Please try again."); // Provide user feedback
      }
    }
    // else (if !isValid) clear the invalid inputs and highlight red (existing logic)
  });
  
  // REMOVED: Initializing the count on page load (now handled by onSnapshot)
  // updateRsvpCount(); 
  
  // Add a click event listener to the close button
  closeRsvpBtn.addEventListener("click", () => {
    rsvpModal.classList.remove("show");
  });
  
  
  
  // ============================
  /* Dark Mode Toggle */
  // ============================
  const themeBtn = document.getElementById("theme-toggle");
  
  // Check for stored theme in localStorage or default to system preference
  function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) 
      return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  
  // Apply the theme to <html>
  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    themeBtn.textContent = theme === "dark" ? "☼" : "☾";
    themeBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
  
  // On load
  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  
  // On click
  themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
});
