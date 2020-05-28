function main() {
    letterButtons()
    displayWord()
    letterGuess()
}

// Alphabet array for letter select
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Words sample array
let words = ['cat', 'noodle', 'spaceship']

// Iterate over alphabet array and create a button for each letter
function letterButtons() {
    const lettersContainer = document.querySelector('#letters-container')
    lettersContainer.addEventListener('click', letterGuess)

    for (let i = 0; i < alphabet.length; i++) {
        lettersContainer.innerHTML +=
        `<button type="button" id="letter-button">${alphabet[i]}</button>`
    }
}

let randomWord = words[Math.floor(Math.random() * words.length)]
const wordDisplay = document.querySelector('.word')
let hiddenWord = randomWord.replace(/[a-z]/gi, '_')
let hiddenWordSpaced = hiddenWord.split('')

function displayWord() {
    wordDisplay.innerHTML += `${hiddenWordSpaced.join(' ')}`
}

let letter
let buttonLetter
let splitWord = randomWord.split('')

function letterGuess(event) {
    buttonLetter = document.querySelector('#letter-button').innerHTML
    if (event.target.id = 'letter-button') {
        for (let i = 0; i < splitWord.length; i++) {
            if (event.target.innerHTML === splitWord[i]) {
                letter = splitWord[i]
                console.log(letter)
                // letterReplace(event)
            } else {
                // Window alert('Hello')
            }
        }
    }
}

// function letterReplace() {
//     console.log(letter)
// }

main()
