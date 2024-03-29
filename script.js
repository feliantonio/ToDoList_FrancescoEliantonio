
// taskStore = [];

function addItem()
{
    let taskContain = document.getElementById("tasks");

    const input = document.getElementById("newItem");

    if (input.value != "")
    {
        const currInd = (localStorage.length + 1).toString();

        localStorage.setItem(currInd,input.value);

        taskContain.appendChild(createItem(input.value));
        input.value = "";
        
    }
    else
    {
        alert("Inserire valore valido");
    }

}

function createItem(taskName)
{
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "item flex-container");

    const name = document.createElement("div");
    name.setAttribute("class", "left");
    name.setAttribute("id", "name");
    name.innerHTML = taskName;

    const buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons flex-container");

    const done = document.createElement("button");
    done.setAttribute("class", "btn");
    let iconDn = document.createElement("span");
    iconDn.setAttribute("id" , "done");
    iconDn.setAttribute("class", "material-symbols-outlined");
    iconDn.innerText = "check_circle";
    done.appendChild(iconDn);


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
    //icona x
    let iconD = document.createElement("span");
    iconD.setAttribute("id", "del");
    iconD.setAttribute("class","material-symbols-outlined");
    iconD.innerText = "cancel";
    del.appendChild(iconD);

    buttons.appendChild(done);
    buttons.appendChild(change);
    buttons.appendChild(del);

    newElement.appendChild(name);
    newElement.appendChild(buttons);

    return newElement;
}

function displayTasks()
{
    let taskContain = document.getElementById("tasks");
    let taskName = "";
    // localStorage.forEach(taskName => {
    //     taskContain.appendChild(createItem(taskName));
    // });
    for (let i = 1; i <= localStorage.length; i++) {
        taskName = localStorage.getItem(i.toString());
        taskContain.appendChild(createItem(taskName));
    }

}

function clearAll()
{
    // let taskContain = document.getElementById("tasks");
    // for (let i = 1; i <= localStorage.length; i++) {
    //     taskContain.removeChild(createItem(localStorage.getItem(i.toString())));
    // }
    // localStorage.clear();
}