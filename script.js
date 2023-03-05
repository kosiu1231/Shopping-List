const addItemDiv = document.querySelector("#addNewParagraph");
let elem = "";
let node = "";

function addParagraph(name) {
    elem = document.createElement("p");
    node = document.createTextNode(`- ${name}`);
    elem.appendChild(node);
    elem.classList.add("text-3xl", "sm:text-4xl");

    addItemDiv.parentNode.insertBefore(elem, addItemDiv);
}

const newItemTextbox = document.querySelector("#newItemTextbox");

newItemTextbox.addEventListener("keydown", function (e) {
    if (e.code === "Enter" && newItemTextbox.value != "") {
        addParagraph(newItemTextbox.value);
        newItemTextbox.value = "";
    }
});