let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
// 'const' means you cannot change the memory location that's pointed to (no reassignment, no redeclaration)
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// reacts to a button click by marking the selected button and saving the selection
// this is the event listener callback--it accepts a single parameter, an Event object describing the event that has occurred
function handleButtonClick(event) {
    // remove styling from the previously selected color
    // access target property of Event object, i.e. the HTML element that fires the event
    // event.target.parentElement is 'page' (buttonDiv) in this case
    // in this case, querySelector's parameter is a class selector
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    // current is false iff current = null (all objects are true, and null is the only non-object return value)
    // if selected button exists and is not current button, unmark previously selected button
    if (current && current !== event.target) {
        // Element.classList is a property that returns a DOMTokenList collection of the class attributes of the element
        // remove() method of DOMTokenList interface/object removes specified tokens from list
        current.classList.remove(selectedClassName);
    }

    // mark the button as selected and store color of button
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color });
}

// add a button to the page for each supplied color
function constructOptions(buttonColors) {
    // get() presumably returns object with 'color' property equal to value of key 'color'
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;
        // for each color we were provided...
        for (let buttonColor of buttonColors) {
            // first, create new DOM element (button)
            let button = document.createElement("button");
            // set 'color' attribute--'color' is a standard HTML attribute
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            // mark currently selected color
            if (buttonColor == currentColor) {
                button.classList.add(selectedClassName);
            }

            // register a listener for when that button is clicked
            button.addEventListener("click", handleButtonClick);
            // then, attach DOM element (button) to DOM tree
            // <button> has default CSS 'display' property 'inline-block'
            page.appendChild(button);
        }
    });
}

// initialize the page by constructing the color options
constructOptions(presetButtonColors);