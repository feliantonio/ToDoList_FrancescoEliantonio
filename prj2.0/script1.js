let form = document.querySelector("#formInp");
let actions = document.querySelectorAll(".btn");
let taskContain = document.getElementById("tasks"); 
let btnClearAll = document.querySelector("footer>button");

form.addEventListener("submit" , function(ev) {addTask(ev)});

function addTask(ev)
{
    ev.preventDefault();

    let name = document.getElementById("newItem");
    let newEl = document.createElement("div");
    newEl.innerText = name.value;

    taskContain.appendChild(newEl);
    name.value = "";
    


}