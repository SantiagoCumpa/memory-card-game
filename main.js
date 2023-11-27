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

const initDOM = () => {
  gridDOM.innerHTML = ''
  cardArray.forEach((card, index) => {

    const cardDOM = document.createElement('div')
    const cardFrontDOM = document.createElement('div')
    const imgFrontDOM = document.createElement('img')
    const cardBackDOM = document.createElement('div')
    const imgBackDOM = document.createElement('img')


    cardFrontDOM.classList.add('card-front')
    cardBackDOM.classList.add('card-back')
    cardDOM.classList.add('card')
    cardDOM.dataset.id = index

    imgFrontDOM.src = card.img
    imgBackDOM.src = 'img/blank.png'

    cardDOM.appendChild(cardFrontDOM)
    cardDOM.appendChild(cardBackDOM)

    cardFrontDOM.appendChild(imgFrontDOM)
    cardBackDOM.appendChild(imgBackDOM)

    cardDOM.appendChild(cardFrontDOM)
    cardDOM.appendChild(cardBackDOM)

    gridDOM.appendChild(cardDOM)
  })
}

initDOM();

const cardsDOM = document.querySelectorAll('.card')

let matchedCards = 0
let cardsFoundId = []
let cardsChosen = []

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
  initDOM()
  document.querySelector('p').classList.remove('success')
  document.querySelector('p').textContent = 'Have fun!'
})