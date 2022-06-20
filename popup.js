// Initialize button with user's preferred color

// 'document' refers to the document object, which is what an HTML
// document becomes when loaded into a web browser
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});