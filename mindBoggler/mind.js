//mindbogld mindboglr
//
//to do:
//timer place absolute
//check words
//check letters
//mark off letters
//give points more for 9
//show alert for 9
//highscores
//section for timer and highscores on grid left?
//click letters on box goes dark once used
//instructions in the your words section

let gameStart = false
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
  const enterButton = document.createElement('button')
  enterButton.className = 'button'
  enterButton.id = 'enterButton'
  enterButton.textContent = 'Enter'
  buttonBox.appendChild(enterButton)
  enterButton.addEventListener('click', function () {
    onKeyPress('{entr}')
  })
  const backButton = document.createElement('button')
  backButton.className = 'button'
  backButton.id = 'backButton'
  backButton.textContent = 'Back'
  buttonBox.appendChild(backButton)
  backButton.addEventListener('click', function () {
    onKeyPress('{bksp}')
  })
}

function makeAlertBox(gameGrid) {
  const alertBox = document.createElement('div')
  alertBox.className = 'hide'
  alertBox.id = 'alertBox'
  alertBox.textContent = ''
  gameGrid.appendChild(alertBox)
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
    keyboardpresses()
    gameGridKeys()
    alertBox.classList.add('hide')
  })
}

function makeOutputBox(gameContainer) {
  const outputBox = document.createElement('div')
  outputBox.className = 'outputBox'
  outputBox.id = 'outputBox'
  outputBox.innerHTML = '<h2>Your words:</h2>'
  gameContainer.appendChild(outputBox)
}

function keyboardpresses() {
  if (gameStart === true) {
    document.body.onkeydown = (e) => {
      let key = e.key
      if (key === 'Enter') {
        let word = inputBox.textContent
        if (isWordValid(word)) {
          outputBox.innerHTML += '<p>' + word + ' </p>'
          inputBox.textContent = ''
          //checkLetters()
        } else {
          alertBox.innerHTML = 'MUST BE 3+ LETTERS'
          alertBox.classList.remove('hide')
          return
        }
      }
      if (key === 'Backspace') {
        deleteLetter(inputBox.textContent)
        alertBox.innerHTML = ''
        alertBox.classList.add('hide')
      }
      if (isAlpha(key)) {
        inputBox.textContent += key
        alertBox.innerHTML = ''
        alertBox.classList.add('hide')
      }
    }
  }
}

function onKeyPress(button) {
  if (gameStart === true) {
    if (button === '{entr}') {
      let word = inputBox.textContent
      if (isWordValid(word)) {
        //checkLetters()
        outputBox.innerHTML += '<p>' + word + ' </p>'
        inputBox.textContent = ''
      } else {
        alertBox.innerHTML = 'MUST BE 3+ LETTERS'
        alertBox.classList.remove('hide')
        return
      }
    } else if (button === '{bksp}') {
      deleteLetter(inputBox.textContent)
      alertBox.innerHTML = ''
      alertBox.classList.add('hide')
    }
  }
}
//---------------------------------------------------------------

// function checkLetters() {
// }

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
