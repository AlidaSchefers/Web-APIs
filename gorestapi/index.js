window.onload = () => {
    startPageElements()
}

function startPageElements() {
    //create elements
    const postDiv = document.createElement('div')
    const getDiv = document.createElement('div')
    const displayDiv = document.createElement('div')
    
    const getUserInputBox = document.createElement("input")
    const getUserButton = document.createElement("button")


    getUserInputBox.type = 'number'
    getUserInputBox.min = 1
    getUserInputBox.max = 2000

    getUserButton.className = "buttons" //what is the purpose of assigning a class name?
    getUserButton.innerText = "Get User Data"
    getUserButton.onclick = getUserRequest
    //when it is getUserRequest() with the parantheses, says call it right now when the line is initially read. w/o (), just say to reference it.

    getUserInputBox.className = "text-input"
    getUserInputBox.placeholder = "Enter a user's ID to search"
    
    //inserting element properties/data
    postDiv.id = "postDiv"
    getDiv.id = "getDiv"
    displayDiv.id = "displayDiv"

    //append to the DOM
    document.body.appendChild(postDiv)
    document.body.appendChild(getDiv)
    document.body.appendChild(displayDiv)

    getDiv.appendChild(getUserInputBox)
    getDiv.appendChild(getUserButton)


}

function getUserRequest() {

    const children = this.parentElement.children //??
    console.log(children)

    let userID;
    let minID
    let maxID

    for (const element of children) { //is this for loop necessary? is there another way since we are only looking at the UserInput element?
        if (element.type === "number")
            userID = element.value
            minID = element.min
            maxID = element.min
        // if (element)
    }
    console.log(userID)

    if (userID === "")
        return alert("Invalid ID Entered")
    else if (userID < minID || userID > maxID)
        return alert(`User ID must be between ${minID} & ${maxID}`)

    //console.log(this.parentElement) 
    //use the 'this' keyword with '.onSOMETHING' event listener function
    //logs the element itself when using the keyword
    //better to use than .id to refer to smth.

    const endpoint = "https://gorest.co.in/public-api/users/" + userID
    const xhr = new XMLHttpRequest()

    xhr.open("GET", endpoint)

    xhr.onload = () => {
        const rawRes = xhr.responseText
        const parsedData = JSON.parse(rawRes)
        console.log(parsedData)
    }

    xhr.send()
}