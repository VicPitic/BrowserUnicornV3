// Popup.js - JavaScript for popup UI

// Get toggle switch and toggle text elements
var toggleSwitch = document.getElementById('toggleSwitch');
var toggleText = document.getElementById('toggleText');

// Set initial state of toggle switch based on saved state
chrome.storage.sync.get({ isEnabled: true }, function (result) {
    toggleSwitch.checked = result.isEnabled;
    toggleText.textContent = result.isEnabled ? 'Toggle On' : 'Toggle Off';
});

// Add event listener for toggle switch change
toggleSwitch.addEventListener('change', function () {
    // Update saved state with new value
    var isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ isEnabled: isEnabled });

    // Update toggle text based on new value
    toggleText.textContent = isEnabled ? 'Toggle On' : 'Toggle Off';

    // Perform action based on toggle state (e.g., enable/disable your extension)
    if (isEnabled) {
        // Perform action when toggle is ON
        // Redirect to newtab.html
        chrome.tabs.update({ url: 'newtab.html' });
    } else {
        // Perform action when toggle is OFF
        // Redirect to google.com
        chrome.tabs.update({ url: 'https://www.google.com/' });
    }
});

// Rest of your popup.js code goes here
// ...



// Get website list from storage and populate website list
chrome.storage.sync.get({ websites: [] }, function (result) {
    var websites = result.websites;
    var websiteList = document.getElementById('websiteList');

    // Create list item for each website in the list
    for (var i = 0; i < websites.length; i++) {
        var websiteItem = document.createElement('li');
        var iframe = document.createElement('iframe');
        iframe.src = websites[i];
        websiteItem.appendChild(iframe);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.website = websites[i];
        deleteButton.className = 'deleteButton';
        websiteItem.appendChild(deleteButton);

        websiteList.appendChild(websiteItem);
    }


    // Add event listener for form submission
    var addWebsiteForm = document.getElementById('addWebsiteForm');
    addWebsiteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var websiteInput = document.getElementById('websiteInput');
        var websiteUrl = websiteInput.value;
        if (websiteUrl) {
            // Add "https://" if missing from the website URL
            if (!websiteUrl.startsWith('https://') && !websiteUrl.startsWith('http://')) {
                websiteUrl = 'https://' + websiteUrl;
            }
            // Add website to the list and update storage
            websites.push(websiteUrl);
            chrome.storage.sync.set({ websites: websites }, function () {
                // Create list item for the added website
                var websiteItem = document.createElement('li');
                websiteItem.innerHTML = `
            <span>${websiteUrl}</span>
            <button data-website="${websiteUrl}" class="deleteButton">Delete</button>
          `;
                websiteList.appendChild(websiteItem);

                // Clear input field
                websiteInput.value = '';
            });
        }
    });

    // Add event listener for delete button clicks
    websiteList.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteButton')) {
            var websiteUrl = event.target.getAttribute('data-website');
            if (websiteUrl) {
                // Remove website from the list and update storage
                websites = websites.filter(function (website) {
                    return website !== websiteUrl;
                });
                chrome.storage.sync.set({ websites: websites }, function () {
                    // Remove list item for the deleted website
                    var websiteItem = event.target.parentNode;
                    websiteItem.parentNode.removeChild(websiteItem);
                });
            }
        }
    });
});

// Get references to the login container and content container
const loginContainer = document.getElementById('loginContainer');
const contentContainer = document.getElementById('contentContainer');
const loginButton = document.getElementById('loginButton');
const signupContainer = document.getElementById('signupContainer');
const toggleLoginLink = document.getElementById('toggleLogin');
const toggleSignUpLink = document.getElementById('toggleSignUp');


toggleLoginLink.addEventListener('click', () => {
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
});

toggleSignUpLink.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});


// Check if the user has previously logged in
const hasLoggedIn = localStorage.getItem('hasLoggedIn');

if (hasLoggedIn) {
    // User has logged in before, hide the login screen and show the content
    loginContainer.style.display = 'none';
    contentContainer.style.display = 'block';
} else {
    // User has not logged in before, show the login screen
    loginContainer.style.display = 'block';
    contentContainer.style.display = 'none';
}

// Add a click event listener to the login button
loginButton.addEventListener('click', () => {
    // Hide the login container
    loginContainer.style.display = 'none';
    // Show the content container
    contentContainer.style.display = 'block';
    
    // Store the fact that the user has logged in
    localStorage.setItem('hasLoggedIn', 'true');
});


// Add a click event listener to the login button
signupButton.addEventListener('click', () => {
    // Hide the login container
    loginContainer.style.display = 'none';
    // Show the content container
    contentContainer.style.display = 'block';
    
    // Store the fact that the user has logged in
    localStorage.setItem('hasLoggedIn', 'true');
});

document.addEventListener('DOMContentLoaded', function () {
    const upgradeButton = document.getElementById('yoho');
    upgradeButton.addEventListener('click', function () {
      const stripeLink = 'https://buy.stripe.com/dR6cP07WI5zRe4g3ck';
      window.open(stripeLink, '_blank'); // Opens in a new tab or window
    });
  });

