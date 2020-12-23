addEventListener("load", function () {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})
let storedData = localStorage.getItem("storedData")
if (storedData === null) {
    storedData = {
        name: "Studente",
        age: 10,
        className: "none"
    }
} else {
    storedData = JSON.parse(storedData)
}
document.getElementById("studentName").innerHTML = storedData.name
function selectGame(el) {
    let gameNum = parseInt(el.getAttribute("gameNum"))
    let gameBtns = document.querySelectorAll(".gameBtn")
    gameBtns.forEach(e => e.classList.remove("btnToggled"))
    el.classList.add("btnToggled")
    let games = document.querySelectorAll(".game")
    games.forEach(e => e.style.display = "none")
    games[gameNum - 1].style.display = "flex"
    if (gameNum === 3) resetOperationGame()
}

function askLogOut(){
    let promptAnswer = confirm("Vuoi fare il Log out?")
    localStorage.removeItem("storedData")
    if(promptAnswer) window.location = "../index.html"
}




//---------------------------------------------------------------------//
//Indovina numero

let numToGuess = Math.floor(Math.random() * 1000)
function checkGuess(guessBtn) {
    if (guessBtn.value === "Riprova") {
        resetGuess()
        return
    }
    let guess = parseInt(document.getElementById("guess").value)
    if(isNaN(guess)) return
    let guessResult = document.getElementById("guessResult")
    guessResult.classList.add("red")
    if (guess === numToGuess) {
        guessResult.value = "Indovinato! il numero è: " + numToGuess
        guessResult.classList.remove("red")
        guessResult.classList.add("green")
        guessBtn.classList.add("darkTeal")
        guessBtn.value = "Riprova"
        return
    }
    document.getElementById("guess").value = ""
    guessResult.value = (guess < numToGuess ? "Più alto di ": "Più basso di ") + guess +"!"
    setTimeout(function(){
        guessResult.classList.remove("red")
    },1000)
}
function resetGuess() {
    let guessBtn = document.getElementById("guessBtn")
    let guessResult = document.getElementById("guessResult")
    document.getElementById("guess").value = ""
    guessBtn.value = "Indovina"
    guessResult.value = ""
    guessResult.classList.remove("red", "green")
    guessBtn.classList.remove("darkTeal")
}








//---------------------------------------------------------------------//
//Multipli di N

let multipesOfNum = 0
function checkMultiples() {
    let multiplesArr = document.getElementById("multiplesDiv").querySelectorAll("div")
    for (let i = 0; i < 10; i++) {
        if (multiplesArr[i].innerHTML == multipesOfNum * (i + 1)) {
            multiplesArr[i].classList.add("green")
            multiplesArr[i].classList.remove("red")
        } else {
            multiplesArr[i].classList.remove("green")
            multiplesArr[i].classList.add("red")
        }
    }
}

function resetMultiples() {
    multipesOfNum = Math.floor(Math.random() * 15 + 1)
    let multiplesArr = document.getElementById("multiplesDiv").querySelectorAll("div")
    multiplesArr.forEach(e => {
        e.classList.remove("green", "red")
        e.innerHTML = ""
    })
    multiplesArr[0].innerHTML = multipesOfNum
}
resetMultiples()













//---------------------------------------------------------------------//
//Operazioni

function randomNum(limit) { return Math.floor(Math.random() * limit) }
let opCanvas = document.getElementById("canvasOperations")
let opCtx = opCanvas.getContext("2d")
class Operation {
    constructor(harder, x) {
        this.result = 0
        this.textOperation = ""
        this.operators = "-+*"
        this.subMinLimit = 25
        this.mulDivLimit = 10
        this.x = 0
        this.y = 20
        let ranOperator = this.operators[randomNum(this.operators.length)]
        let nums = []

        if (x > game.width - 50) x -= 50
        if (x < 50) x += 50
        this.x = x
        if (ranOperator === "/" || ranOperator === "*") {
            nums.push(randomNum(this.mulDivLimit))
            nums.push(randomNum(this.mulDivLimit))
        } else {
            nums.push(randomNum(this.subMinLimit))
            nums.push(randomNum(this.subMinLimit))
            randomNum(1) === 0 && harder ? nums.push(randomNum(this.mulDivLimit)) : {}
        }
        if (ranOperator === "/" && nums[1] > nums[0] / 2){
            nums[1] -= 2
        }
        this.textOperation = nums.join(" " + ranOperator + " ")
        this.result = +eval(this.textOperation).toFixed(2)
        if (this.result === Infinity) this.result = 0
    }
}
class Game {
    constructor(canvasName) {
        this.width = 500
        this.height = 300
        this.elements = []
        this.speed = 0.2
        this.score = 0
        let canvas = document.getElementById(canvasName)
        let sizes = canvas.getBoundingClientRect()
        this.width = parseInt(sizes.width)
        this.height = parseInt(sizes.height)
        canvas.width = this.width
        canvas.height = this.height
    }
}
let game = new Game("canvasOperations")
let newOperationCounter = 0
let newOperationTimeout = 500
let dead = true 
function renderCanvas() {
    if(dead){
        requestAnimationFrame(renderCanvas)
        return
    }
    opCtx.clearRect(0, 0, game.width, game.height)
    game.elements.forEach(e => {
        opCtx.font = "20px Arial"
        opCtx.fillStyle = "white"
        opCtx.fillText(e.textOperation, e.x, e.y)
        e.y += game.speed
        if (e.y > game.height - 20) {
            dead = true
            opCtx.fillStyle = "#f54242"
            opCtx.fillRect(0,0,game.width,game.height)
            opCtx.fillStyle = "white"
            opCtx.textAlign = "center"
            opCtx.font = "50px Arial"
            opCtx.fillText("Punteggio: "+game.score,game.width/2, game.height/2)
            return
        }
    })
    opCtx.beginPath();
    opCtx.lineWidth = 4
    opCtx.strokeStyle = "#f54242"
    opCtx.moveTo(20, game.height - 20)
    opCtx.lineTo(game.width - 20, game.height - 20)
    opCtx.stroke()
    newOperationCounter++
    if (newOperationCounter > newOperationTimeout) {
        newOperationCounter = 0
        newOperationTimeout -= 5
        game.elements.push(new Operation(false, randomNum(game.width)))
    }
    requestAnimationFrame(renderCanvas)
}
function resetOperationGame(){
    dead = false
    game = new Game("canvasOperations")
    game.elements.push(new Operation(false, randomNum(game.width)))
}
document.getElementById("operationsResult").addEventListener("keydown", function (e) {
    let key = e.key
    if (key === "Enter") {
        checkOperation()
    }
})

function checkOperation() {
    let el = document.getElementById("operationsResult")
    let result = el.value
    if (result == game.elements[0].result) {
        game.speed += 0.01
        game.score += 2
        game.elements.splice(0, 1)
        el.classList.add("green")
        if (game.elements.length === 0) {
            game.elements.push(new Operation(false, randomNum(game.width)))
        }
        setTimeout(() => {
            el.classList.remove("green")
        }, 500)
    } else {
        game.score -= 1
        el.classList.add("red")
        setTimeout(() => {
            el.classList.remove("red")
        }, 500)
    }
    el.value = ""
    el.focus()
}
renderCanvas()