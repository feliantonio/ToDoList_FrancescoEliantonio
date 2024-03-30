
// taskStore = [];

//aggiungo ogni elemento al div e al local storage

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

//creo ogni singolo elemento
function createItem(taskName,index)
{
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "item flex-container");
    // newElement.setAttribute("id",index);

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
    done.setAttribute("onclick" , "checkTask("+index+")");
    let iconDn = document.createElement("span");
    iconDn.setAttribute("id" , "done");
    iconDn.setAttribute("class", "material-symbols-outlined");
    iconDn.innerText = "check_circle";
    done.appendChild(iconDn);

    //bottone change
    const change = document.createElement("button");
    change.setAttribute("class", "btn");
    // change.setAttribute("onclick", "change()");
    let iconC = document.createElement("span");
    iconC.setAttribute("id", "change");
    iconC.setAttribute("class", "material-symbols-outlined");
    iconC.innerText = "edit_square";
    change.appendChild(iconC);

    //bottone cancella
    const del = document.createElement("button");
    del.setAttribute("class", "btn");
    // del.setAttribute("onclick", "del()");
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

//onload display from storage
function displayTasks()
{
    let taskContain = document.getElementById("tasks");  
    let taskName = "";

    for (let i = 1; i <= localStorage.length; i++) {
        taskName = localStorage.getItem(i.toString());
        taskContain.appendChild(createItem(taskName,i.toString()));
    }

}

function clearAll()
{
    let main = document.getElementById("main");
    let taskContain = document.getElementById("tasks");
    let clearedTaskContain = document.createElement("section");
    clearedTaskContain.setAttribute("id" , "tasks");

    main.replaceChild(clearedTaskContain,taskContain);
    localStorage.clear();
}

//done/change/delete single elements

function checkTask(index)
{
    let taskContain = document.getElementById("tasks");
    let elName = taskContain.children[index-1].children[0];
    if (elName.getAttribute("class") == "left")
    {
        elName.setAttribute("class" , "left underlined");
    }
    else
    {
        elName.setAttribute("class", "left");
    }
}