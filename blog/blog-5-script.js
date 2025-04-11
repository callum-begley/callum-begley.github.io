const link = document.getElementById('aeroplaneLink')
link.addEventListener('click', fly)

function fly(e) {
  document.getElementById('aeroplane').src = '/images/woosh.jpeg'
  link.textContent = 'Wooooooooooooooooooooooosh!'
  e.preventDefault()
  link.addEventListener('click', reset)
}

function reset(e) {
  document.getElementById('aeroplane').src = '/images/how-do-planes-fly.jpg'
  link.textContent = 'Nice landing, try again! :)'
  e.preventDefault()
  link.addEventListener('click', fly2)
}

function fly2(e) {
  document.getElementById('aeroplane').src = '/images/woosh.jpeg'
  link.textContent = 'Wooooooooooooooooooooooosh!'
  e.preventDefault()
  link.addEventListener('click', nofuel)
}

function nofuel(e) {
  document.getElementById('aeroplane').src = '/images/planecrash.jpeg'
  link.textContent = 'Whoops... you crash landed :('
  e.preventDefault()
  link.addEventListener('click', fly2)
}
