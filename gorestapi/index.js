window.onload = () => {
    startPageElements()
}

const myAuthorizationAPIToken = "33cfa1dd481de0403ff4b4b802711128f9789edbad5fe43b45e6f03afac26e34"

function startPageElements() {
    //create elements
    const getDiv = document.createElement('div')
    const postDiv = document.createElement('div')
    const displayDiv = document.createElement('div')
    
        //GET
    const getUserInputBox = document.createElement("input")
    const getUserButton = document.createElement("button")
        //POST
    const postUserInputBoxName = document.createElement("input")
    const postUserInputBoxEmail = document.createElement("input")
    const postUserSelectGender = document.createElement("select")
    const postUserSelectStatus = document.createElement("select")

    const femaleGenderOption = document.createElement("option")
    const maleGenderOption = document.createElement("option")
    const ActiveStatusOption = document.createElement("option")
    const InactiveStatusOption = document.createElement("option")

    const postUserButton = document.createElement("button")

    postUserInputBoxName.name = "name"
    postUserInputBoxEmail.name = "email"
    postUserSelectGender.name = "gender"
    postUserSelectStatus.name = "status"

        //GET
    getUserInputBox.placeholder = "Enter a user's ID to search"

    getUserInputBox.type = 'number'
    getUserInputBox.min = 1
    getUserInputBox.max = 2000

    getUserButton.className = "buttons" //what is the purpose of assigning a class name?
    getUserButton.innerText = "Get User Data"

    getUserButton.onclick = getUserRequest //when it is getUserRequest() with the parantheses, says call it right now when the line is initially read. w/o (), just say to reference it.

    // getUserInputBox.className = "text-input"

        //POST
    postUserInputBoxName.placeholder = "New user's name"
    postUserInputBoxEmail.placeholder = "New user's email"

    femaleGenderOption.text = "Female"
    postUserSelectGender.add(femaleGenderOption)
    maleGenderOption.text = "Male"
    postUserSelectGender.add(maleGenderOption)

    ActiveStatusOption.text = "Active"
    postUserSelectStatus.add(ActiveStatusOption)
    InactiveStatusOption.text = "Inactive"
    postUserSelectStatus.add(InactiveStatusOption)
    
    postUserButton.innerText = "Create New User"
    postUserButton.onclick = postUserRequest
    
    //ALL THREE
        //inserting element properties/data
    getDiv.id = "getDiv"
    postDiv.id = "postDiv"
    displayDiv.id = "displayDiv"

        //append to the DOM
    document.body.appendChild(getDiv)
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(postDiv)
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(displayDiv)

        //GET
    getDiv.appendChild(getUserInputBox)
    getDiv.appendChild(getUserButton)

        //POST
    postDiv.appendChild(postUserInputBoxName)
    postDiv.appendChild(postUserInputBoxEmail)
    postDiv.appendChild(postUserSelectGender)
    postDiv.appendChild(postUserSelectStatus)
    postDiv.appendChild(postUserButton)

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
    const xhr = new XMLHttpRequest() //what does xhr stand for?

    xhr.open("GET", endpoint)

    xhr.onload = () => {
        const rawRes = xhr.responseText
        const parsedData = JSON.parse(rawRes)
        console.log(parsedData)
    }
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);

    xhr.send()
}

function postUserRequest() {
    const children = this.parentElement.children
    console.log(children)
    let newUserData = {}
    for (const element of children) {
        if (element.type !== "submit") //everything except the button
            newUserData[element.name] = element.value
    }
    console.log(newUserData)
    
    const jsonNewUserData = JSON.stringify(newUserData)

    const xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://gorest.co.in/public-api/users/'); //what is 'true'? i assume it's the same as the default
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);
    xhr.send(jsonNewUserData)


    // xhr.send("name=Hello&id=world"); //why is it in this format?

}