//mindbogld mindboglr
//
//to do:
//timer place absolute
//mark off letters
//show alert for 9
//highscores
//section for timer and highscores on grid left?
//click letters on box goes dark once used
//instructions in the your words section

import wordExists from 'word-exists'

let gameStart = false
let score = 0
let enteredWords = []
let gameName = ['m', 'i', 'n', 'd', 'b', 'o', 'g', 'g', 'l']
let wordList = [
  'available',
  'copyright',
  'education',
  'community',
  'following',
  'resources',
  'including',
  'directory',
  'insurance',
  'different',
  'september',
  'questions',
  'financial',
  'equipment',
  'important',
  'something',
  'committee',
  'reference',
  'companies',
  'computers',
]

let gameState = {
  gameGrid: Array(3)
    .fill()
    .map(() => Array(3).fill('')),
  currentRow: 0,
  currentCol: 0,
  hiddenWord: wordList[Math.floor(Math.random() * wordList.length)],
}

function init() {
  const gameContainer = document.getElementById('gameContainer')
  makeInputBox(gameContainer)
  makeGameGrid(gameContainer)
  makeButtonBox(gameContainer)
  updateGameGrid(gameName)
  startButton()
  makeOutputBox(gameContainer)
  enteredWords = []
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
  charBox.id = 'charBox.' + row + '' + col
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
  alertBox.textContent = ''
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
  alertBox.innerHTML = 'Press Start to begin<br/>'
  alertBox.classList.remove('hide')
  const startButton = document.createElement('button')
  startButton.className = 'startButton'
  startButton.textContent = 'START'
  alertBox.appendChild(startButton)
  startButton.addEventListener('click', function () {
    gameStart = true
    wordJumbler(gameState.hiddenWord)
    keyboardPresses()
    gameGridKeys()
    alertBox.classList.add('hide')
  })
}

function makeOutputBox(gameContainer) {
  const outputBox = document.createElement('div')
  outputBox.className = 'outputBox'
  outputBox.id = 'outputBox'
  outputBox.innerHTML = '<h2 id="score">SCORE: ' + score + '</h2>'
  gameContainer.appendChild(outputBox)
}

function keyboardPresses() {
  if (gameStart === true) {
    document.body.onkeydown = (e) => {
      let key = e.key
      if (key === 'Enter') {
        onKeyPress('{entr}')
      }
      if (key === 'Backspace') {
        onKeyPress('{bksp}')
      }
      if (isAlpha(key)) {
        if (gameState.hiddenWord.includes(key)) {
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
  }
}

function onKeyPress(button) {
  if (gameStart === true) {
    if (button === '{entr}') {
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
    } else if (button === '{bksp}') {
      deleteLetter(inputBox.textContent)
      alertBox.innerHTML = ''
      alertBox.classList.add('hide')
    } else if (button === '{clear}') {
      inputBox.textContent = ''
      alertBox.innerHTML = ''
      alertBox.classList.add('hide')
    }
  }
}
//---------------------------------------------------------------

function addPoints(wordLength) {
  score += wordLength
  document.getElementById('score').innerHTML = 'SCORE: ' + score
  pointAlert.textContent = '+' + wordLength
  pointAlert.classList.remove('hide')
  setTimeout(() => {
    pointAlert.classList.add('hide')
  }, 500)
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
      let charBox = document.getElementById('charBox.' + i + '' + o)
      charBox.textContent = array[j]
      j++
    }
  }
}

function gameGridKeys() {
  let j = 0
  for (let i = 0; i < 3; i++) {
    for (let o = 0; o < 3; o++) {
      let charBox = document.getElementById('charBox.' + i + '' + o)
      charBox.addEventListener('click', function () {
        inputBox.textContent += charBox.innerHTML
        alertBox.classList.add('hide')
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

init()
