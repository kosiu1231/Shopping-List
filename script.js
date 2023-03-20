const addItemDiv = document.querySelector("#addNewParagraph");
let elem = "";
let node = "";

const getItems = () => JSON.parse(localStorage.getItem("items")) || []; //returns null, make empty arr instead
const saveItems = (items) => localStorage.setItem("items", JSON.stringify(items));

function addParagraph(name) {
    const existingParagraphs = document.querySelectorAll("p");
    const existingNames = Array.from(existingParagraphs).map(p => p.textContent.substring(2));

    if (!existingNames.includes(name)) {
        elem = document.createElement("p");
        node = document.createTextNode(`- ${name}`);
        elem.appendChild(node);
        elem.classList.add("text-3xl", "sm:text-4xl");

        const isCrossedOut = localStorage.getItem(`crossedOut-${name}`) === "true";
        if (isCrossedOut) {
            elem.classList.add("pCrossed");
        }

        elem.addEventListener("click", function() {
            this.classList.toggle("pCrossed");
            const crossedOut = this.classList.contains("pCrossed");
            localStorage.setItem(`crossedOut-${name}`, crossedOut.toString());
        });

        addItemDiv.parentNode.insertBefore(elem, addItemDiv);

        const items = getItems();
        items.push(name);
        saveItems(items);
    }
}

const removeAllItems = () => localStorage.removeItem("items");

const removeAllParagraphs = () => {
    const items = getItems();
    removeAllItems();

    const paragraphs = document.querySelectorAll("p.text-3xl");

    for (let i = 0; i < paragraphs.length - 1; i++) {
        const paragraph = paragraphs[i];
        const name = paragraph.textContent.substring(2);
        localStorage.removeItem(`crossedOut-${name}`);

        paragraphs[i].remove();
      }
};

function addItem() {
    addParagraph(newItemTextbox.value);
    newItemTextbox.value = "";
}

const newItemTextbox = document.querySelector("#newItemTextbox");

newItemTextbox.addEventListener("keydown", function (e) {
    if ((e.code === "Enter" || e.code === 13) && newItemTextbox.value != "") {
        addItem();
    }
});

const addIcon = document.querySelector(".gg-math-plus");

addIcon.addEventListener("click", function (e) {
    addItem();
});

const deleteIcon = document.querySelector(".fa");

deleteIcon.addEventListener("click", function (e) {
    removeAllParagraphs();
});

// const removeParagraph = (index) => {
//     const items = getItems();
//     items.splice(index, 1);
//     saveItems(items);
// };

// const updateItem = (index, value) => {
//     const items = getItems();
//     items[index] = value;
//     saveItems(items);
// };

const init = () => {
    const items = getItems();
    items.forEach((item) => addParagraph(item));
};

init();