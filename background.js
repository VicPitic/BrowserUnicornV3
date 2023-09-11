chrome.runtime.onInstalled.addListener(() => {
  // Your initialization code here
});

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const responseHeaders = details.responseHeaders.filter(
      (header) => header.name.toLowerCase() !== 'x-frame-options'
    );
    return { responseHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'responseHeaders']
);