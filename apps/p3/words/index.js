addEventListener("load", function () {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})
let storedData = localStorage.getItem("storedData")
let words = []
init()
async function init() {
    words = await fetch("./words.txt").then(e => e.text())
    words = words.toLowerCase().split(",")
    resetFindTheWords()
    resetHangman()
}
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
    if (gameNum === 3) resetWordsGame()
}

function askLogOut() {
    let promptAnswer = confirm("Vuoi fare il Log out?")
    localStorage.removeItem("storedData")
    if (promptAnswer) window.location = "../index.html"
}


//---------------------------------------------------------------------//
//Impiccato


class HangMan {
    constructor() {
        this.word = ""
        this.lives = 10
        this.guessedLetters = 0
        this.letters = "abcdefghijklmnopqrstuvwxyz".split("")
        this.word = words[randomNum(words.length)]
    }
}
let hangMan = new HangMan()
let = document.getElementById("hangManWord")
let hangManKeyboard = document.getElementById("hangManKeyboard")
function resetHangman() {
    hangManKeyboard.innerHTML = ""
    hangManWord.innerHTML = ""
    hangMan = new HangMan()
    hangMan.letters.forEach(e => {
        let letter = document.createElement("div")
        letter.className = "keyboardLetter"
        letter.innerHTML = e
        letter.addEventListener("click", function () {
            if (this.classList.contains("green") || this.classList.contains("red")) return
            checkHangMan(letter)
        })
        hangManKeyboard.appendChild(letter)
    })
    document.querySelectorAll(".life").forEach(e => {
        e.classList.add("green")
        e.classList.remove("red")
    })
    console.log(hangMan.word)
    hangMan.word.split("").forEach(e => {
        let letter = document.createElement("div")
        letter.classList.add("hangManLetter")
        letter.classList.add("letter_" + e)
        letter.innerHTML = e
        letter.style.fontSize = "0px"
        hangManWord.appendChild(letter)
    })
}

function checkHangMan(el) {
    if (hangMan.lives === 0) return
    let letters = document.querySelectorAll(".letter_" + el.innerHTML)
    let lifes = document.querySelectorAll(".life")
    if (hangMan.word.includes(el.innerHTML)) {
        el.classList.add("green")
        hangMan.guessedLetters += letters.length
        if (hangMan.guessedLetters === hangMan.word.length) {
            document.querySelectorAll(".hangManLetter").forEach(letter => {
                letter.style = ""
                letter.classList.add("green")
            })
            hangMan.lives = 0
        }
        letters.forEach(letter => letter.style = "")
    } else {
        el.classList.add("red")
        hangMan.lives--
        if (hangMan.lives === 0) {
            document.querySelectorAll(".hangManLetter").forEach(letter => {
                letter.style = ""
                letter.classList.add("red")
            })
        }
        lifes[hangMan.lives].classList.add("red")
        lifes[hangMan.lives].classList.remove("green")

    }
}





//---------------------------------------------------------------------//
//Trova le parole

class FindTheWords {
    constructor() {
        this.wordsArr = words
        this.totalLetters = 0
        this.guessedLetters = 0
        this.size = 14
        this.words = []
        this.unalteredWords = []
        this.matrix = []
        this.letters = "abcdefghijklmnopqrstuvwxyz".split("")
        let numOfWords = Math.floor(Math.random() * (this.size - 10)) + 10
        for (let i = 0; i < numOfWords; i++) {
            let word = this.wordsArr[randomNum(this.wordsArr.length)]
            
            if (word.length < this.size) this.words.push(word)
        }
        for (let i = 0; i < this.size; i++) {
            let row = []
            for (let j = 0; j < this.size; j++) {
                let letter = this.letters[randomNum(this.letters.length)]
                let obj = {
                    isWord: false,
                    letter: letter
                }
                row.push(obj)
            }
            this.matrix.push(row)
        }
        this.unalteredWords = [...this.words]
        while (this.words.length > 0) {
            let word = this.words[0].split("")
            let positionX = randomNum(this.size - word.length - 1)
            let positionY = randomNum(this.size)
            let hasFreePos = true
            for (let j = 0; j < this.size; j++) {
                if (this.matrix[positionY][j].isWord) hasFreePos = false
            }
            if (hasFreePos) {
                for (let j = 0; j < word.length; j++) {
                    let obj = {
                        isWord: true,
                        letter: word[j]
                    }
                    this.totalLetters++
                    this.matrix[positionY][positionX + j] = obj
                }
                this.words.splice(0, 1)
            }
        }
    }
}

let crossWords = document.getElementById("crossWords")
let crossWordsToFind = document.getElementById("crossWordsToFind")
function showCrossWords() {
    crossWords.classList.add("green")
    crossWords.querySelectorAll(".isWord").forEach(e => {
        e.classList.add("darkTeal")
    })
}
function resetFindTheWords() {
    findTheWords = new FindTheWords()
    crossWords.classList.remove("green")
    crossWordsToFind.innerHTML = ""
    findTheWords.unalteredWords.forEach(word =>{
        let element = document.createElement("div")
        element.innerHTML = word
        element.className = "wordToFind"
        element.addEventListener("click",function(){
            this.classList.toggle("green")
        })
        crossWordsToFind.append(element)
    })
    crossWords.innerHTML = ""
    for (let i = 0; i < findTheWords.size; i++) {
        let row = document.createElement("div")
        row.className = "crossRow"
        for (let j = 0; j < findTheWords.size; j++) {
            let letter = document.createElement("div")
            let letterObj = findTheWords.matrix[i][j]
            letter.id = i + "_" + j
            letter.className = "crossLetter"
            if(j === findTheWords.size-1) letter.style.borderRight = "none"
            if (i === findTheWords.size - 1) letter.style.borderBottom = "none"
            if (letterObj.isWord) letter.classList.add("isWord")
            letter.addEventListener("click", function () {
                let pos = this.id.split("_")
                this.classList.toggle("green")
                let isWord = false
                if (findTheWords.matrix[pos[0]][pos[1]].isWord) {
                    isWord = true
                }
                if (isWord) {
                    if (this.classList.contains("green")) {
                        findTheWords.guessedLetters++
                    } else {
                        findTheWords.guessedLetters--
                    }
                }
                if (findTheWords.guessedLetters === findTheWords.totalLetters) {
                    crossWords.classList.add("green")
                    crossWords.querySelectorAll(".isWord").forEach(e => {
                        e.classList.add("darkTeal")
                    })
                }
            })
            letter.innerHTML = letterObj.letter
            row.appendChild(letter)
        }
        crossWords.appendChild(row)
    }
}


















//---------------------------------------------------------------------//
//Impara la tastiera

function randomNum(limit) { return Math.floor(Math.random() * limit) }
let opCanvas = document.getElementById("canvasOperations")
let opCtx = opCanvas.getContext("2d")
class Word {
    constructor(x) {
        this.y = 20
        if (x > game.width - 100) x -= 100
        if (x < 100) x += 100
        this.x = x
        this.word = words[randomNum(words.length)]
    }
}
let selectedDifficulty = 1
class Game {
    constructor(canvasName) {
        this.width = 500
        this.height = 300
        this.elements = []
        this.difficulty = 1
        this.correctWords = 0
        this.score = 0
        this.startTime = 0
        this.startTime = new Date().getTime()
        this.difficulty = selectedDifficulty
        this.speed = 0.2 * selectedDifficulty
        let canvas = document.getElementById(canvasName)
        let sizes = canvas.getBoundingClientRect()
        this.width = parseInt(sizes.width)
        this.height = parseInt(sizes.height)
        canvas.width = this.width
        canvas.height = this.height
    }
}
let game = new Game("canvasOperations")
let newWordCounter = 0
let newWordTimeout = 500
let dead = true
function renderCanvas() {
    if (dead) {
        requestAnimationFrame(renderCanvas)
        return
    }
    opCtx.clearRect(0, 0, game.width, game.height)
    game.elements.forEach(e => {
        opCtx.font = "20px Arial"
        opCtx.fillStyle = "white"
        opCtx.fillText(e.word, e.x, e.y)
        e.y += game.speed
        if (e.y > game.height - 20) {
            dead = true
            opCtx.fillStyle = "#f54242"
            opCtx.fillRect(0, 0, game.width, game.height)
            opCtx.fillStyle = "white"
            opCtx.textAlign = "center"
            opCtx.font = "50px Arial"
            opCtx.fillText("Punteggio: " + game.score, game.width / 2, game.height / 2)
            opCtx.font = "20px Arial"
            let time = (new Date().getTime() - game.startTime) / 1000 / 60
            opCtx.fillText("WPM: " + Math.floor(game.correctWords / time), game.width / 2, game.height / 2 + 80)
            return
        }
    })
    opCtx.beginPath();
    opCtx.lineWidth = 4
    opCtx.strokeStyle = "#f54242"
    opCtx.moveTo(20, game.height - 20)
    opCtx.lineTo(game.width - 20, game.height - 20)
    opCtx.stroke()
    newWordCounter++
    if (newWordCounter > newWordTimeout) {
        newWordCounter = 0
        newWordTimeout -= 5
        game.elements.push(new Word(randomNum(game.width)))
    }
    requestAnimationFrame(renderCanvas)
}
function resetWordsGame() {
    dead = false
    game = new Game("canvasOperations")
    game.elements.push(new Word(randomNum(game.width)))
}
document.addEventListener("input", function (e) {
    let key = e.target.value[e.target.value.length - 1]
    if (key === " ") {
        e.target.value = e.target.value.replace(" ", "")
        if (checkWordGame(e.target)) e.target.value = ""
    }
})
function changeDifficulty(difficulty) {
    selectedDifficulty = difficulty
    resetWordsGame()
    let buttons = document.getElementById("gameDifficultyChanger").querySelectorAll("button")
    buttons.forEach(e => {
        e.classList.remove("cyan")
        e.classList.add("darkBlue")
    })
    buttons[difficulty - 1].classList.add("cyan")
    buttons[difficulty - 1].classList.remove("darkBlue")
}
function checkWordGame(el) {
    let result = el.value.toLowerCase()
    if (result === game.elements[0].word) {
        game.speed += 0.01 * game.difficulty
        game.score++
        game.correctWords++
        game.elements.splice(0, 1)
        el.classList.add("green")
        if (game.elements.length === 0) {
            game.elements.push(new Word(randomNum(game.width)))
        }
        setTimeout(() => {
            el.classList.remove("green")
        }, 400)
        return true
    } else {
        el.classList.add("red")
        if (game.elements.length === 0) {
            game.elements.push(new Word(randomNum(game.width)))
        }
        setTimeout(() => {
            el.classList.remove("red")
        }, 200)
        return false
    }
}
renderCanvas()