// Get website list from storage
chrome.storage.sync.get({ websites: [] }, function(result) {
    var websites = result.websites;
  
    // Check if current URL matches any website in the list
    if (websites.includes(window.location.href)) {
      // Open all websites in new tabs
      for (var i = 0; i < websites.length; i++) {
        if (websites[i] !== window.location.href) {
          window.open(websites[i], '_blank');
        }
      }
    }
  });