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