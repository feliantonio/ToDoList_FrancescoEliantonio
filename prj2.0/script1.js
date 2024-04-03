let form = document.querySelector("#formInp");

let btnClearAll = document.querySelector("footer>button");

let taskContain = document.getElementById("tasks");

let tasks = [];

form.addEventListener("submit", function (ev) { addTask(ev); });
window.addEventListener("load", displayTasks);
taskContain.addEventListener("click" , function(ev) {handleAction(ev)});
btnClearAll.addEventListener("click" , clearAll);

function addTask(ev)
{
    ev.preventDefault();
    let name = document.getElementById("newItem");
    let index = tasks.length.toString();
    if (name.value != "")
    {

        let newEl = createItem(name.value,index);

        tasks.push(name.value);
        resetLocalStorage();
        localStorage.setItem(tasks.indexOf(name.value) , name.value);

        taskContain.appendChild(newEl);
        // clearedTaskContain.appendChild(newEl);

        name.value = "";

    }
    else
    {
        alert("inserire input valido");
    }
}

function resetLocalStorage()
{
    localStorage.clear();
    for (let i = 0; i < tasks.length; i++) {
        localStorage.setItem(i.toString(),tasks[i]);
    }
}

//onload display from storage
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

//creo ogni singolo elemento
function createItem(taskName,index) {
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "item flex-container");
    newElement.setAttribute("id", index);

    //testo
    const name = document.createElement("div");
    name.setAttribute("class", "left");
    name.setAttribute("id", "name");
    name.innerHTML = taskName;

    //div bottoni
    const buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons flex-container");

    //bottone done
    const done = document.createElement("button");
    done.setAttribute("class", "btn");
    // done.setAttribute("onclick", "checkTask(" + index + ")");
    let iconDn = document.createElement("span");
    iconDn.setAttribute("id", "done");
    iconDn.setAttribute("class", "material-symbols-outlined");
    iconDn.innerText = "check_circle";
    done.appendChild(iconDn);

    //bottone change
    const change = document.createElement("button");
    change.setAttribute("class", "btn");
    // change.setAttribute("onclick", "changeTask(" + index + ")");
    let iconC = document.createElement("span");
    iconC.setAttribute("id", "change");
    iconC.setAttribute("class", "material-symbols-outlined");
    iconC.innerText = "edit_square";
    change.appendChild(iconC);

    //bottone cancella
    const del = document.createElement("button");
    del.setAttribute("class", "btn");
    // del.setAttribute("onclick", "deleleTask(" + index + ")");
    let iconD = document.createElement("span");
    iconD.setAttribute("id", "del");
    iconD.setAttribute("class", "material-symbols-outlined");
    iconD.innerText = "cancel";
    del.appendChild(iconD);

    buttons.appendChild(done);
    buttons.appendChild(change);
    buttons.appendChild(del);

    newElement.appendChild(name);
    newElement.appendChild(buttons);

    return newElement;
}

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

function checkTask(storageIndex) {

    // get item from localStorage index
    let elName = getItem(storageIndex).children[0];

    if (elName.getAttribute("class") == "left") {
        elName.setAttribute("class", "left underlined");
    }
    else {
        elName.setAttribute("class", "left");
    }
}

function changeTask(storageIndex) {

    let element = getItem(storageIndex);
    let input = document.getElementById("newItem");

    input.value = element.children[0].innerText;
    input.focus();
    taskContain.removeChild(element);
    localStorage.removeItem(storageIndex);
    tasks.splice(tasks.indexOf(element.children[0].innerText),1);
    
}


function deleleTask(storageIndex) {
    let element = getItem(storageIndex);
    taskContain.removeChild(element);
    localStorage.removeItem(storageIndex);
    tasks.splice(tasks.indexOf(element.children[0].innerText), 1);
}

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

function clearAll()
{

    while (taskContain.hasChildNodes())
    {
        taskContain.removeChild(taskContain.firstChild);
    }
    localStorage.clear();
    tasks = [];
}