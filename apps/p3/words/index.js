let storedData = localStorage.getItem("storedData")
if(storedData === null){
    storedData = {
        name : "Studente",
        age : 10,
        className : "none"
    }
}else{
    storedData = JSON.parse(storedData)
}
document.getElementById("studentName").innerHTML = storedData.name
function selectGame(el){
    let gameNum = parseInt(el.getAttribute("gameNum"))
    let gameBtns = document.querySelectorAll(".gameBtn")
    gameBtns.forEach(e => e.classList.remove("btnToggled"))
    el.classList.add("btnToggled")
    let games = document.querySelectorAll(".game")
    games.forEach(e => e.style.display = "none")
    games[gameNum - 1].style.display = "flex"
}