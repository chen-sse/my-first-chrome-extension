let color = '#3aa757';

// chrome.runtime is an API, onInstalled is an event, addListener() registers an event listener to the event
// () => {} denotes an anonymous function (no name) with no parameters
chrome.runtime.onInstalled.addListener(() => {
    // store user data 'color'
    chrome.storage.sync.set({ color });
    // Print message to console
    // 'green' is printed in the color stored in 'color' variable using CSS console format specifier %c
    console.log('Default background color set to %cgreen', `color: ${color}`);
});