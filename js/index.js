let length = 13
let time = 400
let towards = 1
let snakeBodyLength = 5
let editting = false
let count = 0
let move
let snakeTopPosition = parseInt(length * length / 2)
let snakeDirection = 1
let snakeBodyPosition = []

document.querySelector('#length').addEventListener('change', e => {
  reset()
  length = parseInt(e.target.value)
  snakeTopPosition = parseInt(length * length / 2)
  console.log(length)
  document.querySelector('.map').style.gridTemplateColumns = `repeat(${length + 2},1fr)`
  document.querySelector('.map').style.gridTemplateRows = `repeat(${length + 2},1fr)`
  addMap()
})
document.querySelector('.edit').addEventListener('click', function () {
  if (this.innerHTML === '编辑结束') {
    this.innerHTML = '修改地图'
    editting = false
    document.querySelector('.start').disabled = false
  }

  else editMap()
})
addMap()

function addMap() {
  let map = ''
  let id = 0
  for (let i = 0; i < length + 2; i++) {
    map += `<div class="block" id=${id++}></div>`
    for (let j = 0; j < length; j++) {
      if (i === 0 || i === length + 1)
        map += `<div class="block" id=${id++}></div>`
      else
        map += `<div class="box" id=${id++}></div>`
    }
    map += `<div class="block" id=${id++}></div>`
  }
  document.querySelector('.map').innerHTML = map
}

document.querySelector('.start').addEventListener('click', start)

function start() {
  document.querySelector('.start').disabled = true
  document.querySelector('.edit').disabled = true
  const map = document.querySelectorAll('.box')
  time = ((length === 13) ? 200 : (length === 21 ? 150 : 50))
  apples = ((length === 13) ? 4 : (length === 21 ? 7 : 12))

  const boxes = document.querySelectorAll('.box')
  map[boxes[parseInt(boxes.length / 2)].id].classList.add('snake-top')
  addApple(apples)
  move = setInterval(snakeMove, time)
}
document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'KeyA':
      if (towards !== 1)
        snakeDirection = -1
      break;
    case 'KeyW':
      if (towards !== length + 2)
        snakeDirection = -1 * length - 2
      break;
    case 'KeyS':
      if (towards !== -1 * length - 2)
        snakeDirection = length + 2
      break;
    case 'KeyD':
      if (towards !== -1)
        snakeDirection = 1
      break;
    default:
      break;
  }
})

function reset() {
  count = 0
  snakeBodyLength = 5
  snakeTopPosition = parseInt(length * length / 2)
  snakeBodyPosition = []
  towards = 1
  document.querySelector('.start').disabled = false
  document.querySelector('.edit').disabled = false
  if (document.querySelector('.snake-top'))
    document.querySelector('.snake-top').classList.remove('snake-top')
  if (document.querySelector('.snake-body'))
    document.querySelectorAll('.snake-body').forEach(item => {
      item.classList.remove('snake-body')
    })
  if (document.querySelector('.apple'))
    document.querySelectorAll('.apple').forEach(item => {
      item.classList.remove('apple')
    })
  clearInterval(move)
}

function snakeMove() {
  //头移动，记录头移动前的位置，变为身体，身体长度足够时移除尾巴
  const snakeTop = document.querySelector('.snake-top')
  const id = +snakeTop.id
  snakeBodyPosition.unshift(id)
  snakeTop.classList.replace('snake-top', 'snake-body')
  if (towards + snakeDirection !== 0) towards = snakeDirection
  document.querySelector(`[id="${id + towards}"]`).classList.add('snake-top')
  if (document.querySelector('.snake-top.block') || document.querySelector('.snake-top.snake-body')) {
    alert(`游戏结束,最后得分为${count}`)
    reset()
  }
  if (document.querySelector('.snake-top.apple')) {
    document.querySelector('.snake-top.apple').classList.remove('apple')
    snakeBodyLength++
    count++
    addApple(1)
  }
  if (snakeBodyLength < document.querySelectorAll('.snake-body').length) {
    const position = snakeBodyPosition.pop()
    document.querySelector(`[id="${position}"]`).classList.remove('snake-body')
  }
}

function addApple(n) {
  for (let i = 0; i < n; i++) {
    const position = parseInt(Math.random() * (length + 2) * (length + 2))
    console.log(position)
    const box = document.querySelector(`[id="${position}"]`).classList
    if (box.contains('snake-top') || box.contains('snake-body') || box.contains('block')) {
      addApple(1)
      continue
    }
    box.add('apple')
  }
}

function editMap() {
  document.querySelector('.start').disabled = true
  document.querySelector('.edit').innerHTML = '编辑结束'

  document.querySelector('.map').addEventListener('mousedown', function startAdd(e) {
    editting = true

    this.addEventListener('mousemove', function addBlock(e) {
      if (editting && document.elementFromPoint(e.clientX, e.clientY).classList.contains('box'))
        document.elementFromPoint(e.clientX, e.clientY).classList.replace('box', 'block')
    })

    this.addEventListener('mouseup', function endAdd(e) {
      editting = false
      this.removeEventListener('mouseup', endAdd)
    })
  })
}


