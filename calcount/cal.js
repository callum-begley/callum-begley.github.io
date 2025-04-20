function init() {
  const gameContainer = document.getElementById('calGameContainer')
  const gameGrid = document.getElementById('gameGrid')
  makeGameGrid(gameContainer)
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

  return currentImgDiv, currentNameDiv, currentCalDiv
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
    name: '300 strawberries',
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

function displayCurrent(num) {
  currentNameDiv = document.getElementById('currentNameDiv')
  currentCalDiv = document.getElementById('currentCalDiv')
  currentImgDiv = document.getElementById('currentImgDiv')
  currentNameDiv.textContent = gameItems[num].name + ': '
  currentCalDiv.textContent =
    'Calories: ' + Number(gameItems[num].cals).toLocaleString()
  currentImg = document.createElement('img')
  currentImg.id = 'currentImg'
  currentImg.className = 'calImg'
  currentImg.src = gameItems[num].image
  currentImgDiv.appendChild(currentImg)
}

function displayNext() {
  num = randNum(gameItems.length)
  nextNameDiv = document.getElementById('nextNameDiv')
  nextCalDiv = document.getElementById('nextCalDiv')
  nextNameDiv.textContent = gameItems[num].name + '?'
  nextImgDiv = document.getElementById('nextImgDiv')
  nextImg = document.createElement('img')
  nextImg.id = 'nextImg'
  nextImg.className = 'calImg'
  nextImg.src = gameItems[num].image
  nextImgDiv.appendChild(nextImg)
  hButton = document.createElement('button')
  hButton.textContent = 'Higher'
  lButton = document.createElement('button')
  lButton.textContent = 'Lower'
  or = document.createElement('span')
  or.textContent = ' or '
  nextCalDiv.appendChild(hButton)
  nextCalDiv.appendChild(or)
  nextCalDiv.appendChild(lButton)
}

function randNum(num) {
  return Math.floor(Math.random() * num)
}

init()
displayCurrent(3)
displayNext()
