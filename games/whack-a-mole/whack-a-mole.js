// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
import { getRandomNumber } from './random-number.js'

let cells = document.getElementsByTagName('TD')
let score = 0
let lastMole = ''

const mole = document.createElement('img')
mole.src = 'mole.png'
mole.className = 'mole'
mole.id = 'mole'

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
  cells[i].id = 'cell' + i
}

function cellClicked(e) {
  let cell = e.target
  if (cell === mole) {
    playSoundEffect()
    shoot()
    placeMole()
    scoreKeeper()
  }
}

function placeMole() {
  let num = getRandomNumber(0, cells.length - 1)
  while (num === lastMole) {
    num = getRandomNumber(0, cells.length - 1)
  }
  const moleCell = document.getElementById('cell' + num)
  moleCell.appendChild(mole)
  lastMole = num
}

function playSoundEffect() {
  //new Audio('whack-audio.wav').play()
  let audio = new Audio('oof.mp3')
  audio.volume = 0.3
  audio.play()
}

function scoreKeeper() {
  score++
  const scoreDiv = document.getElementById('score')
  scoreDiv.innerHTML = score
}

const timeButton = document.getElementById('timeButton')
timeButton.onclick = timeTrial
const highScoreDiv = document.getElementById('highScore')
const highScore = localStorage.getItem('moleHighscore')
highScoreDiv.textContent = 'HighScore: ' + (highScore || 0)
let currentHighscore = highScore || 0

function timeTrial() {
  let scoreNow = score
  let countDown = new Date().getTime() + 11000
  let x = setInterval(function () {
    let now = new Date().getTime()
    let distance = countDown - now
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (distance < 1) {
      clearInterval(x)
      let timeScore = score - scoreNow
      timeButton.innerHTML = 'You Got ' + timeScore + '<br/>Try Again?'
      //highscore = score
      if (currentHighscore < timeScore) {
        currentHighscore = timeScore
        localStorage.setItem('moleHighscore', timeScore)
        highScoreDiv.textContent = 'HighScore: ' + currentHighscore
      }
    } else {
      timeButton.textContent = seconds + ' seconds'
    }
  }, 1000)
}

placeMole()
findMole()

//---------------------------------------------------------------//
// confetti stars

function findMole() {
  const target = document.getElementById('mole')
  const targetRect = target.getBoundingClientRect()

  const centerX = targetRect.left + targetRect.width / 2
  const centerY = targetRect.top + targetRect.height / 2

  const normalizedX = centerX / window.innerWidth
  const normalizedY = centerY / window.innerHeight

  return [normalizedX, normalizedY]
}

function shoot() {
  const location = findMole()
  const xAxis = location[0]
  const yAxis = location[1]

  var defaults = {
    decay: 0.5,
    startVelocity: 30,
    zIndex: 10,
    colors: ['FFFF00'],
  }

  confetti({
    ...defaults,
    particleCount: 10,
    spread: 360,
    ticks: 10,
    gravity: 0,
    scalar: 1,
    shapes: ['star'],
    colors: ['FFFF00'],
    origin: { x: xAxis, y: yAxis },
  })
}
