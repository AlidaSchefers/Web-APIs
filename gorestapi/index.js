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
    const ActiveStatusOption = document.createElement("option")
    const InactiveStatusOption = document.createElement("option")

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

    ActiveStatusOption.text = "Active"
    postUserSelectStatus.add(ActiveStatusOption)
    InactiveStatusOption.text = "Inactive"
    postUserSelectStatus.add(InactiveStatusOption)
    
    postUserButton.innerText = "Create New User"
    postUserButton.onclick = postUserRequest

    postDiv.id = "postDiv"


    //PATCH
    const patchDiv = document.createElement('div')
    const patchUserIDInputBox = document.createElement('input')
    const patchUserPropertySelect = document.createElement('select') //user selects which property they want to update
        const patchNameOption = document.createElement('option')
        const patchEmailOption = document.createElement('option')
        const patchGenderOption = document.createElement('option')
        const patchStatusOption = document.createElement('option')
    let patchUserPropertyValueInput = document.createElement('input')
    const patchUserButton = document.createElement('button')

    
    patchNameOption.name = "name"
    patchEmailOption.name = "email"
    patchStatusOption.name = "status"
    patchGenderOption.name = "name"

    patchNameOption.text = "Name"
    patchUserPropertySelect.add(patchNameOption)
    patchEmailOption.text = "Email"
    patchUserPropertySelect.add(patchEmailOption)
    patchGenderOption.text = "Gender"
    patchUserPropertySelect.add(patchGenderOption)
    patchStatusOption.text = "Status"
    patchUserPropertySelect.add(patchStatusOption)
    
    patchUserIDInputBox.placeholder = "Enter a user's ID to update"
    patchUserPropertyValueInput.placeholder = "New Name"
    patchUserPropertyValueInput.name = "new data input"

    patchUserButton.innerText = "Update User"
    
    patchUserPropertySelect.onchange = patchUserPropertyValueCollection //this function creates the input box/select for the user to change the property value
    

    //DELETE
    const deleteDiv = document.createElement('div')

    const deleteUserInputBox = document.createElement("input")
    const deleteUserButton = document.createElement("button")

    deleteUserInputBox.placeholder = "Enter a user's ID to delete"
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
    document.body.appendChild(patchDiv)
    // document.body.appendChild(displayDiv) //why a displayDiv?
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

        //PATCH
    patchDiv.appendChild(patchUserIDInputBox)
    patchDiv.appendChild(patchUserPropertySelect)
    patchDiv.appendChild(patchUserPropertyValueInput)
    patchDiv.appendChild(patchUserButton)

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

function patchUserPropertyValueCollection() {
    let children = this.parentElement.children
    // console.log(children)
    if (this.value === 'Name' || this.value === 'Email') {
        for (const element of children) { //finds the input box object
            if (element.name === "new data input")
                element.placeholder = `New ${this.value}`
        }
    }  

   if (this.value === 'Gender') {
        for (const element of children) {
            if (element.name === "new data input") {
                console.log("this element is patchUserPropertyValueInput")
                element = document.createElement('select')
            }
        }
        // patchUserPropertyValueInput = document.createElement('select')
    }
    // if (this.value === 'Status') {
    //     for (const element of children) {
    //         if () {

    //         }
    //     }
    // }

    // // if (this.value === 'Email') {
        
    // //     // const patchUserPropertyValueInput = document.createElement('input')
    // //     // this.parentElement.appendChild(patchUserPropertyValueInput)
    // //     console.log("email selected")
    // //     console.log(this.parentElement)
    // // }
    // // if (this.value === 'Gender') {
    // //     console.log("gender selected")
    // // }
    // // if (this.value === 'Status') {
    // //     console.log("status selected")
    // // }
    // // console.log("name or email selected")
    
    

    // const patchUserPropertyValueInput = document.createElement('input') //for inserting name or email
    // const patchUserPropertyValueSelect = document.createElement('select') //for selecting gender and status
    // // const patchUserButton = document.createElement('button')
}

// function patchUserRequest() {

// }

function deleteUserRequest() {
    const children = this.parentElement.children
    console.log(children)

    let userID
    let minID
    let maxID

    for (const element of children) {
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