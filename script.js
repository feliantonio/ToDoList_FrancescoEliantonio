
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
function createItem(taskName)
{
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "item flex-container");

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
    done.setAttribute("class", "btn d");
    done.setAttribute("onclick" , "test()");
    let iconDn = document.createElement("span");
    iconDn.setAttribute("id" , "done");
    iconDn.setAttribute("class", "material-symbols-outlined");
    iconDn.innerText = "check_circle";
    done.appendChild(iconDn);

    //bottone change
    const change = document.createElement("button");
    change.setAttribute("class", "btn c");
    let iconC = document.createElement("span");
    iconC.setAttribute("id", "change");
    iconC.setAttribute("class", "material-symbols-outlined");
    iconC.innerText = "edit_square";
    change.appendChild(iconC);

    //bottone cancella
    const del = document.createElement("button");
    del.setAttribute("class", "btn del");
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
        taskContain.appendChild(createItem(taskName));
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

function test()
{
    alert("c");
}