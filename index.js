function addNewToDo(){
    let inputElement = document.querySelector(".js-input-text");
    const parentDiv = document.querySelector(".list-item").parentNode;
    let childElements = document.querySelectorAll(".list-item");
    let firstChild = childElements[0];
    if(inputElement.value !== ""){
        const newDiv = document.createElement("div");
        newDiv.classList.add("list-item");
        newDiv.setAttribute("draggable", true);
        const newLabel = document.createElement("label");
        newLabel.classList.add("js-check-label");
        const newInput = document.createElement("input");
        newInput.setAttribute("type", "checkbox");
        newInput.classList.add("js-check");
        newLabel.appendChild(newInput);
        const newPara = document.createElement("p");
        newPara.textContent = inputElement.value;
        newPara.classList.add("text-output");
        const newCross = document.createElement("img");
        newCross.src = "./images/icon-cross.svg";
        newCross.classList.add("cross");
        newCross.addEventListener('click', function() {removeTask();});
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newPara);
        newDiv.appendChild(newCross);
        parentDiv.insertBefore(newDiv, firstChild);
        calculateTasksLeft();
    }
}

function fillCircle(){
    const circleElement = document.querySelector(".js-add-label");
    let inputElement = document.querySelector(".js-input-text");
    if(inputElement.value !== ""){
        circleElement.classList.add("fill-circle");
    }else{
        circleElement.classList.remove("fill-circle");
    }
}

function themeSwitcher(){
    const darkTheme = document.querySelector("#dark")
    const lightTheme = document.querySelector("#light");
    const themeIcons = document.querySelectorAll(".radio-icon");
    const backgroundDiv = document.querySelector(".background");
    if(lightTheme.checked){
        themeIcons[0].classList.remove("hidden");
        themeIcons[1].classList.add("hidden");
        backgroundDiv.style.backgroundImage = "url('./images/bg-desktop-light.jpg')"
    }else if(darkTheme.checked){
        themeIcons[0].classList.add("hidden");
        themeIcons[1].classList.remove("hidden");
        backgroundDiv.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')"
    }
}

function checkComplete(button){
    button.addEventListener("change", function (event) {
        const checkbox = event.target;
        const textOutput = checkbox.parentNode.nextElementSibling;
        if (checkbox.checked) {
            textOutput.classList.add("completed");
        } else {
            textOutput.classList.remove("completed");
        }
        calculateTasksLeft();
        });
}

document.querySelectorAll(".js-check").forEach(function(button){
    button.addEventListener('click', function(event) {checkComplete(event.target);});
});

function selectAllTasks(){
    const textOutputs = document.querySelectorAll(".text-output");
    textOutputs.forEach((textOutput) => {
        if(textOutput.classList.contains("completed")){
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.remove('hidden');
            calculateTasksLeft();
        }else{
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.remove('hidden');
        }
    });
}

function selectActiveTasks(){
    const textOutputs = document.querySelectorAll(".text-output");
    textOutputs.forEach((textOutput) => {
        if(textOutput.classList.contains("completed")){
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.add('hidden');
            calculateTasksLeft();
        }else{
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.remove('hidden');
        }
    });
}

function selectCompletedTasks(){
    const textOutputs = document.querySelectorAll(".text-output");
    textOutputs.forEach((textOutput) => {
        if(!textOutput.classList.contains("completed")){
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.add('hidden');
            let itemsLeft = document.querySelector(".js-items-left")
            itemsLeft.textContent = "0"
        }else{
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.classList.remove('hidden');
        }
    });
}

function clearCompletedTasks(){
    const textOutputs = document.querySelectorAll(".text-output");
    textOutputs.forEach((textOutput) => {
        if(textOutput.classList.contains("completed")){
            const parentDiv = textOutput.closest(".list-item");
            parentDiv.remove();
        }
    });
}

function removeTask(){
    const parentDivs = document.querySelectorAll(".list-item");
    for (parentDiv of parentDivs){
        if(parentDiv.matches(":hover")){
            parentDiv.remove();
        }
    }
    calculateTasksLeft();
}

document.querySelectorAll(".cross").forEach(function(cross){
    cross.addEventListener('click', function() {removeTask();});
});

function calculateTasksLeft(){
    let textsCompleted = document.querySelectorAll(".text-output");
    let itemsLeft = document.querySelector(".js-items-left")
    let itemsLeftNumber = 0;
    for(let i = 0; i < textsCompleted.length; i++){
        if(!textsCompleted[i].classList.contains("completed")){
            itemsLeftNumber++;
        }
    }
    itemsLeft.textContent = itemsLeftNumber.toString();
}

document.addEventListener('DOMContentLoaded', function() {
    calculateTasksLeft();
});

function changeFooterElementsMobile(){
    const listFooter = document.querySelector(".list-footer");
    const listFilter = document.querySelector(".filter");
    if(listFooter.contains(listFilter)){
        listFilter.remove();
        createNewDivMobile();
    }
}   

function createNewDivMobile(){
    const listContainer = document.querySelector(".container");
    const lastPara = document.querySelector(".container > p");
    lastPara.remove();
    const newDiv = document.createElement("div");
    newDiv.classList.add("mobile-div");
    const newAllInput = document.createElement("input");
    newAllInput.setAttribute("type", "radio");
    newAllInput.setAttribute("name", "status");
    newAllInput.setAttribute("id", "radio-all");
    newAllInput.setAttribute("value", "all");
    newAllInput.setAttribute("onclick", "selectAllTasks()");
    newAllInput.setAttribute("checked", true);
    newAllInput.checked = true;
    const newAllLabel = document.createElement("label");
    newAllLabel.setAttribute("for", "radio-all");
    newAllLabel.textContent = "All"
    const newActiveInput = document.createElement("input");
    newActiveInput.setAttribute("type", "radio");
    newActiveInput.setAttribute("name", "status");
    newActiveInput.setAttribute("id", "radio-active");
    newActiveInput.setAttribute("value", "active");
    newActiveInput.setAttribute("onclick", "selectActiveTasks()");
    const newActiveLabel = document.createElement("label");
    newActiveLabel.setAttribute("for", "radio-active");
    newActiveLabel.textContent = "Active"
    const newCompletedInput = document.createElement("input");
    newCompletedInput.setAttribute("type", "radio");
    newCompletedInput.setAttribute("name", "status");
    newCompletedInput.setAttribute("id", "radio-completed");
    newCompletedInput.setAttribute("value", "completed");
    newCompletedInput.setAttribute("onclick", "selectCompletedTasks()");
    const newCompletedLabel = document.createElement("label");
    newCompletedLabel.setAttribute("for", "radio-completed");
    newCompletedLabel.textContent = "Completed"
    newDiv.appendChild(newAllInput);
    newDiv.appendChild(newAllLabel);
    newDiv.appendChild(newActiveInput);
    newDiv.appendChild(newActiveLabel);
    newDiv.appendChild(newCompletedInput);
    newDiv.appendChild(newCompletedLabel);
    listContainer.appendChild(newDiv);
    const newLastPara = document.createElement("p");
    newLastPara.style.marginTop = "2rem";
    newLastPara.style.paddingBottom = "4rem";
    newLastPara.textContent = "Drag and drop to reorder list";
    listContainer.appendChild(newLastPara);
}

window.addEventListener("resize", function(){
    if (window.innerWidth <= 600) {
        changeFooterElementsMobile();
    }
});

const itemContainer = document.querySelector(".list");
const listItems = document.querySelectorAll(".list-item");

listItems.forEach(item => {
    item.addEventListener("dragstart", () =>{
        item.classList.add("dragging");
    });
    item.addEventListener("dragend", () =>{
        item.classList.remove("dragging");
    });
});

const initSortableContainer = (e) =>{
    e.preventDefault();
    const draggingItem = itemContainer.querySelector(".dragging");
    const siblings = [...itemContainer.querySelectorAll(".list-item:not(.dragging)")];
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    itemContainer.insertBefore(draggingItem, nextSibling)
}

itemContainer.addEventListener("dragover", initSortableContainer)