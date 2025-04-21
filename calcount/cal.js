// to do:
//
// more items
// loss alert - show cals
// styling

function init() {
  const gameContainer = document.getElementById('calGameContainer')
  makeGameGrid(gameContainer)
  displayCurrent(randNum(gameItems.length))
  document.getElementById('bestStreakDiv').textContent =
    'Best Streak: ' + (bestStreak || 0)
  currentScoreUpdate()
}

function makeGameGrid(gameContainer) {
  const gameGrid = document.createElement('div')
  gameGrid.id = 'gameGrid'
  gameContainer.appendChild(gameGrid)
  makeCurrent(gameGrid)
  makeNext(gameGrid)
}

function makeCurrent(gameGrid) {
  const currentBox = document.createElement('div')
  currentBox.className = 'gameBox'
  currentBox.id = 'currentBox'
  gameGrid.appendChild(currentBox)
  makeCurrentDivs(currentBox)
  return currentBox
}

function makeCurrentDivs(currentBox) {
  const currentScoreDiv = document.createElement('div')
  currentScoreDiv.id = 'currentScoreDiv'
  currentScoreDiv.className = 'score'
  currentBox.appendChild(currentScoreDiv)

  const currentImgDiv = document.createElement('div')
  currentImgDiv.className = 'imgDiv'
  currentImgDiv.id = 'currentImgDiv'
  currentBox.appendChild(currentImgDiv)

  const currentNameDiv = document.createElement('div')
  currentNameDiv.className = 'nameDiv'
  currentNameDiv.id = 'currentNameDiv'
  currentBox.appendChild(currentNameDiv)

  const currentCalDiv = document.createElement('div')
  currentCalDiv.className = 'calDiv'
  currentCalDiv.id = 'currentCalDiv'
  currentBox.appendChild(currentCalDiv)

  return currentScoreDiv, currentImgDiv, currentNameDiv, currentCalDiv
}

function makeNext(gameGrid) {
  const nextBox = document.createElement('div')
  nextBox.className = 'gameBox'
  nextBox.id = 'nextBox'
  gameGrid.appendChild(nextBox)
  makeCurrentDivs(nextBox)
  return nextBox
}

function makeNextDivs(nextBox) {
  const bestStreakDiv = document.createElement('div')
  bestStreakDiv.id = 'bestStreakDiv'
  bestStreakDiv.className = 'score'
  nextBox.appendChild(bestStreakDiv)

  const nextImgDiv = document.createElement('div')
  nextImgDiv.className = 'imgDiv'
  nextImgDiv.id = 'nextImgDiv'
  nextBox.appendChild(nextImgDiv)

  const nextNameDiv = document.createElement('div')
  nextNameDiv.className = 'nameDiv'
  nextNameDiv.id = 'nextNameDiv'
  nextBox.appendChild(nextNameDiv)

  const nextCalDiv = document.createElement('div')
  nextCalDiv.className = 'calDiv'
  nextCalDiv.id = 'nextCalDiv'
  nextBox.appendChild(nextCalDiv)

  return nextImgDiv, nextNameDiv, nextCalDiv
}

function makeNext(gameGrid) {
  const nextBox = document.createElement('div')
  nextBox.className = 'gameBox'
  nextBox.id = 'nextBox'
  gameGrid.appendChild(nextBox)
  makeNextDivs(nextBox)
  return nextBox
}

const gameItems = [
  {
    name: '300 Strawberries',
    cals: 1200,
    image: 'calimages/strawberries.png',
  },
  {
    name: 'A Big Mac Combo',
    cals: 1320,
    image: 'calimages/bigmac.png',
  },
  {
    name: '1 Gram of Uranium',
    cals: 20000000000,
    image: 'calimages/uranium.png',
  },
  {
    name: 'A Jar Of Peanut Butter',
    cals: 2228,
    image: 'calimages/peanutbutter.png',
  },
  {
    name: 'A Whole Rotisserie Chicken',
    cals: 1295,
    image: 'calimages/chicken.png',
  },
]

// More ideas
// a pile of dirt
// a 5 pack of 2min noodles
// 1 scoop from fish and chip shop
// a jar of pickles
// a cubic metre of tofu
// full english breakfast
// smoothie / milkshake
// a bucket of kfc
// a bowl of guac
// a mouthful of oil
// a cup of petrol 1937.5
// a kg of cheese
// subway cookies
// ice cream
// a bannabox of lettuce
// a slice of pizza
// donut
// a gallon of coke
// bottle of vodka
// a tray of mac n cheese
// a tray of eggs
// 5 kg of celery 800
// 10 watermelons
// a bowl of gravy
// some amount of mayo
// blt
// mums spag bol
// a pack of flour

function displayCurrent(num) {
  // clear space
  clearBox('currentNameDiv')
  clearBox('currentCalDiv')
  clearBox('currentImgDiv')

  currentNameDiv.textContent = gameItems[num].name
  currentCalDiv.textContent =
    'Calories: ' + Number(gameItems[num].cals).toLocaleString()

  currentImg = document.createElement('img')
  currentImg.id = 'currentImg'
  currentImg.className = 'calImg'
  currentImg.src = gameItems[num].image
  currentImgDiv.appendChild(currentImg)

  currentScoreDiv.textContent = 'Score: ' + currentScore

  displayNext(num)
}

function displayNext(currentNum) {
  num = randNum(gameItems.length)
  if (num === currentNum && currentNum < gameItems.length - 1) {
    num++
  } else if (num === currentNum) {
    num--
  }
  // clear space
  clearBox('nextNameDiv')
  clearBox('nextCalDiv')
  clearBox('nextImgDiv')

  nextNameDiv.textContent = gameItems[num].name + '?'
  nextImg = document.createElement('img')
  nextImg.id = 'nextImg'
  nextImg.className = 'calImg'
  nextImg.src = gameItems[num].image
  nextImgDiv.appendChild(nextImg)

  //Buttons
  hButton = document.createElement('button')
  hButton.textContent = 'Higher'
  lButton = document.createElement('button')
  lButton.textContent = 'Lower'
  or = document.createElement('span')
  or.textContent = ' or '
  nextCalDiv.appendChild(hButton)
  nextCalDiv.appendChild(or)
  nextCalDiv.appendChild(lButton)

  gameHandler(lButton, hButton, currentNum, num)
}

function gameHandler(lButton, hButton, currentNum, nextNum) {
  lButton.addEventListener('click', function () {
    if (gameItems[currentNum].cals >= gameItems[nextNum].cals) {
      //correct
      displayCurrent(nextNum)
      currentScoreUpdate(false)
    } else {
      currentScoreUpdate(true)
    }
  })
  hButton.addEventListener('click', function () {
    if (gameItems[currentNum].cals <= gameItems[nextNum].cals) {
      //correct
      displayCurrent(nextNum)
      currentScoreUpdate(false)
    } else {
      currentScoreUpdate(true)
    }
  })
}

let currentScore = 0
let bestStreak = localStorage.getItem('highscore')

function currentScoreUpdate(gameoverState) {
  if (gameoverState === false) {
    currentScore++
    currentScoreDiv.textContent = 'Score: ' + currentScore
  } else if (gameoverState === true) {
    if (bestStreak < currentScore) {
      localStorage.setItem('highscore', currentScore)
      bestStreakDiv.textContent = 'Best Streak: ' + currentScore
    }
    currentScore = 0
    currentScoreDiv.textContent = 'Score: ' + currentScore
  }
}

//-----UTIL-----//
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = ''
}

function randNum(num) {
  return Math.floor(Math.random() * num)
}

init()
