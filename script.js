'use strict';

// ========================================Variables-CONST

const diceElem = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const playerElem0 = document.querySelector('.player--0')
const playerElem1 = document.querySelector('.player--1')
const scoreElems = document.querySelectorAll('.score')

// ========================================Variables-LET

const totalScores = [0, 0]
let current = 0
let activePlayer = 0

// ========================================Functions

const generateRandomNum = () => {
   return Math.trunc(Math.random() * 6) + 1
}

const addHidden = (elem) => {
   elem.classList.add('hidden')
}

const removeHidden = (elem) => {
   elem.classList.remove('hidden')
}

const changeActivePlayer = () => {
   resetCurrent()
   activePlayer = activePlayer === 0 ? 1 : 0
   playerElem0.classList.toggle('player--active')
   playerElem1.classList.toggle('player--active')
}

const resetCurrent = () => {
   current = 0
   document.getElementById(`current--${activePlayer}`).textContent = current
}

// ========================================Code

scoreElems.forEach((item, i) => item.textContent = totalScores[i])
addHidden(diceElem)


// ========================================Events

const btnRollEvent = () => {
   const randomNum = generateRandomNum()

   removeHidden(diceElem)
   diceElem.src = `img/dice${randomNum}.png`

   if (randomNum !== 1) {
      current += randomNum
      document.getElementById(`current--${activePlayer}`).textContent = current
   } else {
      changeActivePlayer()
   }
}

const btnHoldEvent = () => {

   totalScores[activePlayer] += current
   document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer]

   if (totalScores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      addHidden(diceElem)

      btnRoll.removeEventListener('click', btnRollEvent)
      btnHold.removeEventListener('click', btnHoldEvent)
   }

   changeActivePlayer()
}

btnRoll.addEventListener('click', btnRollEvent)
btnHold.addEventListener('click', btnHoldEvent)

btnNew.addEventListener('click', () => {
   location.reload()
})



