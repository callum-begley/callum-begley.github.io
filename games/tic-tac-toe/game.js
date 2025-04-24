let cells = document.getElementsByTagName('TD')
let noughtsTurn = false
let gameIsOver = false
let turn = 0
let subtitle = document.getElementById('subtitle')
let scoreX = 0
let scoreO = 0

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
}

function cellClicked(e) {
  let cell = e.target

  //click to restart//
  if (gameIsOver === true) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = ''
    }
    gameIsOver = false
    if (noughtsTurn === false) {
      subtitle.innerHTML = 'Crosses turn'
    } else {
      subtitle.innerHTML = 'Noughts turn'
      setTimeout(function () {
        noughtsMove()
      }, 1000)
    }
    return
  }

  //crosses turn//
  if (noughtsTurn === false && cell.innerHTML === '') {
    cell.className = 'crossesText'
    cell.textContent = 'X'
    noughtsTurn = true
    subtitle.innerHTML = 'Noughts turn'
    checkWin('X')
    setTimeout(function () {
      if (turn < 9 && gameIsOver === false) {
        noughtsMove()
      }
    }, 1000)
  }
}

function noughtsMove() {
  num = randNum()

  while (noughtsTurn === true && gameIsOver === false) {
    if (cells[num].innerHTML === '') {
      cells[num].className = 'noughtsText'
      cells[num].textContent = 'O'
      noughtsTurn = false
      subtitle.innerHTML = 'Crosses turn'
      checkWin('O')
    } else {
      num = randNum()
    }
  }
}

function checkWin(symbol) {
  // HORIZONTAL LINES //
  if (
    cells[0].innerHTML == symbol &&
    cells[1].innerHTML == symbol &&
    cells[2].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[3].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[5].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[6].innerHTML == symbol &&
    cells[7].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  // VERTICAL LINES //
  else if (
    cells[0].innerHTML == symbol &&
    cells[3].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[1].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[7].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[2].innerHTML == symbol &&
    cells[5].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  // DIAGONAL LINES //
  else if (
    cells[0].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  )
    gameIsOver = true
  else if (
    cells[2].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  )
    gameIsOver = true

  turn++
  console.log('turn ' + turn + ' ' + symbol)
  if (gameIsOver === true) {
    gameWon(symbol)
  } else if (gameIsOver !== true && turn === 9) {
    console.log('Stalemate')
    subtitle.innerHTML = 'Stalemate - click to restart'
    gameIsOver = true
    turn = 0
  }
}

function gameWon(symbol) {
  if (symbol === 'X') {
    subtitle.innerHTML = 'Crosses Win! - click to restart'
    scoreX++
    displayScore()
    turn = 0
    console.log(symbol + symbol + symbol)
  }
  if (symbol === 'O') {
    subtitle.innerHTML = 'Naughts Win! - click to restart'
    scoreO++
    displayScore()
    turn = 0
    console.log(symbol + symbol + symbol)
  }
}

function displayScore() {
  showScoreX = document.getElementById('scoreX').innerHTML =
    'Crosses Score: ' + scoreX
  showScoreO = document.getElementById('scoreO').innerHTML =
    'Noughts Score: ' + scoreO
}

function randNum() {
  return Math.floor(Math.random() * 9)
}

displayScore()
