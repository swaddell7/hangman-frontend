function mackMain() {
    displayWord(hiddenWord)
    letterButtons()
}

// Alphabet array for letter select
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Words sample array
let words = ['noodles', 'cat', 'spaceship']

// Lives for incorrect guesses

// Iterate over alphabet array and create a button for each letter
function letterButtons() {
    const lettersContainer = document.querySelector('#letters-container')
    lettersContainer.innerHTML = ``
    for (let i = 0; i < alphabet.length; i++) {
        lettersContainer.innerHTML +=
            `<button type="button" id="letter-button">${alphabet[i]}</button>`
    }
    lettersContainer.addEventListener('click', event => letterGuess(event))
}

let wordToGuess = words[Math.floor(Math.random() * words.length)]
let wordDisplay = document.querySelector('.word')
let hiddenWord = wordToGuess.replace(/[a-z]/gi, '_')
let hiddenWordSpaced = hiddenWord.split('')

console.log(wordToGuess)
function displayWord(hiddenWord) {
    wordDisplay.innerHTML = `${hiddenWordSpaced.join(' ')}`
}

let letter
let buttonLetter
let splitWord = wordToGuess.split('')

function letterGuess(event) {
    buttonLetter = document.querySelector('#letter-button').innerHTML
    if (event.target.id === 'letter-button') {
        if (!splitWord.includes(event.target.innerHTML)) {
            console.log('hereee')
            incorrectGuess();
        }
        for (let i = 0; i < splitWord.length; i++) {
            if (event.target.innerHTML === splitWord[i]) {
                let changedWord = wordDisplay.innerText
                console.log(changedWord)
                changedWord = changedWord.replace(/ /g, '').split('')
                changedWord[i] = event.target.innerHTML
                let updatedWord = changedWord.join(' ')
                wordDisplay.innerText = updatedWord
                if (changedWord.join('') === wordToGuess) {
                    console.log(wordToGuess)
                    getUser(event);
                    nextRound();
                    setTimeout(function () {
                    }, 1000)
                }
            }
        }
    }
}

let incorrectGuesses = 0
function incorrectGuess() {
    console.log('hiiiii')
    incorrectGuesses += 1

    imageContainer = document.querySelector('.hangman-image');
    if (incorrectGuesses === 1) {
        imageContainer.src = 'images/hangman-phases/hangman_2.png'
    } else if (incorrectGuesses === 2) {
        imageContainer.src = 'images/hangman-phases/hangman_3.png'
    } else if (incorrectGuesses === 3) {
        imageContainer.src = 'images/hangman-phases/hangman_4.png'
    } else if (incorrectGuesses === 4) {
        imageContainer.src = 'images/hangman-phases/hangman_5.png'
    } else if (incorrectGuesses === 5) {
        imageContainer.src = 'images/hangman-phases/hangman_6.png'
    } else if (incorrectGuesses === 6) {
        imageContainer.src = 'images/hangman-phases/hangman_final.png'
    }
}


function nextRound() {
    const nextRoundView = document.querySelector('#next-round-view');
    nextRoundView.style.display = 'block'
}

function getUser(event) {
    const userId = parseInt(event.target.parentNode.dataset.id)
    fetch(`${usersUrl}/${userId}`)
        .then(resp => resp.json())
        .then(user => addPoint(user))
}

function addPoint(user) {
    const newPoints = user.points + 1
    const reqObj = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 'points': newPoints })
    }
    fetch(`${usersUrl}/${user.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}

const nextRoundButton = document.querySelector('#next-round-button');
const nextRoundView = document.querySelector('#next-round-view');
nextRoundButton.addEventListener('click', function () {
    nextRoundView.style.display = 'none'
    wordToGuess = words[Math.floor(Math.random() * words.length)]
    splitWord = wordToGuess.split('')
    console.log(wordToGuess)
    wordDisplay = document.querySelector('.word')
    hiddenWord = wordToGuess.replace(/[a-z]/gi, '_')
    console.log(hiddenWord)
    hiddenWordSpaced = hiddenWord.split('')
    displayWord(hiddenWord);
})

function handleGameOver() {

}

mackMain()