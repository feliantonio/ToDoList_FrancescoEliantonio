

function addItem()
{
    const items = document.getElementById("items");
    const input = document.getElementById("newItem");

    if (input.value != "")
    {
        const newElement = document.createElement("p");
        
        newElement.innerText = input.value;
        
        // items.appendChild(newElement);
        // localStorage.setItem("",);

        input.value = "";
        
    }
    else
    {
        //error
    }

}