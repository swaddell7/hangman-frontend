function main() {
    letterButtons()
    displayWord()
}

// Alphabet array for letter select
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Words sample array
let words = ['cat', 'noodle', 'spaceship']

// Iterate over alphabet array and create a button for each letter
function letterButtons() {
    const lettersContainer = document.querySelector('#letters-container')

    for (let i = 0; i < alphabet.length; i++) {
        lettersContainer.innerHTML +=
        `<button type="button" id="letter-button">${alphabet[i].toUpperCase()}</button>`
    }
    console.log(alphabet)
}

function displayWord() {
    const wordDisplay = document.querySelector('.word')
    let randomWord = words[Math.floor(Math.random() * words.length)]
    let hiddenWord = randomWord.replace(/_/g, "_")
    wordDisplay.innerHTML += `${hiddenWord}`
}

main()
