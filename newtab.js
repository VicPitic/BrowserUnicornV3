// newtab.js - JavaScript for New Tab Page

var currentWebsiteContainer;
var offsetX, offsetY;

// Get website list from storage
chrome.storage.sync.get({ websites: [], frames: [] }, function (result) {
    var websites = result.websites;
    var frames = result.frames;
    var websitesContainer = document.getElementById('websitesContainer');

    // Create website iframe for each website in the list
    for (var i = 0; i < websites.length; i++) {
        // Create container for iframe and drag handle

        var websiteContainer = document.createElement('div');
        websiteContainer.className = 'websiteContainer ';
        websiteContainer.style.left = '0px';
        websiteContainer.style.top = '0px';
        var dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle  bg-indigo-500';
        websiteContainer.appendChild(dragHandle);

        // Create iframe element
        var websiteIframe = document.createElement('iframe');
        websiteIframe.src = websites[i];
        websiteIframe.classList.add('website');
        websiteContainer.appendChild(websiteIframe);

        // Add event listeners for drag
        dragHandle.addEventListener('mousedown', startDrag);

        websitesContainer.appendChild(websiteContainer);

        // Check if frame data exists and set position accordingly
        if (frames && frames[i]) {
            websiteContainer.style.left = frames[i].left + 'px';
            websiteContainer.style.top = frames[i].top + 'px';
            websiteContainer.style.width = frames[i].width + 'px';
            websiteContainer.style.height = frames[i].height + 'px';
        }
    }
});

function startDrag(event) {
    currentWebsiteContainer = event.target.parentElement;
    var containerRect = currentWebsiteContainer.getBoundingClientRect();
    offsetX = event.clientX - containerRect.left;
    offsetY = event.clientY - containerRect.top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    event.stopPropagation();
}

// Event listener for document mousemove event during dragging
function drag(event) {
    if (!currentWebsiteContainer) return;
    var mouseX = event.clientX - offsetX; // Subtract offsetX from clientX
    var mouseY = event.clientY - offsetY; // Subtract offsetY from clientY

    // Prevent window from moving beyond screen top edge
    if (mouseY < 0) {
        mouseY = 0;
    }

    currentWebsiteContainer.style.left = mouseX + 'px';
    currentWebsiteContainer.style.top = mouseY + 'px';
}

// Event listener for document mouseup event after dragging
function stopDrag(event) {
    // Save frame data to storage
    var frames = [];
    var websiteContainers = document.getElementsByClassName('websiteContainer');
    for (var i = 0; i < websiteContainers.length; i++) {
        var container = websiteContainers[i];
        var rect = container.getBoundingClientRect();
        var width = container.offsetWidth;
        var height = container.offsetHeight;
        frames.push({ left: rect.left, top: rect.top, width: width, height: height });
    }
    chrome.storage.sync.set({ frames: frames });

    currentWebsiteContainer = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

