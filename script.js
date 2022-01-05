let currentDrawingMode = "default"
function resetGrid(size) {
  const grid = document.querySelector('#grid')

  grid.innerHTML = ''

  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.style['width'] = `${960 / size}px`

  const row = document.createElement('div')
  row.classList.add('row')

  for (let i = 0; i < size; i++) {
    row.appendChild(cell.cloneNode(true))
  }

  for (let i = 0; i < size; i++) {
    grid.appendChild(row.cloneNode(true))
  }

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseenter', e => {
      if (currentDrawingMode == 'default') {
        e.target.style['background-color'] = 'blue'
      } else if (currentDrawingMode == 'rgb') {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)
        e.target.style['background-color'] = `rgb(${r}, ${g}, ${b})`
      } else {
        const currentColor = e.target.style['background-color']
        if (!currentColor || !currentColor.startsWith('rgba')) {
          if (currentColor != 'rgb(0, 0, 255)')
            e.target.style['background-color'] = 'rgba(0, 0, 255, 0.1)'
        } else {
          let alpha = parseFloat(currentColor.split(",")[3])
          alpha = Math.min(alpha + 0.1, 1.0)
          e.target.style['background-color'] = `rgba(0, 0, 255, ${alpha})`
        }
      }
    })
  })
}

resetGrid(16)

document.querySelector('#reset').addEventListener('click', e => {
  const newSize = parseInt(prompt('How many cells wide should the grid be?'))
  if (isNaN(newSize) || newSize < 1 || newSize > 100) {
    alert('Please enter a valid number between 1-100')
    return
  }
  resetGrid(newSize)
})

document.querySelectorAll('.drawing-mode').forEach(radio => {
  radio.addEventListener('change', e => {
    if (e.target.checked) {
      currentDrawingMode = e.target.getAttribute('id')
    }
  })
})