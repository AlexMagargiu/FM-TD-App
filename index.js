function addNewToDo(){
    let inputElement = document.querySelector(".js-input-text");
    const parentDiv = document.querySelector(".list-item").parentNode;
    let childElements = document.querySelectorAll(".list-item");
    let firstChild = childElements[0];
    const newDiv = document.createElement("div");
    newDiv.classList.add("list-item");
    const newLabel = document.createElement("label");
    newLabel.classList.add("js-check-label");
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox");
    newInput.classList.add("js-check");
    newLabel.appendChild(newInput);
    const newPara = document.createElement("p");
    newPara.textContent = inputElement.value;
    newPara.classList.add("text-output");
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newPara);
    parentDiv.insertBefore(newDiv, firstChild);
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

function checkComplete(){
    const inputElements = document.querySelectorAll(".js-check")
    inputElements.forEach((checkbox) => {
        checkbox.addEventListener('change', function (event) {
            const checkbox = event.target;
            const textOutput = checkbox.parentNode.nextElementSibling;
            if (checkbox.checked) {
              textOutput.classList.add('completed');
            } else {
              textOutput.classList.remove('completed');
            }
          });
        });
}

document.querySelectorAll(".js-check").forEach(function(button){
    button.addEventListener('click', checkComplete());
});

