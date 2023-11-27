const cardArray = [
  {
    name: 'fries',
    img: 'img/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'img/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: 'img/ice-cream.png'
  },
  {
    name: 'pizza',
    img: 'img/pizza.png'
  },
  {
    name: 'milkshake',
    img: 'img/milkshake.png'
  },
  {
    name: 'hotdog',
    img: 'img/hotdog.png'
  },
  {
    name: 'fries',
    img: 'img/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'img/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: 'img/ice-cream.png'
  },
  {
    name: 'pizza',
    img: 'img/pizza.png'
  },
  {
    name: 'milkshake',
    img: 'img/milkshake.png'
  },
  {
    name: 'hotdog',
    img: 'img/hotdog.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDOM = document.querySelector('#grid')

let cardsDOM = null
let matchedCards = 0
let cardsFoundId = []
let cardsChosen = []

const initGame = () => {
  gridDOM.innerHTML = ''

  cardArray.forEach((card, index) => {

    const cardDOM = document.createElement('div')
    const cardFrontDOM = document.createElement('div')
    const imgFrontDOM = document.createElement('img')
    const cardBackDOM = document.createElement('div')
    const imgBackDOM = document.createElement('img')

    cardDOM.classList.add('card')
    cardDOM.dataset.id = index

    cardFrontDOM.classList.add('card-front')
    imgFrontDOM.src = card.img

    cardBackDOM.classList.add('card-back')
    imgBackDOM.src = 'img/blank.png'

    cardFrontDOM.appendChild(imgFrontDOM)
    cardBackDOM.appendChild(imgBackDOM)

    cardDOM.appendChild(cardFrontDOM)
    cardDOM.appendChild(cardBackDOM)

    gridDOM.appendChild(cardDOM)
  })

  cardsDOM = document.querySelectorAll('.card')
}

function initListeners() {
  cardsDOM.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('flipped')

      let cardId = card.dataset.id;

      if (cardsChosen.some(cardChosen => cardChosen === cardId)) return
      if (cardsFoundId.some(cardFoundId => cardFoundId === cardId)) return

      cardsChosen.push(cardId)

      if (cardsChosen.length < 2) return

      if (!checkForMatch()) {
        setTimeout(() => {
          cardsDOM.forEach(cardDOM => {
            if (cardsFoundId.some(cardFound => cardDOM.dataset.id === cardFound)) return

            cardDOM.classList.remove('flipped')
          })
        }, 500)
        cardsChosen = []
        return
      }

      matchedCards++
      cardsFoundId.push(...cardsChosen)

      if (matchedCards === cardsDOM.length / 2) {
        setTimeout(() => {
          document.querySelector('p').textContent = 'You found them all!'
          document.querySelector('p').classList.add('success')
          document.querySelector('#reset').disabled = false
        }, 550)
      }

      cardsChosen = []
    })
  })
}

const checkForMatch = () => {
  const cardOne = cardArray[cardsChosen[0]].name
  const cardTwo = cardArray[cardsChosen[1]].name

  return cardOne === cardTwo;
}

// Reset Game
document.querySelector('#reset').addEventListener('click', () => {
  matchedCards = 0
  cardsFoundId = []
  cardsChosen = []
  cardArray.sort(() => 0.5 - Math.random())

  initGame()
  initListeners()

  document.querySelector('p').classList.remove('success')
  document.querySelector('p').textContent = 'Have fun!'
})

initGame();
initListeners();