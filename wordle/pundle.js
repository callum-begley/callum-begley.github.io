// PUNDLE

// Like wordle but funnier
// funnyness subject to personal sense of humor and maturity

// add a few more puns

let correctString = []
let containsString = []
let incorrectString = []
let wordList = ['hinge']
let gameState = {}

const Keyboard = window.SimpleKeyboard.default

function initKeyboard() {
  keyboard.setOptions({
    buttonTheme: [
      {
        class: 'hg-blue',
        buttons: '{bksp} {enter}',
      },
      {
        class: 'hg-correctKeys',
        buttons: correctString.join(' ') || ' ',
      },
      {
        class: 'hg-containsKeys',
        buttons: containsString.join(' ') || ' ',
      },
      {
        class: 'hg-incorrectKeys',
        buttons: incorrectString.join(' ') || ' ',
      },
    ],
  })
}

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
    '{bksp}':
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete-icon lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>',
    '{enter}': 'Enter',
  },
})

function startGame() {
  gameState = {
    gameGrid: Array(6)
      .fill()
      .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
    hiddenWord: wordList[Math.floor(Math.random() * wordList.length)],
  }
  correctString = []
  containsString = []
  incorrectString = []
  initKeyboard()
}

function init() {
  const gameContainer = document.getElementById('gameContainer')
  makeGameGrid(gameContainer)
  keyboardpresses()
  startGame()
  getPrompt()
  initKeyboard()
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
  makeAlertBox()
}

function makeAlertBox() {
  const alertBox = document.createElement('div')
  alertBox.className = 'hide alert2'
  alertBox.id = 'alertBox'
  alertBox.textContent = ''
  gameContainer.appendChild(alertBox)
  makeConfettiDiv(alertBox)
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
  let alertBox = document.getElementById('alertBox')
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
        alertBox.innerHTML = 'MUST BE 5 LETTERS'
        alertBox.classList.remove('hide')
      }
    }
    if (key === 'Backspace') {
      deleteLetter()
      alertBox.classList.add('hide')
    }
    if (isAlpha(key)) {
      addLetter(key)
      alertBox.classList.add('hide')
    }
    updateGameGrid()
  }
}

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

function getPrompt() {
  let word = gameState.hiddenWord
  if (word === 'hinge') {
    document.getElementById('punPrompt').innerHTML =
      'Clue: A place where you meet</br>the love of your life'
  }
}

function checkLetters() {
  let checkedLetters = Array(5)
  console.log(checkedLetters)
  for (let i = 0; i < 5; i++) {
    let charBox = document.getElementById(
      'charBox.' + gameState.currentRow + '' + i
    )
    let letter = charBox.textContent.toLowerCase()

    if (
      letter == gameState.hiddenWord[i] &&
      checkedLetters.includes(letter) === false
    ) {
      charBox.classList.add('correct')
      correctString.push(letter.toUpperCase())
      checkedLetters.push(letter)
    } else if (
      gameState.hiddenWord.includes(letter) &&
      checkedLetters.includes(letter) === false
    ) {
      charBox.classList.add('contains')
      containsString.push(letter.toUpperCase())
      checkedLetters.push(letter)
    } else if (
      !gameState.hiddenWord.includes(letter) ||
      checkedLetters.includes(letter)
    ) {
      charBox.classList.add('empty')
      incorrectString.push(letter.toUpperCase())
    }

    console.log(checkedLetters)
  }
  initKeyboard()
}

function checkTurn(enteredWord) {
  let won = gameState.hiddenWord === enteredWord
  let gameOver = gameState.currentRow === 5
  let alertBox = document.getElementById('alertBox')

  if (won && gameState.currentRow <= 5) {
    alertBox.innerHTML =
      'YOU WON! 😊<br/>Now you have to go on<br/>a date with Callum '
    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 300)
    setTimeout(shoot, 500)
    gameState.currentRow = 5
    gameState.currentCol = 5
    alertBox.classList.remove('hide')
  } else if (gameOver && gameState.hiddenWord !== enteredWord) {
    alertBox.innerHTML = 'YOU LOST :(' + '<br/>'
    alertBox.classList.remove('hide')
    tryAgainButton(alertBox)
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

function tryAgainButton(alertBox) {
  const button = document.createElement('button')
  button.className = 'resetButton'
  button.textContent = 'Try Another?'
  alertBox.appendChild(button)
  tryAgain(button)
  return button
}

function tryAgain(button) {
  button.addEventListener('click', function () {
    for (let i = 0; i < gameState.gameGrid.length; i++) {
      for (let o = 0; o < gameState.gameGrid[i].length; o++) {
        let charBox = document.getElementById('charBox.' + i + '' + o)
        charBox.classList.remove('correct', 'contains', 'empty')
      }
    }
    document.getElementById('alertBox').innerHTML = ''
    document.getElementById('alertBox').classList.add('hide')
    startGame()
    updateGameGrid()
    getPrompt()
  })

  return button
}

init()

// confetti

function makeConfettiDiv(alertBox) {
  const confettiDiv = document.getElementById('confetti')
  alertBox.appendChild(confettiDiv)
}

function shoot() {
  var defaults = {
    decay: 0.94,
    startVelocity: 30,
    gravity: 0,
    zIndex: 0,
    spread: 360,
    ticks: 50,
    gravity: 1,
    // colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  }

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1,
    shapes: ['circle'],
  })
  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 1.2,
    shapes: ['star'],
  })
}
