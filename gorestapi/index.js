window.onload = () => {
    startPageElements()
}

const myAuthorizationAPIToken = "33cfa1dd481de0403ff4b4b802711128f9789edbad5fe43b45e6f03afac26e34" //obtain your own token at the website https://gorest.co.in/

function startPageElements() {

    //GET
        //create elements
    const getDiv = document.createElement('div')
    
    const getUserInputBox = document.createElement("input")
    const getUserButton = document.createElement("button")
        //element properties
    getUserInputBox.placeholder = "Enter a user's ID to search"

    getUserInputBox.type = 'number'
    getUserInputBox.min = 1
    getUserInputBox.max = 2000

    getUserButton.className = "buttons" //what is the purpose of assigning a class name?
    getUserButton.innerText = "Get User Data"

    getUserButton.onclick = getUserRequest //when it is getUserRequest() with the parantheses, says call it right now when the line is initially read. w/o (), just say to reference it.

    getDiv.id = "getDiv"

    //POST
        //create elements
    const postDiv = document.createElement('div')

    const postUserInputBoxName = document.createElement("input")
    const postUserInputBoxEmail = document.createElement("input")
    const postUserSelectGender = document.createElement("select")
    const postUserSelectStatus = document.createElement("select")
    const postUserButton = document.createElement("button")

    const femaleGenderOption = document.createElement("option")
    const maleGenderOption = document.createElement("option")
    const activeStatusOption = document.createElement("option")
    const inactiveStatusOption = document.createElement("option")

    postUserInputBoxName.name = "name"
    postUserInputBoxEmail.name = "email"
    postUserSelectGender.name = "gender"
    postUserSelectStatus.name = "status"

    postUserInputBoxName.placeholder = "New user's name"
    postUserInputBoxEmail.placeholder = "New user's email"

    femaleGenderOption.text = "Female"
    postUserSelectGender.add(femaleGenderOption)
    maleGenderOption.text = "Male"
    postUserSelectGender.add(maleGenderOption)

    activeStatusOption.text = "Active"
    postUserSelectStatus.add(activeStatusOption)
    inactiveStatusOption.text = "Inactive"
    postUserSelectStatus.add(inactiveStatusOption)
    
    postUserButton.innerText = "Create New User"
    postUserButton.onclick = postUserRequest

    postDiv.id = "postDiv"

    //PUT

    const putDiv = document.createElement('div')
    
    const putUserInputBox = document.createElement("input")
    const putUserCurrentDataButton = document.createElement("button")
        //element properties
    putUserInputBox.placeholder = "Enter a user's ID to search"

    putUserInputBox.type = 'number'
    putUserInputBox.min = 1
    putUserInputBox.max = 2000

    // putUserCurrentDataButton.className = "buttons" //what is the purpose of assigning a class name?
    putUserCurrentDataButton.innerText = "Display User's Current Data"
    putUserCurrentDataButton.onclick =  putUserDisplayCurrentData

    const putUserCurrentName = document.createElement('input')
    const putUserCurrentEmail = document.createElement('input')
    const putUserCurrentGender = document.createElement('select')
    const putUserCurrentStatus = document.createElement('select')

    putUserCurrentName.name = "name"
    putUserCurrentEmail.name = "email"
    putUserCurrentGender.name = "gender"
    putUserCurrentStatus.name = "status"

    const femaleGenderOption2 = document.createElement("option")
    const maleGenderOption2 = document.createElement("option")
    const activeStatusOption2 = document.createElement("option")
    const inactiveStatusOption2 = document.createElement("option")

    const putUserButton = document.createElement('button')
    putUserButton.innerText = "Update User Data"

    putUserCurrentName.placeholder = "User's Current Name"
    putUserCurrentEmail.placeholder = "User's Current Email"

    femaleGenderOption2.text = "Female"
    putUserCurrentGender.add(femaleGenderOption2)
    maleGenderOption2.text = "Male"
    putUserCurrentGender.add(maleGenderOption2)

    activeStatusOption2.text = "Active"
    putUserCurrentStatus.add(activeStatusOption2)
    inactiveStatusOption2.text = "Inactive"
    putUserCurrentStatus.add(inactiveStatusOption2)

    //DELETE
    const deleteDiv = document.createElement('div')

    const deleteUserInputBox = document.createElement("input")
    const deleteUserButton = document.createElement("button")

    deleteUserInputBox.placeholder = "Enter a user's ID to search"
    deleteUserInputBox.type = 'number'
    deleteUserInputBox.min = 1
    deleteUserInputBox.max = 2000

    deleteUserButton.innerText = "Delete User Data"
    deleteUserButton.onclick = deleteUserRequest

    //APPENDING
        //append to the DOM
    document.body.appendChild(getDiv)
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(postDiv)
    document.body.appendChild(document.createElement('br'))
    // document.body.appendChild(displayDiv) //why a displayDiv?
    document.body.appendChild(putDiv)
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(deleteDiv)

        //GET
    getDiv.appendChild(getUserInputBox)
    getDiv.appendChild(getUserButton)

        //POST
    postDiv.appendChild(postUserInputBoxName)
    postDiv.appendChild(postUserInputBoxEmail)
    postDiv.appendChild(postUserSelectGender)
    postDiv.appendChild(postUserSelectStatus)
    postDiv.appendChild(postUserButton)

        //PUT
    putDiv.appendChild(putUserInputBox)
    putDiv.appendChild(putUserCurrentDataButton)
    putDiv.appendChild(document.createElement('br'))
    putDiv.appendChild(putUserCurrentName)
    putDiv.appendChild(putUserCurrentEmail)
    putDiv.appendChild(putUserCurrentGender)
    putDiv.appendChild(putUserCurrentStatus)
    putDiv.appendChild(putUserButton)

        //DELETE
    deleteDiv.appendChild(deleteUserInputBox)
    deleteDiv.appendChild(deleteUserButton)
}

function getUserRequest() {

    const children = this.parentElement.children

    let userID;
    let minID
    let maxID

    for (const element of children) {
        if (element.type === "number")
            userID = element.value
            minID = element.min
            maxID = element.min
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

function putUserDisplayCurrentData() {
    const children = this.parentElement.children
    console.log(children)
    let userID;
    let minID
    let maxID
    for (const element of children) {
        if (element.type === "number")
            userID = element.value
            minID = element.min
            maxID = element.min
    }
    console.log(userID)

    if (userID === "")
        return alert("Invalid ID Entered")
    else if (userID < minID || userID > maxID) {
        return alert(`User ID must be between ${minID} & ${maxID}`)
    }

    // const putUserCurrentName =

    //XMLHttpRequest section
    const endpoint = "https://gorest.co.in/public-api/users/" + userID
    const xhr = new XMLHttpRequest()

    xhr.open("GET", endpoint)

    xhr.onload = () => {
        const rawRes = xhr.responseText
        const parsedData = JSON.parse(rawRes) //for some reason can't use parsedData like I did in the GET method function??
        console.log(parsedData)

        //fill in all the boxes with the current user data 
        // console.log("children:")
        // console.log(children)
        for (const element of children) {
            if (element.name === "name")
                // console.log("this is NAME element")
                element.defaultValue = parsedData.name
        }





    }
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);

    xhr.send()
}


function putUserDisplayCurrentDataJSONTEST(userID) {
    
    const endpoint = "https://gorest.co.in/public-api/users/" + userID
    const xhr = new XMLHttpRequest()

    xhr.open("GET", endpoint)

    xhr.onload = () => {
        const rawRes = xhr.responseText
        const parsedData = JSON.parse(rawRes)
    }
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);

    xhr.send()
}

function putUserDisplayCurrentDataJSON(userID) {
    const endpoint = "https://gorest.co.in/public-api/users/" + userID
    const xhr = new XMLHttpRequest()

    xhr.open("GET", endpoint)

    xhr.onload = () => {
        const rawRes = xhr.responseText
        const parsedData = JSON.parse(rawRes)
        console.log(parsedData)
    }
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);

    xhr.send()
}

function putUserRequest() {

}

function deleteUserRequest() {
    const children = this.parentElement.children
    console.log(children)

    let userID
    let minID
    let maxID

    for (const element of children) { //is this for loop necessary? is there another way since we are only looking at the UserInput element?
        if (element.type === "number")
            userID = element.value
            minID = element.min
            maxID = element.min
    }

    if (userID === "")
        return alert("Invalid ID Entered")
    else if (userID < minID || userID > maxID)
        return alert(`User ID must be between ${minID} & ${maxID}`)

    const endpoint = "https://gorest.co.in/public-api/users/" + userID

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", endpoint);
    xhr.setRequestHeader("Authorization", `Bearer ${myAuthorizationAPIToken}`);
    xhr.send()
}