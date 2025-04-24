// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
import { getRandomNumber } from './random-number.js'

let cells = document.getElementsByTagName('TD')
let score = 0
let lastAvo = ''

const avo = document.createElement('img')
avo.src = 'avo.png'
avo.className = 'avo'
avo.id = 'avo'

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
  cells[i].id = 'cell' + i
}

function cellClicked(e) {
  let cell = e.target
  if (cell === avo) {
    playSoundEffect()
    shoot()
    placeAvo()
    scoreKeeper()
  }
}

function placeAvo() {
  let num = getRandomNumber(0, cells.length - 1)
  while (num === lastAvo) {
    num = getRandomNumber(0, cells.length - 1)
  }
  const avoCell = document.getElementById('cell' + num)
  avoCell.appendChild(avo)
  lastAvo = num
}

function playSoundEffect() {
  //new Audio('whack-audio.wav').play()
  let audio = new Audio('punch.wav')
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
let highScore = localStorage.getItem('avoHighScore')
highScoreDiv.textContent = 'HighScore: ' + (highScore || 0)

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
      console.log('done' + timeScore)
      timeButton.innerHTML = 'You Got ' + timeScore + '<br/>Try Again?'
      //highscore = score
      if (highScore < timeScore) {
        localStorage.setItem('avoHighScore', timeScore)
        highScoreDiv.textContent = 'HighScore: ' + timeScore
      }
    } else {
      timeButton.textContent = seconds + ' seconds'
    }
  }, 1000)
}

//---------------------------------------------------------------//

placeAvo()
findMole()

// confetti stars

function findMole() {
  const target = document.getElementById('avo')
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
    //colors: ['FFFF00'],
  }

  confetti({
    ...defaults,
    particleCount: 20,
    spread: 360,
    ticks: 10,
    gravity: 0,
    scalar: 1,
    shapes: ['circle'],
    colors: ['99cc00'],
    origin: { x: xAxis, y: yAxis },
  })
}
