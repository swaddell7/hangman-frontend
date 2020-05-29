function mackMain() {
    displayWord()
    letterButtons()
}
function newRound() {
}
// Alphabet array for letter select
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// Words sample array
let words = ['noodles', 'cat', 'spaceship']
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
function displayWord() {
    wordDisplay.innerHTML = `${hiddenWordSpaced.join(' ')}`
}
let letter
let buttonLetter
let splitWord = wordToGuess.split('')
function letterGuess(event) {
    buttonLetter = document.querySelector('#letter-button').innerHTML
    if (event.target.id === 'letter-button') {
        for (let i = 0; i < splitWord.length; i++) {
            if (event.target.innerHTML === splitWord[i]) {
                let changedWord = wordDisplay.innerText
                changedWord = changedWord.replace(/ /g,'').split('')
                changedWord[i] = event.target.innerHTML
                let updatedWord = changedWord.join(' ')
                wordDisplay.innerText = updatedWord
                if(changedWord.join('') === wordToGuess) {
                    getUser(event);
                    nextRound();
                    setTimeout(function(){
                    }, 1000)
                }
            }
        }
    }
}
function nextRound(){
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
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 'points': newPoints })
    }
    fetch(`${usersUrl}/${user.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => console.log(data))
}
mackMain()

const nextRoundButton = document.querySelector('#next-round-button');
nextRoundButton.addEventListener('click', function(){
  nextRoundButton.style.display = 'none'
  wordToGuess = words[Math.floor(Math.random() * words.length)]
  wordDisplay = document.querySelector('.word')
  hiddenWord = wordToGuess.replace(/[a-z]/gi, '_')
  hiddenWordSpaced = hiddenWord.split('')
  displayWord()
})
