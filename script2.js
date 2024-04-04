
//inizializzazioni globali
let form = document.querySelector("#formInp");
let btnClearAll = document.querySelector("footer>button");
let input = document.getElementById("newItem");
let taskContain = document.getElementById("boxTasks");

let tasks = [];

//eventListeners****************************
form.addEventListener("submit", function (ev) { addTask(ev); });
window.addEventListener("load", displayTasks);
taskContain.addEventListener("click" , function(ev) {handleAction(ev)});
btnClearAll.addEventListener("click" , clearAll);

//add task
function addTask(ev)
{
    ev.preventDefault();

    if (input.value != "")
    {
        let name = input.value[0].toUpperCase() + input.value.slice(1, input.value.lenght)
        tasks.push(name);
        resetLocalStorage();

        let index = tasks.indexOf(name);
        let newEl = createItem(name,index);
        taskContain.appendChild(newEl);
        input.value = "";
    }
    else
    {
        let popup = document.querySelector(".popup");
        popup.classList.remove("invisible");
        input.style.outlineColor = "#f8d7da";
        setTimeout(function(){
            popup.classList.add("invisible");
            input.style.outlineColor = "lightblue";
        },5000);
    }
}


//onload display from storage e ripopolamento tasks
function displayTasks() {

    const storKeys = Object.keys(localStorage);
    
    storKeys.forEach(function(value,index)
    {
        storKeys[index] = Number(value);
    }
    );

    storKeys.sort();

    storKeys.forEach(key => {
        taskName = localStorage.getItem(key.toString());
        tasks.push(taskName);
        taskContain.appendChild(createItem(taskName,key));
    });
}

// buttons handler***************************************
function handleAction(ev)
{
    let elementIndex = ev.target.parentElement.parentElement.parentElement.getAttribute("id");
    let action = ev.target.getAttribute("id");
    // alert("target = " + ev.target.getAttribute("id") + ", this=" + ev.currentTarget.tagName);
    
    switch (action) {
        case "done":
            checkTask(elementIndex);
            break;
            case "change":
            changeTask(elementIndex);
            break;
            case "del":
                deleleTask(elementIndex);
            break;
        }
}

//buttons and clear all******************************************
function checkTask(storageIndex) {
    
    // get item from localStorage index
    let elName = getItem(storageIndex).children[0];
    
    if (elName.getAttribute("class") == "col-sx") {
        elName.setAttribute("class", "col-sx underlined");
    }
    else {
        elName.setAttribute("class", "col-sx");
    }
}

function changeTask(storageIndex) {
    
    let element = getItem(storageIndex);
    
    input.value = element.children[0].innerText;
    input.focus();

    taskContain.removeChild(element);
    tasks.splice(tasks.indexOf(element.children[0].innerText),1);
    resetLocalStorage();
}


function deleleTask(storageIndex) {
    let element = getItem(storageIndex);
    taskContain.removeChild(element);
    tasks.splice(tasks.indexOf(element.children[0].innerText), 1);
    resetLocalStorage();
}

function clearAll()
{
    
    while (taskContain.hasChildNodes())
    {
        taskContain.removeChild(taskContain.firstChild);
    }
    localStorage.clear();
    tasks = [];
}


//crea elemento/get/resetLocal
function getItem(storageIndex)
{
    let element = taskContain.children[0];
    for (let contIndex = 0; contIndex < taskContain.children.length; contIndex++) {
        element = taskContain.children[contIndex];
        if (element.getAttribute("id") == storageIndex) {
            break;
        }
    }
    return element;
}


function resetLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < tasks.length; i++) {
        localStorage.setItem(i.toString(), tasks[i]);
    }
}


function createItem(taskName,index) {
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "item flex-container");
    newElement.setAttribute("id", index);

    //testo
    const name = document.createElement("div");
    name.setAttribute("class", "col-sx");
    name.setAttribute("id", "name");
    name.innerHTML = taskName[0].toUpperCase() + taskName.slice(1, taskName.lenght);

    //div bottoni
    const buttons = document.createElement("div");
    buttons.setAttribute("class", "flex-container col-dx");

    //bottone done
    const done = document.createElement("button");
    done.setAttribute("class", "btn");
    let iconDn = document.createElement("span");
    iconDn.setAttribute("id", "done");
    iconDn.setAttribute("class", "material-symbols-outlined");
    iconDn.innerText = "check_circle";
    done.appendChild(iconDn);

    //bottone change
    const change = document.createElement("button");
    change.setAttribute("class", "btn");
    let iconC = document.createElement("span");
    iconC.setAttribute("id", "change");
    iconC.setAttribute("class", "material-symbols-outlined");
    iconC.innerText = "edit_square";
    change.appendChild(iconC);

    //bottone cancella
    const del = document.createElement("button");
    del.setAttribute("class", "btn");
    let iconD = document.createElement("span");
    iconD.setAttribute("id", "del");
    iconD.setAttribute("class", "material-symbols-outlined");
    iconD.innerText = "delete";
    del.appendChild(iconD);

    buttons.appendChild(done);
    buttons.appendChild(change);
    buttons.appendChild(del);

    newElement.appendChild(name);
    newElement.appendChild(buttons);

    return newElement;
}
