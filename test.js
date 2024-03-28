

function addItem()
{
    let input = document.getElementById("newItem");
    let cont = document.getElementById("items");
    
    if (input.value != "")
    {
        let newElement = document.createElement("p");
        
        newElement.innerText = input.value;
        
        cont.appendChild(newElement);

        input.value = "";
        
    }

}