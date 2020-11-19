function handleSubmit(e){
    let inputs = e.querySelectorAll("input")
    let name = inputs[0].value
    let className = inputs[1].value
    let age = inputs[2].value
    populateLoggedUser(name)
    let dataObj = {
        name: name,
        className : className,
        age: age
    }
    localStorage.setItem("storedData", JSON.stringify(dataObj))
    return false
}
function populateLoggedUser(name,fast){
    document.getElementById("mainDescription").innerHTML = "Procedi in basso per i giochi!"
    document.getElementById("studentName").innerHTML = name
    if(fast){
        document.querySelector(".registration").style.display = "none"
        document.getElementById("gameSelector").style.display = "flex"
    }else{
        document.querySelector(".registration").classList.add("hiddenRegistration")
        document.getElementById("gameSelector").style.display = "flex"
    }

}
function logOut(){
    localStorage.removeItem("storedData")
    location.reload()
}
let storedData = localStorage.getItem("storedData")
if (storedData === null) {
    storedData = {
        name: "Studente",
        age: 10,
        className: "none"
    }
} else {
    storedData = JSON.parse(storedData)
    populateLoggedUser(storedData.name,true)
}
