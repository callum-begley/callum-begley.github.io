// PUNDLE

// Like wordle but funnier
// funnyness subject to personal sense of humor and maturity

// plot squares on a page
// call for user input
// user input to string, string to array
// test array against answer, exact match goes green
// test array for match in loop goes orange
// move down line and request input
// all green complete
// after 6th wrong guess fail

let wordList = ['array', 'cache', 'buggy', 'nerds']

let gameState = {
  gameGrid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
  hiddenWord: wordList[Math.floor(Math.random() * wordList.length)],
}

function init() {
  const gameContainer = document.getElementById('gameContainer')
  makeGameGrid(gameContainer)
  keyboardpresses()
  getPrompt()
}

function makeGameGrid(gameContainer) {
  const gameGrid = document.createElement('div')
  gameGrid.className = 'gameGrid'
  for (let i = 0; i < 6; i++) {
    for (let o = 0; o < 5; o++) {
      makeBox(gameGrid, i, o)
    }
  }
  gameContainer.appendChild(gameGrid)
}

function makeBox(gameGrid, row, col, letter = '') {
  const charBox = document.createElement('div')
  charBox.className = 'charBox'
  charBox.id = 'charBox.' + row + '' + col
  charBox.textContent = letter
  gameGrid.appendChild(charBox)
  return charBox
}

function keyboardpresses() {
  document.body.onkeydown = (e) => {
    let key = e.key
    if (key === 'Enter') {
      let word = getEnteredWord()
      if (isWordValid(word)) {
        checkLetters()
        checkTurn(word.toLowerCase())
        gameState.currentRow++
        gameState.currentCol = 0
      } else {
        document.getElementById('alertBox').innerHTML = 'MUST BE 5 LETTERS'
        document.getElementById('alertBox').classList.remove('hide')
      }
    }
    if (key === 'Backspace') {
      deleteLetter()
      document.getElementById('alertBox').classList.add('hide')
    }
    if (isAlpha(key)) {
      addLetter(key)
      document.getElementById('alertBox').classList.add('hide')
    }
    updateGameGrid()
  }
}

//-------------------------------------------------

const Keyboard = window.SimpleKeyboard.default

const keyboard = new Keyboard({
  onKeyPress: (button) => onKeyPress(button),

  theme: 'hg-theme-default myTheme1',
  layout: {
    default: [
      ,
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{bksp} Z X C V B N M {enter}',
    ],
  },
  display: {
    '{bksp}': '&larr;',
    '{enter}': 'Enter',
  },
})

function onKeyPress(button) {
  if (button === '{enter}') {
    let word = getEnteredWord()
    if (isWordValid(word)) {
      checkLetters()
      checkTurn(word.toLowerCase())
      gameState.currentRow++
      gameState.currentCol = 0
    } else {
      document.getElementById('alertBox').innerHTML = 'MUST BE 5 LETTERS'
      document.getElementById('alertBox').classList.remove('hide')
      return
    }
  } else if (button === '{bksp}') {
    deleteLetter()
    document.getElementById('alertBox').innerHTML = ''
    document.getElementById('alertBox').classList.add('hide')
  } else if (button !== '') {
    addLetter(button)
    document.getElementById('alertBox').innerHTML = ''
    document.getElementById('alertBox').classList.add('hide')
  }
  updateGameGrid()
}
//---------------------------------------------------------------

function getPrompt() {
  let word = gameState.hiddenWord
  if (word === 'array') {
    document.getElementById('punPrompt').innerHTML =
      "What ended Steve Irwin's programming career?"
  }
  if (word === 'cache') {
    document.getElementById('punPrompt').innerHTML =
      'What did the robber steal from the server?'
  }
  if (word === 'buggy') {
    document.getElementById('punPrompt').innerHTML =
      "What's a programmers least favourite beach vehicle?"
  }
  if (word === 'nerds') {
    document.getElementById('punPrompt').innerHTML =
      "What's a programmers favourite candy?"
  }
}

function checkLetters() {
  for (let i = 0; i < 5; i++) {
    let charBox = document.getElementById(
      'charBox.' + gameState.currentRow + '' + i
    )
    let letter = charBox.textContent.toLowerCase()

    if (letter == gameState.hiddenWord[i]) {
      charBox.classList.add('correct')
    } else if (gameState.hiddenWord.includes(letter)) {
      charBox.classList.add('contains')
    } else {
      charBox.classList.add('empty')
    }
  }
}

function checkTurn(enteredWord) {
  let won = gameState.hiddenWord === enteredWord
  let gameOver = gameState.currentRow === 5

  if (won && gameState.currentRow < 5) {
    document.getElementById('alertBox').innerHTML = 'YOU WON! :)'
    gameState.currentRow = 5
    gameState.currentCol = 5
    document.getElementById('alertBox').classList.remove('hide')
  } else if (won && gameState.currentRow === 5) {
    console.log(won)
    document.getElementById('alertBox').innerHTML = 'PHEW, YOU JUST GOT IT!'
    document.getElementById('alertBox').classList.remove('hide')
  } else if (gameOver && gameState.hiddenWord !== enteredWord) {
    document.getElementById('alertBox').innerHTML = 'YOU LOST :('
    document.getElementById('alertBox').classList.remove('hide')
  }
}

function isWordValid(enteredWord) {
  if (enteredWord.length == 5) {
    return enteredWord
  }
}

function getEnteredWord() {
  return gameState.gameGrid[gameState.currentRow].reduce(
    (previous, current) => previous + current
  )
}

function deleteLetter() {
  if (gameState.currentCol === 0) return
  gameState.gameGrid[gameState.currentRow][gameState.currentCol - 1] = ''
  gameState.currentCol--
}

function updateGameGrid() {
  for (let i = 0; i < gameState.gameGrid.length; i++) {
    for (let o = 0; o < gameState.gameGrid[i].length; o++) {
      let charBox = document.getElementById('charBox.' + i + '' + o)
      charBox.textContent = gameState.gameGrid[i][o]
    }
  }
}

function addLetter(key) {
  if (gameState.currentCol === 5) return
  gameState.gameGrid[gameState.currentRow][gameState.currentCol] = key
  gameState.currentCol++
}

function isAlpha(key) {
  return key.length === 1 && key.match(/[a-z]/i)
}

init()
