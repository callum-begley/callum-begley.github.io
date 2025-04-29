//mindbogld
//
//to do:
// X click letters on box goes dark once used
//instructions in the your words section

import dictionary from './dictionary.json' with { type: "json" }

let gameStart = false
let score = 0
let enteredWords = []
let gameName = ['m', 'i', 'n', 'd', 'b', 'o', 'g', 'l', 'd']
let hiddenWord = ''
// let wordList = [
//   'available',
//   'copyright',
//   'education',
//   'community',
//   'following',
//   'resources',
//   'including',
//   'directory',
//   'insurance',
//   'different',
//   'september',
//   'questions',
//   'financial',
//   'equipment',
//   'important',
//   'something',
//   'committee',
//   'reference',
//   'companies',
//   'computers',
// ]

function init() {
  const gameContainer = document.getElementById('gameContainer')
  makeInputBox(gameContainer)
  makeGameGrid(gameContainer)
  makeButtonBox(gameContainer)
  updateGameGrid(gameName)
  startButton()
  makeOutputBox(gameContainer)
  makeHighScoreBox(gameContainer)
  keyboardPresses()
  gameGridKeys()
}

function makeGameGrid(gameContainer) {
  const gameGrid = document.createElement('div')
  gameGrid.className = 'gameGrid'
  for (let i = 0; i < 3; i++) {
    for (let o = 0; o < 3; o++) {
      makeBox(gameGrid, i, o)
    }
  }
  gameContainer.appendChild(gameGrid)
  makeAlertBox(gameGrid)
}

function makeInputBox(gameContainer) {
  const inputBox = document.createElement('div')
  inputBox.className = 'inputBox'
  inputBox.id = 'inputBox'
  inputBox.textContent = ''
  gameContainer.appendChild(inputBox)
}

function makeBox(gameGrid, row, col, letter = '') {
  const charBox = document.createElement('div')
  charBox.className = 'charBox'
  charBox.id = 'charBox' + row + '' + col
  charBox.textContent = letter
  gameGrid.appendChild(charBox)
  return charBox
}

function makeButtonBox(gameContainer) {
  const buttonBox = document.createElement('div')
  buttonBox.className = 'buttonBox'
  buttonBox.id = 'buttonBox'
  buttonBox.textContent = ''
  gameContainer.appendChild(buttonBox)
  makeButtons(buttonBox)
}

function makeButtons(buttonBox) {
  const clearButton = document.createElement('button')
  clearButton.className = 'button'
  clearButton.id = 'clearButton'
  clearButton.textContent = 'Clear'
  buttonBox.appendChild(clearButton)
  clearButton.addEventListener('click', function () {
    onKeyPress('{clear}')
  })

  const backButton = document.createElement('button')
  backButton.className = 'button'
  backButton.id = 'backButton'
  backButton.textContent = 'Back'
  buttonBox.appendChild(backButton)
  backButton.addEventListener('click', function () {
    onKeyPress('{bksp}')
  })

  const enterButton = document.createElement('button')
  enterButton.className = 'button'
  enterButton.id = 'enterButton'
  enterButton.textContent = 'Enter'
  buttonBox.appendChild(enterButton)
  enterButton.addEventListener('click', function () {
    onKeyPress('{entr}')
  })
}

function makeAlertBox(gameGrid) {
  const alertBox = document.createElement('div')
  alertBox.className = 'hide'
  alertBox.id = 'alertBox'
  alertBox.innerHTML = 'Press Start to begin<br/>'
  gameGrid.appendChild(alertBox)
  makePointAlertBox(gameGrid)
}

function makePointAlertBox(gameGrid) {
  const pointAlert = document.createElement('div')
  pointAlert.className = 'hide'
  pointAlert.id = 'pointAlert'
  pointAlert.textContent = ''
  gameGrid.appendChild(pointAlert)
}

function startButton() {
  alertBox.classList.remove('hide')
  const startButton = document.createElement('button')
  startButton.className = 'startButton'
  startButton.textContent = 'START'
  alertBox.appendChild(startButton)
  startButton.addEventListener('click', function () {
    gameStart = true
    animationControl()
    score = 0
    scoreBox.innerHTML = 'SCORE: ' + score
    enteredWords = []
    outputBox.innerHTML = ''
    hiddenWord = random()
    console.log('H: ' + hiddenWord)
    wordJumbler(hiddenWord)
    alertBox.classList.add('hide')
    timeTrial()
  })
}

function makeOutputBox(gameContainer) {
  const outputBox = document.createElement('div')
  outputBox.className = 'outputBox'
  outputBox.id = 'outputBox'
  gameContainer.appendChild(outputBox)
}

function makeHighScoreBox(gameContainer) {
  const highScoreBox = document.createElement('div')
  highScoreBox.className = 'highScoreBox'
  highScoreBox.id = 'highScoreBox'
  highScoreBox.innerHTML = 'HIGHSCORE: ' + (highScore || 0)
  gameContainer.appendChild(highScoreBox)

  const scoreBox = document.createElement('div')
  scoreBox.className = 'scoreBox'
  scoreBox.id = 'scoreBox'
  scoreBox.innerHTML = 'SCORE: ' + score
  gameContainer.appendChild(scoreBox)

  const timeBox = document.createElement('div')
  timeBox.className = 'timeBox'
  timeBox.id = 'timeBox'
  timeBox.innerHTML = 'TIME: 3.00'
  gameContainer.appendChild(timeBox)
}

function keyboardPresses() {
    document.body.onkeydown = (e) => {
      let key = e.key
      if (key === 'Enter') {
        onKeyPress('{entr}')
      }
      if (key === 'Backspace') {
        onKeyPress('{bksp}')
      }
      if (isAlpha(key)) {
        if (gameStart === false) return
        onKeyPress(key)
      }
  }
}

function onKeyPress(key) {
  if (gameStart === false) return
    if (key === '{entr}') {
      let word = inputBox.textContent
      if (isWordValid(word)) {
        if (!enteredWords.includes(word)) {
          if (wordExists(word)) {
            if (word.length > 8) {
              outputBox.innerHTML += '<p class="goldLetters">' + word + ' </p>'
            } else {
              outputBox.innerHTML += '<p>' + word + ' </p>'
            }
            enteredWords.push(word)
            addPoints(word.length)
            inputBox.textContent = ''
          } else {
            alertBox.innerHTML = 'WORD DOES NOT EXIST'
            alertBox.classList.remove('hide')
            return
          }
        } else {
          alertBox.innerHTML = 'WORD ALREADY ENTERED'
          alertBox.classList.remove('hide')
        }
      } else if (inputBox.textContent !== '') {
        alertBox.innerHTML = 'MUST BE 3+ LETTERS'
        alertBox.classList.remove('hide')
        return
      }
    } else if (key === '{bksp}') {
      deleteLetter(inputBox.textContent)
      alertBox.innerHTML = ''
      alertBox.classList.add('hide')
    } else if (key === '{clear}') {
      inputBox.textContent = ''
      alertBox.innerHTML = ''
      alertBox.classList.add('hide')
    } else if (isAlpha(key)){
      if (hiddenWord.includes(key)) {
        if (inputBox.textContent.length > 16) return
        inputBox.textContent += key
        alertBox.innerHTML = ''
        alertBox.classList.add('hide')
      } else {
        alertBox.innerHTML = 'LETTER NOT ALLOWED'
        alertBox.classList.remove('hide')
        setTimeout(() => {
          alertBox.classList.add('hide')
        }, 500)
      }
    }
}
//---------------------------------------------------------------

function addPoints(wordLength) {
  if (wordLength > 8) {
    score += wordLength * 20
    pointAlert.innerHTML = '<p class="goldLetters">+' + wordLength * 20 + '</p>'
  } else {
    score += wordLength * 10
    pointAlert.innerHTML = '&nbsp;&nbsp;+' + wordLength * 10
  }
  scoreBox.innerHTML = 'SCORE: ' + score
  pointAlert.classList.remove('hide')
  setTimeout(() => {
    pointAlert.classList.add('hide')
  }, 800)
}

function isWordValid(enteredWord) {
  if (enteredWord.length > 2) {
    return enteredWord
  }
}

function deleteLetter(string) {
  if (string === '') return
  let array = string.split('')
  array.pop()
  inputBox.textContent = array.join('')
}

function updateGameGrid(array) {
  let j = 0
  for (let i = 0; i < 3; i++) {
    for (let o = 0; o < 3; o++) {
      let charBox = document.getElementById('charBox' + i + '' + o)
      charBox.textContent = array[j]
      j++
    }
  }
}

function gameGridKeys() {
  for (let i = 0; i < 3; i++) {
    for (let o = 0; o < 3; o++) {
      let charBox = document.getElementById('charBox' + i + '' + o)
      charBox.addEventListener('click', function () {
        onKeyPress(charBox.innerHTML)
      })
    }
  }
}

function isAlpha(key) {
  return key.length === 1 && key.match(/[a-z]/i)
}

function wordJumbler(string) {
  let array = string.split('')
  let randArray = []
  while (array.length > 0) {
    let randNum = Math.floor(Math.random() * array.length)
    randArray.push(array[randNum])
    array.splice(randNum, 1)
  }
  updateGameGrid(randArray)
}

function animationControl() {
  const anim = document.getAnimations()
  for (let i = 0; i < anim.length; i++){
    if (gameStart === true){
      //anim[i].pause()
      anim[i].finish()
    }else{
      anim[i].currentTime = 0
      anim[i].play()
    }
  }
}

const highScore = localStorage.getItem('mindHighScore')
let currentHighScore = highScore || 0

function timeTrial() {
  let countDown = new Date().getTime() + 181000
  let x = setInterval(function () {
    let now = new Date().getTime()
    let distance = countDown - now
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (distance < 1) {
      clearInterval(x)
      if (score > currentHighScore) {
        currentHighScore = score
        localStorage.setItem('mindHighScore', currentHighScore)
        highScoreBox.textContent = 'HighScore: ' + currentHighScore 
      }
      gameStart = false
      alertBox.innerHTML = 'TIMES UP!</br>YOU SCORED ' + score + ' POINTS</br>TRY TO BEAT IT BY HITTING START</br>'
      inputBox.innerHTML = ''
      startButton()
    } else {
        let leadingSeconds = ''
        if (seconds < 10){leadingSeconds = '0' + seconds}else{leadingSeconds = seconds}
        timeBox.textContent = 'TIME: ' + minutes + '.' + leadingSeconds
    }
  }, 1000)
}

//-----------------------------Dictionary Util--------------------------//
const wordExists = (text) => {
    return !!(text.length > 1
      ? dictionary[text.slice(0, 2)] &&
        dictionary[text.slice(0, 2)].includes(text)
      : text === 'a' || text === 'i')
}
let random = function () {
  let maxLength = 9

  var _word = ''
  var shuffledWordSet = shuffle(Object.values(dictionary))
  exit_loop: for (var i = 0; i < shuffledWordSet.length; i++) {
    var set = shuffle(shuffledWordSet[i])
    for (var j = 0; j < set.length; j++) {
      var word = set[j]
      if (word.length >= 3) {
        if (word.length === maxLength) {
          _word = word
          break exit_loop
        }
      }
    }
  }
  return _word
}
function shuffle(array) {
  var _a
  var currentIndex = array.length
  var randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;(_a = [array[randomIndex], array[currentIndex]]),
      (array[currentIndex] = _a[0]),
      (array[randomIndex] = _a[1])
  }
  return array
}
//----------------------------------------------------------------------//

init()