// Initialize button with user's preferred color

// 'document' refers to the document object, which is what an HTML
// document becomes when loaded into a web browser
// changeColor is a variable denoting the DOM element with id "changeColor"
let changeColor = document.getElementById("changeColor");

// 'color' is the parameter of the anonymous function defined below using arrow notation
// the value associated with the key "color" is presumably fed into the callback function once available
// chrome.storage is an async API, so the 'get' function is async and takes in a callback function
chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    // query() returns a Promise, and await returns the fulfilled value of this Promise, which is presumably an array of Tabs
    // let [tab] is an example of array destructuring (ES6): take the first element of returned array and assign it to variable 'tab'
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // inject script into target context (current tab)
    // parameter is ScriptInjection object with 'target' and 'function' properties
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // setPageBackgroundColor can be used here due to JS hoisting
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        // document.body returns the <body> element
        // .style.backgroundColor allows us to access the CSS background-color property of the HTML element (inline style attribute of element)
        document.body.style.backgroundColor = color;
    });
}